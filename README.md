this branch is archive with frontend built with Flet

# UnRowdy Product Overview

UnRowdy is a web application built with a Python-based full-stack architecture. The application appears to be a personal management or wish-tracking system with user authentication and wish management features.

## Key Features

- User authentication and management
- Wish/goal tracking system
- Web-based interface using Flet framework
- RESTful API backend

## Architecture

- **Backend**: FastAPI-based REST API with MongoDB database
- **Frontend**: Flet web application (Python-based UI framework)
- **Database**: MongoDB with Beanie ODM
- **Deployment**: Docker containerized with docker-compose

The application follows a clean separation between frontend and backend services, communicating via HTTP API calls.

---

# Project Structure & Organization

## Root Level

```
├── .env                    # Shared environment variables (database config)
├── docker-compose.yml      # Multi-service container orchestration
├── ruff.toml              # Global linting and formatting configuration
├── backend/               # FastAPI backend service
└── frontend/              # Flet frontend service
```

## Backend Structure (`backend/`)

```
backend/
├── .env                   # Backend-specific environment variables
├── pyproject.toml         # Python project configuration and dependencies
├── main.py               # FastAPI application entry point
├── db.py                 # Database configuration and ODM setup
├── env.py                # Environment variable loading
├── models/               # Beanie ODM data models
│   ├── __init__.py
│   ├── user.py          # User model
│   ├── wish.py          # Wish model
│   └── utils.py         # Model utilities
├── routers/              # FastAPI route handlers
│   ├── __init__.py
│   ├── auth.py          # Authentication endpoints
│   ├── users.py         # User management endpoints
│   └── wishes.py        # Wish management endpoints
└── Dockerfile           # Backend container configuration
```

## Frontend Structure (`frontend/`)

```
frontend/
├── .env                  # Frontend-specific environment variables
├── pyproject.toml        # Python project configuration and dependencies
├── main.py              # Flet application entry point and routing
├── env.py               # Environment variable loading
├── controls/            # Flet UI components/pages
│   ├── __init__.py
│   ├── index.py         # Home page controls
│   └── me.py            # User profile page controls
├── uploads/             # File upload directory
├── storage/             # Application storage
├── widgets/             # Reusable UI components
├── by_api/              # API client modules
└── Dockerfile           # Frontend container configuration
```

## Key Conventions

- **Separation of Concerns**: Clear separation between backend API and frontend UI
- **Module Organization**: Related functionality grouped in dedicated directories
- **Environment Configuration**: Layered .env files (root → service-specific)
- **Docker Integration**: Each service has its own Dockerfile with shared docker-compose
- **API Communication**: Frontend communicates with backend via HTTP API calls
- **File Uploads**: Handled in `frontend/uploads/` directory

## Naming Patterns

- **Models**: Singular nouns (user.py, wish.py)
- **Routers**: Plural nouns matching model names (users.py, wishes.py)
- **Controls**: Descriptive names matching routes (index.py, me.py)
- **Environment Files**: Service-specific .env files in each service directory

---

# Technology Stack & Build System

## Tech Stack

- **Python**: 3.13+ (specified in pyproject.toml)
- **Backend Framework**: FastAPI with standard extras
- **Frontend Framework**: Flet (Python-based web UI)
- **Database**: MongoDB with Beanie ODM
- **Authentication**: FastAPI-Login with Passlib and Argon2
- **Environment Management**: Environs for configuration
- **Package Manager**: uv (modern Python package manager)

## Key Dependencies

### Backend

- `fastapi[standard]` - Web framework
- `beanie` - MongoDB ODM
- `motor` - MongoDB async driver
- `fastapi-login` - Authentication
- `passlib` + `argon2-cffi` - Password hashing

### Frontend

- `flet[all]` - Python web UI framework
- `aiohttp` - HTTP client for API calls
- `fastapi-cli` - CLI tools

## Code Quality & Linting

- **Ruff**: Primary linter and formatter (configured in ruff.toml)
- **Target Python**: 3.13
- **Pyright**: Type checking disabled (`ignore = ["*"]`)

## Common Commands

```bash
# Development with Docker Compose
docker-compose up --build          # Build and start all services
docker-compose up -d               # Start in detached mode
docker-compose down                # Stop all services

# Package management with uv
uv sync                           # Install dependencies
uv add <package>                  # Add new dependency
uv run <command>                  # Run command in virtual environment

# Code formatting and linting
ruff check                        # Run linter
ruff format                       # Format code
ruff check --fix                  # Auto-fix issues
```

## Environment Configuration

- Root `.env` file for shared database configuration
- `backend/.env` for backend-specific settings (MongoDB URI, etc.)
- `frontend/.env` for frontend-specific settings (API_URL)
