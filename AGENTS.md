# AGENTS.md

Guidance for Codex when working in this repo.

## Repo Map

backend/   FastAPI + Beanie + MongoDB
frontend/  React web app (Vite + Tailwind + React Query + Zustand)
tma/       Telegram Mini App (React + Vite + Tailwind)

## Key Commands

Docker (backend + web frontend + db):
- `docker-compose up --build`

Backend local:
- `cd backend`
- `uv sync`
- `uv run fastapi dev --host 0.0.0.0 --port 8000`

Frontend local:
- `cd frontend`
- `npm install`
- `npm run dev`

TMA local:
- `cd tma`
- `npm install`
- `npm run dev` (default port 5180)

## Conventions

Backend:
- Entry point: `backend/main.py`
- DB init/seed: `backend/db.py`
- Models: `backend/core/models.py`
- Schemas: `backend/core/schemas.py`
- Routers: `backend/routers/*.py`
- Config: `backend/env.py` (reads `backend/.env`)

Frontend/TMA:
- Vite + TS with `@` alias to `src`
- API clients in `src/shared/api` (frontend) and `src/share/api` (tma)
- React Query hooks under `src/entities/*/api` (frontend)

## Gotchas

- API base URL is hardcoded in:
  - `frontend/src/shared/api/axios.ts`
  - `tma/src/share/api/axios.ts`
- CORS allowlist is in `backend/main.py`
- Services endpoint expects `category_name` query param
- fastapi-login secret is currently hardcoded in `backend/core/auth.py`

## When Editing

- Favor DRY and KISS; consolidate repeated query hooks or shared API logic.
- Keep endpoints, schemas, and clients in sync when adding/changing API routes.
- Update README if ports/env/commands change.
