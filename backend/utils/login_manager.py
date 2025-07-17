from __future__ import annotations

from fastapi_login import LoginManager
from pydantic import EmailStr

from schemas import User

login_manager = LoginManager("secret", "/auth/login")


@login_manager.user_loader()
async def load_user(email: EmailStr):
    return await User.get(email=email)
