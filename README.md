https://medium.com/@azeemteli/python-gui-programming-the-ultimate-guide-to-building-beautiful-apps-4ba45185d51f?source=email-dcd644c12e96-1760225077455-digest.reader-eb8e1bd46a6c-4ba45185d51f----0-109------------------a1e24ca8_4604_46f1_9bd6_a14131133fb5-1
https://medium.com/@pythonworldx/10-python-anti-patterns-that-are-killing-your-code-quality-928327ff9a6c?source=email-dcd644c12e96-1757718893643-digest.reader-ffcf9c43f8e9-928327ff9a6c----6-98------------------6c2ae413_1025_4644_a197_f9960fafd15f-1
https://medium.com/@ujjawalr/5-dockerfile-tricks-that-separate-senior-developers-from-juniors-bcd9846d8b7f?source=email-dcd644c12e96-1757718893643-digest.reader--bcd9846d8b7f----7-109------------------6c2ae413_1025_4644_a197_f9960fafd15f-1
https://medium.com/@devrimozcay/python-is-dying-and-nobody-wants-to-admit-it-4260f774117a?source=email-dcd644c12e96-1757718893643-digest.reader-1c377a233996-4260f774117a----0-109------------------6c2ae413_1025_4644_a197_f9960fafd15f-1

# UnRowdy Product Overview

UnRowdy is a web application built with a Python-based full-stack architecture. The application appears to be a personal management or service-tracking system with user authentication and service management features.

## Key Features

- User authentication and management
- Service/goal tracking system
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
│   ├── service.py          # Service model
│   └── utils.py         # Model utilities
├── routers/              # FastAPI route handlers
│   ├── __init__.py
│   ├── auth.py          # Authentication endpoints
│   ├── users.py         # User management endpoints
│   └── services.py        # Service management endpoints
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

- **Models**: Singular nouns (user.py, service.py)
- **Routers**: Plural nouns matching model names (users.py, services.py)
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
