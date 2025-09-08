from typing import Annotated

from beanie import PydanticObjectId
from fastapi import Query
from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import BaseModel, NonNegativeInt


class UserRead(BaseUser[PydanticObjectId]):
    pass


class UserCreate(BaseUserCreate):
    pass


class UserUpdate(BaseUserUpdate):
    pass


class UserFriendRequests(BaseModel):
    """Запросы в друзья пользователя"""

    sent: list[PydanticObjectId] = []
    received: list[PydanticObjectId] = []


class Pagination(BaseModel):
    """Параметры запроса для пагинации"""

    limit: Annotated[NonNegativeInt, Query(ge=0)] = 10
    offset: Annotated[NonNegativeInt, Query(ge=0)] = 0
