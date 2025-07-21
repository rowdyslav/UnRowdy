"""Все роутеры в all_routers роутере"""

from fastapi import APIRouter

from .auth import router as auth_router
from .users import router as users_router
from .wishes import router as wishes_router

all_routers = APIRouter()
for router in [auth_router, users_router, wishes_router]:
    all_routers.include_router(router)
