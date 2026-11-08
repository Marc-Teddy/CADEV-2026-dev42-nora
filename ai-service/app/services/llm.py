"""Thin client around an OpenAI-compatible chat completions API."""

import logging
from dataclasses import dataclass
from typing import Any

import httpx

from ..config import Settings

logger = logging.getLogger(__name__)


@dataclass(slots=True)
class LLMResult:
    content: str
    model: str
    usage: dict[str, Any] | None = None


class LLMError(Exception):
    """Raised when the upstream AI provider cannot answer."""

    def __init__(self, message: str, status_code: int = 502) -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code


class LLMClient:
    """Minimal async client for OpenAI-compatible providers.

    Works with any provider exposing ``POST {base_url}/chat/completions``
    (DeepSeek, Mistral, Groq, OpenAI, local vLLM, ...).
    """

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._client = httpx.AsyncClient(timeout=settings.llm_timeout_seconds)

    async def aclose(self) -> None:
        await self._client.aclose()

    async def complete(self, messages: list[dict[str, str]]) -> LLMResult:
        settings = self._settings
        if not settings.llm_api_key:
            raise LLMError("LLM_API_KEY is not configured", status_code=503)

        url = f"{settings.llm_base_url.rstrip('/')}/chat/completions"
        payload = {
            "model": settings.llm_model,
            "messages": messages,
            "temperature": settings.llm_temperature,
            "max_tokens": settings.llm_max_tokens,
            "stream": False,
        }
        headers = {
            "Authorization": f"Bearer {settings.llm_api_key}",
            "Content-Type": "application/json",
        }

        try:
            response = await self._client.post(url, json=payload, headers=headers)
        except httpx.TimeoutException as exc:
            raise LLMError("The AI provider timed out", status_code=504) from exc
        except httpx.HTTPError as exc:
            raise LLMError("The AI provider is unreachable", status_code=502) from exc

        if response.status_code >= 400:
            logger.warning(
                "AI provider returned %s: %s",
                response.status_code,
                response.text[:500],
            )
            if response.status_code == 429:
                raise LLMError(
                    "The AI provider is rate limiting requests", status_code=503
                )
            if response.status_code in (401, 403):
                raise LLMError(
                    "The AI provider rejected the credentials", status_code=502
                )
            raise LLMError("The AI provider returned an error", status_code=502)

        try:
            data = response.json()
            content = data["choices"][0]["message"]["content"]
        except (ValueError, KeyError, IndexError, TypeError) as exc:
            logger.warning("Invalid AI provider response: %s", response.text[:500])
            raise LLMError("The AI provider returned an invalid response") from exc

        if not isinstance(content, str) or not content.strip():
            raise LLMError("The AI provider returned an empty response")

        model = data.get("model")
        usage = data.get("usage")
        return LLMResult(
            content=content.strip(),
            model=model if isinstance(model, str) else settings.llm_model,
            usage=usage if isinstance(usage, dict) else None,
        )
