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