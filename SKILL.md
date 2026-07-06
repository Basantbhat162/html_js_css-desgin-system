---
name: elementor-design-system
description: Reusable white-theme design system and component library for WordPress + Elementor custom HTML widgets. Use when building, improving, reviewing, or extending HTML/CSS/JavaScript sections for Elementor; creating reusable UI components, design tokens, layout standards, commerce/product grids, cards, navigation, forms, search, tabs, accordions, micro-interactions, responsive behavior, accessibility checks, or adding new patterns back into the library. Optimized for mobile-first websites using blue, white, and black brand styling with system fonts only.
---

# Elementor Design System

Use this skill to create premium, mobile-first Elementor sections with custom HTML, CSS, and JavaScript. Treat it as a living UI library: every useful new token, component, pattern, or implementation improvement should be folded back into the skill so future sections become more consistent.

## Operating Rules

- Build only with HTML, CSS, and vanilla JavaScript suitable for Elementor HTML widgets and Advanced -> Custom CSS.
- Use a white theme only. Do not add dark mode, cream/tan themes, purple-gradient defaults, decorative blobs, or soft rounded AI-card layouts.
- Use blue as the accent, white as the main surface, and black/near-black as the primary text.
- Use system fonts only: no Google Fonts, CDN fonts, icon fonts, or externally hosted assets unless the user explicitly provides them.
- Prefer a readable UI stack led by `"Segoe UI"` on Windows; avoid heavy `850/900` weights and excessive monospace labels.
- Treat modern component libraries as quality references only. Translate their patterns into plain HTML/CSS/JS; do not import Tailwind, Preline, React, CDNs, or framework classes.
- Build component APIs with a base class plus modifier classes, e.g. `.eds-btn` plus `.eds-btn--primary`, so state behavior stays consistent across projects.
- Make mobile the source layout. Enhance at `600px`, `840px`, and `1200px`.
- Prefer semantic HTML, real buttons/links/labels, visible focus states, and 44px minimum touch targets.
- Keep JavaScript optional and small. Use CSS for layout, states, and simple transitions.
- Never clone reference sites. Extract principles only: category browsing, compact commerce cards, trust signals, search, badges, and fast purchase flows.
- De-slop every UI before delivery: remove unnecessary cards, extra borders, redundant subheadings, top-level action clutter, fake stats, placeholder content, and default component-library patterns.

## Workflow

1. Identify the section job: product discovery, conversion, trust, navigation, form, content, or support.
2. Read `references/design-tokens.md` before writing CSS.
3. Read `references/component-catalog.md` when creating or modifying a component.
4. Read `references/elementor-implementation.md` before packaging code for Elementor.
5. Read `references/anti-slop-rules.md` before finalizing visual direction.
6. Read `references/patterns-and-interactions.md` for search, tabs, accordions, motion, loading, empty, and error states.
7. Read `references/library-growth.md` when adding a new reusable pattern to the skill.
8. Build with scoped class names prefixed by `eds-` to avoid Elementor/theme collisions.
9. Verify mobile widths first: `320`, `375`, `414`, then `768`, `1024`, `1440`.

## Design Direction

Default to a clean commerce/SaaS hybrid:

- White canvas, deliberate spacing, sharp type hierarchy, very few borders, and almost no shadows.
- Dense but readable mobile layouts, especially cards, categories, filters, and buy actions.
- Product-first hierarchy: image/title/value/action before long copy.
- Compact trust cues: instant delivery, secure checkout, verified/authentic, support.
- One strong accent treatment per section: blue CTA, active underline, progress line, or focused input.
- Hover and focus colors must follow the component contract: primary buttons stay white text on darker blue, secondary buttons may become blue-tinted, and destructive/success states use semantic colors only for state.
- Do not use decorative vertical color rails beside text blocks; they read as AI artifacts in this system.
- Original visual language over templates: use structure and rhythm from references, not their exact colors, copy, or composition.

## Quality Gate

Before delivery, check:

- No horizontal scroll at `320px`.
- Every section has one primary job and one obvious next action.
- Cards are used only for repeated product/content items, not for every block.
- Borders are used only where spacing/type cannot separate content clearly.
- Subheadings are deleted when they merely explain the heading.
- Top-level actions are limited to the actions users need immediately.
- Body text is at least `16px`; labels may be `12-14px`.
- All taps are at least `44x44px` with `8px` separation.
- Text contrast meets WCAG AA; black/near-black text on white is preferred.
- Animations use transform/opacity only, never carry layout state, and must remain visually stable even when OS visual effects or reduced-motion preferences are changed.
- Images reserve space with `aspect-ratio`, `width`, `height`, or stable containers.
- Forms have labels, helper/error text, correct input types, and accessible error announcements.
- Product cards show title, category/metadata, price/value if relevant, action, and a trust/discount/status cue only when useful.
- No placeholders, fake numbers, fake reviews, or invented trust claims remain.

## References

- `references/design-tokens.md` - CSS variables for color, typography, spacing, radius, shadow, z-index, and motion.
- `references/component-catalog.md` - Reusable Elementor-ready components and standards.
- `references/elementor-implementation.md` - How to structure HTML widget code, scoped CSS, and vanilla JS.
- `references/anti-slop-rules.md` - Visual quality gate for avoiding AI-looking UI.
- `references/patterns-and-interactions.md` - UX patterns, responsive behavior, accessibility, and motion rules.
- `references/reference-inspiration.md` - Principles extracted from the provided reference sites.
- `references/library-growth.md` - How to add new components and improvements back into this skill.
