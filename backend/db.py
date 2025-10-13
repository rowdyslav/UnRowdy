from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from beanie import PydanticObjectId, init_beanie
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from core import Service, ServiceCategory, User
from env import MONGO_DATABASE_NAME, MONGO_URL

client = AsyncIOMotorClient(MONGO_URL, uuidRepresentation="standard")
db = client[MONGO_DATABASE_NAME]


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    await init_beanie(database=db, document_models=[User, Service, ServiceCategory])
    if await ServiceCategory.count() > 0:
        yield
    categories = [
        ServiceCategory(name=n)
        for n in [
            "IT",
            "Дизайн",
            "Маркетинг",
            "Музыка",
        ]
    ]
    insert_results = await ServiceCategory.insert_many(categories)
    for i in range(len(insert_results.inserted_ids)):
        categories[i].id = PydanticObjectId(insert_results.inserted_ids[i])
    subcategories = []
    for nn, p in zip(
        [
            ("Веб-разработка", "Мобильная разработка"),
            ("Графический дизайн", "UX/UI дизайн"),
            ("SMM", "Контекстная реклама"),
            ("Написание песен", "Звукорежиссура"),
        ],
        categories,
        strict=False,
    ):
        subcategories.append(ServiceCategory(name=nn[0], parent=p))
        subcategories.append(ServiceCategory(name=nn[1], parent=p))
    await ServiceCategory.insert_many(subcategories)
    yield
