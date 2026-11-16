"""Simple in-memory sliding window rate limiter."""

from collections import defaultdict, deque
from math import ceil
from threading import Lock
from time import monotonic

from fastapi import HTTPException, Request, status

from .deps import SettingsDep


class SlidingWindowLimiter:
    """Per-key sliding window limiter, suitable for a single process.

    A shared store (Redis) will be required once the service runs with
    several replicas.
    """

    def __init__(self) -> None:
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    def check(
        self, key: str, limit: int, window_seconds: float = 60.0
    ) -> tuple[bool, float]:
        """Record a hit and return ``(allowed, retry_after_seconds)``."""

        now = monotonic()
        with self._lock:
            hits = self._hits[key]
            while hits and now - hits[0] >= window_seconds:
                hits.popleft()

            if len(hits) >= limit:
                return False, window_seconds - (now - hits[0])

            hits.append(now)
            return True, 0.0

    def reset(self) -> None:
        with self._lock:
            self._hits.clear()


limiter = SlidingWindowLimiter()


def enforce_rate_limit(request: Request, settings: SettingsDep) -> None:
    client = request.client.host if request.client else "unknown"
    allowed, retry_after = limiter.check(client, settings.rate_limit_per_minute)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests",
            headers={"Retry-After": str(max(1, ceil(retry_after)))},
        )
