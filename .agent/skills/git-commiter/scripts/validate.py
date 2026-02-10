#!/usr/bin/env python3
import sys, json, re
from pydantic import BaseModel, Field

class InputSchema(BaseModel):
    message: str

class OutputSchema(BaseModel):
    status: str
    result: dict
    error: str | None = None

def execute(data: InputSchema) -> OutputSchema:
    # Patrón flexible que admite emojis si se desea, pero impone estructura
    pattern = r"^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?: .+"
    if not re.match(pattern, data.message):
        return OutputSchema(status="error", result={"valid": False}, error="El formato debe ser: type(scope): subject")
    
    lines = data.message.split('\n')
    if len(lines[0]) > 100:
         return OutputSchema(status="error", result={"valid": False}, error="La primera línea es muy larga (>100 caracteres)")

    return OutputSchema(status="success", result={"valid": True, "message": "Mensaje válido"})

if __name__ == "__main__":
    try:
        raw = sys.stdin.read()
        if not raw: raise ValueError("Empty stdin")
        data = InputSchema.model_validate_json(raw)
        print(execute(data).model_dump_json())
    except Exception as e:
        print(OutputSchema(status="error", result={}, error=str(e)).model_dump_json())
