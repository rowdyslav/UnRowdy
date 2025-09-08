"""Responses словарь  ошибок, LoginManager, Pydantic схемы и параметры"""

from core.schemas import UserCreate, UserRead, UserUpdate

from .deps import AuthForm, AuthorizedUser, PaginationQuery
from .errors import (
    ErrorResponsesDict,
)
from .schemas import (
    UserCreate,
    UserFriendRequests,
    UserRead,
    UserUpdate,
)
from .user_manager import auth_backend, fastapi_users

__all__ = [
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
    "auth_backend",
    "fastapi_users",
    "login_manager",
]
