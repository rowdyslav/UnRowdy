from flet import IconButton, Icons, Row, Text
from widgets import Wish


async def me():
    wishes = [
        {
            "name": "Nintendo Switch 2",
            "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUidEyHOsFcNi1r3Zh6EYlEYzVyGekqy5Y6A&s",
            "price": "60000",
        }
    ] * 5

    text = Text("Ваши желания")
    row = Row(
        [Wish(**wish) for wish in wishes],
        wrap=True,
    )
    button = IconButton(Icons.ADD)
    return (text, row, button)
