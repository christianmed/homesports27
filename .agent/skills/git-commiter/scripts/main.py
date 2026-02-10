#!/usr/bin/env python3
import sys, json, subprocess
from pydantic import BaseModel, Field, ValidationError
from typing import Optional, Literal

# 1. Models
class InputSchema(BaseModel):
    type: Literal["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]
    scope: Optional[str] = None
    subject: str = Field(..., min_length=1, description="Descripción corta del cambio")
    body: Optional[str] = None
    is_breaking: bool = False

class OutputSchema(BaseModel):
    status: str
    result: dict
    error: Optional[str] = None

# 2. Logic
def execute(data: InputSchema) -> OutputSchema:
    # Construir encabezado
    header = f"{data.type}"
    if data.scope:
        header += f"({data.scope})"
    header += f": {data.subject}"

    # Construir cuerpo
    full_body = ""
    if data.body:
        full_body += data.body + "\n\n"
    
    if data.is_breaking:
        full_body += "BREAKING CHANGE: " + (data.body if data.body else "Cambios importantes")

    # Ejecutar commit
    cmd = ["git", "commit", "-m", header]
    if full_body:
        cmd.extend(["-m", full_body])

    try:
        # Usamos subprocess para ejecutar git
        # Nota: stdin=subprocess.PIPE evita que git pida input interactivo si algo sale mal
        result = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='utf-8')
        return OutputSchema(status="success", result={"stdout": result.stdout, "message": header})
    except subprocess.CalledProcessError as e:
        return OutputSchema(status="error", result={"stderr": e.stderr}, error="Git commit failed")
    except Exception as e:
        return OutputSchema(status="error", result={}, error=str(e))

# 3. Entrypoint
if __name__ == "__main__":
    try:
        # Leer stdin
        if sys.stdin.isatty():
             print(json.dumps({"status": "error", "error": "Esperando JSON en stdin"}))
             sys.exit(1)
             
        raw = sys.stdin.read()
        if not raw: raise ValueError("Empty stdin")
        
        try:
            data = InputSchema.model_validate_json(raw)
            print(execute(data).model_dump_json())
        except ValidationError as e:
             # Devolver error de validación estructurado
             print(OutputSchema(status="error", result={}, error=f"Validation Error: {e}").model_dump_json())
    except Exception as e:
        print(OutputSchema(status="error", result={}, error=str(e)).model_dump_json())
