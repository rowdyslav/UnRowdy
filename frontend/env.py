from environs import Env

env = Env()
env.read_env()

API_URL = env.str("API_URL")
