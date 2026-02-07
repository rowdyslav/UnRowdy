# UnRowdy

UnRowdy is a full-stack app with a FastAPI + MongoDB backend, a React web
frontend, and a React-based Telegram Mini App (TMA).

## Repo Layout

```
backend/   # FastAPI + Beanie + MongoDB
frontend/  # React + Vite web app
tma/       # Telegram Mini App (React + Vite)
```

## Stack

- Backend: FastAPI, Beanie, MongoDB (pymongo), fastapi-login, passlib
- Frontend: React 19, Vite (rolldown), Tailwind CSS, React Query, Zustand
- TMA: React 19, Vite, Tailwind CSS, @telegram-apps/sdk, @egjs/react-flicking

## Development

### Docker (backend + web frontend + db)

```
docker-compose up --build
```

Services:
- Web frontend: http://localhost (port 80)
- Backend API: http://127.0.0.1:8000
- MongoDB: localhost:27017

### Backend (local)

```
cd backend
uv sync
uv run fastapi dev --host 0.0.0.0 --port 8000
```

### Frontend (local)

```
cd frontend
npm install
npm run dev
```

### Telegram Mini App (local)

```
cd tma
npm install
npm run dev
```

Default TMA dev port: 5180

## Configuration

Backend environment variables live in `backend/.env`:
- `MONGO_URL`
- `MONGO_DATABASE_NAME`
- `MONGO_INITDB_ROOT_USERNAME`
- `MONGO_INITDB_ROOT_PASSWORD`

API base URL is currently set in code:
- `frontend/src/shared/api/axios.ts`
- `tma/src/share/api/axios.ts`

Consider moving the base URL to a Vite env var (e.g. `VITE_API_URL`) for
deployment flexibility.

## Linting

```
# backend
ruff check
ruff format

# frontend
npm run lint

# tma
npm run lint
```
