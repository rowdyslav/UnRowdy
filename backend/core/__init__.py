"""Responses словарь  ошибок, LoginManager, Pydantic схемы и параметры"""

from .deps import AuthForm, AuthorizedUser, PaginationQuery
from .errors import (
    ErrorResponsesDict,
)
from .login_manager import login_manager
from .schemas import (
    UserFriendRequests,
    UserSchema,
    UserSchemaPublic,
    WishSchema,
    WishSchemaPublic,
)

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
    "login_manager",
]
