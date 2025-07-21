from flet import (
    Colors,
    Column,
    Control,
    FontWeight,
    Image,
    ImageFit,
    MainAxisAlignment,
    SelectionArea,
    Text,
)


class Wish(SelectionArea):
    """Желание из API"""

    def __init__(
        self,
        name: str,
        image_b64: str | None = None,
        price: str | None = None,
        *,
        width: int = 444,
        height: int = 444,
    ) -> None:
        controls: list[Control] = []

        if image_b64 is not None:
            controls.append(
                Image(
                    src_base64=image_b64,
                    fit=ImageFit.CONTAIN,
                    width=width,
                    height=height,
                )
            )

        controls.append(Text(name, weight=FontWeight.BOLD, size=14, selectable=True))

        if price is not None:
            controls.append(
                Text(
                    price,
                    size=12,
                    color=Colors.GREEN,
                )
            )

        super().__init__(
            Column(
                controls,
                spacing=4,
                tight=True,
                wrap=True,
                alignment=MainAxisAlignment.START,
            ),
        )
