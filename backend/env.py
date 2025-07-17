from environs import Env

env = Env()
env.read_env()

POSTGRES_USER = env.str("POSTGRES_USER")
POSTGRES_PASSWORD = env.str("POSTGRES_PASSWORD")
POSTGRES_PORT = env.int("POSTGRES_PORT")
POSTGRES_DB = env.str("POSTGRES_DB")
