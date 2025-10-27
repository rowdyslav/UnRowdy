from typing import Annotated, Literal, get_type_hints

from beanie import Indexed, PydanticObjectId
from fastapi import Query
from fastapi_users.schemas import BaseUser, BaseUserCreate, BaseUserUpdate
from pydantic import BaseModel, Field, NonNegativeInt, create_model

FriendType = Literal["active", "sent", "received"]

optional_model = lambda model: create_model(
    f"{model.__name__}",
    **{k: (v | None, None) for k, v in get_type_hints(model).items()},
)


class Pagination(BaseModel):
    """Параметры запроса для пагинации"""

    limit: Annotated[NonNegativeInt, Query(ge=0)] = 10
    skip: Annotated[NonNegativeInt, Query(ge=0)] = 0


class SharedUser(BaseModel):
    """Базовые поля User"""

    username: Annotated[str, Field(max_length=20), Indexed(unique=True)]


class UserRead(SharedUser, BaseUser[PydanticObjectId]):
    """User для чтения"""


class UserCreate(SharedUser, BaseUserCreate):
    """User для создания"""


@optional_model
class UserUpdate(SharedUser, BaseUserUpdate):
    """User для обновления"""


@optional_model
class UserFind(SharedUser):
    """User для поиска"""


class SharedServiceCategory(BaseModel):
    """Базовые поля ServiceCategory"""

    name: Annotated[str, Indexed(unique=True)]


class ServiceCategoryRead(SharedServiceCategory):
    """ServiceCategory для чтения"""


class SharedService(BaseModel):
    """Базовые поля Service"""

    name: Annotated[str, Field(max_length=20)]
    description: str | None = None
    price: int | None = None
    image_b64: str | None = None


class ServiceFind(BaseModel):
    """Специальные поля Service для поиска"""

    category_name: str
    keywords: str = ""
    min_price: int = 1
    max_price: int | None = 0x7FFFFFFFFFFFFFFF


class ServiceRead(SharedService):
    """Service для чтения"""

    id: PydanticObjectId
    user: UserRead
    category: ServiceCategoryRead


class ServiceCreate(SharedService):
    """Service для создания"""

    category_id: PydanticObjectId


@optional_model
class ServiceUpdate(SharedService):
    """Service для обновления"""
