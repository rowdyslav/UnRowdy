from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from beanie import init_beanie
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from core import Service, User
from env import MONGO_DATABASE_NAME, MONGO_URL

client = AsyncIOMotorClient(MONGO_URL, uuidRepresentation="standard")
db = client[MONGO_DATABASE_NAME]


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    await init_beanie(database=db, document_models=[User, Service])
    yield
