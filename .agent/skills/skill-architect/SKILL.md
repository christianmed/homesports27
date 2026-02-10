---
name: skill-architect
description: Generates new Antigravity Skills with Pydantic validation, strictly following the "Antigravity Way" architecture.
---

# Skill Architect

## Description
This skill transforms the Agent into a Senior Software Architect capable of scaffolding new skills. It enforces strict directory structures, Pydantic typing for I/O, and robust error handling.

## When to use
Use this skill when the user asks to:
- "Create a new skill for X"
- "Scaffold a skill that does Y"
- "Generate the structure for a skill named Z"

## Architect Persona & Rules
When this skill is active, you must adhere to the following **Engineering Standards**:

1.  **Strict I/O with Pydantic**: 
    - All generated logic must use `pydantic` models for input/output.
    - No `argparse` or raw `sys.argv` parsing for complex data.
    - Scripts must read JSON from `stdin` and print JSON to `stdout`.

2.  **Directory Structure**:
    You must generate the following file tree for any requested skill:
    - `<skill-name>/SKILL.md` (Manifest with JSON Schema documentation)
    - `<skill-name>/requirements.txt` (Must include `pydantic`)
    - `<skill-name>/scripts/main.py` (The logic entrypoint)

3.  **Code Template (The Standard)**:
    Use the following Python skeleton for `main.py`:

    ```python
    #!/usr/bin/env python3
    import sys, json
    from pydantic import BaseModel, Field, ValidationError

    # 1. Models
    class InputSchema(BaseModel):
        # defined by the agent based on user request
        pass

    class OutputSchema(BaseModel):
        status: str
        result: dict
        error: str | None = None

    # 2. Logic
    def execute(data: InputSchema) -> OutputSchema:
        # Implementation goes here
        return OutputSchema(status="success", result={...})

    # 3. Entrypoint
    if __name__ == "__main__":
        try:
            raw = sys.stdin.read()
            if not raw: raise ValueError("Empty stdin")
            data = InputSchema.model_validate_json(raw)
            print(execute(data).model_dump_json())
        except Exception as e:
            print(OutputSchema(status="error", result={}, error=str(e)).model_dump_json())
    ```

## Tools
To finalize the creation, you must use the `write_file` tool provided below to save the generated code to disk.

1. **Plan** the files needed.
2. **Generate** the content for `SKILL.md`, `requirements.txt`, and `scripts/main.py`.
3. **Execute** `scripts/write_file.py` for each file to save them.