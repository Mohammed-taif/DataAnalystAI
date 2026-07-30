import pandas as pd


def generate_statistics(df: pd.DataFrame) -> dict:
    """
    Generate descriptive statistics for all numeric columns.
    """

    numeric_df = df.select_dtypes(include="number")

    statistics = {}

    for column in numeric_df.columns:

        statistics[column] = {
            "count": int(numeric_df[column].count()),
            "mean": float(numeric_df[column].mean()),
            "median": float(numeric_df[column].median()),
            "min": float(numeric_df[column].min()),
            "max": float(numeric_df[column].max()),
            "std": float(numeric_df[column].std()),
            "variance": float(numeric_df[column].var()),
            "sum": float(numeric_df[column].sum())
        }

    return statistics