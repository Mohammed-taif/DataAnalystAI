from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.upload import router as upload_router
from backend.api.ask import router as ask_router

app = FastAPI(
    title="DataAnalystAI",
    description="AI Powered Data Analyst",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(ask_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to DataAnalystAI 🚀"
    }