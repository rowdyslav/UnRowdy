from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from beanie import init_beanie
from core import User, Wish
from env import MONGO_DATABASE_NAME, MONGO_URL
from fastapi import FastAPI
from pymongo import AsyncMongoClient

client = AsyncMongoClient(MONGO_URL, connect=True, uuidRepresentation="standard")
db = client[MONGO_DATABASE_NAME]


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    await init_beanie(database=db, document_models=[User, Wish])
    yield
