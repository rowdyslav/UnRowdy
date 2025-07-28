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

    async def __call__(
        self,
        method: Literal["GET", "POST", "PUT", "PATCH", "DELETE"],
        path: str,
        *,
        body: dict[str, Any] | None = None,
        form: dict[str, Any] | None = None,
        query: dict[str, Any] | None = None,
    ) -> dict:
        """Запрос к API через APIClient"""
        if not self._session:
            raise RuntimeError

        async with self._session.request(
            method,
            f"{API_URL}{path}",
            json=body,
            data=form,
            params=query,
            headers={"Authorization": self.token} if self.token else {},
        ) as response:
            payload = await response.json()
            if (code := response.status) >= 400:
                raise APIError(code, payload)
            return payload
