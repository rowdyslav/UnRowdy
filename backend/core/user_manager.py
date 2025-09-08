from collections.abc import AsyncIterator
from typing import Annotated

from beanie import PydanticObjectId
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import BeanieUserDatabase, ObjectIDIDMixin
from icecream import ic

from .models import User

SECRET = "SECRET"


class UserManager(ObjectIDIDMixin, BaseUserManager[User, PydanticObjectId]):
    """Основной класс FastAPI Users"""

    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, _: Request | None = None) -> None:
        ic(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, _: Request | None = None
    ) -> None:
        ic(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, _: Request | None = None
    ) -> None:
        ic(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_db() -> AsyncIterator[BeanieUserDatabase]:
    yield BeanieUserDatabase(User)


async def get_user_manager(
    user_db: Annotated[BeanieUserDatabase, Depends(get_user_db)],
) -> AsyncIterator[UserManager]:
    yield UserManager(user_db)


AUTH_BACKEND = AuthenticationBackend(
    name="jwt",
    transport=BearerTransport(tokenUrl="auth/login"),
    get_strategy=lambda: JWTStrategy(secret=SECRET, lifetime_seconds=3600),
)
FASTAPI_USERS = FastAPIUsers[User, PydanticObjectId](get_user_manager, [AUTH_BACKEND])
