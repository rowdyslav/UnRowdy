"""Модуль индекса"""

from flet import Page
from widgets import AuthForm


async def index(_: Page) -> tuple[AuthForm]:
    """Индекс"""
    return (AuthForm(),)
