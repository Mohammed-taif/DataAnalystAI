import uuid
import pandas as pd

# In-memory storage
_DATASETS: dict[str, pd.DataFrame] = {}


def store_dataframe(df: pd.DataFrame) -> str:
    """
    Store a DataFrame and return its unique dataset ID.
    """
    dataset_id = str(uuid.uuid4())
    _DATASETS[dataset_id] = df
    return dataset_id


def get_dataframe(dataset_id: str) -> pd.DataFrame:
    """
    Retrieve a DataFrame by dataset ID.
    """
    if dataset_id not in _DATASETS:
        raise ValueError("Dataset not found.")

    return _DATASETS[dataset_id]


def delete_dataframe(dataset_id: str) -> None:
    """
    Remove a DataFrame from memory.
    """
    _DATASETS.pop(dataset_id, None)