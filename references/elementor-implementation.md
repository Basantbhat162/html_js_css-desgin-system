# Elementor / WordPress Implementation

How to ship the design system (`dist/eds.css` + `dist/eds.js`) into WordPress, Elementor, or any plain HTML site. No build step, no npm, no CDN — the files are self-contained.

## Install Once Per Site (preferred)

Load the library globally so every section can use it:

1. **CSS** — paste the contents of `dist/eds.css` into one of:
   - Elementor: Site Settings → Custom CSS
   - WordPress: Appearance → Customize → Additional CSS
   - Theme: enqueue as a stylesheet in the child theme
2. **JS** — paste the contents of `dist/eds.js` into a site-wide HTML/scripts area (footer), or enqueue it in the child theme. It is an IIFE, runs on `DOMContentLoaded`, and exposes `window.EDS`.
3. Every Elementor HTML widget can now use `eds-` classes and `data-eds-*` attributes directly — no per-widget CSS or JS needed.

Theming: paste the semantic override block (see `references/design-tokens.md`) after the library CSS to match the site brand.

## Per-Widget Fallback (single section delivery)

When the user wants one copy-paste block and the library is not installed site-wide, deliver a self-contained HTML widget:

```html
<style>/* only the eds- rules this section actually uses */</style>
<section class="eds-section eds-home-hero" aria-labelledby="eds-home-hero-title">…</section>
<script>/* only the behavior this section needs, IIFE-wrapped */</script>
```

Rules for extracted per-widget code:

- Include only the CSS/JS the section uses; keep section JS under 3KB when possible.
- Keep the token variables the section needs (copy the `:root` block or inline the values).
- Everything else below still applies.

## Scope

- Prefix all reusable classes with `eds-`.
- Add a unique section class for each component instance, e.g. `eds-home-hero`, `eds-voucher-grid`.
- Never use generic selectors like `.card`, `.button`, `.title`, `section h2`, or bare `img`.
- Never style Elementor/theme classes unless the user asks.
- `dist/eds.css` already resets `box-sizing`, image display, and link color inheritance inside `.eds-section` — do not re-add global resets.

## JavaScript Rules

`dist/eds.js` follows these; per-widget scripts must too:

- Vanilla JS only, wrapped in an IIFE. No modules, bundlers, or framework syntax.
- Bind behavior to `data-eds-*` attributes, never to visual classes.
- Support multiple copies of the same section on one page (iterate `querySelectorAll`).
- Exit quietly when required elements are missing.
- Toggle attributes (`aria-pressed`, `aria-selected`, `aria-expanded`, `hidden`) and small state classes; never inject framework markup or rewrite large DOM fragments.
- Use transform/opacity exit classes for dismissible UI, then set `hidden` after the transition.
- Keep hover/focus behavior in CSS; JS never simulates hover.
- Re-init dynamic content with `EDS.init(container)` after injecting new markup.

## Data Attribute Reference

| Attribute | Behavior (from `dist/eds.js`) |
| --- | --- |
| `data-eds-tabs` | Accessible tabs (roving focus, arrow keys) |
| `data-eds-filter`, `data-eds-filter-value`, `data-eds-filter-target`, `data-eds-category` | Single-select chip filtering |
| `data-eds-search`, `data-eds-search-target`, `data-eds-search-text`, `data-eds-search-empty` | Debounced text filtering with empty state |
| `data-eds-modal`, `data-eds-modal-close` | Native `<dialog>` open/close |
| `data-eds-toast`, `data-eds-toast-type` | Declarative toast trigger |
| `data-eds-menu` | Dropdown menu (outside click, Esc) |
| `data-eds-copy`, `data-eds-copy-target` | Clipboard copy + confirmation toast |
| `data-eds-qty`, `data-eds-qty-dec`, `data-eds-qty-inc` | Quantity stepper |
| `data-eds-submit`, `data-eds-loading` | Form loading-button handling |

## Performance

- Use event delegation for repeated lists.
- `loading="lazy"` and `decoding="async"` on non-hero images.
- Reserve media layout with `aspect-ratio` (product card already does).
- `content-visibility: auto` only for long below-fold sections, with `contain-intrinsic-size`.
- Budgets: `dist/eds.css` ≤ 40KB unminified, `dist/eds.js` ≤ 20KB unminified. Check sizes when growing the library.

## Elementor Gotchas

- Elementor may wrap widgets with extra containers; avoid CSS that depends on direct children unless the wrapper is inside your own HTML.
- Sticky/fixed elements can conflict with Elementor headers — the library uses modest z-index tokens (`--eds-z-*`); do not exceed them.
- Elementor custom CSS may auto-scope selectors in some contexts; still include the explicit wrapper class.
- WordPress themes often style `a`, `button`, and headings aggressively; `eds-` components defend their own text color, font, and hover states — report any leak as a library bug and fix it in `dist/eds.css`.
- Inline SVG icons: keep them small and set `aria-hidden="true"` unless the icon conveys unique meaning.
