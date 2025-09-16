from typing import Annotated

from beanie import BackLink, Document, Link, PydanticObjectId
from fastapi_users.db import BeanieBaseUser
from pydantic import BaseModel, Field

from .schemas import SharedUser, SharedWish, UserFriends


class User(SharedUser, BeanieBaseUser, Document):
    """Модель пользователя"""

    wishes: list[Link["Wish"]] = []
    friends_ids: UserFriends = UserFriends()

    class Settings(BeanieBaseUser.Settings):
        name = "users"



class Wish(SharedWish, Document):
    """Модель желания пользователя"""

    user: Annotated[
        BackLink[User], Field(json_schema_extra={"original_field": "wishes"})
    ]

    class Settings:
        name = "wishes"
