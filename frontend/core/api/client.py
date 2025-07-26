from typing import Any, Literal, Self

from aiohttp import ClientSession
from env import API_URL


class APIError(Exception):
    """Бросается, если API вернуло ошибку (статус ≥ 400)"""

    def __init__(self, status: int, body: dict) -> None:
        super().__init__(f"{status}{body}")
        self.status = status
        self.body = body


class APIClient:
    """Апи клиент"""

    def __init__(self, token: str | None = None) -> None:
        self.token = token

        self._session: ClientSession | None = None

    async def __aenter__(self) -> Self:
        self._session = ClientSession()
        return self

    async def __aexit__(self, *_: object) -> None:
        if self._session:
            await self._session.close()

    async def fetch(
        self,
        method: Literal["GET", "POST", "PUT", "PATCH", "DELETE"],
        path: str,
        *,
        params: dict[str, Any] | None = None,
        json: dict[str, Any] | None = None,
        data: dict[str, Any] | None = None,
    ) -> dict:
        """Запрос к API через APIClient"""
        if not self._session:
            raise RuntimeError

        url = f"{API_URL}{path}"
        headers = {}
        if self.token:
            headers["Authorization"] = self.token

        async with self._session.request(
            method, url, params=params, json=json, data=data, headers=headers
        ) as response:
            payload = await response.json()
            if (code := response.status) >= 400:
                raise APIError(code, payload)
            return payload
