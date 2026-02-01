# Agent Memory & Context

## 1. Environment Setup
*Commands to run locally*
- Install: `npm install` (or pnpm/yarn)
- Dev Server: `npm run dev`
- Test: `npm test`

## 2. Project Knowledge (Bazi Specifics)
*Store domain knowledge here so you don't forget*
- **Precision**: Solar terms (节气) must be calculated to the specific minute to determine the monthly pillar (月柱).
- **Time Zone**: All calculations should internally use UTC, then convert to Local Mean Time (真太阳时) based on user birth longitude.

## 3. Lessons Learned (Dynamic)
*Append new findings here*
- (Waiting for first lesson...)