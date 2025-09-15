"""Параметры, ошибки, модели, схемы и UserManager"""

from .deps import AuthForm, AuthorizedUser, PaginationQuery
from .errors.http import (
    already_friend_or_request,
    friend_request_yourself,
    user_already_existed,
    user_no_friend_or_request,
    user_not_found,
    wish_not_found,
)
from .errors.utils import ErrorResponsesDict
from .models import User, UserFriends, Wish
from .schemas import (
    UserCreate,
    UserRead,
    UserUpdate,
    WishCreate,
    WishRead,
)
from .user_manager import AUTH_BACKEND, FASTAPI_USERS

__all__ = [
    "AUTH_BACKEND",
    "FASTAPI_USERS",
    "AuthForm",
    "AuthorizedUser",
    "ErrorResponsesDict",
    "PaginationQuery",
    "User",
    "UserCreate",
    "UserFriends",
    "UserRead",
    "UserUpdate",
    "Wish",
    "WishCreate",
    "WishRead",
    "already_friend_or_request",
    "friend_request_yourself",
    "user_already_existed",
    "user_no_friend_or_request",
    "user_not_found",
    "wish_not_found",
]
