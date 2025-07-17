from typing import TYPE_CHECKING

from tortoise.contrib.pydantic import PydanticModel, pydantic_model_creator

from models.user import User
from models.wish import Wish

if TYPE_CHECKING:

    class UserSchema(User, PydanticModel):  # type:ignore[misc]
        pass

    class UserSchemaIn(User, PydanticModel):  # type:ignore[misc]
        pass

    class WishSchema(Wish, PydanticModel):  # type:ignore[misc]
        pass

    class WishSchemaIn(Wish, PydanticModel):  # type:ignore[misc]
        pass

else:
    UserSchema = pydantic_model_creator(User, name="UserSchema",)
    UserSchemaIn = pydantic_model_creator(User, name="UserSchemaIn", exclude_readonly=True)
    WishSchema = pydantic_model_creator(Wish, name="WishSchema")
    WishSchemaIn = pydantic_model_creator(Wish, name="WishSchemaIn", exclude_readonly=True)
