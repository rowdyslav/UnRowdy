from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from functools import partial

from env import (
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
)
from fastapi import FastAPI
from icecream import ic
from tortoise import Tortoise
from tortoise.contrib.fastapi import RegisterTortoise

ORM_CONFIG = {
    "connections": {"default": f"postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:{POSTGRES_PORT}/{POSTGRES_DB}"},
    "apps": {
        "unrowdy": {
            "models": ["models", "aerich.models"],
            "default_connection": "default",
        },
    },
}

register_orm = partial(RegisterTortoise, config=ORM_CONFIG)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    async with register_orm(app):
        ic("База данных Postgres подключена через TortoiseORM!")
        from routers import all_routers

        app.include_router(all_routers)
        yield
        await Tortoise.close_connections()
