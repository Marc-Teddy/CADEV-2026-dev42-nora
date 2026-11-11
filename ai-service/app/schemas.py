"""Request and response models exposed by the AI service API."""

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field

AnswerLanguage = Literal["fr", "en"]
DetailLevel = Literal["beginner", "intermediate", "expert"]


class _RequestBase(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    language: str | None = Field(
        default=None,
        max_length=40,
        description="Programming language of the code (e.g. python, go, typescript).",
    )
    answer_language: AnswerLanguage | None = Field(
        default=None,
        description="Language of the generated answer. Defaults to the service setting.",
    )


class ExplainRequest(_RequestBase):
    code: str = Field(min_length=1, max_length=20_000)
    detail_level: DetailLevel = "intermediate"


class GenerateRequest(_RequestBase):
    prompt: str = Field(min_length=3, max_length=4_000)
    context: str | None = Field(default=None, max_length=8_000)


class FixRequest(_RequestBase):
    code: str = Field(min_length=1, max_length=20_000)
    error: str | None = Field(default=None, max_length=4_000)
    context: str | None = Field(default=None, max_length=8_000)


class AssistantResponse(BaseModel):
    content: str
    model: str
    usage: dict[str, Any] | None = None


class HealthResponse(BaseModel):
    status: Literal["ok"] = "ok"
    service: str
    version: str
    environment: str
    model: str
