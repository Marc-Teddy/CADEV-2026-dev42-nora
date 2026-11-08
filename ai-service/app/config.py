"""Application configuration loaded from environment variables."""

from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings for the NORA AI service.

    Values are read from environment variables, then from a local ``.env``
    file. Secrets must never be committed to the repository.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "NORA AI Service"
    environment: str = "development"

    llm_api_key: str = ""
    llm_base_url: str = "https://api.deepseek.com/v1"
    llm_model: str = "deepseek-coder"
    llm_timeout_seconds: float = Field(default=60.0, gt=0)
    llm_max_tokens: int = Field(default=2048, gt=0, le=8192)
    llm_temperature: float = Field(default=0.2, ge=0, le=2)

    internal_api_key: str = ""
    rate_limit_per_minute: int = Field(default=20, ge=1)
    default_answer_language: Literal["fr", "en"] = "fr"


@lru_cache
def get_settings() -> Settings:
    """Return a cached settings instance."""

    return Settings()
