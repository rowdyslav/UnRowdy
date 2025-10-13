"""Все роутеры добавленные в роутер all_routers"""

from fastapi import APIRouter

from .auth import router as auth_router
from .service_categories import router as service_categories_router
from .services import router as services_router
from .users import router as users_router

all_routers = APIRouter()
for router in [auth_router, users_router, services_router, service_categories_router]:
    all_routers.include_router(router)
