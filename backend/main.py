from fastapi import FastAPI

from db import lifespan
from routers import all_routers

app = FastAPI(lifespan=lifespan)
app.include_router(all_routers)
