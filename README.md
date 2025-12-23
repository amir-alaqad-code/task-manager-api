# Task Manager API  
Node.js · Express · PostgreSQL · Prisma · Docker

A clean and practical **Task Manager REST API** developed as part of an **Operating Systems practical assignment**.  
The project focuses on backend structure, containerization using Docker, and a professional Git/GitHub workflow.

---

## ✨ Features
- JWT Authentication (Register / Login)
- Per-user Tasks CRUD operations
- Filtering, searching, pagination, and sorting
- Health check endpoint with database status
- Docker & Docker Compose support
- GitHub Actions CI (linting, testing, Docker build)
- Automated tests using Jest & Supertest

---

## 📌 API Endpoints

### Authentication
- `POST /api/auth/register`  
  Create a new user account  
  Body: `name, email, password`

- `POST /api/auth/login`  
  Authenticate user and return JWT token  
  Body: `email, password`

---

### Tasks (Authorization required)
All task endpoints require a valid **Bearer Token**.

- `POST /api/tasks`
- `GET /api/tasks`  
  Supports query parameters:
  - `status=todo | doing | done`
  - `priority=low | medium | high`
  - `q=keyword`
  - `page=1..`
  - `limit=10..`
  - `sort=createdAt | dueDate`
  - `order=asc | desc`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

---

### Health Check
- `GET /health`  
Returns API and database status:
json
{ "status": "ok", "db": "ok" }

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
