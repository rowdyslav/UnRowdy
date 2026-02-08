from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from beanie import PydanticObjectId, init_beanie
from fastapi import FastAPI
from pymongo import AsyncMongoClient

from core import Service, ServiceCategory, TgUser, User
from env import MONGO_DATABASE_NAME, MONGO_URL

client = AsyncMongoClient(MONGO_URL, uuidRepresentation="standard")
db = client[MONGO_DATABASE_NAME]

SERVICE_CATEGORIES_NAMES = {
    "IT": ("Веб-разработка", "Мобильная разработка"),
    "Дизайн": ("Графический дизайн", "UX/UI дизайн"),
    "Маркетинг": ("SMM", "Контекстная реклама"),
    "Музыка": ("Написание песен", "Звукорежиссура"),
}


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    await init_beanie(
        database=db, document_models=[User, Service, ServiceCategory, TgUser]
    )

    all_names = {
        name
        for names_row in [(k, *v) for k, v in SERVICE_CATEGORIES_NAMES.items()]
        for name in names_row
    }
    existing_names = {sc.name for sc in await ServiceCategory.find_all().to_list()}

    if all_names == existing_names:
        yield

    categories = [ServiceCategory(name=n) for n in SERVICE_CATEGORIES_NAMES]
    ids = (await ServiceCategory.insert_many(categories)).inserted_ids
    for i in range(len(ids)):
        categories[i].id = PydanticObjectId(ids[i])

    subcategories = [
        ServiceCategory(name=subname, parent=parent)
        for subnames, parent in zip(
            SERVICE_CATEGORIES_NAMES.values(), categories, strict=False
        )
        for subname in subnames
    ]
    await ServiceCategory.insert_many(subcategories)

    yield
