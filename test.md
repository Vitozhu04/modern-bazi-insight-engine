# Test Workflow (Full E2E)

This file documents the full manual test flow for UI + API, including how to start services and run agent-browser checks.

## Prerequisites

```bash
pnpm install
npx playwright install chromium
```

Optional env vars:

```bash
export LLM_PROVIDER=mock           # mock|deepseek|gemini
export NEXT_PUBLIC_LLM_PROVIDER=mock
export API_BASE_URL=http://127.0.0.1:4100
export GEMINI_API_KEY=...
export DEEPSEEK_API_KEY=...
```

## Start Services

One command (frontend + API):

```bash
LLM_PROVIDER=mock NEXT_PUBLIC_LLM_PROVIDER=mock pnpm dev:all
```

Or start separately:

```bash
pnpm dev --hostname 127.0.0.1 --port 3000
LLM_PROVIDER=mock pnpm dev:api
```

## UI Checks (agent-browser)

Landing page:

```bash
npx agent-browser --session ui open http://127.0.0.1:3000
npx agent-browser --session ui snapshot -c
```

Verify:
- Hero heading: Modern Bazi Insight Engine
- CTA: 获取我的命盘分析
- Features section: Core Capabilities
- Pricing + FAQ sections visible

Mobile header:

```bash
npx agent-browser --session ui set viewport 390 844
npx agent-browser --session ui open http://127.0.0.1:3000
npx agent-browser --session ui snapshot -i
```

Check `Toggle menu` button is visible.

Analyze page (form + chat):

```bash
npx agent-browser --session ui open http://127.0.0.1:3000/analyze
npx agent-browser --session ui snapshot -i

# Fill form
npx agent-browser --session ui fill @e8 "2000-01-01"
npx agent-browser --session ui fill @e9 "12:00"
npx agent-browser --session ui fill @e10 "120"
npx agent-browser --session ui select @e11 "Male"
npx agent-browser --session ui click @e15

# Chat (mock provider)
npx agent-browser --session ui fill @e22 "career focus"
npx agent-browser --session ui click @e23
npx agent-browser --session ui wait --text "Mock response"
```

## API Checks (agent-browser)

Analyze API (valid/invalid):

```bash
npx agent-browser --session api open http://127.0.0.1:4100
npx agent-browser --session api eval '(async () => {
  const ok = await fetch("/api/v1/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      gregorianDate: "2000-01-01T12:00:00Z",
      longitude: 120,
      gender: "Male",
    }),
  });
  const okData = await ok.json();

  const bad = await fetch("/api/v1/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gregorianDate: "invalid" }),
  });
  const badData = await bad.json();

  document.title = JSON.stringify({
    analyze: { status: ok.status, hasChart: !!okData.baziChart },
    invalid: { status: bad.status, error: badData.error },
  });
})()'
npx agent-browser --session api get title
```

Interpret API (mock SSE):

```bash
npx agent-browser --session api eval '(async () => {
  const resp = await fetch("/api/v1/interpret", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userQuery: "career",
      provider: "mock",
      birthData: {
        gregorianDate: "2000-01-01T12:00:00Z",
        longitude: 120,
        gender: "Male",
      },
    }),
  });
  const text = await resp.text();
  document.title = JSON.stringify({ status: resp.status, hasData: text.includes("data:") });
})()'
npx agent-browser --session api get title
```

## Shutdown

```bash
npx agent-browser --session ui close
npx agent-browser --session api close
pkill -f "next dev"
pkill -f "tsx src/api/start.ts"
```
