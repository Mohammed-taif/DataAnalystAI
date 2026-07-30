from ollama import chat
from backend.core.config import settings
from backend.prompts.summary_prompt import SUMMARY_PROMPT

def generate_summary(profile: dict, statistics: dict) -> str:
    """
    Generate an executive summary of the uploaded dataset
    using the local Ollama model.
    """

    prompt = SUMMARY_PROMPT.format(
    profile=profile,
    statistics=statistics
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

    return response["message"]["content"]

from ollama import chat

from backend.prompts.analysis_prompt import ANALYSIS_PROMPT
from backend.core.config import settings


def explain_analysis(question: str, result: dict) -> str:
    """
    Convert tool output into a human-friendly explanation
    using the local Llama model.
    """

    prompt = ANALYSIS_PROMPT.format(
        question=question,
        result=result
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

    return response["message"]["content"]