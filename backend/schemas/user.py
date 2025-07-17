from __future__ import annotations

from typing import TYPE_CHECKING

from fastapi import HTTPException
from passlib.context import CryptContext
from pydantic import EmailStr
from tortoise import Model
from tortoise.contrib.pydantic import PydanticModel, pydantic_model_creator
from tortoise.fields import CharField, DatetimeField, IntField, ReverseRelation

user_not_found = HTTPException(404, "Пользователь не найден!")
user_already_existed = HTTPException(409, "Пользователь уже существует!")


pwd_ctx = CryptContext(schemes=["argon2", "bcrypt"])


class User(Model):

    id = IntField(primary_key=True)
    username = CharField(max_length=20)
    email: EmailStr = CharField(max_length=255, unique=True)  # type: ignore
    password_hash = CharField(max_length=128, null=True)
    created_at = DatetimeField(auto_now_add=True)
    modified_at = DatetimeField(auto_now=True)

    if TYPE_CHECKING:
        from schemas import Wish

        wishes: ReverseRelation[Wish]

    class Meta:
        table = "users"

    class PydanticMeta:
        exclude = ["password_hash"]

    async def hash_password(self, plain_password: str):
        self.password_hash = pwd_ctx.hash(plain_password)
        await self.save()

    async def verify_password(self, password: str) -> bool:
        valid, new_hash = pwd_ctx.verify_and_update(password, self.password_hash)
        if new_hash is not None:
            self.password_hash = new_hash
            await self.save()
        return valid


if TYPE_CHECKING:

    class UserSchema(User, PydanticModel):  # type:ignore[misc]
        pass

    class UserSchemaIn(User, PydanticModel):  # type:ignore[misc]
        pass

else:
    from icecream import ic
    ic('user')
    UserSchema = pydantic_model_creator(User, name="User",)
    UserSchemaIn = pydantic_model_creator(User, name="UserIn", exclude_readonly=True)
