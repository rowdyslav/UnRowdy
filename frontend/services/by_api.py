from typing import Literal, Optional

from aiohttp import ClientSession


async def fetch( method: Literal['get', 'post'], url: str, json: Optional[dict] = None):
    async with ClientSession('http://api:8000') as session:
        async with session.request(method, url, json=json) as response:
            return await response.json()

async def get_wishes():
    return await fetch('get', '/wishes')

async def post_wishes_me():
    return await fetch('post', '/wishes/me')
