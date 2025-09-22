"""Параметры, ошибки, модели, схемы и UserManager"""

from .deps import AuthForm, AuthorizedUser, PaginationQuery
from .errors.http import (
    already_friend_or_request,
    friend_request_yourself,
    service_not_found,
    user_already_existed,
    user_no_friend_or_request,
    user_not_found,
)
from .errors.utils import ErrorResponsesDict
from .models import Service, User
from .schemas import (
    ServiceCreate,
    ServiceRead,
    UserCreate,
    UserRead,
    UserUpdate,
)
from .user_manager import AUTH_BACKEND, FASTAPI_USERS

__all__ = [
    "AUTH_BACKEND",
    "FASTAPI_USERS",
    "AuthForm",
    "AuthorizedUser",
    "ErrorResponsesDict",
    "PaginationQuery",
    "Service",
    "ServiceCreate",
    "ServiceRead",
    "User",
    "UserCreate",
    "UserRead",
    "UserUpdate",
    "already_friend_or_request",
    "bad_friends_type",
    "friend_request_yourself",
    "service_not_found",
    "user_already_existed",
    "user_no_friend_or_request",
    "user_not_found",
]
