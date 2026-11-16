"""FastAPI dependencies shared by the routers."""

from collections.abc import AsyncIterator
from typing import Annotated

from fastapi import Depends

from .config import Settings, get_settings
from .services.llm import LLMClient

SettingsDep = Annotated[Settings, Depends(get_settings)]


async def get_llm_client(settings: SettingsDep) -> AsyncIterator[LLMClient]:
    client = LLMClient(settings)
    try:
        yield client
    finally:
        await client.aclose()


LLMClientDep = Annotated[LLMClient, Depends(get_llm_client)]
