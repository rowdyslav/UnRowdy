from fastapi import APIRouter

from core import AUTH_BACKEND, FASTAPI_USERS, UserCreate, UserRead

router = APIRouter(prefix="/auth", tags=["Auth"])
router.include_router(FASTAPI_USERS.get_auth_router(AUTH_BACKEND), prefix="")
router.include_router(
    FASTAPI_USERS.get_register_router(UserRead, UserCreate), prefix=""
)
router.include_router(FASTAPI_USERS.get_reset_password_router(), prefix="")
router.include_router(FASTAPI_USERS.get_verify_router(UserRead), prefix="")
