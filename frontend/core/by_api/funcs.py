from .client import APIClient


async def post_auth_register(username: str, email: str, password: str) -> str:
    async with APIClient() as api:
        payload = await api(
            "POST",
            "/auth/register",
            data={
                "actually_username": username,
                "username": email,
                "password": password,
            },
        )
    return payload["access_token"]


async def post_auth_login(email: str, password: str) -> str:
    async with APIClient() as api:
        payload = await api(
            "POST",
            "/auth/login",
            data={"username": email, "password": password},
        )
    return payload["access_token"]


async def get_wishes_me(token: str) -> list[dict]:
    async with APIClient(token) as api:
        return await api("GET", "/wishes/me")


async def post_wishes_me(
    token: str, name: str, price: str, image_b64: str
) -> list[dict]:
    async with APIClient(token) as api:
        return await api(
            "POST",
            "/wishes/me",
            json={"name": name, "price": price, "image_b64": image_b64},
        )
