FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1

ENV UV_LINK_MODE=copy

RUN --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev

COPY . /app
RUN uv sync --locked --no-dev

ENV PATH="/app/.venv/bin:$PATH"

ENTRYPOINT []

EXPOSE 80

CMD ["fastapi", "dev", "--host", "0.0.0.0", "--port", "80"]
