from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from beanie import PydanticObjectId, init_beanie
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from core import Service, ServiceCategory, User
from env import MONGO_DATABASE_NAME, MONGO_URL

client = AsyncIOMotorClient(MONGO_URL, uuidRepresentation="standard")
db = client[MONGO_DATABASE_NAME]

SERVICE_CATEGORIES_NAMES = {
    "IT": ("Веб-разработка", "Мобильная разработка"),
    "Дизайн": ("Графический дизайн", "UX/UI дизайн"),
    "Маркетинг": ("SMM", "Контекстная реклама"),
    "Музыка": ("Написание песен", "Звукорежиссура"),
}


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    await init_beanie(database=db, document_models=[User, Service, ServiceCategory])

    a = [[k, *v] for k, v in SERVICE_CATEGORIES_NAMES]
    if set(sum(a)) == {sc.name for sc in await ServiceCategory.find_all()}:
        yield

    categories = [ServiceCategory(name=n) for n in SERVICE_CATEGORIES_NAMES]
    ids = (await ServiceCategory.insert_many(categories)).inserted_ids
    for i in range(len(ids)):
        categories[i].id = PydanticObjectId(ids[i])

    subcategories = [
        ServiceCategory(name=n, parent=p)
        for subnames, p in zip(
            SERVICE_CATEGORIES_NAMES.values(),
            categories,
            strict=False,
        )
        for n in subnames
    ]
    await ServiceCategory.insert_many(subcategories)
    yield
