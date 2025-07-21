from typing import TYPE_CHECKING, Annotated

from fastapi import Depends, Query
from models.user import User
from models.wish import Wish
from pydantic import BaseModel, NonNegativeInt
from tortoise.contrib.pydantic import PydanticModel, pydantic_model_creator


class QueryParams(BaseModel):
    """Параметры запроса для пагинации"""

    limit: NonNegativeInt = Query(10, ge=0, description="Limit1")
    offset: NonNegativeInt = Query(0, ge=0, description="Offset2")


QueryParamsDep = Annotated[QueryParams, Depends()]


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
