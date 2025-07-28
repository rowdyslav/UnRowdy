from typing import TYPE_CHECKING, Annotated

from fastapi import Query
from models import User, Wish
from pydantic import BaseModel, NonNegativeInt
from tortoise.contrib.pydantic import PydanticModel, pydantic_model_creator


class UserFriendRequests(BaseModel):
    """Запросы в друзья пользователя"""

    sent: list[int] = []
    received: list[int] = []


class PaginationQuery(BaseModel):
    """Параметры запроса для пагинации"""

    limit: Annotated[NonNegativeInt, Query(ge=0)] = 10
    offset: Annotated[NonNegativeInt, Query(ge=0)] = 0


if TYPE_CHECKING:

    class UserSchema(User, PydanticModel):
        """Схема модели User"""

    class UserSchemaPublic(User, PydanticModel):
        """Публичная схема модели User"""

    class WishSchema(Wish, PydanticModel):
        """Схема модели Wish"""

    class WishSchemaPublic(Wish, PydanticModel):
        """Публичная схема модели Wish"""

else:
    UserSchema = pydantic_model_creator(User, name="UserSchema")
    UserSchemaPublic = pydantic_model_creator(
        User, name="UserSchemaPublic", exclude_readonly=True
    )
    WishSchema = pydantic_model_creator(Wish, name="WishSchema")
    WishSchemaPublic = pydantic_model_creator(
        Wish, name="WishSchemaPublic", exclude_readonly=True
    )
