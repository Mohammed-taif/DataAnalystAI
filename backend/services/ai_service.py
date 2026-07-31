from ollama import chat
import json


def generate_summary(profile, statistics):

    prompt = f"""
You are a data analyst.

Create a short summary using only the provided dataset information.

Dataset profile:
{json.dumps(profile, indent=2)}

Statistics:
{json.dumps(statistics, indent=2)}

Do not invent numbers.
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


    return response["message"]["content"]



def explain_analysis(question, result):


    prompt = f"""
You are an AI data analyst assistant.

Answer the user's question using ONLY the analysis result below.

STRICT RULES:
- Never create new numbers.
- Never modify numbers.
- Never guess.
- Never use outside information.
- Mention only values present in the result.
- Keep the explanation short and clear.


User question:

{question}


Analysis result:

{json.dumps(result, indent=2)}


Provide the explanation:
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


    return response["message"]["content"]