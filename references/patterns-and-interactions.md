# Patterns and Interactions

## Mobile-First Layout

- Start at `320px`.
- Default to single-column flow.
- Use 2-column grids only when each item still has readable text and a clear CTA.
- Use horizontal chip scroll for categories; it is better than cramped multi-row filters.
- Constrain desktop content to `1040-1180px`; do not stretch text or cards endlessly.
- Use page bands, whitespace, and type hierarchy before adding panels.

## Commerce Discovery Pattern

Use for game top-ups, gift cards, subscriptions, vouchers, and digital products:

1. Header: title, short utility copy, optional trust cue.
2. Search: full-width on mobile.
3. Category controls: scrollable pills or tiles.
4. Product grid/list: cards with stable image area.
5. Offer details: discount/status badge only if meaningful.
6. CTA: compact buy/top-up action.

Delete anything that does not help this flow. Product discovery pages become AI-looking when every metric, badge, and secondary action is visible at once.

## Interaction Timing

- Press feedback: `80-150ms`.
- Hover/focus transition: `150-220ms`.
- Panel open/close: `220-320ms`.
- Avoid UI animations over `500ms`.
- Animate `opacity` and `transform`; avoid animating width, height, top, left, or layout-heavy properties.
- Keep all required content and states visible without animation; motion should enhance, not control the interface.
- Do not use a global reduced-motion rule that forces every transition to `.01ms`, because OS visual-effect settings can make the interface feel broken.
- Avoid hover transforms on containers that can overlap neighboring content. Apply lift only to buttons, chips, cards with reserved spacing, or isolated objects.
- Use `will-change: transform` sparingly and only on elements that actually animate.

```css
@media (prefers-reduced-motion: reduce) {
  .eds-section *,
  .eds-section *::before,
  .eds-section *::after {
    animation: none !important;
    scroll-behavior: auto !important;
  }
}
```

Only include the reduced-motion block when there is decorative entrance motion to remove. Do not remove hover, focus, press, or loading-state feedback unless the static state remains equally clear.

## Vanilla JS Patterns

- Keep JS as progressive enhancement; the HTML should remain readable without it.
- For tabs, toggle `aria-selected` on tabs and one active class or `hidden` on panels.
- For filters and amount selectors, toggle `aria-pressed`; do not rewrite markup.
- For toasts, add an exit class, wait for the transition duration, then set `hidden`.
- For loading buttons, set `disabled`, update the label, and restore state after the async action.
- Do not measure heights or animate layout in JS unless there is no simpler CSS/HTML pattern.

## Accessibility Defaults

- Use `h2` for section titles unless the section is the page hero.
- Keep heading order sequential.
- Use `aria-label` for icon-only buttons.
- Use `aria-live="polite"` for result counts, toasts, and async feedback.
- Use `role="alert"` for validation errors.
- Make focus visible with `box-shadow: var(--eds-focus)`.
- Do not remove browser focus outlines without a replacement.

## Content Rules

- UI copy should be short and specific.
- Button text should state the result: `Buy now`, `View offers`, `Apply filter`, `Reset search`.
- Empty states should tell users what to do next.
- Error states should include recovery: retry, edit input, reset filters, contact support.
- Avoid lorem ipsum and fake filler. Use realistic neutral example content only when a preview needs sample data.

## Anti-Patterns

- Dark mode variants.
- Purple/blue gradient hero defaults.
- Decorative orbs, blob backgrounds, bokeh, or overused glass panels.
- Over-carded layouts where every group floats in a bordered box.
- Over-bordered layouts where every heading, row, sidebar, and card has a divider.
- Top-level action clutter: view, copy, share, save, compare, delete, and buy all shown together.
- Inset segmented controls used as whole-page navigation.
- Subheadings that say what the heading already says.
- Emoji icons for navigation, trust, category, or status.
- Placeholder-only form labels.
- Hover-only interactions on mobile.
- Generic AI sections with three cards, vague copy, and no real workflow.
- Nested cards inside cards.
- Whole sections placed in floating cards.
- Arbitrary raw colors inside components instead of tokens.
