"""ORM модели"""

from .user import (
    User,
    Wish,
    user_already_existed,
    user_friend_request_already_sent,
    user_not_found,
    wish_not_found,
)

# from .wish import Wish, wish_not_found

__all__ = [
    "User",
    "Wish",
    "user_already_existed",
    "user_friend_request_already_sent",
    "user_not_found",
    "wish_not_found",
]
