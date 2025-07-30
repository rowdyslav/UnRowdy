from .client import APIClient


async def post_auth_register(username: str, email: str, password: str) -> str:
    async with APIClient() as api:
        payload = await api(
            "POST",
            "/auth/register",
            form={
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
            form={"username": email, "password": password},
        )
    return payload["access_token"]


async def get_users_me_wishes(token: str) -> list[dict]:
    async with APIClient(token) as api:
        return await api("GET", "/users/me/wishes/")


async def get_users_me_friends(token: str) -> list[dict]:
    async with APIClient(token) as api:
        return await api("GET", "/users/me/friends")


async def post_users_me_wishes(
    token: str, name: str, price: str, image_b64: str
) -> list[dict]:
    async with APIClient(token) as api:
        return await api(
            "POST",
            "/users/me/wishes",
            body={"name": name, "price": price, "image_b64": image_b64},
        )
