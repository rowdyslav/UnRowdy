from beanie import BackLink, Document, Link, PydanticObjectId
from fastapi_users.db import BeanieBaseUser
from pydantic import Field

from .schemas import FriendType, SharedService, SharedServiceCategory, SharedUser


class User(SharedUser, BeanieBaseUser, Document):
    """Модель пользователя"""

    services: list[Link["Service"]] = []
    friends_ids: dict[FriendType, list[PydanticObjectId]] = {
        "active": [],
        "sent": [],
        "received": [],
    }

    class Settings(BeanieBaseUser.Settings):
        name = "users"


class ServiceCategory(SharedServiceCategory, Document):
    """Модель категории услуги"""

    parent: Link["ServiceCategory"] | None = None

    class Settings:
        name = "service_categories"


class Service(SharedService, Document):
    """Модель услуги пользователя"""

    user: BackLink[User] = Field(json_schema_extra={"original_field": "services"})
    category: Link[ServiceCategory]

    class Settings:
        name = "services"
