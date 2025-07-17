from contextlib import asynccontextmanager
from functools import partial
from typing import AsyncIterator

from fastapi import FastAPI
from icecream import ic
from tortoise import Tortoise
from tortoise.contrib.fastapi import RegisterTortoise

from env import (
    POSTGRES_DB,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_USER,
)

DATABASE_URL = (
    f"postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:{POSTGRES_PORT}/{POSTGRES_DB}"
)


ORM_CONFIG = {
    "connections": {"default": DATABASE_URL},
    "apps": {
        "models": {
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
