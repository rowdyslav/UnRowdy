# Repository Guidelines

## Project Structure & Module Organization

- `backend/`: FastAPI service with Beanie models and MongoDB access.
  - Entry point: `backend/main.py`
  - Models/schemas: `backend/core/models.py`, `backend/core/schemas.py`
  - Routers: `backend/routers/*.py`
- `frontend/`: React web app (Vite + Tailwind).
  - Source: `frontend/src`
  - Shared API client: `frontend/src/shared/api`
- `tma/`: Telegram Mini App (React + Vite + Tailwind).
  - Source: `tma/src`
  - Shared API client: `tma/src/share/api`

No dedicated tests directory was found in this repo.

## Build, Test, and Development Commands

- `docker-compose up --build`: run MongoDB, backend, and web frontend together.
- `cd backend && uv sync`: install backend dependencies.
- `cd backend && uv run fastapi dev --host 0.0.0.0 --port 8000`: start API server.
- `cd frontend && npm install && npm run dev`: start web frontend locally.
- `cd tma && npm install && npm run dev`: start TMA locally (default port 5180).
- `cd frontend && npm run lint`: ESLint for web frontend.
- `cd tma && npm run lint`: ESLint for TMA.

## Coding Style & Naming Conventions

- Python: follow Ruff formatting where used in the backend.
- TypeScript/React: follow ESLint configs in `frontend/eslint.config.js` and `tma/eslint.config.js`.
- Naming: route handlers grouped in `routers/`; React feature slices under `src/entities`, `src/features`, `src/pages`.
- Indentation: 2 spaces in JS/TS, 4 spaces in Python.

## Testing Guidelines

No test framework or test commands are defined. If tests are added, keep them close
to modules (e.g., `src/entities/.../__tests__`) or in a top-level `tests/` folder,
and document how to run them here.

## Commit & Pull Request Guidelines

Recent commit messages are short and inconsistent (e.g., "s", "..", "add searchInput").
No explicit convention is evident. Prefer clear, imperative messages:
- `add service filters`
- `fix auth token refresh`

PRs should include:
- A short description of changes and rationale.
- Linked issue or context if available.
- UI changes: before/after screenshots or GIFs.

## Security & Configuration Tips

- Backend secrets and DB config live in `backend/.env`.
- API base URLs are currently hardcoded in:
  - `frontend/src/shared/api/axios.ts`
  - `tma/src/share/api/axios.ts`
  Prefer a `VITE_API_URL` env var for deployments.
