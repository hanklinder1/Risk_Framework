# Risk Framework Tab

BMW x Clemson Data Valuation Project — Risk Scoring Tool

A live, reactive risk scoring dashboard that analyzes VSS (Video Surveillance System) text output against a six-attribute confidentiality risk model aligned with BMW's ICL (Information Classification and Labeling) process.

## Quick Start

**Prerequisites:** [Node.js](https://nodejs.org/) v18 or higher

```bash
git clone https://github.com/hanklinder1/Risk_Framework.git
cd Risk_Framework
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

## How It Works

1. Paste a VSS scene description (or select a built-in demo scenario)
2. The scoring engine scans the text against keyword libraries for six risk attributes
3. Attribute cards populate one-by-one showing matched keywords and signal scores
4. A running total builds to the final Risk Score (0–100)
5. The score maps to a BMW ICL classification level
6. A four-section BMW Risk Assessment Report generates automatically

## Scoring Model

**Equation:** `Risk Score = 100 × Σ(wi × si)` where `wi` is the fixed attribute weight and `si` is the signal score (0.0–1.0) derived from keyword matching.

| # | Attribute | Weight |
|---|-----------|--------|
| 1 | Process Transparency | 0.25 |
| 2 | Equipment Visibility | 0.20 |
| 3 | Process Stage Sensitivity | 0.15 |
| 4 | Proprietary Method Exposure | 0.15 |
| 5 | Human Exposure | 0.15 |
| 6 | Sensitive Data Visibility | 0.10 |

**ICL Classification:**

| Score | ICL Level | Color |
|-------|-----------|-------|
| 0–25 | Not Public | Green |
| 26–45 | Confidential | Yellow |
| 46–70 | Strictly Confidential | Orange |
| 71–100 | Secret | Red |

**Maximum Principle:** If any single signal score ≥ 0.85, the ICL level escalates one level automatically.

**Escalation Flags:** Third Party Presence and Critical Data Detection run independently and require analyst confirmation.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4

## Build for Production

```bash
npm run build
npm run preview
```
