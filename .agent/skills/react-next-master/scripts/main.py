#!/usr/bin/env python3
import sys, json
from pydantic import BaseModel, Field, ValidationError

# 1. Models
class InputSchema(BaseModel):
    query: str = Field(..., description="The question or task description for the React/Next.js Master.")
    context: str | None = Field(None, description="Optional code snippet or file content to analyze.")

class OutputSchema(BaseModel):
    status: str
    result: dict
    error: str | None = None

# 2. Logic
def execute(data: InputSchema) -> OutputSchema:
    # In a real implementation, this could interface with an LLM or static analysis tools.
    # For now, it acts as a structured interface to acknowledge the request.
    
    response_message = f"React/Next.js Master received query: '{data.query}'."
    if data.context:
        response_message += " Context provided for analysis."
        
    return OutputSchema(
        status="success", 
        result={
            "message": response_message,
            "advice": "Please refer to SKILL.md for architectural guidelines and best practices."
        }
    )

# 3. Entrypoint
if __name__ == "__main__":
    try:
        raw = sys.stdin.read()
        if not raw: raise ValueError("Empty stdin")
        data = InputSchema.model_validate_json(raw)
        print(execute(data).model_dump_json())
    except Exception as e:
        print(OutputSchema(status="error", result={}, error=str(e)).model_dump_json())
