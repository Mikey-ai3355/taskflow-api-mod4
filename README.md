# taskflow-api-mod4

Spring Boot 4 REST API for managing tasks (NTU AI Module 3/4 project).
In-memory task store with `GET`/`POST`/`DELETE` endpoints.

## Live deployment

- **Platform:** Render (Web Service, free tier)
- **URL:** https://taskflow-api-mod4.onrender.com
- **Image:** `mikeyapyc/taskflow:latest` on Docker Hub

| | |
|---|---|
| `GET /api/tasks` | List all tasks |
| `POST /api/tasks` | Create a task `{"title":"...", "completed":false}` |
| `DELETE /api/tasks/{id}` | Delete a task |

> Free Render instances sleep after ~15 min idle — the first request after a
> pause can take ~60 s while it cold-starts.

### Deployment screenshots

Render dashboard showing the service **Live**:

![Render dashboard](screenshots/dashboard.png)

Live `GET /api/tasks` response from the deployed service:

![Live API response](screenshots/application.png)

## Local run

```bash
mvn spring-boot:run
# or: mvn package && java -jar target/*.jar
```

## Build & test

```bash
mvn clean verify
```

## Docker

```bash
docker build -t taskflow .
docker run -p 8080:8080 taskflow
```

## Stretch goals (optional)

### Option 1: CI pipeline (GitHub Actions) — done

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push to
`main`: builds the project, runs the tests (`mvn clean verify`), then builds the
Docker image and pushes it to Docker Hub as both `mikeyapyc/taskflow:latest`
and a commit-SHA tag. Docker Hub credentials are stored as repository
**secrets** (`DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`) — never in code.

- Workflow: https://github.com/Mikey-ai3355/taskflow-api-mod4/actions/workflows/ci.yml
- Image on Docker Hub: https://hub.docker.com/r/mikeyapyc/taskflow
- Successful run: https://github.com/Mikey-ai3355/taskflow-api-mod4/actions/runs/42362790287

This gives two pipelines side by side: CI publishing to Docker Hub, and the
Render web service deploying from that image.

### Option 2: Frontend (static, deployed) — done

A static frontend (`frontend/`, also copied to `docs/` for GitHub Pages)
lists the tasks, adds new ones, and toggles/deletes them by calling the
deployed API. It is deployed on **GitHub Pages** (the assignment allows
"Netlify, GitHub Pages, or your university's static host").

- **Frontend URL:** https://Mikey-ai3355.github.io/taskflow-api-mod4/docs/
- The frontend runs on a different origin than the API, so the API enables
  CORS for `/api/**` in
  `src/main/java/sg/edu/ntu/taskflow_api/config/CorsConfig.java`.
  For this assignment all origins are allowed; in production restrict it to the
  frontend site.
- Screenshot of the frontend showing data from the API:

![Frontend live](screenshots/frontend.png)

> Note: the task store is in-memory, so the list resets to empty whenever the
> Render instance restarts/cold-starts — add a task from the frontend to see
> data flow end-to-end.
