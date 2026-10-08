# ReactFastAPI

A project with React 19 (frontend) and Python (backend). Database - MySQL.

## Architecture Overview

```mermaid
graph TB
    subgraph Frontend["Frontend Layer"]
        React["React 19 + TypeScript"]
        UI["UI Components\nStyling (CSS)"]
    end

    subgraph API["API Layer"]
        REST["REST API / JSON"]
    end

    subgraph Backend["Backend Layer"]
        FastAPI["FastAPI"]
        Routers["Routers / API"]
        Services["Services"]
        Models["Pydantic Models"]
        SQLAlchemy["SQLAlchemy"]
    end

    subgraph Database["Data Layer"]
        MySQL["MySQL"]
        Alembic["Alembic\nMigrations"]
    end

    React --> UI
    React --> REST
    REST --> FastAPI
    FastAPI --> Routers
    Routers --> Services
    Services --> Models
    Models --> SQLAlchemy
    SQLAlchemy --> MySQL
    Alembic -.-> MySQL

    style Frontend fill:#e6f4ff,stroke:#1677ff,color:#000
    style API fill:#fff7e6,stroke:#fa8c16,color:#000
    style Backend fill:#e6fffb,stroke:#13a8a8,color:#000
    style Database fill:#fff1f0,stroke:#cf1322,color:#000
```

## High-Level Structure

```text
React 19 + TypeScript
        │
        │ REST API / JSON
        ▼
FastAPI
 ├── Routers / API
 ├── Services
 ├── Pydantic Models
 └── SQLAlchemy
        │
        ▼
      MySQL
        ▲
        │
    Alembic
   (Migrations)
```

## Core Components

- Frontend: React 19 + TypeScript
- Backend: FastAPI (Python)
- API communication: REST API / JSON
- Data access: SQLAlchemy
- Database: MySQL
- Schema migrations: Alembic

## Language Composition

- TypeScript: 55.1%
- Python: 28.9%
- CSS: 13.3%
- Mako: 1.8%
- HTML: 0.9%
