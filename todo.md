# Implementation Plan

> Modern Bazi Insight Engine - Granular Task Breakdown  
> Each task is implementable in **under 300 lines of code**  
> TDD Workflow: Write test → Implement → Run tests → Mark complete

## Review: DeepSeek Analyze Flow (2026-02-02)

- [x] Start full stack with DeepSeek env (`LLM_PROVIDER=deepseek NEXT_PUBLIC_LLM_PROVIDER=deepseek pnpm dev:all`)
- [x] Open `/analyze`, submit birth data, verify `/api/v1/analyze` renders chart
- [x] Send chat query, verify `/api/v1/interpret` response and UI rendering
- [x] Capture UI issues (display + final dialog)
- [x] Shut down dev servers

---

## Phase 1: Project Setup & Foundation

### 1.1 Project Initialization
- [x] **P1-01**: Initialize Node.js project with TypeScript strict mode
  - Create `package.json` with scripts (dev, build, test)
  - Create `tsconfig.json` with strict mode enabled
  - Install dependencies: `typescript`, `vitest`, `zod`
  - Files: `package.json`, `tsconfig.json`
  - Lines: ~50

### 1.2 Domain Type Definitions
- [x] **P1-02**: Define core input types (`BirthData`)
  - File: `src/engine/types/input.ts`
  - Test: `src/engine/types/__tests__/input.test.ts`
  - Lines: ~30

- [x] **P1-03**: Define Pillar and BaziChart types
  - Interfaces: `Pillar`, `BaziChart`, `TenYearLuckPillar`
  - File: `src/engine/types/chart.ts`
  - Test: `src/engine/types/__tests__/chart.test.ts`
  - Lines: ~80

- [x] **P1-04**: Define analysis output types
  - Interfaces: `LuckScorePoint`, `FiveElementsWeight`, `UsefulGodAnalysis`, `Advice`, `InsightTags`, `FullReport`
  - File: `src/engine/types/analysis.ts`
  - Test: `src/engine/types/__tests__/analysis.test.ts`
  - Lines: ~100

- [x] **P1-05**: Create barrel exports for types
  - File: `src/engine/types/index.ts`
  - Lines: ~10

### 1.3 Constants & Lookup Tables
- [x] **P1-06**: Define Heavenly Stems (天干) constants
  - Array: `['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']`
  - Include: Element mapping, Yin/Yang polarity
  - File: `src/engine/constants/heavenlyStems.ts`
  - Test: `src/engine/constants/__tests__/heavenlyStems.test.ts`
  - Lines: ~60

- [x] **P1-07**: Define Earthly Branches (地支) constants
  - Array: `['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']`
  - Include: Element mapping, Yin/Yang polarity, Animal mapping
  - File: `src/engine/constants/earthlyBranches.ts`
  - Test: `src/engine/constants/__tests__/earthlyBranches.test.ts`
  - Lines: ~80

- [x] **P1-08**: Define Hidden Stems (藏干) lookup table
  - Map each Branch to hidden stems with weights
  - Example: `戌 → { 戊: 0.6, 辛: 0.3, 丁: 0.1 }`
  - File: `src/engine/constants/hiddenStems.ts`
  - Test: `src/engine/constants/__tests__/hiddenStems.test.ts`
  - Lines: ~100

- [x] **P1-09**: Define Five Elements (五行) constants
  - Elements: `['木', '火', '土', '金', '水']` (Wood, Fire, Earth, Metal, Water)
  - Include: Generation cycle (生), Controlling cycle (克)
  - File: `src/engine/constants/fiveElements.ts`
  - Test: `src/engine/constants/__tests__/fiveElements.test.ts`
  - Lines: ~80

- [x] **P1-10**: Define Ten Gods (十神) constants
  - Gods: `比肩, 劫财, 食神, 伤官, 偏财, 正财, 七杀, 正官, 偏印, 正印`
  - Include: Calculation rules based on Day Master relationship
  - File: `src/engine/constants/tenGods.ts`
  - Test: `src/engine/constants/__tests__/tenGods.test.ts`
  - Lines: ~120

- [x] **P1-11**: Create barrel exports for constants
  - File: `src/engine/constants/index.ts`
  - Lines: ~15

---

## Phase 2: Time & Astronomical Calculations

### 2.1 True Solar Time
- [x] **P2-01**: Implement Equation of Time calculation
  - Formula based on orbital eccentricity and axial tilt
  - Input: Day of year → Output: Minutes offset
  - File: `src/engine/time/equationOfTime.ts`
  - Test: `src/engine/time/__tests__/equationOfTime.test.ts`
  - Lines: ~80

- [x] **P2-02**: Implement True Solar Time converter
  - Formula: `TST = LST + (4 × (StandardMeridian - Longitude)) + EoT`
  - Input: `Date`, `longitude` → Output: `Date` (adjusted)
  - File: `src/engine/time/trueSolarTime.ts`
  - Test: `src/engine/time/__tests__/trueSolarTime.test.ts`
  - Lines: ~60

### 2.2 Solar Terms (节气)
- [x] **P2-03**: Implement simplified solar longitude calculation
  - Calculate sun's ecliptic longitude for a given date
  - Use VSOP87 simplified algorithm or astronomical approximation
  - File: `src/engine/time/solarLongitude.ts`
  - Test: `src/engine/time/__tests__/solarLongitude.test.ts`
  - Lines: ~150

- [x] **P2-04**: Implement Solar Terms finder
  - Find exact moment when sun reaches specific longitude (15° intervals)
  - 24 Solar Terms: 立春, 雨水, 惊蛰, 春分, ... 大寒
  - File: `src/engine/time/solarTerms.ts`
  - Test: `src/engine/time/__tests__/solarTerms.test.ts`
  - Lines: ~120

- [x] **P2-05**: Implement Month Branch determination from Solar Terms
  - Map date to correct Chinese month based on solar term boundaries
  - Critical for accurate Month Pillar calculation
  - File: `src/engine/time/monthFromSolarTerm.ts`
  - Test: `src/engine/time/__tests__/monthFromSolarTerm.test.ts`
  - Lines: ~80

- [x] **P2-06**: Create barrel exports for time module
  - File: `src/engine/time/index.ts`
  - Lines: ~10

---

## Phase 3: Four Pillars Engine

### 3.1 Individual Pillar Calculations
- [x] **P3-01**: Implement Year Pillar (年柱) calculator
  - Calculate Stem-Branch based on Chinese New Year (立春)
  - Input: `Date` (true solar time) → Output: `Pillar`
  - File: `src/engine/pillars/yearPillar.ts`
  - Test: `src/engine/pillars/__tests__/yearPillar.test.ts`
  - Lines: ~80

- [x] **P3-02**: Implement Month Pillar (月柱) calculator
  - Calculate based on Solar Term boundaries
  - Stem derived from Year Stem using 五虎遁 rule
  - File: `src/engine/pillars/monthPillar.ts`
  - Test: `src/engine/pillars/__tests__/monthPillar.test.ts`
  - Lines: ~100

- [x] **P3-03**: Implement Day Pillar (日柱) calculator
  - Calculate using sexagenary cycle from reference date
  - Most critical pillar - determines Day Master
  - File: `src/engine/pillars/dayPillar.ts`
  - Test: `src/engine/pillars/__tests__/dayPillar.test.ts`
  - Lines: ~80

- [x] **P3-04**: Implement Hour Pillar (时柱) calculator
  - Map 24-hour time to 12 double-hour branches
  - Stem derived from Day Stem using 五鼠遁 rule
  - File: `src/engine/pillars/hourPillar.ts`
  - Test: `src/engine/pillars/__tests__/hourPillar.test.ts`
  - Lines: ~100

### 3.2 Hidden Stems & Ten Gods
- [x] **P3-05**: Implement Hidden Stems resolver
  - For each pillar, decompose Branch into hidden stems with weights
  - File: `src/engine/pillars/hiddenStemsResolver.ts`
  - Test: `src/engine/pillars/__tests__/hiddenStemsResolver.test.ts`
  - Lines: ~60

- [x] **P3-06**: Implement Ten Gods calculator
  - Calculate relationship of each Stem to Day Master
  - Output all Ten Gods for the four pillars
  - File: `src/engine/pillars/tenGodsCalculator.ts`
  - Test: `src/engine/pillars/__tests__/tenGodsCalculator.test.ts`
  - Lines: ~120

### 3.3 Luck Pillars (大运)
- [x] **P3-07**: Implement Ten-Year Luck Pillars calculator
  - Determine direction (forward/backward) based on gender + year polarity
  - Calculate start age and pillar sequence
  - File: `src/engine/pillars/luckPillars.ts`
  - Test: `src/engine/pillars/__tests__/luckPillars.test.ts`
  - Lines: ~150

### 3.4 Chart Assembly
- [x] **P3-08**: Implement BaziChart assembler
  - Orchestrate all pillar calculations
  - Input: `BirthData` → Output: `BaziChart`
  - File: `src/engine/pillars/chartAssembler.ts`
  - Test: `src/engine/pillars/__tests__/chartAssembler.test.ts`
  - Lines: ~100

- [x] **P3-09**: Create barrel exports for pillars module
  - File: `src/engine/pillars/index.ts`
  - Lines: ~15

---

## Phase 4: Analysis Algorithms

### 4.1 Five Elements Analysis
- [x] **P4-01**: Implement Five Elements weight calculator
  - Quantify element strength based on Month Branch (月令) dominance
  - Apply hidden stem weights from all pillars
  - File: `src/engine/analysis/fiveElementsWeight.ts`
  - Test: `src/engine/analysis/__tests__/fiveElementsWeight.test.ts`
  - Lines: ~150

### 4.2 Day Master & Useful God
- [x] **P4-02**: Implement Day Master strength calculator
  - Evaluate: Strong (旺), Weak (弱), Vibrant (从旺), Follow (从弱)
  - Weight heavily on Month Branch support
  - File: `src/engine/analysis/dayMasterStrength.ts`
  - Test: `src/engine/analysis/__tests__/dayMasterStrength.test.ts`
  - Lines: ~120

- [x] **P4-03**: Implement Chart Pattern (格局) identifier
  - Identify primary pattern based on Month Pillar Ten God
  - Patterns: 正官格, 七杀格, 正印格, 偏印格, 食神格, 伤官格, 正财格, 偏财格
  - File: `src/engine/analysis/chartPattern.ts`
  - Test: `src/engine/analysis/__tests__/chartPattern.test.ts`
  - Lines: ~150

- [x] **P4-04**: Implement Useful God (喜用神) determiner
  - Apply rules based on Day Master strength + Pattern
  - Consider climate adjustment (调候)
  - File: `src/engine/analysis/usefulGod.ts`
  - Test: `src/engine/analysis/__tests__/usefulGod.test.ts`
  - Lines: ~200

### 4.3 Life K-Line Scoring
- [x] **P4-05**: Implement Yearly Pillar (流年) calculator
  - Calculate pillar for any given year
  - File: `src/engine/analysis/yearlyPillar.ts`
  - Test: `src/engine/analysis/__tests__/yearlyPillar.test.ts`
  - Lines: ~50

- [x] **P4-06**: Implement element interaction scorer
  - Score: 生 (generate), 克 (control), 冲 (clash), 合 (combine), 害 (harm)
  - Configurable weights for each interaction type
  - File: `src/engine/analysis/interactionScorer.ts`
  - Test: `src/engine/analysis/__tests__/interactionScorer.test.ts`
  - Lines: ~150

- [x] **P4-07**: Implement annual luck score calculator
  - Combine: Yearly Pillar + Luck Pillar + Natal Chart interactions
  - Normalize to 0-100 scale
  - File: `src/engine/analysis/annualLuckScore.ts`
  - Test: `src/engine/analysis/__tests__/annualLuckScore.test.ts`
  - Lines: ~120

- [x] **P4-08**: Implement Life K-Line generator
  - Generate `LuckScorePoint[]` for age range (1-100)
  - Include trend calculation (up/down/stable)
  - File: `src/engine/analysis/lifeKline.ts`
  - Test: `src/engine/analysis/__tests__/lifeKline.test.ts`
  - Lines: ~100

### 4.4 Insight Generation
- [x] **P4-09**: Implement Insight Tags generator
  - Generate career, wealth, personality tags based on Ten Gods profile
  - File: `src/engine/analysis/insightTags.ts`
  - Test: `src/engine/analysis/__tests__/insightTags.test.ts`
  - Lines: ~150

- [x] **P4-10**: Implement Actionable Advice generator
  - Generate: accessories, directions, colors based on Useful God
  - File: `src/engine/analysis/adviceGenerator.ts`
  - Test: `src/engine/analysis/__tests__/adviceGenerator.test.ts`
  - Lines: ~120

### 4.5 Report Assembly
- [x] **P4-11**: Implement FullReport assembler
  - Orchestrate all analysis modules
  - Input: `BirthData` → Output: `FullReport`
  - File: `src/engine/analysis/reportAssembler.ts`
  - Test: `src/engine/analysis/__tests__/reportAssembler.test.ts`
  - Lines: ~80

- [x] **P4-12**: Create barrel exports for analysis module
  - File: `src/engine/analysis/index.ts`
  - Lines: ~20

---

## Phase 5: API Layer

### 5.1 Validation & Server
- [x] **P5-01**: Implement request validation with Zod
  - Validate `BirthData` input (date format, longitude range, gender enum)
  - File: `src/api/validation.ts`
  - Test: `src/api/__tests__/validation.test.ts`
  - Lines: ~60

- [x] **P5-02**: Implement API server setup (Fastify or Express)
  - Configure CORS, JSON parsing, error handling
  - File: `src/api/server.ts`
  - Lines: ~80

- [x] **P5-03**: Implement `/api/v1/analyze` endpoint
  - POST endpoint: `BirthData` → `FullReport`
  - File: `src/api/routes/analyze.ts`
  - Test: `src/api/routes/__tests__/analyze.test.ts`
  - Lines: ~100

- [x] **P5-04**: Implement error handling middleware
  - Standardized error responses with codes
  - File: `src/api/middleware/errorHandler.ts`
  - Test: `src/api/middleware/__tests__/errorHandler.test.ts`
  - Lines: ~60

- [x] **P5-05**: Create barrel exports for API module
  - File: `src/api/index.ts`
  - Lines: ~15

---

## Phase 6: LLM Integration Layer

### 6.1 Prompt Construction
- [x] **P6-01**: Implement prompt template builder
  - Build structured prompt from `FullReport` data
  - Use template from work.md Section 6.2
  - File: `src/interpreter/promptBuilder.ts`
  - Test: `src/interpreter/__tests__/promptBuilder.test.ts`
  - Lines: ~150

- [x] **P6-02**: Implement context extractor for LLM prompt
  - Extract current luck pillar, peak/low years from Life K-Line
  - File: `src/interpreter/contextExtractor.ts`
  - Test: `src/interpreter/__tests__/contextExtractor.test.ts`
  - Lines: ~80

### 6.2 LLM Provider Integration
- [x] **P6-03**: Implement LLM provider interface
  - Abstract interface for multiple providers (DeepSeek, Gemini)
  - File: `src/interpreter/providers/types.ts`
  - Lines: ~40

- [x] **P6-04**: Implement DeepSeek provider adapter
  - API integration with streaming support
  - File: `src/interpreter/providers/deepseek.ts`
  - Test: `src/interpreter/providers/__tests__/deepseek.test.ts`
  - Lines: ~100

- [x] **P6-05**: Implement Gemini provider adapter
  - API integration with streaming support
  - File: `src/interpreter/providers/gemini.ts`
  - Test: `src/interpreter/providers/__tests__/gemini.test.ts`
  - Lines: ~100

- [x] **P6-06**: Implement interpretation orchestrator
  - Coordinate: FullReport → Prompt → LLM → Streamed response
  - File: `src/interpreter/orchestrator.ts`
  - Test: `src/interpreter/__tests__/orchestrator.test.ts`
  - Lines: ~100

- [x] **P6-07**: Create barrel exports for interpreter module
  - File: `src/interpreter/index.ts`
  - Lines: ~15

---

## Phase 7: Frontend (Web UI)

> **Design Philosophy**: Clean, minimalist aesthetic inspired by MetaSight  
> - Ample whitespace ("留白与秩序")  
> - Professional, modern UI (not mystical/fortune-telling vibes)  
> - Card-based layouts with subtle animations  
> - Mobile-first responsive design

### 7.1 Project Setup
- [x] **P7-01**: Initialize Next.js 14 with Tailwind CSS
  - Create Next.js app with App Router
  - Configure Tailwind CSS with custom theme
  - Setup path aliases (`@/components`, `@/lib`)
  - Files: `next.config.js`, `tailwind.config.ts`, `app/layout.tsx`
  - Lines: ~100

- [x] **P7-02**: Setup shadcn/ui component library
  - Install and configure shadcn/ui
  - Add base components: Button, Card, Input, Dialog
  - File: `components/ui/*.tsx`
  - Lines: ~50

- [x] **P7-03**: Create design tokens and theme configuration
  - Define color palette (light/dark mode)
  - Typography scale, spacing, border radius
  - Chinese typography support (font-family)
  - File: `lib/theme.ts`, `app/globals.css`
  - Lines: ~80

### 7.2 Landing Page Components
- [x] **P7-04**: Build Hero section
  - Tagline: "观象入元，见心知命"
  - CTA button: "获取我的命盘分析"
  - Subtle gradient background
  - File: `components/landing/Hero.tsx`
  - Lines: ~80

- [x] **P7-05**: Build Features section (card grid)
  - 4-6 feature cards with icons
  - Features: AI 深度解读, 多重印证, 克制的美, 数据安全
  - Responsive grid layout (1-2-3 columns)
  - File: `components/landing/Features.tsx`
  - Lines: ~120

- [x] **P7-06**: Build Testimonials carousel
  - User testimonials with avatar, name, role
  - Auto-scroll carousel with pause on hover
  - File: `components/landing/Testimonials.tsx`
  - Lines: ~150

- [x] **P7-07**: Build Pricing cards section
  - 3 tiers: Free, Pro ($19.9), Business
  - Feature comparison list
  - Highlight "Most Popular" tier
  - File: `components/landing/Pricing.tsx`
  - Lines: ~150

- [x] **P7-08**: Build FAQ accordion and Footer
  - Expandable FAQ items
  - Footer with links, copyright
  - File: `components/landing/FAQ.tsx`, `components/landing/Footer.tsx`
  - Lines: ~120

### 7.3 Core Bazi Components
- [x] **P7-09**: Build Birth Data input form
  - Date picker (year, month, day, hour)
  - Location input with longitude lookup
  - Gender selector
  - Form validation with error states
  - File: `components/chart/BirthDataForm.tsx`
  - Lines: ~200

- [x] **P7-10**: Build Four Pillars chart display (八字命盘)
  - 4-column layout: Year, Month, Day, Hour
  - Display: Heavenly Stem, Earthly Branch, Hidden Stems
  - Color coding by Five Elements
  - File: `components/chart/FourPillars.tsx`
  - Lines: ~180

- [x] **P7-11**: Build Five Elements visualization
  - Radar chart or pie chart showing element distribution
  - Percentages with color legend
  - Interactive tooltips
  - File: `components/chart/FiveElementsChart.tsx`
  - Lines: ~150

- [x] **P7-12**: Build Ten Gods badge grid
  - Display all Ten Gods with count/presence
  - Badge style with element colors
  - Tooltip with explanation
  - File: `components/chart/TenGodsBadges.tsx`
  - Lines: ~120

- [x] **P7-13**: Build Luck Pillars timeline (大运)
  - Horizontal timeline showing 10-year periods
  - Current period highlighted
  - Age range labels
  - File: `components/chart/LuckPillarsTimeline.tsx`
  - Lines: ~150

- [x] **P7-14**: Build Life K-Line interactive chart
  - Line chart with scores (0-100) over years
  - Hover to see year details
  - Highlight peak/low points
  - Zoom and pan functionality
  - File: `components/chart/LifeKLineChart.tsx`
  - Lines: ~200

### 7.4 AI Chat Interface
- [x] **P7-15**: Build Chat message components
  - User message bubble (right-aligned)
  - AI message bubble (left-aligned, with avatar)
  - Loading state with typing indicator
  - Markdown rendering for AI responses
  - File: `components/chat/ChatMessage.tsx`
  - Lines: ~120

- [x] **P7-16**: Build streaming response handler
  - React hook for SSE/streaming responses
  - Progressive text rendering
  - Error handling and retry
  - File: `hooks/useStreamingChat.ts`
  - Lines: ~100

- [x] **P7-17**: Build Chat input with suggestions
  - Text input with send button
  - Suggested question chips
  - "问问AI" placeholder
  - File: `components/chat/ChatInput.tsx`
  - Lines: ~100

- [x] **P7-18**: Build Analysis result cards
  - Summary cards: 格局, 喜用神, 运势评分
  - Actionable advice section
  - Expandable details
  - File: `components/chat/AnalysisCards.tsx`
  - Lines: ~150

### 7.5 Pages & Layout
- [x] **P7-19**: Build App layout (header, navigation)
  - Header with logo, nav links, theme toggle
  - Mobile hamburger menu
  - Sticky header on scroll
  - File: `components/layout/Header.tsx`, `components/layout/Layout.tsx`
  - Lines: ~150

- [x] **P7-20**: Assemble Landing page
  - Combine: Hero, Features, Testimonials, Pricing, FAQ, Footer
  - Smooth scroll navigation
  - File: `app/page.tsx`
  - Lines: ~80

- [x] **P7-21**: Build Analysis page (main app)
  - Two-column layout: Chart display | AI Chat
  - Birth data form modal/drawer
  - State management for report data
  - File: `app/analyze/page.tsx`
  - Lines: ~200

- [x] **P7-22**: Implement responsive mobile optimizations
  - Mobile-first breakpoints
  - Touch-friendly interactions
  - Collapsible panels for mobile
  - Test on various screen sizes
  - File: Various component updates
  - Lines: ~100

---

## Summary Statistics

| Phase | Task Count | Estimated Lines |
|-------|------------|-----------------|
| Phase 1: Foundation | 11 tasks | ~725 lines |
| Phase 2: Time Calculations | 6 tasks | ~500 lines |
| Phase 3: Four Pillars | 9 tasks | ~785 lines |
| Phase 4: Analysis | 12 tasks | ~1,260 lines |
| Phase 5: API | 5 tasks | ~315 lines |
| Phase 6: LLM Integration | 7 tasks | ~585 lines |
| Phase 7: Frontend (Web UI) | 22 tasks | ~2,930 lines |
| **Total** | **72 tasks** | **~7,100 lines** |

---

## Frontend File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles + Tailwind
│   └── analyze/
│       └── page.tsx            # Main analysis page
├── components/
│   ├── ui/                     # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── landing/                # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── chart/                  # Bazi visualization components
│   │   ├── BirthDataForm.tsx
│   │   ├── FourPillars.tsx
│   │   ├── FiveElementsChart.tsx
│   │   ├── TenGodsBadges.tsx
│   │   ├── LuckPillarsTimeline.tsx
│   │   └── LifeKLineChart.tsx
│   ├── chat/                   # AI chat components
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   └── AnalysisCards.tsx
│   └── layout/                 # Layout components
│       ├── Header.tsx
│       └── Layout.tsx
├── hooks/
│   └── useStreamingChat.ts     # Streaming chat hook
└── lib/
    ├── api.ts                  # API client
    └── theme.ts                # Theme configuration
```

---

## Workflow Reminder

1. **Pick a task** → Mark `[In Progress]`
2. **Write the test first** (TDD) - for frontend, use component tests
3. **Implement** the feature
4. **Run tests** → Ensure pass
5. **Mark task** `[x]` (complete)
6. **Update agents.md** if lessons learned
