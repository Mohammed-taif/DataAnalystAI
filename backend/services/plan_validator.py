def validate_plan(plan: dict, columns: list):

    # Check tool exists
    if "tool" not in plan:
        raise ValueError("Planner did not return a tool")

    # Validate groupby plans
    if plan["tool"] == "groupby":

        if "group_column" not in plan:
            raise ValueError("Missing group column")

        if "value_column" not in plan:
            raise ValueError("Missing value column")


        if plan["group_column"] not in columns:
            raise ValueError(
                f"Column '{plan['group_column']}' was not found. "
                f"Available columns: {', '.join(columns)}"
        )


        if plan["value_column"] not in columns:
            raise ValueError(
                f"Column '{plan['value_column']}' was not found. "
                f"Available columns: {', '.join(columns)}"
            )


        allowed_operations = [
            "sum",
            "mean",
            "max",
            "min",
            "count",
            "median"
        ]

        if plan.get("operation") not in allowed_operations:
            plan["operation"] = "sum"


    return plan