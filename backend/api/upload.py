from backend.services.statistics import generate_statistics
from pathlib import Path
import shutil
from backend.services.ai_service import generate_summary
from fastapi import APIRouter, File, HTTPException, UploadFile
from backend.services.session_manager import store_dataframe
from backend.services.data_loader import load_dataset
from backend.services.profiler import profile_dataset
from backend.services.insights import generate_insights

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
        dataset_id = store_dataframe(df)

        profile = profile_dataset(df)
        statistics = generate_statistics(df)
        ai_summary = generate_summary(profile, statistics)
        insights = generate_insights(df)

        return {
            "dataset_id": dataset_id,
            "filename": file.filename,
            "profile": profile,
            "statistics": statistics,
            "ai_summary": ai_summary,
            "insights": insights
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )