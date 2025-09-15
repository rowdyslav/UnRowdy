from typing import Annotated, Self

from beanie import BackLink, Document, Link
from fastapi_users.db import BeanieBaseUser
from pydantic import Field

from .schemas import SharedUser, SharedWish, UserFriends


class User(SharedUser, BeanieBaseUser, Document):
    """Модель пользователя"""

    wishes: list[Link["Wish"]] = []
    friends: UserFriends[Self] = UserFriends[Self]()

    class Settings(BeanieBaseUser.Settings):
        name = "users"


class Wish(SharedWish, Document):
    """Модель желания пользователя"""

    user: Annotated[
        BackLink[User], Field(json_schema_extra={"original_field": "wishes"})
    ]

    class Settings:
        name = "wishes"
