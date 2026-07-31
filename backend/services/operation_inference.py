def infer_operation(question: str) -> str:
    """
    Infer the aggregation operation from the user's question.
    """

    q = question.lower()

    if any(word in q for word in ["average", "avg", "mean"]):
        return "mean"

    if any(word in q for word in ["count", "how many", "number of"]):
        return "count"

    if any(word in q for word in ["maximum value", "largest single", "highest individual"]):
        return "max"

    if any(word in q for word in ["minimum value", "lowest individual"]):
        return "min"

    # Default for business analytics questions
    return "sum"