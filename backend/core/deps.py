from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from models.user import User

from .schemas import Pagination
from .user_manager import fastapi_users

AuthForm = Annotated[OAuth2PasswordRequestForm, Depends()]
AuthorizedUser = Annotated[User, Depends(fastapi_users.current_user())]
PaginationQuery = Annotated[Pagination, Depends()]
