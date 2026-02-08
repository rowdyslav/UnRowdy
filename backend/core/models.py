from beanie import BackLink, Document, Link, PydanticObjectId
from passlib.context import CryptContext
from pydantic import Field

from .schemas import (
    FriendType,
    SharedService,
    SharedServiceCategory,
    SharedTgUser,
    SharedUser,
)

pwd_ctx = CryptContext(schemes=["argon2", "bcrypt"])


class User(SharedUser, Document):
    """Модель пользователя"""

    hashed_password: str
    services: list[Link["Service"]] = []
    tg: Link["TgUser"] | None = None
    friends_ids: dict[FriendType, list[PydanticObjectId]] = {
        "active": [],
        "sent": [],
        "received": [],
    }

    class Settings:
        name = "users"

    async def hash_password(self, plain_password: str) -> None:
        self.hashed_password = pwd_ctx.hash(plain_password)
        await self.save()

    async def verify_password(self, password: str) -> bool:
        valid, new_hash = pwd_ctx.verify_and_update(password, self.hashed_password)
        if new_hash is not None:
            self.hashed_password = new_hash
            await self.save()
        return valid


class ServiceCategory(SharedServiceCategory, Document):
    """Модель категории услуги"""

    parent: Link["ServiceCategory"] | None = None

    class Settings:
        name = "service_categories"


class TgUser(SharedTgUser, Document):
    """Модель Telegram-профиля"""

    class Settings:
        name = "tgusers"


class Service(SharedService, Document):
    """Модель услуги пользователя"""

    user: BackLink[User] = Field(json_schema_extra={"original_field": "services"})
    category: Link[ServiceCategory]

    class Settings:
        name = "services"
