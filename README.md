# Task Manager API (Node.js + Express + PostgreSQL + Prisma)

Simple but practical **Task Manager REST API** with:
- JWT Auth (register/login)
- Tasks CRUD (per-user)
- Filtering, search, pagination, sorting
- `/health` endpoint (includes DB check)
- Docker + Docker Compose
- GitHub Actions CI (lint + tests + docker build)
- Jest + Supertest tests

## Endpoints

### Auth
- `POST /api/auth/register`  (name, email, password)
- `POST /api/auth/login`     (email, password)

### Tasks (Bearer token required)
- `POST /api/tasks`
- `GET /api/tasks` with query:
  - `status=todo|doing|done`
  - `priority=low|medium|high`
  - `q=keyword`
  - `page=1..` `limit=10..`
  - `sort=createdAt|dueDate`
  - `order=asc|desc`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Health
- `GET /health` → `{ "status": "ok", "db": "ok|down" }`

---

## Run locally (without Docker)

### 1) Install deps
```bash
npm install
```

### 2) Create `.env` from example
```bash
cp .env.example .env
```

Edit `DATABASE_URL` to point to your local Postgres.

### 3) Generate Prisma client + migrate
```bash
npm run prisma:generate
npx prisma migrate deploy
```

### 4) Start
```bash
npm run dev
```

---

## Run with Docker Compose (recommended)

### Build + Up
```bash
docker compose up -d --build
```

API: `http://localhost:3000`

### Down
```bash
docker compose down -v
```

---

## Quick cURL examples

### 1) Register
```bash
curl -X POST http://localhost:3000/api/auth/register   -H "Content-Type: application/json"   -d '{"name":"Amir","email":"amir@example.com","password":"secret123"}'
```

### 2) Create task (replace TOKEN)
```bash
curl -X POST http://localhost:3000/api/tasks   -H "Content-Type: application/json"   -H "Authorization: Bearer TOKEN"   -d '{"title":"Finish assignment","priority":"high","status":"todo"}'
```

---

## Scripts / Makefile
- `make build` → docker compose build
- `make up` → docker compose up -d
- `make down` → docker compose down -v
- `make logs` → docker compose logs -f api
- `npm test` → Jest tests
- `npm run lint` → ESLint
