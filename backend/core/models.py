from beanie import Document, Link
from fastapi import HTTPException
from fastapi_users.db import BeanieBaseUser

from .schemas import SharedUser, SharedWish, UserFriendRequests

user_not_found = HTTPException(404, "Пользователь не найден!")

user_already_existed = HTTPException(409, "Пользователь уже существует!")
user_friend_request_already_sent = HTTPException(
    409, "Запрос в друзья уже отправлен этому пользователю"
)


class User(SharedUser, BeanieBaseUser, Document):
    """Модель пользователя"""

    friends: list[Link["User"]] = []
    friend_requests: UserFriendRequests = UserFriendRequests()

    # wishes: list[BackLink["Wish"]]

    class Settings(BeanieBaseUser.Settings):
        name = "users"


wish_not_found = HTTPException(404, "Желание не найдено!")


class Wish(SharedWish, Document):
    """Модель желания пользователя"""

    user: Link[User]

    class Settings:
        name = "wishes"
