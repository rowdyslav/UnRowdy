from typing import TYPE_CHECKING

from tortoise.contrib.pydantic import PydanticModel, pydantic_model_creator

from models.user import User
from models.wish import Wish

if TYPE_CHECKING:

    class UserSchema(User, PydanticModel):  # type:ignore[misc]
        pass

    class UserSchemaPublic(User, PydanticModel):  # type:ignore[misc]
        pass

    class WishSchema(Wish, PydanticModel):  # type:ignore[misc]
        pass

    class WishSchemaPublic(Wish, PydanticModel):  # type:ignore[misc]
        pass

else:
    UserSchema = pydantic_model_creator(User, name="UserSchema",)
    UserSchemaPublic = pydantic_model_creator(User, name="UserSchemaPublic", exclude_readonly=True)
    WishSchema = pydantic_model_creator(Wish, name="WishSchema")
    WishSchemaPublic = pydantic_model_creator(Wish, name="WishSchemaPublic", exclude_readonly=True)
