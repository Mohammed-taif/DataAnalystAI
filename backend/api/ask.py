from fastapi import APIRouter, HTTPException

from backend.models.ask import AskRequest
from backend.services.session_manager import get_dataframe
from backend.services.tool_registry import TOOLS
from backend.services.ai_service import explain_analysis
from backend.services.planner import create_plan
from backend.services.operation_inference import infer_operation
from backend.services.plan_validator import validate_plan
from backend.services.chart_service import generate_chart_config
from backend.services.result_formatter import format_result


router = APIRouter(
    prefix="/ask",
    tags=["Ask"]
)


@router.post("/")
async def ask_question(request: AskRequest):

    try:
        # Get uploaded dataset
        df = get_dataframe(request.dataset_id)


        # Create AI plan
        plan = create_plan(
            request.question,
            list(df.columns)
        )


        # Decide operation using Python rules
        plan["operation"] = infer_operation(
            request.question
        )


        # Validate AI plan
        plan = validate_plan(
            plan,
            list(df.columns)
        )


        tool_name = plan.get("tool")


        if tool_name not in TOOLS:
            return {
                "error": "Tool not available",
                "plan": plan
            }


        # Execute selected tool

        if tool_name == "statistics":

            result = TOOLS["statistics"](df)


        elif tool_name == "groupby":

            result = TOOLS["groupby"](
                df,
                group_column=plan["group_column"],
                value_column=plan["value_column"],
                operation=plan.get(
                    "operation",
                    "sum"
                )
            )


        else:

            result = {
                "message": "Tool execution not implemented"
            }


        # Format numbers before AI explanation
        if isinstance(result, dict):
            result = format_result(result)


        # Generate AI explanation
        explanation = explain_analysis(
            request.question,
            result
        )


        # Generate chart information
        chart = generate_chart_config(
            request.question,
            plan
        )


        return {
            "plan": plan,
            "tool_used": tool_name,
            "analysis": result,
            "chart": chart,
            "ai_explanation": explanation
        }


    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )