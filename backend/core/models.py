from typing import Annotated, Literal

from beanie import BackLink, Document, Link, PydanticObjectId
from fastapi_users.db import BeanieBaseUser
from pydantic import Field

from .schemas import SharedService, SharedUser


class User(SharedUser, BeanieBaseUser, Document):
    """Модель пользователя"""

    services: list[Link["Service"]] = []
    friends_ids: dict[Literal["active", "sent", "received"], list[PydanticObjectId]] = {
        "active": [],
        "sent": [],
        "received": [],
    }

    class Settings(BeanieBaseUser.Settings):
        name = "users"


class Service(SharedService, Document):
    """Модель услуги пользователя"""

    user: Annotated[
        BackLink[User], Field(json_schema_extra={"original_field": "services"})
    ]

    class Settings:
        name = "services"
