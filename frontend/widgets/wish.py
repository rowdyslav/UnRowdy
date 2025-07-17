from typing import Optional

from flet import Column, Image, ImageFit, SelectionArea, Text


class Wish(SelectionArea):
    def __init__(
        self, name: str, image_url: Optional[str] = None, price: Optional[str] = None
    ):
        super().__init__(
            Column(
                (
                    [
                        Image(
                            image_url,
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
