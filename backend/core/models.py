from typing import Annotated

from beanie import BackLink, Document, Link
from fastapi import HTTPException
from fastapi_users.db import BeanieBaseUser
from pydantic import Field

from .schemas import SharedUser, SharedWish, UserFriends

user_not_found = HTTPException(404, "Пользователь не найден!")

user_already_existed = HTTPException(409, "Пользователь уже существует!")
friend_request_yourself = HTTPException(
    409, "Нельзя отправить запрос в друзья самому себе"
)
friend_request_already_sent = HTTPException(
    409, "Запрос в друзья уже отправлен этому пользователю"
)
user_no_friend_or_request = HTTPException(
    409,
    "Этот пользователь не является вашим другом и"
    " у вас/него нет запроса в друзья от него/вас",
)


wish_not_found = HTTPException(404, "Желание не найдено!")


class User(SharedUser, BeanieBaseUser, Document):
    """Модель пользователя"""

    wishes: list[Link["Wish"]] = []
    friends: UserFriends = UserFriends()

    class Settings(BeanieBaseUser.Settings):
        name = "users"


class Wish(SharedWish, Document):
    """Модель желания пользователя"""

    user: Annotated[
        BackLink[User], Field(json_schema_extra={"original_field": "wishes"})
    ]

    class Settings:
        name = "wishes"
