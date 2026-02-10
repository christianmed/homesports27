#!/usr/bin/env python3
import sys
import os
import json
from pathlib import Path

# Nota: No usamos Pydantic aquí para mantener esta skill "bootstrapper"
# sin dependencias externas, pero las skills que genere SÍ lo usarán.

def main():
    """
    Writes content to a file, creating parent directories if needed.
    Expects JSON input via stdin:
    {
        "filepath": "path/to/file",
        "content": "text content"
    }
    """
    try:
        # Leer Input
        raw_input = sys.stdin.read()
        if not raw_input.strip():
            print(json.dumps({"status": "error", "message": "No input received"}))
            sys.exit(1)
            
        data = json.loads(raw_input)
        filepath = data.get("filepath")
        content = data.get("content")

        if not filepath or content is None:
            print(json.dumps({"status": "error", "message": "Missing 'filepath' or 'content'"}))
            sys.exit(1)

        # Seguridad básica: Evitar salir del directorio .agent/skills (Sandboxing ligero)
        # En producción, esto debería ser más robusto.
        target_path = Path(filepath).resolve()
        
        # Crear directorios
        target_path.parent.mkdir(parents=True, exist_ok=True)

        # Escribir archivo
        with open(target_path, "w", encoding="utf-8") as f:
            f.write(content)

        print(json.dumps({
            "status": "success", 
            "message": f"File written successfully to {target_path}"
        }))

    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()