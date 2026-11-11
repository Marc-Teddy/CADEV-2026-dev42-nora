"""FastAPI application entry point for the NORA AI service."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from . import __version__
from .config import get_settings
from .deps import SettingsDep
from .routers import assistant
from .schemas import HealthResponse
from .services.llm import LLMError

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    if not settings.internal_api_key:
        logger.warning(
            "INTERNAL_API_KEY is not set: the AI service is running without "
            "authentication. Do not use this configuration in production."
        )
    if not settings.llm_api_key:
        logger.warning("LLM_API_KEY is not set: AI requests will fail.")
    yield


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.app_name,
        version=__version__,
        lifespan=lifespan,
    )

    app.include_router(assistant.router)

    @app.exception_handler(LLMError)
    async def _llm_error_handler(_, exc: LLMError) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.message},
        )

    @app.get("/health", response_model=HealthResponse, tags=["ops"])
    async def health(settings: SettingsDep) -> HealthResponse:
        return HealthResponse(
            service=settings.app_name,
            version=__version__,
            environment=settings.environment,
            model=settings.llm_model,
        )

    return app


app = create_app()
