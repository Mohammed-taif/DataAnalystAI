import pandas as pd


def groupby_aggregate(
    df: pd.DataFrame,
    group_column: str,
    value_column: str,
    operation: str = "sum"
) -> dict:
    """
    Group data by a column and perform an aggregation.

    Supported operations:
    sum, mean, min, max, count
    """

    if group_column not in df.columns:
        raise ValueError(f"Column '{group_column}' not found.")

    if value_column not in df.columns:
        raise ValueError(f"Column '{value_column}' not found.")

    operations = {
        "sum": "sum",
        "mean": "mean",
        "min": "min",
        "max": "max",
        "count": "count"
    }

    if operation not in operations:
        raise ValueError(f"Unsupported operation: {operation}")

    result = (
        df.groupby(group_column)[value_column]
        .agg(operations[operation])
        .sort_values(ascending=False)
    )

    return result.to_dict()