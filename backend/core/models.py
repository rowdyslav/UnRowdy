from typing import Annotated

from beanie import BackLink, Document, Link
from fastapi_users.db import BeanieBaseUser
from pydantic import BaseModel, Field

from .schemas import SharedUser, SharedWish


class User(SharedUser, BeanieBaseUser, Document):
    """Модель пользователя"""

    wishes: list[Link["Wish"]] = []
    friends: "UserFriends" = {}

    class Settings(BeanieBaseUser.Settings):
        name = "users"


class UserFriends(BaseModel):
    """Запросы в друзья пользователя"""

    active: list[Link[User]] = []
    sent: list[Link[User]] = []
    received: list[Link[User]] = []


class Wish(SharedWish, Document):
    """Модель желания пользователя"""

    user: Annotated[
        BackLink[User], Field(json_schema_extra={"original_field": "wishes"})
    ]

    class Settings:
        name = "wishes"
