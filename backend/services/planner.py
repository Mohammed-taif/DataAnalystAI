import json
from ollama import chat


def create_plan(question, columns):

    prompt = f"""
You are an AI data analyst planner.

Your job is to decide which tool should be used to answer the user's question.

Available tools:

1. statistics
- Use for general dataset information.
- No columns required.

2. groupby
- Use for questions comparing categories, regions, products, etc.

For groupby you MUST provide:
- group_column
- value_column
- operation

Available dataset columns:

{columns}


Rules:
- Return ONLY valid JSON.
- Do not add explanations.
- Do not use markdown.
- Do not write ```json.
- Always use double quotes.
- Make sure commas are correct.

Examples:

Question:
Which region has the highest sales?

Response:
{{
    "tool": "groupby",
    "group_column": "Region",
    "value_column": "Sales",
    "operation": "max"
}}


Question:
Which category has the highest profit?

Response:
{{
    "tool": "groupby",
    "group_column": "Category",
    "value_column": "Profit",
    "operation": "max"
}}


User question:

{question}

Return JSON only:
"""


    response = chat(
        model="llama3.2:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )


    content = response["message"]["content"]


    try:

        plan = json.loads(content)


    except json.JSONDecodeError:


        # Remove extra text if AI adds explanation

        start = content.find("{")
        end = content.rfind("}") + 1


        if start == -1 or end == 0:
            raise Exception(
                "AI did not return valid JSON"
            )


        clean_json = content[start:end]


        plan = json.loads(clean_json)



    return plan