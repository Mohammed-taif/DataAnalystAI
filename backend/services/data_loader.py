import pandas as pd


def load_dataset(file_path: str):
    """
    Load a CSV or Excel file into a Pandas DataFrame.
    """

    if file_path.endswith(".csv"):
        return pd.read_csv(file_path)

    elif file_path.endswith(".xlsx"):
        return pd.read_excel(file_path)

    elif file_path.endswith(".xls"):
        return pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format.")