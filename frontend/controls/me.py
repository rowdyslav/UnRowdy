from core.by_api import get_wishes_me
from flet import IconButton, Icons, Page, Row, SnackBar, Text
from widgets import AddWishPopupForm, Wish


async def me(p: Page) -> tuple[Text, Row, IconButton] | None:
    token = p.session.get("access_token")
    if token is None:
        p.open(SnackBar(Text("Вы не авторизованы. Пожалуйста, войдите")))
        p.go("/")
        return None

    text = Text("Ваши желания")
    row = Row([], tight=True,wrap=True)

    async def set_wishes() -> None:
        wishes = await get_wishes_me(token)
        row.controls = [Wish(**wish) for wish in wishes]
        p.update()

    await set_wishes()

    button = IconButton(
        Icons.ADD,
        on_click=lambda _: p.open(AddWishPopupForm(on_submit=set_wishes)),
    )

    return text, row, button
