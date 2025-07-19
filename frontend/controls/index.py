"""Модуль индекса."""

from core.api.funcs import post_auth_login, post_auth_register
from flet import (
    AutofillHint,
    ControlEvent,
    KeyboardType,
    Page,
    SnackBar,
    Text,
    TextButton,
    TextField,
)


async def index(
    p: Page,
) -> tuple[TextButton, TextField, TextField, TextField, TextButton]:
    """Индекс."""
    is_reg = False

    username_field = TextField(label=Text("Юзернейм"), filled=False, width=300)
    email_field = TextField(
        label=Text("Почта"),
        keyboard_type=KeyboardType.EMAIL,
        autofill_hints=[AutofillHint.EMAIL],
        filled=False,
        width=300,
    )
    password_field = TextField(
        label=Text("Пароль"),
        password=True,
        filled=False,
        width=300,
    )

    async def setup_form() -> None:
        username_field.visible = is_reg
        password_field.autofill_hints = (
            [AutofillHint.NEW_PASSWORD] if is_reg else [AutofillHint.PASSWORD]
        )
        submit_button.text = "Зарегистрироваться" if is_reg else "Войти"
        toggle_button.text = (
            "Есть аккаунт? Войти" if is_reg else "Нет аккаунта? Зарегистрироваться"
        )
        p.update()

    async def toggle_form(_: ControlEvent) -> None:
        nonlocal is_reg
        is_reg = not is_reg
        await setup_form()

    toggle_button = TextButton("Нет аккаунта? Зарегистрироваться", on_click=toggle_form)

    async def submit(_: ControlEvent) -> None:
        if email_field.value is None or email_field.value == "":
            p.open(SnackBar(Text("Введите почту")))
            p.update()
            return
        if password_field.value is None or password_field.value == "":
            p.open(SnackBar(Text("Введите пароль")))
            p.update()
            return
        try:
            if is_reg:
                if username_field.value is None or username_field.value == "":
                    p.open(SnackBar(Text("Введите юзернейм")))
                    p.update()
                    return
                token = await post_auth_register(
                    username_field.value, email_field.value, password_field.value
                )
            else:
                token = await post_auth_login(email_field.value, password_field.value)
            p.session.set("access_token", f"Bearer {token}")
            p.go("/me")
        except Exception as exc:
            p.open(SnackBar(Text(f"Ошибка: {exc}")))
            p.update()

    submit_button = TextButton("Войти", on_click=submit)

    await setup_form()

    return (
        toggle_button,
        username_field,
        email_field,
        password_field,
        submit_button,
    )
