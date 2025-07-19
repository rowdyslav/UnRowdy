from fastapi_login import LoginManager
from models import User
from pydantic import EmailStr

from core.schemas import UserSchema

login_manager = LoginManager("secret", "/auth/login")


@login_manager.user_loader()
async def load_user(email: EmailStr) -> UserSchema:
    return await UserSchema.from_queryset_single(User.get(email=email))
