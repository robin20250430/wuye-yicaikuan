from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    allowed_origins: list[str] = ["http://localhost:3000"]
    openai_api_key: str | None = None
    openai_base_url: str = "https://api.openai.com/v1"
    openai_model: str = "gpt-4o-mini"
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")

settings = Settings()
