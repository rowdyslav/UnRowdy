"""Параметры, ошибки, модели, схемы и UserManager"""

from .auth import login_manager
from .deps import AuthForm, AuthorizedUser, PaginationQuery, ServiceQuery, UserQuery
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
    BearerToken,
    FriendType,
    ServiceCreate,
    ServiceFind,
    ServiceRead,
    ServiceUpdate,
    UserCreate,
    UserFind,
    UserRead,
    UserUpdate,
)

__all__ = [
    "AuthForm",
    "AuthorizedUser",
    "BearerToken",
    "ErrorResponsesDict",
    "FriendType",
    "PaginationQuery",
    "Service",
    "ServiceCategory",
    "ServiceCreate",
    "ServiceFind",
    "ServiceQuery",
    "ServiceRead",
    "ServiceUpdate",
    "User",
    "UserCreate",
    "UserFind",
    "UserQuery",
    "UserRead",
    "UserUpdate",
    "already_friend_or_request",
    "friend_request_yourself",
    "login_manager",
    "service_category_not_found",
    "service_not_found",
    "user_already_existed",
    "user_no_friend_or_request",
    "user_not_found",
]
