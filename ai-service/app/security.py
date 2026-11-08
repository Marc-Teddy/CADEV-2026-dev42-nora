"""Authentication between the backend and the AI service."""

import secrets
from typing import Annotated

from fastapi import Header, HTTPException, status

from .deps import SettingsDep


def require_internal_key(
    settings: SettingsDep,
    x_internal_key: Annotated[str | None, Header(alias="X-Internal-Key")] = None,
) -> None:
    """Reject requests that do not carry the shared internal API key.

    When ``INTERNAL_API_KEY`` is empty the check is disabled, which is only
    meant for local development.
    """

    if not settings.internal_api_key:
        return

    if not x_internal_key or not secrets.compare_digest(
        x_internal_key, settings.internal_api_key
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing internal API key",
            headers={"WWW-Authenticate": "X-Internal-Key"},
        )
