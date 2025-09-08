from typing import Annotated, Self

from beanie import BackLink, DecimalAnnotation, Document, Link
from core.schemas import UserFriendRequests
from fastapi import HTTPException
from fastapi_users.db import BeanieBaseUser
from pydantic import EmailStr, Field

user_not_found = HTTPException(404, "Пользователь не найден!")

user_already_existed = HTTPException(409, "Пользователь уже существует!")
user_friend_request_already_sent = HTTPException(
    409, "Запрос в друзья уже отправлен этому пользователю"
)

wish_not_found = HTTPException(404, "Желание не найдено!")


class User(BeanieBaseUser, Document):
    """Модель пользователя"""

    username: Annotated[str, Field(max_length=20)]
    email: Annotated[EmailStr, Field(max_length=255)]

    friends: list[Link[Self]]
    friend_requests: UserFriendRequests

    wishes: list[BackLink["Wish"]]

    class Settings(BeanieBaseUser.Settings):
        name = "users"


class Wish(Document):
    """Модель желания пользователя"""

    user: Link[User]
    name: Annotated[str, Field(max_length=20)]
    price: Annotated[float, DecimalAnnotation] | None
    image_b64: str | None

    class Settings:
        name = "wishes"
