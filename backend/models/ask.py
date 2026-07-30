from pydantic import BaseModel, Field


class AskRequest(BaseModel):
    dataset_id: str = Field(
        ...,
        description="The unique ID of the uploaded dataset"
    )

    question: str = Field(
        ...,
        min_length=3,
        description="The user's question about the dataset"
    )