from typing import TYPE_CHECKING

from models.user import User
from models.wish import Wish
from tortoise.contrib.pydantic import PydanticModel, pydantic_model_creator

if TYPE_CHECKING:

    class UserSchema(User, PydanticModel):
        """Схема модели User."""

    class UserSchemaPublic(User, PydanticModel):
        """Публичная схема модели User."""

    class WishSchema(Wish, PydanticModel):
        """Схема модели Wish."""

    class WishSchemaPublic(Wish, PydanticModel):
        """Публичная схема модели Wish."""

else:
    UserSchema = pydantic_model_creator(User, name="UserSchema")
    UserSchemaPublic = pydantic_model_creator(
        User, name="UserSchemaPublic", exclude_readonly=True
    )
    WishSchema = pydantic_model_creator(Wish, name="WishSchema")
    WishSchemaPublic = pydantic_model_creator(
        Wish, name="WishSchemaPublic", exclude_readonly=True
    )
