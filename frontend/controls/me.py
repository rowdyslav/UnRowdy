from flet import IconButton, Icons, Page, Row, SnackBar, Text

from services.api.funcs import get_wishes_me
from widgets import AddWish, Wish


async def me(p: Page) -> tuple[Text, Row, IconButton] | None:
    token = p.session.get("access_token")
    if token is None:
        p.open(SnackBar(Text("Вы не авторизованы. Пожалуйста, войдите")))
        p.go("/")
        return

    text = Text("Ваши желания")
    row = Row([], wrap=True)

    async def load_wishes() -> None:
        wishes = await get_wishes_me(token)
        row.controls = [Wish(**wish) for wish in wishes]
        p.update()

    await load_wishes()

    add_wish_dialog = AddWish(on_submit=load_wishes)

    button = IconButton(
        Icons.ADD,
        on_click=lambda _: p.open(add_wish_dialog),
    )

    return text, row, button
