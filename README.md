# Modern Bazi Insight Engine

Modern Bazi Insight Engine is a TypeScript-based platform that transforms Bazi metaphysics into structured, quantifiable insights with a modern UI and an AI interpretation layer.

## Features

- Full Bazi chart generation with hidden stems and ten gods
- Five Elements distribution and Life K-Line visualization
- Actionable advice + insight tags
- Landing page + Analyze workspace UI
- API: `/api/v1/analyze` (core report), `/api/v1/interpret` (LLM narrative, SSE)

## Architecture

- `src/engine`: Pure calculation engine (Bazi chart, five elements, luck scores)
- `src/interpreter`: Prompt building + LLM providers (DeepSeek/Gemini)
- `src/api`: Fastify server + routes
- `src/app`: Next.js UI (Landing + Analyze)

## Quick Start

```bash
make install-all   # Install deps + Playwright
make dev           # Start with mock LLM (no API key needed)
```

Or with a real LLM provider:

```bash
DEEPSEEK_API_KEY=sk-xxx make dev-deepseek
# or
GEMINI_API_KEY=xxx make dev-gemini
```

### Manual Setup (without Make)

```bash
pnpm install
npx playwright install chromium
```

**Important**: Set `NEXT_PUBLIC_API_BASE_URL` to bypass Next.js proxy SSE issues:

```bash
# Terminal 1: API server
LLM_PROVIDER=deepseek DEEPSEEK_API_KEY=sk-xxx pnpm dev:api

# Terminal 2: Next.js UI (CRITICAL: set NEXT_PUBLIC_API_BASE_URL)
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4100 pnpm dev
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `LLM_PROVIDER` | API-side LLM provider | `mock`, `deepseek`, `gemini` |
| `NEXT_PUBLIC_LLM_PROVIDER` | UI-side provider label | `mock`, `deepseek`, `gemini` |
| `NEXT_PUBLIC_API_BASE_URL` | Direct API URL (bypasses proxy) | `http://127.0.0.1:4100` |
| `DEEPSEEK_API_KEY` | DeepSeek API key | `sk-xxx` |
| `GEMINI_API_KEY` | Gemini API key | `xxx` |

> **Note**: `NEXT_PUBLIC_API_BASE_URL` is required for SSE streaming to work correctly in dev mode. The Next.js dev proxy has issues with SSE connections.

## Usage

### UI

- Landing: `http://127.0.0.1:3000/`
- Analyze: `http://127.0.0.1:3000/analyze`
  - Fill birth date/time/longitude/gender
  - Submit to store BirthData
  - Ask a question in chat (SSE response)

### API

#### POST /api/v1/analyze

```json
{
  "gregorianDate": "2000-01-01T12:00:00Z",
  "longitude": 120,
  "gender": "Male"
}
```

Response: `FullReport` (Bazi chart + lifeKline + five elements + advice).

#### POST /api/v1/interpret

```json
{
  "userQuery": "career focus",
  "provider": "mock",
  "birthData": {
    "gregorianDate": "2000-01-01T12:00:00Z",
    "longitude": 120,
    "gender": "Male"
  }
}
```

Response: SSE stream (`data: ...`).

## Tests

```bash
pnpm test
```

## Manual E2E Testing

See `test.md` for the full agent-browser workflow.
