from fastapi_login import LoginManager
from pydantic import EmailStr

from .models import User

login_manager = LoginManager("secret", "/auth/login")


@login_manager.user_loader()
async def load_user(email: EmailStr) -> User:
    return await User.find_one(User.email == email)
