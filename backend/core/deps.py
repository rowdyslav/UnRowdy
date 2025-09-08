from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm

from .models import User
from .schemas import Pagination
from .user_manager import FASTAPI_USERS

AuthForm = Annotated[OAuth2PasswordRequestForm, Depends()]
AuthorizedUser = Annotated[User, Depends(FASTAPI_USERS.current_user())]
PaginationQuery = Annotated[Pagination, Depends()]
