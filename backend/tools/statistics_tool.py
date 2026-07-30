import pandas as pd


def get_numeric_summary(df: pd.DataFrame) -> dict:
    """
    Returns descriptive statistics for all numeric columns.
    """

    numeric_df = df.select_dtypes(include="number")

    if numeric_df.empty:
        return {
            "message": "No numeric columns found."
        }

    return numeric_df.describe().to_dict()