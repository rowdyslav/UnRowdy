from environs import Env

env = Env()
env.read_env()

MONGO_URL = env.str("MONGO_URL")
MONGO_DATABASE_NAME = env.str("MONGO_DATABASE_NAME")
