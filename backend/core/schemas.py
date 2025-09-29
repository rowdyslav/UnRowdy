from typing import Annotated, Literal

from beanie import PydanticObjectId
from fastapi import Query
from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import BaseModel, Field, NonNegativeInt


class Pagination(BaseModel):
    """Параметры запроса для пагинации"""

    limit: Annotated[NonNegativeInt, Query(ge=0)] = 10
    skip: Annotated[NonNegativeInt, Query(ge=0)] = 0


class SharedUser(BaseModel):
    """Базовые поля User"""

    username: Annotated[str, Field(max_length=20)]


class SharedService(BaseModel):
    """Базовые поля Service"""

    name: Annotated[str, Field(max_length=20)]
    price: int | None
    image_b64: str | None


FriendType = Literal["active", "sent", "received"]


class UserRead(SharedUser, BaseUser[PydanticObjectId]):
    """Поля User для чтения"""


class UserCreate(SharedUser, BaseUserCreate):
    """Поля User для создания"""


class UserUpdate(SharedUser, BaseUserUpdate):
    """Поля User для обновления"""

    username: Annotated[str, Field(max_length=20)] | None


class ServiceRead(SharedService):
    """Поля Service для чтения"""


class ServiceCreate(SharedService):
    """Поля Service для создания"""
