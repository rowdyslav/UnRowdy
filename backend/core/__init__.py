"""Параметры, ошибки, модели, схемы и UserManager"""

from .deps import AuthorizedUser, PaginationQuery, ServiceQuery, UserQuery
from .errors.http import (
    already_friend_or_request,
    friend_request_yourself,
    service_category_not_found,
    service_not_found,
    user_already_existed,
    user_no_friend_or_request,
    user_not_found,
)
from .errors.utils import ErrorResponsesDict
from .models import Service, ServiceCategory, User
from .schemas import (
    FriendType,
    ServiceCreate,
    ServiceFind,
    ServiceRead,
    UserCreate,
    UserFind,
    UserRead,
    UserUpdate,
)
from .user_manager import AUTH_BACKEND, FASTAPI_USERS

__all__ = [
    "AUTH_BACKEND",
    "FASTAPI_USERS",
    "AuthorizedUser",
    "ErrorResponsesDict",
    "FriendType",
    "PaginationQuery",
    "Service",
    "ServiceCategory",
    "ServiceCreate",
    "ServiceFind",
    "ServiceQuery",
    "ServiceRead",
    "User",
    "UserCreate",
    "UserFind",
    "UserQuery",
    "UserRead",
    "UserUpdate",
    "already_friend_or_request",
    "friend_request_yourself",
    "service_category_not_found",
    "service_not_found",
    "user_already_existed",
    "user_no_friend_or_request",
    "user_not_found",
]
