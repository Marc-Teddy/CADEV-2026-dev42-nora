"""Coding assistant endpoints."""

from fastapi import APIRouter, Depends

from ..config import Settings
from ..deps import LLMClientDep, SettingsDep
from ..prompts import (
    build_explain_messages,
    build_fix_messages,
    build_generate_messages,
)
from ..rate_limit import enforce_rate_limit
from ..schemas import (
    AnswerLanguage,
    AssistantResponse,
    ExplainRequest,
    FixRequest,
    GenerateRequest,
)
from ..security import require_internal_key
from ..services.llm import LLMResult

router = APIRouter(
    prefix="/v1",
    tags=["assistant"],
    dependencies=[Depends(require_internal_key), Depends(enforce_rate_limit)],
)


def _answer_language(requested: str | None, settings: Settings) -> AnswerLanguage:
    return requested or settings.default_answer_language


def _to_response(result: LLMResult) -> AssistantResponse:
    return AssistantResponse(
        content=result.content,
        model=result.model,
        usage=result.usage,
    )


@router.post("/explain", response_model=AssistantResponse)
async def explain_code(
    payload: ExplainRequest,
    client: LLMClientDep,
    settings: SettingsDep,
) -> AssistantResponse:
    """Explain what a piece of code does."""

    messages = build_explain_messages(
        code=payload.code,
        language=payload.language,
        detail_level=payload.detail_level,
        answer_language=_answer_language(payload.answer_language, settings),
    )
    return _to_response(await client.complete(messages))


@router.post("/generate", response_model=AssistantResponse)
async def generate_code(
    payload: GenerateRequest,
    client: LLMClientDep,
    settings: SettingsDep,
) -> AssistantResponse:
    """Generate code from a natural language request."""

    messages = build_generate_messages(
        prompt=payload.prompt,
        language=payload.language,
        context=payload.context,
        answer_language=_answer_language(payload.answer_language, settings),
    )
    return _to_response(await client.complete(messages))


@router.post("/fix", response_model=AssistantResponse)
async def fix_code(
    payload: FixRequest,
    client: LLMClientDep,
    settings: SettingsDep,
) -> AssistantResponse:
    """Find and fix a bug, then explain its root cause."""

    messages = build_fix_messages(
        code=payload.code,
        error=payload.error,
        context=payload.context,
        language=payload.language,
        answer_language=_answer_language(payload.answer_language, settings),
    )
    return _to_response(await client.complete(messages))
