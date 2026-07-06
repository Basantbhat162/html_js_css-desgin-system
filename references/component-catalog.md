# Component Catalog

Every component below ships as real code in `dist/eds.css` (styles) and `dist/eds.js` (behavior). Copy the markup shown, include the two dist files once per page, and it works. See `styleguide.html` for live rendered previews of everything here with copyable code.

Class convention: `eds-block`, `eds-block__element`, `eds-block--modifier`. Behavior binds to `data-eds-*` attributes, never to visual classes. Base classes stay neutral; variants own color, state, and emphasis.

## Layout Primitives

| Class | Purpose |
| --- | --- |
| `.eds-container` / `.eds-container--narrow` | Centered max-width wrapper with responsive gutters |
| `.eds-section` / `.eds-section--sunken` | Vertical page band; sunken variant uses the subtle background token |
| `.eds-section-header` | Title + optional utility copy + optional inline action |
| `.eds-stack-{1,2,3,4,5,6,8}` | Vertical flex stack with gap from the spacing scale |
| `.eds-row-{1,2,3,4,6}` + `--between`, `--center`, `--end`, `--nowrap` | Horizontal flex row with gap and alignment modifiers |
| `.eds-grid-2` | 1-column on mobile, 2-column from tablet up |
| `.eds-divider` | Single functional horizontal rule |

Section headers: one heading, optional short supporting line only if it adds new information, optional action only when it is the next useful step. No cards around headers, no subtitles that restate the heading.

## Text & Misc Utilities

`.eds-text-xs`, `.eds-text-sm`, `.eds-text-muted`, `.eds-text-faint`, `.eds-text-center`, `.eds-weight-medium`, `.eds-weight-semibold`, `.eds-tabular` (tabular numbers for prices), `.eds-mt-{2,4,6,8,12}`, `.eds-p-{4,6}`, `.eds-hide-mobile`, `.eds-visually-hidden`.

## Buttons — `.eds-btn`

Variants: `--primary`, `--secondary`, `--ghost`, `--danger`. Sizes: `--sm`, `--lg`. Width: `--full`.

```html
<button class="eds-btn eds-btn--primary">Buy now</button>
<a class="eds-btn eds-btn--secondary" href="/offers">View offers</a>
```

- Minimum touch height 44px; `touch-action: manipulation` built in.
- Primary hover darkens the background and keeps white text — theme link styles are overridden inside the component.
- Async: add `data-eds-loading="Processing…"` to the submit button and `data-eds-submit` to its `<form>`; JS disables the button and swaps the label during submit. `.eds-btn--loading` shows the inline spinner.
- One primary CTA per purchase flow. Secondary actions use `--ghost` or a menu.

## Badges & Chips

- `.eds-badge` + `--primary`, `--success`, `--warning`, `--danger` — small status/discount labels. Use only when the badge carries real meaning.
- `.eds-chip` / `.eds-chip--active` — filter/category pills. Wrap in `.eds-chip-scroll` for horizontal snap-scroll on mobile.
- `.eds-trust-chip` — inline trust cue (small icon + short text), no card, no border. Keep each under 4 words; never invent proof.

## Cards

- `.eds-card` — bordered surface for repeated objects only. `--interactive` adds hover lift, `--flush` removes padding for edge-to-edge media.
- `.eds-product-card` — stable media area (`aspect-ratio` reserved), title, metadata line, `.eds-price`, one CTA. Two-column at 320px only if content stays readable; otherwise use rows.
- `.eds-product-row` — compact horizontal product entry (`72px` media + content) for dense lists.
- `.eds-tile` — icon + label link tile for category navigation.
- `.eds-stat` — number + label pair; no card wrapper needed.

Never nest cards. Never wrap page headers, trust strips, or whole sections in cards. One direct action per card — move share/wishlist/details to a `data-eds-menu` or the product page.

## Forms

- `.eds-field` — label + control + optional help/error text. `--error` pairs with a `role="alert"` message below the field.
- `.eds-input`, `.eds-select`, `.eds-textarea` — bordered controls with the token focus ring. Always set `type`, `inputmode`, and `autocomplete`.
- `.eds-check` — checkbox/radio row with label.
- `.eds-qty` — quantity stepper: `data-eds-qty` wrapper, `data-eds-qty-dec` / `data-eds-qty-inc` buttons around a number input; JS clamps to min/max.
- `data-eds-submit` on a `<form>` — prevents double submission and drives the loading button.

Every input needs a visible `<label>`. Validate on blur or submit, not every keystroke.

## Tabs — `data-eds-tabs`

```html
<div class="eds-tabs" data-eds-tabs>
  <div class="eds-tabs__list" role="tablist" aria-label="Sections">
    <button class="eds-tabs__tab" role="tab" id="t1" aria-controls="p1">One</button>
    <button class="eds-tabs__tab" role="tab" id="t2" aria-controls="p2">Two</button>
  </div>
  <div class="eds-tabs__panel" role="tabpanel" id="p1" aria-labelledby="t1">…</div>
  <div class="eds-tabs__panel" role="tabpanel" id="p2" aria-labelledby="t2" hidden>…</div>
</div>
```

JS manages `aria-selected`, panel `hidden`, and arrow-key navigation. First tab is selected unless one has `aria-selected="true"` in the markup. Underline style, horizontal scroll on small screens. Never use tabs or inset segmented controls as whole-page navigation.

## Filters — `data-eds-filter`

Single-select chip group that filters items by category:

```html
<div class="eds-chip-scroll" data-eds-filter data-eds-filter-target="#grid">
  <button class="eds-chip" aria-pressed="true" data-eds-filter-value="all">All</button>
  <button class="eds-chip" aria-pressed="false" data-eds-filter-value="cards">Gift cards</button>
</div>
<div id="grid" class="eds-grid-2">
  <article class="eds-product-card" data-eds-category="cards">…</article>
</div>
```

JS toggles `aria-pressed` on chips and `hidden` on items — markup is never rewritten. `aria-pressed` is for filters; `aria-selected` only for real tabs.

## Search Filter — `data-eds-search`

Input with `data-eds-search` + `data-eds-search-target="#list"` filters items by their `data-eds-search-text` attribute (falls back to text content). Optional `data-eds-search-empty="#empty"` toggles an empty state with a reset action. Debounced ~200ms; announces result count via `aria-live`. Style the composition with `.eds-search` (full-width input + button, 48px+ height).

## Accordion — `.eds-accordion`

Native `<details>`/`<summary>` styling — fully functional with zero JS. The JS layer only adds a smooth open animation on `.eds-accordion__body`. Ideal for FAQs. Single dividers between rows, never nested cards.

## Modal — `data-eds-modal`

Native `<dialog class="eds-modal" id="my-modal">`. Open with `<button data-eds-modal="my-modal">` (element id, no `#`) or `EDS.openModal('my-modal')`. Close via `data-eds-modal-close` buttons, Esc, or backdrop click (`EDS.closeModal('my-modal')` also available). Native dialog handles focus containment. Add `.eds-modal--sheet` for a mobile bottom sheet.

## Toasts — `EDS.toast()`

```js
EDS.toast('Added to cart', 'success'); // 'info' | 'success' | 'danger'
```

Declarative: `<button data-eds-toast="Copied!" data-eds-toast-type="success">`. A single `aria-live="polite"` `.eds-toast-region` is created on demand; toasts auto-dismiss after 4s with a transform/opacity exit (`.eds-toast--leaving`), then `hidden`/removal. Use toasts only for transient confirmations — state that affects a form or checkout belongs in an inline notice.

## Notices — `.eds-notice`

Inline static messages: `--info`, `--success`, `--warning`, `--danger`. Use `role="alert"` only for errors that appear dynamically; `role="status"` for polite success.

## Menu — `data-eds-menu`

Dropdown for secondary/overflow actions: trigger `<button>` + `.eds-menu__panel` (`--end` right-aligns). JS handles `aria-expanded`, `aria-haspopup`, outside click, and Esc. This is where extra actions go instead of cluttering cards or rows.

## Copy Button — `data-eds-copy`

`<button data-eds-copy="TEXT">` or `data-eds-copy-target="#selector"` copies to the clipboard and fires a success toast. Useful for voucher and gift-card codes.

## Sticky CTA — `.eds-sticky-cta`

Bottom-fixed mobile purchase bar: price/summary + one primary action, nothing else. Hidden from tablet up by default. Respects `env(safe-area-inset-bottom)`; add matching bottom padding to the page content so nothing is hidden.

## Navigation & Wayfinding

- `.eds-breadcrumbs` — `<nav aria-label="Breadcrumb">` with inline list and current-page state.
- `.eds-pagination` — page links with `aria-current="page"` active state.

## Data Display

- `.eds-table` — horizontal rules only, tabular numbers for price columns, horizontal scroll wrapper on mobile.
- `.eds-price` — price emphasis with optional struck original price, tabular numbers.
- `.eds-avatar` / `--lg` — image or initials disc.

## Loading States — `.eds-skeleton`

`--text`, `--title`, `--media`, `--circle`. Opacity pulse only — no gradient sweeps. Reserve final content dimensions so nothing shifts. Use skeletons when waiting over ~300ms; pair with empty states that explain the next action and error states that offer recovery.

## Motion Contract (applies to all components)

- Animate only `transform` and `opacity`.
- Press feedback 80–150ms, hover/focus 150–220ms, panels 220–320ms, nothing over 500ms.
- No content may exist only behind an animation.
- Reduced-motion handling removes decorative entrance motion only; hover/focus/press feedback stays.

## Adding a New Component

Follow `references/library-growth.md`: implement it in `dist/` first, document it here using the same format, then add a live preview to `styleguide.html`.
