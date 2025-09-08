from typing import Annotated

from beanie import DecimalAnnotation, PydanticObjectId
from fastapi import Query
from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import BaseModel, Field, NonNegativeInt


class Pagination(BaseModel):
    """Параметры запроса для пагинации"""

    limit: Annotated[NonNegativeInt, Query(ge=0)] = 10
    offset: Annotated[NonNegativeInt, Query(ge=0)] = 0


class SharedUser(BaseModel):
    username: Annotated[str, Field(max_length=20)]


class SharedWish(BaseModel):
    name: Annotated[str, Field(max_length=20)]
    price: DecimalAnnotation | None
    image_b64: str | None


class UserFriendRequests(BaseModel):
    """Запросы в друзья пользователя"""

    sent: list[PydanticObjectId] = []
    received: list[PydanticObjectId] = []


class UserRead(SharedUser, BaseUser[PydanticObjectId]):
    pass


class UserCreate(SharedUser, BaseUserCreate):
    pass


class UserUpdate(SharedUser, BaseUserUpdate):
    pass


class WishCreate(SharedWish): ...
