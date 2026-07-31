from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from backend.services.report_generator import generate_report


router = APIRouter(
    prefix="/report",
    tags=["Report"]
)



@router.post("/")
async def create_report(data: dict):

    try:

        filename = data.get(
            "filename",
            "dataset.csv"
        )


        insights = data.get(
            "insights",
            {}
        )


        explanation = data.get(
            "explanation",
            ""
        )


        path = generate_report(
            filename,
            insights,
            explanation
        )


        return FileResponse(
            path,
            media_type="application/pdf",
            filename="DataAnalystAI_Report.pdf"
        )


    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )