from backend.services.tool_registry import TOOLS


def route_question(question: str):
    """
    Decide which tool should answer the user's question.
    """

    question = question.lower()

    if "highest" in question and "sales" in question:
        return "groupby"

    if "statistics" in question or "summary" in question:
        return "statistics"

    return None