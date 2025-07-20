from flet import (
    Button,
    FilePicker,
    FilePickerFileType,
    FilePickerResultEvent,
    FilePickerUploadEvent,
    FilePickerUploadFile,
    Icons,
    Row,
    SnackBar,
    Text,
)


class ExtendedFilePicker(Row):
    """Универсальный виджет для выбора и загрузки файлов через FilePicker с кнопкой."""

    def __init__(
        self,
        button_text: str = "Выбрать файл",
        no_file_label: str = "Файл не выбран",
        *,
        file_type: FilePickerFileType = FilePickerFileType.ANY,
        allow_multiple: bool = False,
        allowed_extensions: list[str] | None = None,
    ) -> None:
        self.file_type = file_type
        self.allow_multiple = allow_multiple
        self.allowed_extensions = allowed_extensions

        self.file_names: list[str] = []
        self.uploaded_paths: list[str] = []

        self._text = Text(no_file_label)
        self._button = Button(
            button_text, icon=Icons.UPLOAD_FILE, on_click=lambda _: self.pick_file()
        )

        self._picker = FilePicker(
            on_result=self._on_result,
            on_upload=self._on_upload,
        )

        super().__init__(controls=[self._button, self._text], tight=True, wrap=True)

    @property
    def last_uploaded_path(self) -> str | None:
        return self.uploaded_paths[-1] if self.uploaded_paths else None

    def pick_file(self) -> None:
        p = self.page
        po = p.overlay
        if self._picker not in po:
            po.append(self._picker)
        p.update()
        self._picker.pick_files(
            file_type=self.file_type,
            allow_multiple=self.allow_multiple,
            allowed_extensions=self.allowed_extensions,
        )

    def _on_result(self, e: FilePickerResultEvent) -> None:
        if (files := e.files) is not None:
            self.file_names = [f.name for f in files]
            upload_files = [
                FilePickerUploadFile(f.name, e.page.get_upload_url(f.name, 60))
                for f in files
            ]
            self._picker.upload(upload_files)
            self._text.value = ", ".join(self.file_names)
            self._text.update()

    def _on_upload(self, e: FilePickerUploadEvent) -> None:
        path = f"uploads/{e.file_name}"
        self.uploaded_paths.append(path)
        self.page.open(SnackBar(Text(f"Файл загружен как {path}")))
        self.page.update()
        if self.on_uploaded:
            self.on_uploaded(self)

    # def reset(self) -> None:
    #     self.file_names = []
    #     self.uploaded_paths = []
    #     self._text.value = "Файл не выбран"
    #     self._text.update()
