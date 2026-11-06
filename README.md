# taskflow-api-mod4

Spring Boot 4 REST API for managing tasks (NTU AI Module 3/4 project).
In-memory task store with `GET`/`POST` endpoints.

## Live deployment

- **Platform:** Render (free tier, Existing Image path)
- **URL:** https://taskflow-api-mod4.onrender.com
- **Image:** `docker.io/mikeyapyc/taskflow:latest` (Docker Hub, public)
- **Environment variables:** `PORT=8080` (Render routes to `PORT`); `OPENAI_API_KEY` optional (only needed for AI endpoints)
- **Note:** free instances sleep after ~15 min idle; first request after a sleep may take up to ~60 s.

### Screenshots

Render dashboard (service **Live**):

![Render dashboard](screenshots/dashboard.png)

Live API response — `GET https://taskflow-api-mod4.onrender.com/api/tasks`:

![Application running](screenshots/application.png)

## Endpoints

| Method | Path         | Description                          |
|--------|--------------|--------------------------------------|
| GET    | `/api/tasks` | List all tasks                       |
| POST   | `/api/tasks` | Create a task `{"title":"...","completed":false}` |

### Examples

```bash
curl https://taskflow-api-mod4.onrender.com/api/tasks

curl -X POST https://taskflow-api-mod4.onrender.com/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","completed":false}'
```

## Local development (Docker)

```bash
docker build -t taskflow:latest .
docker run -p 8080:8080 taskflow:latest
# wait for "Started TaskflowApiApplication", then:
curl http://localhost:8080/api/tasks
```

Requirements: Java 21 (Temurin), Maven 3.9.

## Deployment steps (how this was built)

1. Cleaned repo: untracked `target/`, `HELP.md`, `*Zone.Identifier`; proper `.gitignore`.
2. Multi-stage `Dockerfile`: build with `maven:3.9-eclipse-temurin-21`, run on `eclipse-temurin:21-jre-alpine`, `EXPOSE 8080`.
3. Built and smoke-tested locally (`GET`/`POST /api/tasks` OK).
4. Pushed image to Docker Hub: `docker buildx build --platform linux/amd64 -t mikeyapyc/taskflow:latest --push .`
5. Created Render Web Service from **Existing Image** `docker.io/mikeyapyc/taskflow:latest`, set `PORT=8080`, service went **Live**.

## Tech stack

- Java 21, Spring Boot 4.1.1 (Web + Spring AI)
- In-memory `ConcurrentHashMap` task store
- Maven build
