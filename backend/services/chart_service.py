def generate_chart_config(
    question: str,
    plan: dict
):

    if plan.get("tool") != "groupby":
        return None


    return {
        "type": "bar",
        "x": plan.get("group_column"),
        "y": plan.get("value_column"),
        "operation": plan.get("operation")
    }