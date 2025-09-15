from ast import TypeVar
from typing import Annotated

from beanie import DecimalAnnotation, Link, PydanticObjectId
from fastapi import Query
from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import BaseModel, Field, NonNegativeInt

MODEL = TypeVar("MODEL")


class Pagination(BaseModel):
    """Параметры запроса для пагинации"""

    limit: Annotated[NonNegativeInt, Query(ge=0)] = 10
    offset: Annotated[NonNegativeInt, Query(ge=0)] = 0


class SharedUser(BaseModel):
    """Базовые поля User"""

    username: Annotated[str, Field(max_length=20)]


class SharedWish(BaseModel):
    """Базовые поля Wish"""

    name: Annotated[str, Field(max_length=20)]
    price: DecimalAnnotation | None
    image_b64: str | None


class UserFriends[MODEL](BaseModel):
    """Запросы в друзья пользователя"""

    active: list[Link[MODEL]] = []
    sent: list[Link[MODEL]] = []
    received: list[Link[MODEL]] = []


class UserRead(SharedUser, BaseUser[PydanticObjectId]):
    """Поля User для чтения"""


class UserCreate(SharedUser, BaseUserCreate):
    """Поля User для создания"""


class UserUpdate(SharedUser, BaseUserUpdate):
    """Поля User для обновления"""


class WishRead(SharedWish):
    """Поля Wish для чтения"""


class WishCreate(SharedWish):
    """Поля Wish для создания"""
