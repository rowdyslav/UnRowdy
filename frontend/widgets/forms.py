from base64 import b64encode
from typing import Awaitable, Callable, Optional

from flet import (
    AlertDialog,
    Button,
    Column,
    ControlEvent,
    FilePicker,
    FilePickerFileType,
    FilePickerResultEvent,
    FilePickerUploadEvent,
    FilePickerUploadFile,
    Icons,
    Row,
    SnackBar,
    Text,
    TextButton,
    TextField,
)

from services.api.funcs import post_wishes_me


class AddWish(AlertDialog):
    def __init__(self, on_submit: Callable[[], Awaitable[None]]):
        self.on_submit = on_submit

        self.name_field = TextField(label="Название")
        self.price_field = TextField(label="Цена")
        self.file_text = Text("Файл не выбран")

        self._picker = FilePicker(
            on_result=self.on_result,
            on_upload=self.on_upload,
        )
        self._uploaded_path: Optional[str] = None

        super().__init__(
            True,
            Text("Добавить желание"),
            Column(
                [
                    self.name_field,
                    self.price_field,
                    Row(
                        [
                            Button(
                                "Выбрать картинку",
                                icon=Icons.UPLOAD_FILE,
                                on_click=self.on_file_button_click,
                            ),
                            self.file_text,
                        ]
                    ),
                ],
                tight=True,
                wrap=True,
            ),
            [TextButton("OK", on_click=self.on_form_button_click)],
        )

    async def on_file_button_click(self, _: ControlEvent):
        self.page.overlay.append(self._picker)
        self._picker.pick_files(
            file_type=FilePickerFileType.IMAGE, allow_multiple=False
        )

    def on_result(self, e: FilePickerResultEvent):
        if (f := e.files) is not None:
            file_name = f[-1].name

            self._picker.upload(
                [FilePickerUploadFile(file_name, e.page.get_upload_url(file_name, 60))]
            )

            self.file_text.value = file_name
            self.file_text.update()

    def on_upload(self, e: FilePickerUploadEvent):
        p = e.page

        self._uploaded_path = f"uploads/{e.file_name}"

        p.open(SnackBar(Text(f"Файл загружен как {self._uploaded_path}")))
        p.update()

    async def on_form_button_click(self, e: ControlEvent):
        p = e.page
        if (
            not self.name_field.value
            or not self.price_field.value
            or self._uploaded_path is None
        ):
            p.open(SnackBar(Text("Заполните все поля и дождитесь загрузки файла")))
            p.update()
            return

        with open(self._uploaded_path, "rb") as f:
            image_b64 = b64encode(f.read()).decode()

        token = p.session.get("access_token")
        await post_wishes_me(
            token,
            self.name_field.value,
            self.price_field.value,
            image_b64,
        )

        p.close(self)
        await self.on_submit()
