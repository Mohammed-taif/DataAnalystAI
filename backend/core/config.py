from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "DataAnalystAI"
    APP_VERSION: str = "1.0.0"

    OLLAMA_MODEL: str = "llama3.2:3b"
    OLLAMA_HOST: str = "http://localhost:11434"

    class Config:
        env_file = ".env"


settings = Settings()