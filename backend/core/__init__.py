"""Responses словарь  ошибок, LoginManager, Pydantic схемы и параметры"""

from .errors import (
    ErrorResponsesDict,
)
from .login_manager import AuthorizedUserDep, login_manager
from .schemas import (
    PaginationQueryDep,
    UserFriendRequests,
    UserSchema,
    UserSchemaPublic,
    WishSchema,
    WishSchemaPublic,
)

__all__ = [
    "AuthorizedUserDep",
    "ErrorResponsesDict",
    "PaginationQueryDep",
    "UserFriendRequests",
    "UserSchema",
    "UserSchemaPublic",
    "WishSchema",
    "WishSchemaPublic",
    "login_manager",
]
