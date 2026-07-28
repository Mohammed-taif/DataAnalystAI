from fastapi import FastAPI
from backend.api.upload import router as upload_router

app = FastAPI(
    title="DataAnalystAI",
    description="AI Powered Data Analyst",
    version="1.0.0"
)

app.include_router(upload_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to DataAnalystAI 🚀"
    }