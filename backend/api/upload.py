from backend.services.statistics import generate_statistics
from pathlib import Path
import shutil

from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.services.data_loader import load_dataset
from backend.services.profiler import profile_dataset

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_FOLDER = Path("backend/uploads")
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)


@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = UPLOAD_FOLDER / file.filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        df = load_dataset(file_path)

        profile = profile_dataset(df)
        statistics = generate_statistics(df)

        return {
    "filename": file.filename,
    "profile": profile,
    "statistics": statistics
}

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )