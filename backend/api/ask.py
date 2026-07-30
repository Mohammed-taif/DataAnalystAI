from fastapi import APIRouter, HTTPException

from backend.models.ask import AskRequest
from backend.services.session_manager import get_dataframe
from backend.services.question_router import route_question
from backend.services.tool_registry import TOOLS
from backend.services.ai_service import explain_analysis


router = APIRouter(
    prefix="/ask",
    tags=["Ask"]
)


@router.post("/")
async def ask_question(request: AskRequest):

    try:
        # Get uploaded dataframe
        df = get_dataframe(request.dataset_id)

        # Decide which tool to use
        tool_name = route_question(request.question)

        if tool_name is None:
            return {
                "answer": "Sorry, I don't understand that question yet."
            }


        # Run selected tool
        if tool_name == "statistics":

            result = TOOLS["statistics"](df)


        elif tool_name == "groupby":

            result = TOOLS["groupby"](
                df,
                group_column="Region",
                value_column="Sales",
                operation="sum"
            )


        else:
            result = {
                "message": "Tool not implemented"
            }


        # Ask Llama to explain the result
        explanation = explain_analysis(
            request.question,
            result
        )


        return {
            "tool_used": tool_name,
            "analysis": result,
            "ai_explanation": explanation
        }


    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )