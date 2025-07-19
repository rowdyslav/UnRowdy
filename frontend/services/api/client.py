from typing import Any, Literal, Optional, Self

from aiohttp import ClientSession


class APIError(Exception):
    """Бросается, если API вернуло ошибку (статус ≥ 400)."""

    def __init__(self, status: int, body: Any):
        super().__init__(f"{status}: {body}")
        self.status = status
        self.body = body


class APIClient:
    def __init__(self, token: Optional[str] = None):
        self.token = token

        self.base_url = "http://api:8000"
        self._session: Optional[ClientSession] = None

    async def __aenter__(self) -> Self:
        self._session = ClientSession()
        return self

    async def __aexit__(self, *_):
        if self._session:
            await self._session.close()

    async def fetch(
        self,
        method: Literal["GET", "POST", "PUT", "PATCH", "DELETE"],
        path: str,
        *,
        params: Optional[dict[str, Any]] = None,
        json: Optional[dict[str, Any]] = None,
        data: Optional[dict[str, Any]] = None,
    ) -> Any:
        if not self._session:
            raise RuntimeError(
                "Session is not started. Use async with APIClient(...) as client:"
            )

        url = f"{self.base_url}{path}"
        headers = {}
        if self.token:
            headers["Authorization"] = self.token

        async with self._session.request(
            method, url, params=params, json=json, data=data, headers=headers
        ) as resp:
            payload = await resp.json()
            if resp.status >= 400:
                raise APIError(resp.status, payload)
            return payload
