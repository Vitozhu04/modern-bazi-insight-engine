# Modern Bazi Insight Engine - Makefile
# Usage: make <target>

.PHONY: install dev dev-api dev-ui dev-deepseek dev-gemini test clean help

# Default target
help:
	@echo "Modern Bazi Insight Engine"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Setup:"
	@echo "  install        Install dependencies"
	@echo "  install-all    Install deps + Playwright browsers"
	@echo ""
	@echo "Development (Mock LLM - no API key needed):"
	@echo "  dev            Start full stack with mock LLM"
	@echo "  dev-api        Start API server only (mock)"
	@echo "  dev-ui         Start Next.js UI only"
	@echo ""
	@echo "Development (Real LLM - requires API key):"
	@echo "  dev-deepseek   Start with DeepSeek (set DEEPSEEK_API_KEY)"
	@echo "  dev-gemini     Start with Gemini (set GEMINI_API_KEY)"
	@echo ""
	@echo "Testing:"
	@echo "  test           Run all tests"
	@echo "  test-watch     Run tests in watch mode"
	@echo ""
	@echo "Utilities:"
	@echo "  clean          Stop dev servers and clean build"
	@echo "  stop           Stop all dev servers"
	@echo ""
	@echo "Examples:"
	@echo "  DEEPSEEK_API_KEY=sk-xxx make dev-deepseek"
	@echo "  GEMINI_API_KEY=xxx make dev-gemini"

# Setup
install:
	pnpm install

install-all: install
	npx playwright install chromium

# Development - Mock (no API key needed)
dev:
	@echo "Starting full stack with mock LLM..."
	@make stop 2>/dev/null || true
	@LLM_PROVIDER=mock pnpm dev:api &
	@sleep 2
	@NEXT_PUBLIC_LLM_PROVIDER=mock NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4100 pnpm dev --hostname 127.0.0.1 --port 3000

dev-api:
	LLM_PROVIDER=mock pnpm dev:api

dev-ui:
	NEXT_PUBLIC_LLM_PROVIDER=mock NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4100 pnpm dev --hostname 127.0.0.1 --port 3000

# Development - DeepSeek (requires DEEPSEEK_API_KEY)
dev-deepseek:
	@if [ -z "$$DEEPSEEK_API_KEY" ]; then \
		echo "Error: DEEPSEEK_API_KEY not set"; \
		echo "Usage: DEEPSEEK_API_KEY=sk-xxx make dev-deepseek"; \
		exit 1; \
	fi
	@echo "Starting full stack with DeepSeek..."
	@make stop 2>/dev/null || true
	@LLM_PROVIDER=deepseek DEEPSEEK_API_KEY=$$DEEPSEEK_API_KEY pnpm dev:api &
	@sleep 2
	@NEXT_PUBLIC_LLM_PROVIDER=deepseek NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4100 pnpm dev --hostname 127.0.0.1 --port 3000

# Development - Gemini (requires GEMINI_API_KEY)
dev-gemini:
	@if [ -z "$$GEMINI_API_KEY" ]; then \
		echo "Error: GEMINI_API_KEY not set"; \
		echo "Usage: GEMINI_API_KEY=xxx make dev-gemini"; \
		exit 1; \
	fi
	@echo "Starting full stack with Gemini..."
	@make stop 2>/dev/null || true
	@LLM_PROVIDER=gemini GEMINI_API_KEY=$$GEMINI_API_KEY pnpm dev:api &
	@sleep 2
	@NEXT_PUBLIC_LLM_PROVIDER=gemini NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4100 pnpm dev --hostname 127.0.0.1 --port 3000

# Testing
test:
	pnpm test

test-watch:
	pnpm test -- --watch

# Utilities
stop:
	@pkill -f "next dev" 2>/dev/null || true
	@pkill -f "tsx src/api/start.ts" 2>/dev/null || true
	@echo "Stopped dev servers"

clean: stop
	rm -rf .next
	rm -rf node_modules/.cache
	@echo "Cleaned build artifacts"
