from typing import Literal, Optional

from aiohttp import ClientSession


async def fetch(
    method: Literal["get", "post"],
    url: str,
    *,
    form: Optional[dict] = None,
    json: Optional[dict] = None,
    token: Optional[str] = None,
) -> dict:
    async with ClientSession("http://api:8000") as session:
        async with session.request(
            method,
            url,
            json=json,
            data=form,
            headers={"Authorization": token} if token is not None else {},
        ) as response:
            return await response.json()


async def post_auth_register(username, email, password) -> str:
    return (
        await fetch(
            "post",
            "/auth/register",
            form=dict(actually_username=username, username=email, password=password),
        )
    )["access_token"]


async def post_auth_login(email, password) -> str:
    return (
        await fetch(
            "post",
            "/auth/login",
            form=dict(username=email, password=password),
        )
    )["access_token"]


async def get_wishes_me(token):
    return await fetch("get", "/wishes/me", token=token)


async def post_wishes_me(token):
    return await fetch("post", "/wishes/me", token=token)
