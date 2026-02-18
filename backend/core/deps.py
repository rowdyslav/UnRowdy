from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm

from .auth import login_manager
from .models import User
from .schemas import Pagination, ServiceFind, UserFind

AuthForm = Annotated[OAuth2PasswordRequestForm, Depends()]

AuthorizedUser = Annotated[User, Depends(login_manager)]
OptionalAuthorizedUser = Annotated[User | None, Depends(login_manager.optional)]

PaginationQuery = Annotated[Pagination, Depends()]
UserQuery = Annotated[UserFind, Depends()]
ServiceQuery = Annotated[ServiceFind, Depends()]
