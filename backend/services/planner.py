import json

from ollama import chat

from backend.prompts.planner_prompt import PLANNER_PROMPT
from backend.core.config import settings


def create_plan(question: str, columns: list):

    prompt = PLANNER_PROMPT.format(
        question=question,
        columns=columns
    )

    response = chat(
        model=settings.OLLAMA_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return json.loads(
        response["message"]["content"]
    )