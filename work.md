# Modern Bazi Insight Engine: Final Specification

## 1. Product Vision

To create a **Modern Bazi Insight Engine** that transcends traditional fortune-telling by transforming ancient metaphysical concepts into a quantifiable, visual, and actionable intelligence platform. We are not just plotting charts; we are building a digital oracle that provides users with a clear, intuitive, and data-driven understanding of their life's potential, empowering them to make more informed decisions.

Our core philosophy is the **"digitization and visualization of traditional logic."** We will bridge the gap between esoteric Bazi knowledge and the modern user's need for clarity and practical guidance. The engine will serve as the foundational logic layer for a new generation of AI-powered life-coaching applications, inspired by the clean, professional interface of MetaSight [3] and the data visualization prowess of Life K-Line [2].

## 2. The Problem: From Complexity to Clarity

The fundamental problem we are solving is the **high barrier to entry and actionability** in traditional Bazi analysis. 

> In the words of product leader Bob Moesta, "A struggling moment causes demand." The struggling moment for a modern user interested in Bazi is clear: they receive a complex chart filled with specialized terms (e.g., 藏干, 十神, 纳音) but are left with no clear way to interpret this information or apply it to their lives. They get the *data*, but not the *insight*.

Existing digital solutions often fall into the trap of simply being a "digital version of something that had come before," as Bret Taylor noted. They replicate paper charts online without leveraging the unique capabilities of the digital medium. This leaves users with several key challenges:

| User Problem | Struggling Moment Example |
| :--- | :--- |
| **Information Overload** | "I see my chart has a lot of 'Fire' and something called 'Hurting Officer', but what does that actually mean for my career choice *right now*?" |
| **Lack of Quantifiable Insight** | "My 'luck pillar' is changing. Is this a big deal or a small one? Is it a 10% improvement in my luck or an 80%? How does it compare to last year?" |
| **Absence of Actionable Advice** | "The analysis says I 'need Water'. What am I supposed to do with that information? Should I move to the coast? Wear blue?" |
| **Static, Lifeless Reports** | "I get a one-time PDF report, but I can't see how my fortune fluctuates over time. I want to see the trends, the highs, and the lows." |

Our engine directly addresses these struggling moments by providing quantitative scoring, dynamic visualizations, and concrete, tagged recommendations, turning abstract concepts into a tangible tool for self-discovery and strategic planning.

## 3. Core Precision Requirements (The Foundation)

To be a trusted engine, our calculations must be precise and transparent, incorporating established astrological and astronomical standards.

1.  **True Solar Time (真太阳时)**: Bazi requires birth time based on the sun's actual position, not civil time. The engine must convert local standard time to true solar time.
    -   **Formula**: `TrueSolarTime = LocalStandardTime + (4 * (StandardMeridian - Longitude)) + EquationOfTime` [4]
    -   This ensures the hour pillar is accurate, which is critical for the entire analysis.

2.  **Solar Terms (节气)**: The transition between Chinese calendar months is defined by solar terms, not the new moon. Our engine must calculate these terms with high precision.
    -   **Precision**: We will use a high-precision astronomical algorithm (e.g., VSOP87) to determine the exact moment the sun reaches a new ecliptic longitude (multiples of 15°), ensuring minute-level accuracy for month pillar determination [5].

3.  **Four Pillars & Hidden Stems (四柱藏干)**: The engine will generate the standard Four Pillars. For each Earthly Branch, it will decompose it into its constituent hidden Heavenly Stems with their relative strengths, which is crucial for the Five Elements quantification.
    -   **Example Weighting**: The branch `戌` contains `戊` (Earth), `辛` (Metal), and `丁` (Fire). These will be assigned weights, for example: `戊` (0.6), `辛` (0.3), `丁` (0.1) [6].

4.  **Ten Gods (十神)**: The engine will compute the relationships between each Heavenly Stem and the Day Master to derive the Ten Gods (e.g., 比肩, 伤官, 正财), which form the basis of personality and event analysis.

## 4. Domain Models & Data Structures (TypeScript)

These complete TypeScript interfaces define the data contracts for the entire engine, ensuring type safety and developer clarity.

```typescript
// ----------------
// INPUT & CORE CHART
// ----------------

/** Represents the user's initial birth information. */
interface BirthData {
  gregorianDate: string; // ISO 8601 format, e.g., "1996-08-23T12:30:00"
  longitude: number;     // e.g., -122.4194 for San Francisco
  gender: 'Male' | 'Female';
}

/** Represents a single Pillar (年/月/日/时柱) in the Bazi chart. */
interface Pillar {
  heavenlyStem: string; // 天干 (e.g., '丙')
  earthlyBranch: string; // 地支 (e.g., '子')
  hiddenStems: { stem: string; weight: number; }[]; // 藏干及其权重, e.g., [{ stem: '癸', weight: 1.0 }]
}

/** The foundational, calculated Bazi chart structure. */
interface BaziChart {
  birthData: BirthData;
  trueSolarTime: string; // 校正后的真太阳时
  solarTermsTime: string; // 节气交接精确时间
  
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;     // 日柱 (日主)
  hourPillar: Pillar;
  
  tenGods: { [key in 'year' | 'month' | 'day' | 'hour']: string[] }; // 十神
  
  tenYearLuckPillars: { // 大运
    startAge: number;
    endAge: number;
    pillar: Pillar;
  }[];
}

// ----------------
// FEATURE MODELS
// ----------------

/** A single point on the Life K-Line, representing one year's luck. */
interface LuckScorePoint {
  year: number;
  age: number;
  yearlyPillar: Pillar;
  tenYearLuckPillar: Pillar;
  score: number; // 综合运势评分 (0-100)
  trend: 'up' | 'down' | 'stable';
}

/** The complete Five Elements energy profile. */
interface FiveElementsWeight {
  wood: number; // (0-100)
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

/** Analysis of the chart's strength and resulting 'Useful God'. */
interface UsefulGodAnalysis {
  dayMasterStrength: 'Strong' | 'Weak' | 'Vibrant' | 'Follow';
  pattern: string; // 格局 (e.g., '伤官配印')
  favorableGods: string[]; // 喜神 (e.g., ['火', '土'])
  unfavorableGods: string[]; // 忌神 (e.g., ['金', '水'])
}

/** Actionable advice based on the Useful God analysis. */
interface Advice {
  accessories: { name: string; reason: string; }[];
  directions: string[];
  colors: string[];
  notes?: string; // Additional context or explanation
}

/** Structured tags for career and wealth insights. */
interface InsightTags {
  career: string[];
  wealth: string[];
  personality: string[];
}

// ----------------
// FINAL OUTPUT
// ----------------

/** The complete, structured report generated by the engine. */
interface FullReport {
  baziChart: BaziChart;
  lifeKline: LuckScorePoint[];
  fiveElements: FiveElementsWeight;
  usefulGod: UsefulGodAnalysis;
  actionableAdvice: Advice;
  insightTags: InsightTags;
}
```

## 5. Algorithm Strategy

This section outlines the strategic approach for our core calculation logic. The `CalculationEngine` will be a pure, stateless function library.

### 5.1. Luck Scoring Algorithm (Life K-Line)

The annual `score` (0-100) is a weighted sum of several factors, following a multi-step process:

1.  **Identify Active Elements**: For a given year, identify the key interacting elements: Day Master, 10-Year Luck Pillar, and Yearly Pillar.
2.  **Evaluate Interactions (生克冲合)**: Assess the relationship between the Yearly Pillar and the other elements. Favorable interactions (e.g., the Yearly Pillar's element is a `喜神` for the Day Master, or it forms a positive combination `合` with the Luck Pillar) generate positive points. Adverse interactions (clashes `冲`, harms `害`) generate negative points.
3.  **Score Components**: Assign points for each interaction. For example: `喜神` appearing might be +15, a `天合地合` with the Luck Pillar +20, a `天克地冲` with the Natal Day Pillar -25. These values must be tunable.
4.  **Weight by Strength**: The impact of an interaction is weighted by the strength of the elements involved. A clash with a weak, unfavorable element in the natal chart is less severe than a clash with a strong, favorable one.
5.  **Normalize**: The raw score is normalized to a 0-100 scale. An initial mapping could be that a raw score of 0 (perfectly balanced good and bad) translates to a final score of 50.
6.  **Trend**: The `trend` is determined by comparing the current year's `score` to the previous year's.

### 5.2. Five Elements Quantification Algorithm

This is not a simple count. The percentage for each element is determined by:

1.  **Month Branch (月令)**: The element in the month's Earthly Branch is the most powerful, receiving a baseline weight of **~40-50%** of the total energy.
2.  **Stem Strength**: Heavenly Stems in the four pillars contribute directly to their element's score.
3.  **Branch Strength (得地)**: Earthly Branches that contain an element (either as a main Qi or in the hidden stems) provide a 

### 5.3. Useful God (喜用神) Determination Algorithm

This is the most challenging piece of logic, requiring a multi-step process:

1.  **Calculate Day Master Strength**: Sum the supporting elements (same as Day Master and the one that produces it) vs. the draining elements, heavily weighting the Month Branch.
2.  **Identify Chart Pattern (格局)**: Based on the most prominent Ten God in the Month Pillar and its interactions, identify the primary pattern (e.g., `Direct Officer`, `Eating God`, `Seven Killings`).
3.  **Apply Rules**: Based on the combination of Day Master strength and Pattern, apply classical Bazi rules:
    -   **Strong Chart**: `用神` is typically a draining element (Wealth, Officer, Output).
    -   **Weak Chart**: `用神` is typically a supporting element (Resource, Friend).
    -   **Special Patterns (从格)**: If the Day Master is extremely weak and surrounded by a dominant element, it may "follow" that element, completely changing the rules.
    -   **Climate Adjustment (调候)**: Consider the birth month to see if specific elements are needed for balance (e.g., a chart born in winter may need 'Fire' for warmth regardless of strength).

## 6. API Interface & LLM Integration

### 6.1. API Design

The system will expose a single, powerful endpoint for core analysis, promoting simplicity and efficiency.

**Endpoint**: `POST /api/v1/analyze`

**Request Body** (`BirthData`):
```json
{
  "gregorianDate": "1996-08-23T12:30:00",
  "longitude": -122.4194, // San Francisco
  "gender": "Male"
}
```

**Response Body** (`FullReport`):
- The endpoint will return the complete `FullReport` object as defined in the Domain Models section.

### 6.2. LLM Integration Strategy (InterpretationLayer)

The core engine produces structured data, NOT narrative reports. The narrative is the job of a large language model (LLM), ensuring a clean separation of concerns.

1.  **CalculationEngine**: `BirthData` -> `FullReport` (JSON data).
2.  **InterpretationLayer**: Takes the `FullReport` JSON and a user's natural language query.
3.  **Prompt Construction**: Dynamically constructs a detailed prompt for a selected LLM provider (e.g., DeepSeek, Gemini).
4.  **LLM Call**: Sends the prompt to the appropriate LLM API.
5.  **Stream Response**: Streams the LLM's narrative analysis back to the user.

**Refined LLM Prompt Template**:

```
# Role
你是一位兼具传统命理学深厚造诣与现代数据科学思维的八字分析大师。请基于以下提供的【结构化命盘数据】和【用户当前背景】，为用户提供一次专业、深刻、且富有同理心的命理分析。不要说套话、空话，要直指核心，给出能落地的建议。

# 结构化命盘数据 (由 Modern Bazi Insight Engine 生成)

## 1. 核心命盘
- **八字**: {baziChart.yearPillar.heavenlyStem}{baziChart.yearPillar.earthlyBranch} {baziChart.monthPillar.heavenlyStem}{baziChart.monthPillar.earthlyBranch} {baziChart.dayPillar.heavenlyStem}{baziChart.dayPillar.earthlyBranch} {baziChart.hourPillar.heavenlyStem}{baziChart.hourPillar.earthlyBranch}
- **性别**: {baziChart.birthData.gender}
- **日主**: {baziChart.dayPillar.heavenlyStem}
- **格局**: {usefulGod.pattern}
- **旺衰**: {usefulGod.dayMasterStrength}
- **喜用神**: 喜({usefulGod.favorableGods.join(', ')}), 忌({usefulGod.unfavorableGods.join(', ')})

## 2. 五行能量 (0-100%)
- **金**: {fiveElements.metal}%
- **木**: {fiveElements.wood}%
- **水**: {fiveElements.water}%
- **火**: {fiveElements.fire}%
- **土**: {fiveElements.earth}%

## 3. 大运与流年
- **当前大运**: {currentLuckPillar.pillar.heavenlyStem}{currentLuckPillar.pillar.earthlyBranch} ({currentLuckPillar.startAge}-{currentLuckPillar.endAge}岁)
- **今年流年**: {currentYear.yearlyPillar.heavenlyStem}{currentYear.yearlyPillar.earthlyBranch} (运势评分: {currentYear.score}/100)
- **人生K线高峰**: {peakYear.year}年 ({peakYear.age}岁), 评分为 {peakYear.score}/100
- **人生K线低谷**: {lowYear.year}年 ({lowYear.age}岁), 评分为 {lowYear.score}/100

## 4. 核心特征标签
- **事业**: {insightTags.career.join(', ')}
- **财富**: {insightTags.wealth.join(', ')}
- **性格**: {insightTags.personality.join(', ')}

# 用户当前背景与问题

"""
{user_query_here}
"""

# 分析要求

请严格依据以上数据，结合八字古籍理论（如《滴天髓》、《子平真诠》）和用户的现实情况，进行全面分析。请重点分析用户关心的【事业财运】和【未来发展】，并预测其【财富等级】。请给出客观、坦率的评价，即使有负面信息也不要回避。
```

## 7. Pricing Strategy

Our pricing strategy will be value-based, designed to reduce initial friction while creating a clear path to monetization for our most valuable features. We will adopt a Freemium model inspired by MetaSight and Grammarly.

> As Albert Cheng of Grammarly noted, "What if we actually sampled a number of different paid suggestions and interspersed them to free users across their writing? All of a sudden, people were seeing Grammarly as a much more powerful tool." [7]

We will apply this by giving free users a taste of the premium experience.

| Tier | Price (USD) | Target User | Key Features & Limits |
| :--- | :--- | :--- | :--- |
| **Free Explorer** | $0 | **Curious Individuals** | - Full Bazi Chart Plotting<br>- Basic Five Elements Distribution (no weights)<br>- **5** AI-powered deep analysis queries per month<br>- *Sample* of Life K-Line (shows only past 5 years and next 1 year) |
| **Pro Insight** | $19.99/month | **Enthusiasts & Self-Improvers** | - **Full Life K-Line** (1-100 years)<br>- Advanced Five Elements Quantification (with weights)<br>- Full Useful God & Actionable Advice<br>- **100** AI-powered deep analysis queries per month<br>- Access to multiple LLM providers (DeepSeek, Gemini) |
| **Business API** | Custom | **Developers & B2B Partners** | - Full API access to the `CalculationEngine`<br>- Volume-based pricing for `analyze` endpoint<br>- Dedicated support |

This tiered approach allows us to capture a wide user base with a compelling free offering, while the **Life K-Line** serves as the primary driver for conversion to the Pro tier. The pricing is designed to be a "two-way door," easily adjustable as we gather more data on user willingness to pay [7].

## 8. Tech Stack & Architecture

### 8.1. Recommended Tech Stack

- **Language**: TypeScript (Strict Mode)
- **Runtime**: Node.js (LTS version)
- **Framework (Optional)**: A lightweight framework like Fastify or Express for the API layer.
- **Testing**: Vitest for unit and integration testing of the `CalculationEngine`.

### 8.2. Architecture Principles

As requested, the architecture must be decoupled to ensure maintainability and scalability.

> As noted by Ryan Singer, a well-shaped spec should clarify the "electricity in the walls" [1]. Our architecture defines the core electrical currents of the system.

1.  **`CalculationEngine` (The Core)**
    -   **Responsibility**: All pure Bazi calculations. This includes `BaziChart` generation, `LuckScorePoint` calculation, `FiveElementsWeight` analysis, and `UsefulGod` determination.
    -   **Characteristics**: Stateless, pure functions. It takes data in (`BirthData`) and outputs structured data (`FullReport`). It has zero knowledge of APIs, databases, or LLMs.
    -   **Location**: `/src/engine`

2.  **`InterpretationLayer` (The Bridge)**
    -   **Responsibility**: To act as a bridge between the raw data from the `CalculationEngine` and the narrative power of LLMs.
    -   **Characteristics**: Manages the construction of detailed, context-aware prompts using the `FullReport` data and the user's query. It handles communication with external LLM services (DeepSeek, Gemini, etc.).
    -   **Location**: `/src/interpreter`

3.  **`APIServer` (The Gateway)**
    -   **Responsibility**: Exposes the functionality to the outside world via a RESTful API.
    -   **Characteristics**: Handles HTTP requests, validation (using a library like Zod), and routing. It calls the `CalculationEngine` and then the `InterpretationLayer` to generate the final user-facing response.
    -   **Location**: `/src/api`

This decoupled design ensures that the core Bazi logic can be tested in isolation and that we can swap out LLM providers or API frameworks with minimal impact on the core product.

## 9. References

[1] Singer, R. (n.d.). *Shaping Up*. Basecamp. Retrieved from https://basecamp.com/shapeup
[2] Life K-Line AI. (2026). *人生K线*. Retrieved from https://www.lifekline.ai/
[3] MetaSight. (2026). *MetaSight - 新一代 AI 命理系统*. Retrieved from https://metasight.cloud/zh
[4] BaZi Lab. (n.d.). *True Solar Time Calculator*. Retrieved from https://www.bazi-lab.com/true-solar-time
[5] United States Naval Observatory. (n.d.). *Astronomical Almanac*. Data derived from VSOP87 theory.
[6] Imperial Harvest. (n.d.). *The 10 Gods (十神) in Chinese Metaphysics*. Retrieved from https://imperialharvest.com/blog/10-gods/
[7] First Round Review. (n.d.). *Pricing Strategy Insights*. Based on interviews with 46 product leaders.
