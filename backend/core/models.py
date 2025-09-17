from typing import Annotated, Literal

from beanie import BackLink, Document, Link, PydanticObjectId
from fastapi_users.db import BeanieBaseUser
from pydantic import Field

from .schemas import SharedUser, SharedWish


class User(SharedUser, BeanieBaseUser, Document):
    """Модель пользователя"""

    wishes: list[Link["Wish"]] = []
    friends_ids: dict[Literal["active", "sent", "received"], list[PydanticObjectId]] = {
        "active": [],
        "sent": [],
        "received": [],
    }
    # friends_ids: UserFriends = UserFriends()

    class Settings(BeanieBaseUser.Settings):
        name = "users"


class Wish(SharedWish, Document):
    """Модель желания пользователя"""

    user: Annotated[
        BackLink[User], Field(json_schema_extra={"original_field": "wishes"})
    ]

    class Settings:
        name = "wishes"
