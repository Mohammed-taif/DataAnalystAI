from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from pathlib import Path


REPORT_FOLDER = Path(
    "backend/reports"
)

REPORT_FOLDER.mkdir(
    exist_ok=True
)



def generate_report(
    filename,
    insights,
    explanation
):


    path = REPORT_FOLDER / "analysis_report.pdf"


    pdf = canvas.Canvas(
        str(path),
        pagesize=letter
    )


    y = 750


    pdf.setFont(
        "Helvetica-Bold",
        18
    )

    pdf.drawString(
        50,
        y,
        "DataAnalystAI Report"
    )


    y -= 40


    pdf.setFont(
        "Helvetica",
        12
    )


    lines = [

        f"Dataset: {filename}",

        "",

        "Quick Insights:",

        f"Total Sales: {insights.get('total_sales')}",

        f"Total Profit: {insights.get('total_profit')}",

        f"Average Discount: {insights.get('average_discount')}%",

        f"Top Category: {insights.get('top_category')}",

        "",

        "AI Analysis:",

        explanation

    ]



    for line in lines:

        pdf.drawString(
            50,
            y,
            str(line)
        )

        y -= 25



    pdf.save()


    return str(path)