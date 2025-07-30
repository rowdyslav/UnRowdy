from base64 import b64encode
from collections.abc import Awaitable, Callable

from anyio import open_file
from by_api import APIError, post_auth_login, post_auth_register, post_users_me_wishes
from flet import (
    AlertDialog,
    AutofillHint,
    Column,
    ControlEvent,
    CrossAxisAlignment,
    FilePickerFileType,
    KeyboardType,
    SnackBar,
    Text,
    TextButton,
    TextField,
)

from .utils import ExtendedFilePicker


class AuthForm(Column):
    """Форма для входа и регистрации"""

    def __init__(self) -> None:
        self.is_reg = False

        self.username_field = TextField(
            keyboard_type=KeyboardType.TEXT,
            label=Text("Юзернейм"),
            autofill_hints=[AutofillHint.NEW_USERNAME],
            filled=False,
            width=300,
            visible=False,
        )
        self.email_field = TextField(
            keyboard_type=KeyboardType.EMAIL,
            label=Text("Почта"),
            autofill_hints=[AutofillHint.EMAIL],
            filled=False,
            width=300,
        )
        self.password_field = TextField(
            keyboard_type=KeyboardType.TEXT,
            label=Text("Пароль"),
            password=True,
            filled=False,
            width=300,
        )
        self.toggle_button = TextButton(
            "Нет аккаунта? Зарегистрироваться", on_click=self.toggle_form
        )
        self.submit_button = TextButton("Войти", on_click=self.submit)

        self.setup_form()

        super().__init__(
            controls=(
                self.toggle_button,
                self.username_field,
                self.email_field,
                self.password_field,
                self.submit_button,
            ),
            horizontal_alignment=CrossAxisAlignment.CENTER,
            tight=True,
            wrap=True,
        )

    def setup_form(self) -> None:
        self.username_field.visible = self.is_reg
        self.password_field.autofill_hints = (
            [AutofillHint.NEW_PASSWORD] if self.is_reg else [AutofillHint.PASSWORD]
        )
        self.submit_button.text = "Зарегистрироваться" if self.is_reg else "Войти"
        self.toggle_button.text = (
            "Есть аккаунт? Войти" if self.is_reg else "Нет аккаунта? Зарегистрироваться"
        )

    async def toggle_form(self, _: ControlEvent) -> None:
        self.is_reg = not self.is_reg
        self.setup_form()
        self.update()

    async def submit(self, e: ControlEvent) -> None:
        p = e.page
        if not self.email_field.value:
            p.open(SnackBar(Text("Введите почту")))
            p.update()
            return
        if not self.password_field.value:
            p.open(SnackBar(Text("Введите пароль")))
            p.update()
            return
        try:
            if self.is_reg:
                if not self.username_field.value:
                    p.open(SnackBar(Text("Введите юзернейм")))
                    p.update()
                    return
                token = await post_auth_register(
                    self.username_field.value,
                    self.email_field.value,
                    self.password_field.value,
                )
            else:
                token = await post_auth_login(
                    self.email_field.value, self.password_field.value
                )
        except APIError as exc:
            p.open(SnackBar(Text(f"Ошибка авторизации: {exc}")))
            p.update()
            return
        p.session.set("access_token", f"Bearer {token}")
        p.go("/me")


class AddWishPopupForm(AlertDialog):
    """Всплывающая форма для добавления желания"""

    def __init__(self, on_submit: Callable[[], Awaitable[None]]) -> None:
        self.on_submit = on_submit

        self.name_field = TextField(
            keyboard_type=KeyboardType.TEXT,
            autofocus=True,
            label=Text("Название"),
            filled=False,
        )
        self.price_field = TextField(
            keyboard_type=KeyboardType.NUMBER,
            autofocus=True,
            label=Text("Цена"),
            autofill_hints=[AutofillHint.TRANSACTION_AMOUNT],
            filled=False,
        )

        self.image_picker = ExtendedFilePicker(
            button_text="Выбрать картинку",
            file_type=FilePickerFileType.IMAGE,
        )

        super().__init__(
            modal=False,
            title=Text("Добавить желание"),
            content=Column(
                [
                    self.name_field,
                    self.price_field,
                    self.image_picker,
                ],
                tight=True,
                wrap=True,
            ),
            actions=[TextButton("OK", on_click=self._on_form_button_click)],
        )

    async def _on_form_button_click(self, e: ControlEvent) -> None:
        p = e.page
        if (
            not self.name_field.value
            or not self.price_field.value
            or self.image_picker.last_uploaded_path is None
        ):
            p.open(SnackBar(Text("Заполните все поля и дождитесь загрузки файла")))
            p.update()
            return

        async with await open_file(self.image_picker.last_uploaded_path, "rb") as f:
            image_b64 = b64encode(await f.read()).decode()

        token = p.session.get("access_token")
        try:
            await post_users_me_wishes(
                token,
                self.name_field.value,
                self.price_field.value,
                image_b64,
            )
        except APIError as exc:
            p.open(SnackBar(Text(f"Ошибка добавления желания: {exc}")))
            p.update()
            return
        await self.on_submit()
        p.close(self)
        p.open(SnackBar(Text("Желание добавлено")))
