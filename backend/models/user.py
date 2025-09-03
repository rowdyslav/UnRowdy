from typing import TYPE_CHECKING, Self

from fastapi import HTTPException
from passlib.context import CryptContext
from pydantic import EmailStr
from tortoise.fields import (
    CharField,
    JSONField,
    ManyToManyField,
    ManyToManyRelation,
    ReverseRelation,
)

from .utils import TortoiseBase

user_not_found = HTTPException(404, "Пользователь не найден!")

user_already_existed = HTTPException(409, "Пользователь уже существует!")
user_friend_request_already_sent = HTTPException(
    409, "Запрос в друзья уже отправлен этому пользователю"
)

pwd_ctx = CryptContext(schemes=["argon2", "bcrypt"])


class User(TortoiseBase):
    """Модель пользователя"""

    username: str = CharField(max_length=20)
    email: EmailStr = CharField(max_length=255, unique=True)
    password_hash: str = CharField(max_length=128, null=True)

    friends: ManyToManyRelation[Self] = ManyToManyField(
        "unrowdy.User", related_name="also_friends"
    )
    also_friends: ManyToManyRelation[Self]

    if TYPE_CHECKING:
        from core import UserFriendRequests

        from models import Wish

        friend_requests: JSONField[UserFriendRequests] = JSONField(field_type=UserFriendRequests)

        wishes: ReverseRelation[Wish]

    class Meta:
        table = "users"

    class PydanticMeta:
        exclude = ["password_hash"]

    async def hash_password(self, plain_password: str) -> None:
        self.password_hash = pwd_ctx.hash(plain_password)
        await self.save()

    async def verify_password(self, password: str) -> bool:
        valid, new_hash = pwd_ctx.verify_and_update(password, self.password_hash)
        if new_hash is not None:
            self.password_hash = new_hash
            await self.save()
        return valid
