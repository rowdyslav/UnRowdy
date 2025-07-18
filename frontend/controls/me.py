from flet import AlertDialog, Column, IconButton, Icons, Page, Row, Text, TextField

from services.by_api import get_wishes_me
from widgets import Wish


async def me(p: Page):
    wishes = await get_wishes_me(p.session.get("access_token"))
    text = Text("Ваши желания")
    row = Row(
        [Wish(**wish) for wish in wishes],
        wrap=True,
    )
    form = AlertDialog(
        title=Text("Добавить желание"),
        content=Column((TextField(), TextField()), tight=True),
        actions=[IconButton(Icons.ABC)],
    )
    button = IconButton(Icons.ADD, on_click=lambda _: p.open(form))
    return (text, row, button)
