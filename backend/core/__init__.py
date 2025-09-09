"""Responses словарь  ошибок, LoginManager, Pydantic схемы и параметры"""

from .deps import AuthForm, AuthorizedUser, PaginationQuery
from .errors import (
    ErrorResponsesDict,
)
from .models import (
    User,
    Wish,
    friend_request_already_sent,
    friend_request_yourself,
    user_already_existed,
    user_no_friend_or_request,
    user_not_found,
    wish_not_found,
)
from .schemas import (
    UserCreate,
    UserFriends,
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
    "User",
    "UserFriends",
    "UserSchema",
    "UserSchemaPublic",
    "Wish",
    "WishSchema",
    "WishSchemaPublic",
    "friend_request_yourself",
    "login_manager",
]
