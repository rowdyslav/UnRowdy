from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import lifespan
from routers import all_routers

app = FastAPI(lifespan=lifespan)
app.include_router(all_routers)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:5180",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
