def generate_insights(df):

    insights = {

        "total_sales": round(
            df["Sales"].sum(),
            2
        ),

        "total_profit": round(
            df["Profit"].sum(),
            2
        ),

        "average_discount": round(
            df["Discount"].mean() * 100,
            2
        )

    }


    if "Category" in df.columns:

        top_category = (
            df.groupby("Category")["Profit"]
            .sum()
            .idxmax()
        )

        insights["top_category"] = top_category


    return insights