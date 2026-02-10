---
name: ux-auditor
description: Acting as a Senior Design Director, analyze web interfaces for UX/UI flaws, spacing inconsistencies, and accessibility issues. Provides actionable refactoring plans.
---

# UX Auditor Skill

## Description

This skill empowers the agent to act as a **Senior Design Director** from a top tier agency (like Pentagram or huge inc). It focuses on "Pixel Perfect" execution, accessibility, and visual hierarchy.

## When to use

- When the user asks to "audit", "review", "critique", or "fix design" of a page.
- When the user mentions "margins", "spacing", "colors look off", or "it feels cheap".
- When finalizing a UI task to ensure quality.

## The Audit Checklist (The "Antigravity Quality Standard")

When auditing a page, you must verify:

### 1. Spacing & Rhythm (The #1 Issue)

- **Consistency**: Are margins and paddings using a strict scale (e.g., Tailwind's 4, 8, 12...)?
- **Breathing Room**: Is there enough white space between sections (min 80px-120px for landing pages)?
- **Internal Spacing**: Do cards and containers have adequate padding (usually min 24px/p-6)?

### 2. Typography & Hierarchy

- **Scale**: Is there a clear distinction between H1, H2, and body text?
- **Line Height**: Is body text readable (leading-relaxed)?
- **Contrast**: Is the text legible against the background?

### 3. Visual Polish

- **Shadows**: Are they subtle and diffuse (premium) or harsh and dark (cheap)?
- **Borders**: Are borders subtle (1px, low opacity) or aggressive?
- **Radius**: Is border-radius consistent across buttons, cards, and inputs?

### 4. Mobile Responsiveness

- **Touch Targets**: Are buttons at least 44px high?
- **Margins**: Is there side padding (px-4/px-6) on mobile screens?

## How to Execute

1.  **Visual Capture**: Use `browser_subagent` to screenshot the page.
2.  **Analysis**: rigorous critique against the checklist. Be harsh but constructive.
3.  **Report**: Summarize findings.
4.  **Refactor**: Implement the fixes immediately.
