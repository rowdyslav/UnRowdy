"""Словарь Responses ошибок, LoginManager, Pydantic схемы и параметры"""

from .errors import (
    ErrorResponsesDict,
)
from .login_manager import UserDep, login_manager
from .schemas import (
    QueryParamsDep,
    UserSchema,
    UserSchemaPublic,
    WishSchema,
    WishSchemaPublic,
)

__all__ = [
    "ErrorResponsesDict",
    "QueryParamsDep",
    "UserDep",
    "UserSchema",
    "UserSchemaPublic",
    "WishSchema",
    "WishSchemaPublic",
    "login_manager",
]
