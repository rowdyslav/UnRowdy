from fastapi import FastAPI

from db import lifespan

app = FastAPI(lifespan=lifespan)
