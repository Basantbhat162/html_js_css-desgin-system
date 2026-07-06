# Component Catalog

All components must be original, scoped with `eds-`, and designed for Elementor HTML widgets. Use cards only for repeated objects. For section structure, prefer whitespace, type hierarchy, alignment, and one restrained accent treatment. Use modern libraries such as Preline/Tailwind as pattern references only; translate the discipline into plain HTML/CSS/JS.

## Component API Rules

- Use a base class for structure and a modifier for intent: `.eds-btn` plus `.eds-btn--primary`, `.eds-notice` plus `.eds-notice--success`.
- Keep base classes neutral; variants own color, state, and emphasis.
- Keep hover, focus, active, disabled, and loading behavior inside the component contract.
- Do not invent one-off hover colors in page sections. If a state repeats, promote it to a token or variant.
- Use `aria-pressed` for toggle filters and amount cells; use `aria-selected` only for real tabs.

## Base Section

Every component should live inside a unique wrapper:

```html
<section class="eds-section eds-product-strip" aria-labelledby="eds-product-strip-title">
  <div class="eds-container">
    ...
  </div>
</section>
```

```css
.eds-section,
.eds-section * {
  box-sizing: border-box;
}

.eds-container {
  width: min(100%, 1180px);
  margin-inline: auto;
  padding-inline: var(--eds-space-4);
}

@media (min-width: 600px) {
  .eds-container { padding-inline: var(--eds-space-6); }
}
```

## Section Header

Use when a section needs orientation.

Required:

- One heading.
- Optional short supporting line only if it adds new information.
- Optional action only when it is the next useful step.

Avoid:

- Cards around headers.
- Generic subtitles that restate the heading.
- Multiple badges, counters, and CTAs before the actual content.

## Buttons

Use real `<a>` or `<button>` elements.

Variants:

- Primary: blue fill, white text, for the one main action.
- Secondary: white fill, blue/black text, border.
- Plain: transparent or soft surface, black/blue text, for low-emphasis actions.
- Icon: visible label or `aria-label`.

Standards:

- Minimum height `44px`; preferred commerce CTA `46-52px`.
- Radius should usually be `6px`, not a large pill.
- Use `touch-action: manipulation`.
- Include `:focus-visible`, `:hover` for pointer devices, `:active` press feedback.
- Primary hover must keep white text and move to darker blue. Do not let Elementor/theme link styles turn primary button text blue.
- Secondary hover may use soft blue surface, blue border, and blue text.
- Use `@media (hover: none)` to neutralize lift effects on touch devices when needed.
- Disable submit buttons during JS actions and show text change or spinner.

## Product Card

Use for top-ups, gift cards, games, offers, vouchers, subscriptions, and related products.

Required:

- Product image, product mark, or stable reserved media area.
- Product title.
- Category, region, or metadata.
- Price/value/status if applicable.
- Primary action.

Optional:

- Discount badge.
- Trust cue: instant delivery, verified, secure.
- Rating/sold count only when real data is available.

Mobile behavior:

- Cards can be 2-column only if content remains readable at `320px`; otherwise use single-column horizontal rows.
- Preserve image aspect ratio.
- Keep CTA visible without forcing huge cards.
- Show only one direct action on the card. Move details, share, wishlist, and secondary actions to the product page or a compact menu.
- Do not add a border, shadow, badge, and tinted surface all at once. Pick the minimum needed.

## Product List Row

Use when density matters more than image drama.

Required:

- Compact image or product mark.
- Product name.
- One metadata line.
- Price/value or status.
- One action.

Mobile behavior:

- Use `grid-template-columns: 72px 1fr`.
- Allow title wrapping before shrinking text.
- Keep the action below or right-aligned depending on available width.

## Category Chips and Tiles

Use when users need fast browsing.

- Chips: horizontal scroll on mobile with `scroll-snap-type: x proximity`.
- Tiles: 2-column mobile grid, 3-4 columns tablet, 5-6 columns desktop.
- Active category uses blue background, blue outline, or blue underline, not multiple treatments.
- Include icons only if they are inline SVG or existing site assets; do not use emoji as structural icons.
- Do not use rounded capsule pills by default. Use small-radius chips unless the surrounding design explicitly calls for capsules.

## Search Bar

Use for product-heavy sections.

- Full-width on mobile.
- Search input height `48-56px`.
- Include visible label or `aria-label`.
- Debounce JS filtering at `150-250ms`.
- Show recent/popular suggestions for empty query when useful.
- Show helpful no-results state with reset action.
- Keep search visually dominant only when discovery is the section's main job.

## Trust Strip

Use compact trust cues near conversion points.

Examples:

- Instant delivery
- Secure checkout
- Verified products
- 24/7 support

Rules:

- Keep each item under 4 words when possible.
- Use a single blue accent mark, selected state, or filled control.
- Do not place decorative vertical color rails beside trust, status, or note text.
- On mobile, use a 2-column grid or inline row; do not stack into a long wall.
- Do not invent proof. Use generic trust cues only when they are true for the business.

## Sticky Mobile CTA

Use for high-conversion product/detail sections.

- Fixed to bottom only when it materially helps conversion.
- Respect safe areas: `padding-bottom: max(12px, env(safe-area-inset-bottom))`.
- Add body/section bottom padding so content is not hidden.
- Include price/summary and one CTA.
- Do not add secondary links inside the sticky bar.

## Tabs and Segmented Controls

Use for 2-5 in-context choices such as product type, region, amount, or payment method.

- Use buttons inside a `role="tablist"` only if panels switch content.
- Use `aria-selected`, `aria-controls`, and keyboard support for true tabs.
- For simple filters, buttons with `aria-pressed` are enough.
- Keep tab labels short; allow horizontal scroll on small screens.
- Prefer underline tabs for panels and filled chips for filters.
- Vanilla JS should only toggle `aria-selected`, `hidden` or an active class, and panel visibility.
- Do not use inset segmented controls for top-level page navigation. Use links, underline nav, sidebar, or simple category rows.

## Accordions and FAQ

- Use native `<details>` and `<summary>` where possible.
- Keep answers concise.
- Add structured spacing and a single divider or border, not nested cards.
- Do not animate height with expensive layout loops; CSS grid or max-height is acceptable for small content only.

## Forms

- Every input needs a visible label.
- Use `type`, `inputmode`, `autocomplete`, and `aria-describedby`.
- Use `:focus-within` on field wrappers for stable focus rings.
- Use helper text for format guidance, not placeholder-only labels.
- Show errors below the field and announce with `role="alert"` or `aria-live`.
- Validate on blur or submit, not aggressively on every keystroke.
- Primary submit button must show loading and prevent double submission.

## Loading, Empty, Error

- Loading: skeleton for product rows/cards or buttons when waiting over `300ms`.
- Skeletons must reserve final content space and animate only background position or opacity.
- Empty: explain what is missing and provide a next action.
- Error: state what failed and how to recover.
- Never leave blank white space as the only state.

## Notices and Toasts

- Use notices inline when the message affects the current form, checkout, product, or state.
- Use toasts only for transient confirmation or background events.
- Include `role="status"` or `aria-live="polite"` for non-urgent success; use `role="alert"` for errors.
- Dismiss buttons need visible labels or `aria-label`.
- Toast removal should animate opacity/transform only, then set `hidden` in JS after the transition.

## Motion

- Animate only `transform` and `opacity`.
- Keep hover/press feedback `80-180ms`; keep entrance motion under `500ms`.
- Do not animate height, width, top, left, borders, or layout-dependent values.
- Do not rely on animation to reveal required content or set functional state.
- Avoid global `prefers-reduced-motion` rules that collapse every transition to `.01ms`; if a reduced-motion rule is needed, remove only decorative entrance motion and keep the static layout identical.
