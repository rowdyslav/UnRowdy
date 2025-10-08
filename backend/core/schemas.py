from typing import Annotated, Literal, Self, overload

from beanie import PydanticObjectId, Indexed
from fastapi import Query
from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import BaseModel, Field, NonNegativeInt
from typing import Optional
class Pagination(BaseModel):
    """Параметры запроса для пагинации"""

    limit: Annotated[NonNegativeInt, Query(ge=0)] = 10
    skip: Annotated[NonNegativeInt, Query(ge=0)] = 0


class SharedUser(BaseModel):
    """Базовые поля User"""

    username: Annotated[str, Field(max_length=20), Indexed(unique=True)]


class SharedService(BaseModel):
    """Базовые поля Service"""


    name: Annotated[str, Field(max_length=20)]
    description: str | None = None
    price: int | None = None
    image_b64: str | None = None


FriendType = Literal["active", "sent", "received"]


class UserRead(SharedUser, BaseUser[PydanticObjectId]):
    """Поля User для чтения"""

    @classmethod
    @overload
    def from_base(cls, base_obj: SharedUser) -> Self:
        ...

    @classmethod
    @overload
    def from_base(cls, base_obj: list[SharedUser]) -> list[Self]:
        ...

    @classmethod
    def from_base(cls, base_obj: SharedUser | list[SharedUser]) -> list[Self]:
        if isinstance(base_obj, SharedUser):
            return cls(**base_obj.model_dump())
        return [cls.from_base(b) for b in base_obj]


class UserCreate(SharedUser, BaseUserCreate):
    """Поля User для создания"""


class UserUpdate(SharedUser, BaseUserUpdate):
    """Поля User для обновления"""

    username: Annotated[str, Field(max_length=20)] | None


class ServiceRead(SharedService):
    """Поля Service для чтения"""

    id: PydanticObjectId
    user: UserRead

    @classmethod
    @overload
    def from_base(cls, base_obj: SharedService) -> Self:
        ...

    @classmethod
    @overload
    def from_base(cls, base_obj: list[SharedService]) -> list[Self]:
        ...

    @classmethod
    def from_base(cls, base_obj: SharedService | list[SharedService]) -> list[Self]:
        if isinstance(base_obj, SharedService):
            return cls(**base_obj.model_dump())
        return [cls.from_base(b) for b in base_obj]


class ServiceCreate(SharedService):
    """Поля Service для создания"""
