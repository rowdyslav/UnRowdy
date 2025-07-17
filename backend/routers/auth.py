from typing import Annotated

from fastapi import APIRouter, Depends, Form, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login.exceptions import InvalidCredentialsException

from models import BearerToken, User, user_already_existed
from core import ErrorResponsesDict, login_manager

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post(
    "/register",
    response_model=BearerToken,
    status_code=status.HTTP_201_CREATED,
    responses=ErrorResponsesDict("conflict"),
)
async def register(
    actually_username: Annotated[str, Form()],
    data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> BearerToken:
    email = data.username
    password = data.password

    user_existed = await User.exists(email=email)
    if user_existed:
        raise user_already_existed

    new_user = await User.create(username=actually_username, email=email)
    await new_user.hash_password(password)

    access_token = login_manager.create_access_token(data={"sub": email})
    return BearerToken(access_token=access_token)


@router.post(
    "/login",
    response_model=BearerToken,
    responses=ErrorResponsesDict("unauthorized"),
)
async def login(data: OAuth2PasswordRequestForm = Depends()) -> BearerToken:
    email = data.username
    password = data.password

    user = await User.get_or_none(email=email)
    if not user or not await user.verify_password(password):
        raise InvalidCredentialsException

    access_token = login_manager.create_access_token(data=dict(sub=email))
    return BearerToken(access_token=access_token)
