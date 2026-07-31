import pandas as pd


def groupby_aggregate(
    df: pd.DataFrame,
    group_column: str,
    value_column: str,
    operation: str = "sum"
):
    """
    Perform dynamic aggregation on a dataframe.
    """

    if group_column not in df.columns:
        raise ValueError(f"{group_column} column not found.")

    if value_column not in df.columns:
        raise ValueError(f"{value_column} column not found.")

    grouped = df.groupby(group_column)[value_column]

    operations = {
        "sum": grouped.sum,
        "mean": grouped.mean,
        "max": grouped.max,
        "min": grouped.min,
        "count": grouped.count,
        "median": grouped.median
    }

    if operation not in operations:
        raise ValueError(f"Unsupported operation: {operation}")

    result = operations[operation]()

    return result.sort_values(
        ascending=False
    ).to_dict()