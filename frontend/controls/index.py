from flet import AutofillHint, Column, KeyboardType, Page, Text, TextButton, TextField

from services.by_api import post_auth_login, post_auth_register


async def index(p: Page):
    username = TextField(label=Text("Юзернейм"), autofocus=True, filled=False)
    email = TextField(
        autocorrect=True,
        keyboard_type=KeyboardType.EMAIL,
        label=Text("Почта"),
        filled=False,
        autofill_hints=AutofillHint.EMAIL,
    )
    password = TextField(
        autocorrect=True,
        label=(Text("Пароль")),
        autofill_hints=AutofillHint.NEW_PASSWORD,
        password=True,
    )

    async def click(_):
        data = [
            email.value,
            password.value,
        ]
        if username.value is "":
            func = post_auth_login
        else:
            data.insert(0, username.value)
            func = post_auth_register
        access_token = await func(*data)
        p.session.set("access_token", f"Bearer {access_token}")

    button = TextButton("Войти", on_click=click)
    return (
        Column(
            (username, email, password, button),
            tight=True,
        ),
    )
