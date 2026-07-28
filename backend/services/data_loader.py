from pathlib import Path
import pandas as pd


SUPPORTED_EXTENSIONS = {".csv", ".xlsx", ".xls"}


def load_dataset(file_path: str | Path) -> pd.DataFrame:
    """
    Load a dataset into a Pandas DataFrame.

    Supported formats:
    - CSV
    - XLSX
    - XLS
    """

    file_path = Path(file_path)

    if not file_path.exists():
        raise FileNotFoundError(f"{file_path} does not exist.")

    suffix = file_path.suffix.lower()

    if suffix not in SUPPORTED_EXTENSIONS:
        raise ValueError(
            f"Unsupported file type: {suffix}"
        )

    if suffix == ".csv":
        return pd.read_csv(file_path)

    return pd.read_excel(file_path)