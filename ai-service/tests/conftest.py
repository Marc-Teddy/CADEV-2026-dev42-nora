"""Shared test configuration.

Environment variables are set before importing the application so that the
cached settings use test values.
"""

import os

os.environ.setdefault("INTERNAL_API_KEY", "test-internal-key")
os.environ.setdefault("LLM_API_KEY", "test-llm-key")
os.environ.setdefault("RATE_LIMIT_PER_MINUTE", "1000")
os.environ.setdefault("LLM_MODEL", "test-model")

import pytest
from fastapi.testclient import TestClient

from app.config import get_settings
from app.deps import get_llm_client
from app.main import app
from app.rate_limit import limiter
from app.services.llm import LLMResult

INTERNAL_KEY = os.environ["INTERNAL_API_KEY"]
HEADERS = {"X-Internal-Key": INTERNAL_KEY}


class FakeLLMClient:
    """Deterministic stand-in for the upstream provider."""

    def __init__(self, result: LLMResult | None = None, error: Exception | None = None):
        self.result = result or LLMResult(
            content="Réponse de test",
            model="test-model",
            usage={"total_tokens": 12},
        )
        self.error = error
        self.calls: list[list[dict[str, str]]] = []

    async def complete(self, messages: list[dict[str, str]]) -> LLMResult:
        self.calls.append(messages)
        if self.error is not None:
            raise self.error
        return self.result


@pytest.fixture(autouse=True)
def reset_state():
    limiter.reset()
    get_settings.cache_clear()
    yield
    app.dependency_overrides.clear()
    get_settings.cache_clear()


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def fake_llm():
    fake = FakeLLMClient()
    app.dependency_overrides[get_llm_client] = lambda: fake
    return fake
