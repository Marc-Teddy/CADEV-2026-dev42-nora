from app.deps import get_llm_client
from app.main import app
from app.rate_limit import SlidingWindowLimiter
from app.services.llm import LLMError
from tests.conftest import HEADERS, FakeLLMClient


def test_health(client):
    response = client.get("/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["model"] == "test-model"


def test_explain_requires_internal_key(client):
    response = client.post("/v1/explain", json={"code": "print('hi')"})

    assert response.status_code == 401


def test_explain_rejects_wrong_key(client):
    response = client.post(
        "/v1/explain",
        json={"code": "print('hi')"},
        headers={"X-Internal-Key": "wrong"},
    )

    assert response.status_code == 401


def test_explain_success(client, fake_llm):
    response = client.post(
        "/v1/explain",
        json={"code": "print('hi')", "language": "python"},
        headers=HEADERS,
    )

    assert response.status_code == 200
    body = response.json()
    assert body["content"] == "Réponse de test"
    assert body["model"] == "test-model"
    assert body["usage"] == {"total_tokens": 12}
    assert fake_llm.calls[0][0]["role"] == "system"
    assert "French" in fake_llm.calls[0][0]["content"]
    assert "print('hi')" in fake_llm.calls[0][1]["content"]


def test_explain_answer_language_override(client, fake_llm):
    response = client.post(
        "/v1/explain",
        json={"code": "print('hi')", "answer_language": "en"},
        headers=HEADERS,
    )

    assert response.status_code == 200
    assert "English" in fake_llm.calls[0][0]["content"]


def test_generate_rejects_empty_prompt(client):
    response = client.post(
        "/v1/generate",
        json={"prompt": "   "},
        headers=HEADERS,
    )

    assert response.status_code == 422


def test_rejects_too_long_code(client):
    response = client.post(
        "/v1/explain",
        json={"code": "x" * 20_001},
        headers=HEADERS,
    )

    assert response.status_code == 422


def test_rejects_unknown_fields(client):
    response = client.post(
        "/v1/explain",
        json={"code": "print('hi')", "unknown": "value"},
        headers=HEADERS,
    )

    assert response.status_code == 422


def test_fix_includes_error_message(client, fake_llm):
    response = client.post(
        "/v1/fix",
        json={"code": "print(total)", "error": "NameError: total"},
        headers=HEADERS,
    )

    assert response.status_code == 200
    assert "NameError: total" in fake_llm.calls[0][1]["content"]


def test_provider_error_is_mapped(client):
    failing = FakeLLMClient(error=LLMError("The AI provider timed out", 504))
    app.dependency_overrides[get_llm_client] = lambda: failing

    response = client.post(
        "/v1/generate",
        json={"prompt": "write a hello world"},
        headers=HEADERS,
    )

    assert response.status_code == 504
    assert response.json()["detail"] == "The AI provider timed out"


def test_sliding_window_limiter():
    limiter = SlidingWindowLimiter()

    assert limiter.check("client", limit=2) == (True, 0.0)
    assert limiter.check("client", limit=2) == (True, 0.0)
    allowed, retry_after = limiter.check("client", limit=2)

    assert allowed is False
    assert retry_after > 0
    assert limiter.check("other", limit=1) == (True, 0.0)
