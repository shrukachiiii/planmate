# PlanMate

PlanMate is a study timetable and collaborative planning app. This repository currently contains the initial frontend and backend scaffolding only; scheduling, accounts, rooms, and persistence are not implemented yet.

## Stack

- Frontend: React, TypeScript, Vite
- Backend: Java 21, Spring Boot, Maven
- Database configuration: optional MySQL profile (not required for the default health-check startup)

## Prerequisites

- Node.js 20.19+ or 22.12+ and npm
- Java 21
- Maven 3.9+
- MySQL 8 only if using the optional `mysql` Spring profile

## Run the frontend

From the repository root:

```sh
npm install --prefix frontend
npm run dev
```

Open the local address printed by Vite (normally `http://localhost:5173`). The root `npm run build` command builds the frontend for production.

## Run the backend

In another terminal, from the repository root:

```sh
cd backend
mvn spring-boot:run
```

The API starts on port 8080. Check `http://localhost:8080/api/health`; it returns a small JSON status response. Override the port with `SERVER_PORT` if needed.

## Environment configuration

The frontend reads `VITE_API_BASE_URL` and defaults to `http://localhost:8080`. Copy `frontend/.env.example` to `frontend/.env.local` to override it.

The backend reads `CORS_ALLOWED_ORIGIN` and `SERVER_PORT`. MySQL is optional and is activated only when the `mysql` profile is enabled. Copy `backend/.env.example` as a reference, then set the variables in your shell or IDE run configuration; Spring Boot does not load `.env` files automatically.

To use MySQL, create a database named `planmate`, provide `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`, then start with the `mysql` profile:

```sh
cd backend
$env:SPRING_PROFILES_ACTIVE = "mysql"  # PowerShell
mvn spring-boot:run
```

On macOS/Linux, set `SPRING_PROFILES_ACTIVE=mysql` in the environment before running Maven. Never commit real credentials.

At this scaffold stage, the profile only supplies datasource configuration; no repository, ORM, or feature endpoint reads or writes the database yet.

## Current limitations

This phase is intentionally a runnable scaffold: the dashboard is a visual starter, and the backend exposes only a health endpoint. Authentication, timetable data, room collaboration, WebSockets, notifications, and PWA support will be added in later phases.
