SUMMARY_PROMPT = """
You are a senior data analyst.

You are given a dataset profile and descriptive statistics.

Your job is to produce a concise executive summary.

Include:

1. Dataset overview
2. Data quality issues
3. Interesting statistical observations
4. Potential business insights
5. Recommendations

Keep the response under 250 words.

Dataset Profile:

{profile}

Statistics:

{statistics}
"""