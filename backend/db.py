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

DATABASE_URL = (
    f"postgres://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:{POSTGRES_PORT}/{POSTGRES_DB}"
)


ORM_CONFIG = {
    "connections": {"default": DATABASE_URL},
    "apps": {
        "unrowdy": {
            "models": ["models", "aerich.models"],
            "default_connection": "default",
        },
    },
}

register_orm = partial(RegisterTortoise, config=ORM_CONFIG, generate_schemas=False)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    async with register_orm(app):
        ic("База данных Postgres подключена через TortoiseORM!")
        from routers import all_routers

        app.include_router(all_routers)
        yield
        await Tortoise.close_connections()
