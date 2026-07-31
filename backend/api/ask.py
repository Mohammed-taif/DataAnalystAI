from fastapi import APIRouter, HTTPException

from backend.models.ask import AskRequest
from backend.services.session_manager import get_dataframe
from backend.services.tool_registry import TOOLS
from backend.services.ai_service import explain_analysis
from backend.services.planner import create_plan
from backend.services.operation_inference import infer_operation

router = APIRouter(
    prefix="/ask",
    tags=["Ask"]
)


@router.post("/")
async def ask_question(request: AskRequest):
    try:
        # Get uploaded dataset
        df = get_dataframe(request.dataset_id)

        # Ask AI planner what to do
        plan = create_plan(
            request.question,
            list(df.columns)
        )

        # Override operation using deterministic Python logic
        plan["operation"] = infer_operation(request.question)

        tool_name = plan.get("tool")

        if tool_name not in TOOLS:
            return {
                "error": "Tool not available",
                "plan": plan
            }

        # Execute tool
        if tool_name == "statistics":

            result = TOOLS["statistics"](df)

        elif tool_name == "groupby":

            result = TOOLS["groupby"](
                df,
                group_column=plan["group_column"],
                value_column=plan["value_column"],
                operation=plan.get("operation", "sum")
            )

        else:

            result = {
                "message": "Tool execution not implemented"
            }

        # Generate AI explanation
        explanation = explain_analysis(
            request.question,
            result
        )

        return {
            "plan": plan,
            "tool_used": tool_name,
            "analysis": result,
            "ai_explanation": explanation
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )