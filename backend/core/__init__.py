"""Responses словарь  ошибок, LoginManager, Pydantic схемы и параметры"""

from .deps import AuthForm, AuthorizedUser, PaginationQuery
from .errors import (
    ErrorResponsesDict,
)
from .models import (
    User,
    Wish,
    user_already_existed,
    user_friend_request_already_sent,
    user_not_found,
    wish_not_found,
)
from .schemas import (
    UserCreate,
    UserFriendRequests,
    UserRead,
    UserUpdate,
    WishCreate,
)
from .user_manager import AUTH_BACKEND, FASTAPI_USERS

__all__ = [
    "AUTH_BACKEND",
    "FASTAPI_USERS",
    "AuthForm",
    "AuthorizedUser",
    "AuthorizedUserDep",
    "ErrorResponsesDict",
    "PaginationQuery",
    "PaginationQueryDep",
    "UserFriendRequests",
    "UserSchema",
    "UserSchemaPublic",
    "WishSchema",
    "WishSchemaPublic",
    "login_manager",
]
