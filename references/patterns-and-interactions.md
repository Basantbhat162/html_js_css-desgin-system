# Patterns and Interactions

How to compose the shipped components (`dist/eds.css` + `dist/eds.js`) into pages, and the interaction rules the library follows. Component-level contracts live in `references/component-catalog.md`.

## Mobile-First Layout

- Start at `320px`. Every composition must work there without shrinking text or hiding the main action.
- Default to single-column flow (`.eds-stack-*`); use `.eds-grid-2` only when each item keeps readable text and a clear CTA.
- Use `.eds-chip-scroll` for categories — horizontal chip scroll beats cramped multi-row filters.
- Desktop content is constrained by `.eds-container` (1140px) / `--narrow` (760px); do not stretch text or cards endlessly.
- Use page bands (`.eds-section`, `--sunken`), whitespace, and type hierarchy before adding panels or borders.

## Commerce Discovery Pattern

Use for game top-ups, gift cards, subscriptions, vouchers, and digital products — composed entirely from shipped components:

1. Header: `.eds-section-header` — title, short utility copy, optional `.eds-trust-chip`.
2. Search: `.eds-search` with `data-eds-search`, full-width on mobile.
3. Category controls: `.eds-chip-scroll` with `data-eds-filter`, or `.eds-tile` grid.
4. Product grid/list: `.eds-product-card` in `.eds-grid-2`, or `.eds-product-row` for density.
5. Offer details: `.eds-badge` only when the discount/status is meaningful.
6. CTA: one `.eds-btn--primary` per card; `.eds-sticky-cta` on detail pages.

Delete anything that does not help this flow. Discovery pages become AI-looking when every metric, badge, and secondary action is visible at once.

## Interaction Timing

The library's motion tokens (`--eds-duration-*`, `--eds-ease`) encode these rules:

- Press feedback: `80-150ms`.
- Hover/focus transition: `150-220ms`.
- Panel open/close: `220-320ms`.
- Nothing over `500ms`.
- Animate `opacity` and `transform` only; never width, height, top, left, or layout-heavy properties.
- All required content and states stay visible without animation; motion enhances, never controls.
- Avoid hover transforms on containers that can overlap neighbors. Lift only buttons, chips, and cards with reserved spacing (`.eds-card--interactive` reserves it).
- `will-change: transform` sparingly, only on elements that actually animate.

Reduced motion: `dist/eds.css` ships a scoped `prefers-reduced-motion` rule that removes decorative entrance motion only. Do not add a global rule forcing every transition to `.01ms` — it kills hover/focus/press feedback and feels broken with OS visual-effect settings.

## Vanilla JS Patterns

`dist/eds.js` implements these; follow them for any custom behavior too:

- JS is progressive enhancement; HTML stays readable without it (accordion and modal are native elements first).
- Tabs toggle `aria-selected` and panel `hidden` — nothing else.
- Filters and steppers toggle `aria-pressed` / input value; markup is never rewritten.
- Toasts add an exit class, wait for the transition, then hide.
- Loading buttons set `disabled`, swap the label (`data-eds-loading`), and restore state after the action.
- No height measuring or layout animation in JS unless there is no simpler CSS/HTML pattern.
- After injecting dynamic markup, call `EDS.init(container)` to bind behaviors on the new nodes.

## Accessibility Defaults

- `h2` for section titles unless the section is the page hero; keep heading order sequential.
- `aria-label` for icon-only buttons.
- `aria-live="polite"` for result counts, toasts, and async feedback (search and toast region do this automatically).
- `role="alert"` for validation errors.
- Focus is visible via the shared focus ring token (`--eds-focus`); never remove outlines without a replacement.

## Content Rules

- UI copy short and specific.
- Button text states the result: `Buy now`, `Check ID`, `View offers`, `Reset filters`.
- Empty states tell users what to do next (`data-eds-search-empty` pattern includes a reset action).
- Error states include recovery: retry, edit input, reset filters, contact support.
- No lorem ipsum or fake filler; realistic neutral example content only when a preview needs sample data.

## Anti-Patterns

- Dark mode variants.
- Purple/blue gradient hero defaults, decorative orbs, blobs, bokeh, glass panels.
- Over-carded layouts (every group in a bordered box) and over-bordered layouts (dividers everywhere).
- Nested cards; whole sections in floating cards.
- Top-level action clutter: view, copy, share, save, compare, delete, and buy all visible together — overflow into `data-eds-menu`.
- Inset segmented controls as whole-page navigation.
- Subheadings that restate the heading.
- Emoji icons for navigation, trust, category, or status.
- Placeholder-only form labels.
- Hover-only interactions on mobile.
- Arbitrary raw colors inside components instead of tokens.
- Generic AI sections: three cards, vague copy, no real workflow.
