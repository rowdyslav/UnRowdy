from typing import TYPE_CHECKING

from tortoise.contrib.pydantic import pydantic_model_creator

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
    from icecream import ic


    ic('pydantic')
    UserSchema = pydantic_model_creator(User, name="User",)
    UserSchemaIn = pydantic_model_creator(User, name="UserIn", exclude_readonly=True)

    WishSchema = pydantic_model_creator(Wish, name="Wish")
    WishSchemaIn = pydantic_model_creator(Wish, name="WishIn")
