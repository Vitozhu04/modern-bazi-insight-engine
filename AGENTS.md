# Agent Memory & Context

## 1. Environment Setup
*Commands to run locally*
- Install: `npm install` (or pnpm/yarn)
- Dev Server: `npm run dev`
- Test: `npm test`

**API Keys** (stored in `.env`, never commit):
- `GEMINI_API_KEY` - Google Gemini API
- `DEEPSEEK_API_KEY` - DeepSeek API

## 2. Project Knowledge (Bazi Specifics)
*Store domain knowledge here so you don't forget*
- **Precision**: Solar terms (节气) must be calculated to the specific minute to determine the monthly pillar (月柱).
- **Time Zone**: All calculations should internally use UTC, then convert to Local Mean Time (真太阳时) based on user birth longitude.

## 3. Lessons Learned (Dynamic)
*Append new findings here*
- **[2026-02-01] Time calculations**: Used NOAA EoT formula and Meeus low-accuracy solar longitude (0.01°) for minute-level solar term precision; month branch boundaries map to jie terms (立春, 惊蛰, 清明, 立夏, 芒种, 小暑, 立秋, 白露, 寒露, 立冬, 大雪, 小寒).
- **[2026-02-01] Useful God logic**: Climate adjustment (cold/hot/dry/damp) takes priority over strength-based favorable elements; strong charts favor draining/controlling elements, weak charts favor supportive elements.
- **[2026-02-02] Frontend test config**: Vitest needs `resolve.alias` for `@` imports even if tsconfig paths are set; otherwise component tests fail to resolve.
- **[2026-02-02] Next module resolution**: Next dev server cannot resolve `@/` imports that include `.js` extensions by default; remove `.js` on alias imports or add `resolve.extensionAlias` in `next.config.js`.
- **[2026-02-02] agent-browser setup**: `agent-browser` relies on Playwright browsers; run `npx playwright install chromium` once before browser-based testing.
- **[2026-02-02] Analyze page API integration**: Page now calls `/api/v1/analyze` on form submit to get real Bazi data; DeepSeek API may timeout on long prompts due to network latency - mock provider works instantly for testing.
- **[2026-02-02] Chat error/display**: When `/api/v1/interpret` returns 503 (e.g. missing DeepSeek key), UI shows an empty assistant bubble with no error; the streaming parser also strips `\n`, flattening multi-line responses.
- **[2026-02-02] Chat streaming resilience**: Render streaming errors as assistant messages and format SSE data lines (`data:` per line) to preserve newlines and avoid empty bubbles on failure.
- **[2026-02-02] LLM timeout hardening**: Add per-provider fetch timeouts and return SSE payload via `reply.send` to reduce proxy socket hang ups and surface upstream errors cleanly.
- **[2026-02-02] Next proxy hangups**: Next dev rewrites to `/api/v1/*` can reset SSE connections; setting `NEXT_PUBLIC_API_BASE_URL` and calling the API directly from the client avoids the proxy and stabilizes chat responses.
- **[2026-02-02] True solar time + day pillar**: Use longitude-only correction in true solar time to avoid host timezone drift, and align day pillar reference to a verified anchor date (1996-08-23 壬辰) so expected pillars match.

## Execution Policy

- The agent should work autonomously.
- Do NOT ask for confirmation between steps.
- If assumptions are required, make reasonable defaults and continue.
- Only stop when the task is fully completed or blocked by missing external info.

## Failure Handling

- If a command or test fails, attempt to debug and fix automatically.
- Retry until success or until no further progress is possible.

## Post-Task Logging

After completing any significant task, append a brief entry to the "Lessons Learned" section above:

```markdown
- **[YYYY-MM-DD] Task summary**: What was learned, gotchas encountered, or patterns discovered.
```

Examples of what to log:
- Bug fixes: root cause and solution
- New patterns: useful approaches discovered
- Gotchas: traps to avoid next time
- Domain knowledge: Bazi calculation rules clarified

Do NOT log trivial changes (typos, formatting, simple renames).
