from by_api import get_users_me_friends, get_users_me_wishes
from flet import Dropdown, IconButton, Icons, Page, Row, SnackBar, Text
from widgets import AddWishPopupForm, Wish


async def me(p: Page) -> tuple[Text, Row, IconButton] | None:
    token = p.session.get("access_token")
    if token is None:
        p.open(SnackBar(Text("Вы не авторизованы. Пожалуйста, войдите")))
        p.go("/")
        return None

    text = Dropdown("Ваши желания", options=await get_users_me_friends(token))
    row = Row([], tight=True, wrap=True)

    async def set_wishes() -> None:
        wishes = await get_users_me_wishes(token)

        row.controls = [Wish(**wish) for wish in wishes]
        p.update()

    await set_wishes()

    button = IconButton(
        Icons.ADD,
        on_click=lambda _: p.open(AddWishPopupForm(on_submit=set_wishes)),
    )

    return text, row, button
