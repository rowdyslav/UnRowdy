from typing import Annotated, Literal

from beanie import Indexed, PydanticObjectId
from fastapi import Query
from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import BaseModel, Field, NonNegativeInt


class Pagination(BaseModel):
    """Параметры запроса для пагинации"""

    limit: Annotated[NonNegativeInt, Query(ge=0)] = 10
    skip: Annotated[NonNegativeInt, Query(ge=0)] = 0


class SharedUser(BaseModel):
    """Базовые поля User"""

    username: Annotated[str, Field(max_length=20), Indexed(unique=True)]


class SharedServiceCategory(BaseModel):
    """Базовые поля ServiceCategory"""

    name: Annotated[str, Indexed(unique=True)]


class SharedService(BaseModel):
    """Базовые поля Service"""

    name: Annotated[str, Field(max_length=20)]
    description: str | None = None
    price: int | None = None
    image_b64: str | None = None


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

    id: PydanticObjectId
    user: UserRead


class ServiceCreate(SharedService):
    """Поля Service для создания"""

    category_id: PydanticObjectId
