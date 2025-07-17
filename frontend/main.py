from asyncio import run

from flet import (
    AppBar,
    ControlEvent,
    CrossAxisAlignment,
    Page,
    RouteChangeEvent,
    ScrollMode,
    Text,
    TextThemeStyle,
    View,
    ViewPopEvent,
    app_async,
)

from controls import me

SCREENS = {"/": me}


async def app(p: Page):
    views = p.views

    async def change_route(_: RouteChangeEvent | ControlEvent):
        route = p.route
        get_controls = SCREENS.get(route, me)
        view = View(
            route,
            await get_controls(),
            spacing=25,
            appbar=AppBar(
                title=Text("RowdyWish", theme_style=TextThemeStyle.DISPLAY_LARGE),
                center_title=True,
            ),
            horizontal_alignment=CrossAxisAlignment.CENTER,
            scroll=ScrollMode.ALWAYS,
        )
        views.clear()
        views.append(view)
        p.update()

    async def pop_view(_: ViewPopEvent):
        if len(views) > 1:
            views.pop()
            p.go(views[-1].route or "/")

    p.on_connect = change_route
    p.on_route_change = change_route
    p.on_view_pop = pop_view

    p.go(p.route)


if __name__ == "__main__":
    run(app_async(app))
