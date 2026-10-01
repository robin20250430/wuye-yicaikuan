from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "物业易催款"
    allowed_origins: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    openai_api_key: str | None = None
    openai_base_url: str = "https://api.openai.com/v1"
    openai_model: str = "gpt-4o-mini"
    database_url: str = "sqlite:///./app.db"
    jwt_secret: str = "change-me-in-production"
    jwt_expire_minutes: int = 60 * 24 * 7
    stripe_secret_key: str | None = None
    stripe_webhook_secret: str | None = None
    payment_success_url: str = "http://localhost:3000/payment/success"
    payment_cancel_url: str = "http://localhost:3000/payment/cancel"
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", case_sensitive=False, extra="ignore")

settings = Settings()
