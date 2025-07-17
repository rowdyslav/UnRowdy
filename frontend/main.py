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
    app,
)

from controls import index, me

SCREENS = {"/": index, "/me": me}


async def main(p: Page):
    views = p.views

    async def change_route(_: RouteChangeEvent | ControlEvent):
        route = p.route
        get_controls = SCREENS.get(route, me)
        view = View(
            route,
            await get_controls(p),
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

app = app(main, export_asgi_app=True)