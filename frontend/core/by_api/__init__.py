"""Функции для обращения к API через APIClient"""

from .client import APIError
from .funcs import get_wishes_me, post_auth_login, post_auth_register, post_wishes_me

__all__ = [
    "APIError",
    "get_wishes_me",
    "post_auth_login",
    "post_auth_register",
    "post_wishes_me",
]
