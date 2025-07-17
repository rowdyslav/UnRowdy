from typing import Optional

from flet import Column, Image, ImageFit, SelectionArea, Text


class Wish(SelectionArea):
    def __init__(
        self, name: str, image_b64: Optional[str] = None, price: Optional[str] = None
    ):
        super().__init__(
            Column(
                (
                    [
                        Image(
                            src_base64=image_b64,
                            fit=ImageFit.CONTAIN,
                        ),
                        Text(name),
                    ]
                    + [Text(price)]
                    if price is not None
                    else []
                ),
                wrap=True,
            )
        )
