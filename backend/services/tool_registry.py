from backend.tools.statistics_tool import get_numeric_summary
from backend.tools.groupby_tool import groupby_aggregate

TOOLS = {
    "statistics": get_numeric_summary,
    "groupby": groupby_aggregate,
}