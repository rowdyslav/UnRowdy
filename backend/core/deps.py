from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm

from .login_manager import login_manager
from .schemas import Pagination, UserSchema

AuthForm = Annotated[OAuth2PasswordRequestForm, Depends()]
AuthorizedUser = Annotated[UserSchema, Depends(login_manager)]
PaginationQuery = Annotated[Pagination, Depends()]
