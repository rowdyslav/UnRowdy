from controls import index, me
from flet import (
    AppBar,
    AppBarTheme,
    AppView,
    CrossAxisAlignment,
    DismissDirection,
    Page,
    RouteChangeEvent,
    ScrollMode,
    SnackBarTheme,
    Text,
    TextThemeStyle,
    Theme,
    View,
    ViewPopEvent,
    app,
)

SCREENS = {"/": index, "/me": me}


async def main(p: Page) -> None:
    p.title = "UnRowdy"
    p.theme = Theme(
        use_material3=True,
        appbar_theme=AppBarTheme(),
        snackbar_theme=SnackBarTheme(dismiss_direction=DismissDirection.VERTICAL),
    )

    views = p.views
    async def change_route(e: RouteChangeEvent) -> None:
        route = e.route
        get_controls = SCREENS.get(route, index)
        view = View(
            route,
            await get_controls(p),
            spacing=25,
            appbar=AppBar(
                automatically_imply_leading=True,
                title=Text(p.title, theme_style=TextThemeStyle.DISPLAY_LARGE),
                center_title=True,
                toolbar_height=88,
            ),
            horizontal_alignment=CrossAxisAlignment.CENTER,
            scroll=ScrollMode.ALWAYS,
        )
        views.clear()
        views.append(view)
        p.update()

    async def pop_view(_: ViewPopEvent) -> None:
        if len(views) > 1:
            views.pop()
            p.go(views[-1].route or "/")

    p.on_route_change = change_route
    p.on_view_pop = pop_view

    p.go(p.route)


app = app(main, view=AppView.WEB_BROWSER, upload_dir="uploads", export_asgi_app=True)
