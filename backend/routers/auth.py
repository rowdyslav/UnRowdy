from core import UserCreate, UserRead, AUTH_BACKEND, FASTAPI_USERS
from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["Auth"])
router.include_router(
    FASTAPI_USERS.get_auth_router(AUTH_BACKEND), prefix="", tags=["auth"]
)
router.include_router(
    FASTAPI_USERS.get_register_router(UserRead, UserCreate),
    prefix="",
    tags=["auth"],
)
router.include_router(
    FASTAPI_USERS.get_reset_password_router(),
    prefix="",
    tags=["auth"],
)
router.include_router(
    FASTAPI_USERS.get_verify_router(UserRead),
    prefix="",
    tags=["auth"],
)
