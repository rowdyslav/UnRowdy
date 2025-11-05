from typing import Annotated

from fastapi import APIRouter, Form, status
from fastapi_login.exceptions import InvalidCredentialsException

from core import (
    AuthForm,
    BearerToken,
    ErrorResponsesDict,
    User,
    login_manager,
    user_already_existed,
)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    responses=ErrorResponsesDict("conflict"),
)
async def register(
    actually_username: Annotated[str, Form()], data: AuthForm
) -> BearerToken:
    email = data.username
    password = data.password

    user_existed = (
        await User.find_one(User.email == email) is not None
        or await User.find_one(User.username == actually_username) is not None
    )
    if user_existed:
        raise user_already_existed

    new_user = await User(email=email, username=actually_username).insert()
    await new_user.hash_password(password)

    return BearerToken(
        access_token=login_manager.create_access_token(data={"sub": email})
    )


@router.post(
    "/login",
    responses=ErrorResponsesDict("unauthorized"),
)
async def login(data: AuthForm) -> BearerToken:
    email = data.username
    password = data.password

    user = await User.find_one(User.email == email)
    if user is None or not await user.verify_password(password):
        raise InvalidCredentialsException

    return BearerToken(
        access_token=login_manager.create_access_token(data={"sub": email})
    )
