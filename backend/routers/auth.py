from typing import Annotated

from beanie.operators import Set
from fastapi import APIRouter, Form, status
from fastapi_login.exceptions import InvalidCredentialsException

from core import (
    AuthForm,
    BearerToken,
    ErrorResponsesDict,
    OptionalAuthorizedUser,
    TgAuthRequest,
    TgAuthResponse,
    TgUser,
    User,
    login_manager,
    tg_already_bound,
    user_already_existed,
)
from core.schemas import TgUserRead, UserRead

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


@router.post(
    "/tg",
    responses=ErrorResponsesDict("unauthorized", "conflict"),
)
async def tg(
    data: TgAuthRequest,
    me: OptionalAuthorizedUser,
) -> TgAuthResponse:
    update_fields = {TgUser.tgid: data.tgid}
    if "tgusername" in data.model_fields_set:
        update_fields[TgUser.tgusername] = data.tgusername

    await TgUser.find_one(TgUser.tgid == data.tgid).upsert(
        Set(update_fields),
        on_insert=TgUser(tgid=data.tgid, tgusername=data.tgusername),
    )

    tg_user = await TgUser.find_one(TgUser.tgid == data.tgid)
    if tg_user is None:
        raise InvalidCredentialsException

    linked_user = await User.find_one(User.tg.id == tg_user.id)

    if me is not None:
        if linked_user is not None and linked_user.id != me.id:
            raise tg_already_bound
        me.tg = tg_user
        await me.save()
        linked_user = me

    return TgAuthResponse(
        tg=TgUserRead(**tg_user.model_dump()),
        user=UserRead(**linked_user.model_dump()) if linked_user is not None else None,
        access_token=(
            login_manager.create_access_token(data={"sub": linked_user.email})
            if linked_user is not None
            else None
        ),
    )
