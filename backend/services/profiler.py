import pandas as pd


def profile_dataset(df: pd.DataFrame) -> dict:
    """
    Generate a summary profile of a Pandas DataFrame.
    """

    column_info = []

    for column in df.columns:
        column_info.append(
            {
                "name": column,
                "dtype": str(df[column].dtype),
                "missing": int(df[column].isnull().sum()),
                "unique": int(df[column].nunique())
            }
        )

    return {
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "shape": list(df.shape),
        "duplicate_rows": int(df.duplicated().sum()),
        "missing_values": int(df.isnull().sum().sum()),
        "memory_usage_bytes": int(df.memory_usage(deep=True).sum()),
        "column_info": column_info
    }