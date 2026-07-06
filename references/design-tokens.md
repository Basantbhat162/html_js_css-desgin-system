# Design Tokens

Use these tokens as the base for every Elementor section. Put them in a wrapper class, not globally, unless the user asks for site-wide CSS.

## CSS Token Starter

```css
.eds-section {
  --eds-blue-50: #eff6ff;
  --eds-blue-100: #dbeafe;
  --eds-blue-600: #2563eb;
  --eds-blue-700: #1d4ed8;
  --eds-blue-900: #1e3a8a;
  --eds-primary: var(--eds-blue-600);
  --eds-primary-hover: var(--eds-blue-700);
  --eds-primary-pressed: #173ea8;
  --eds-primary-foreground: #ffffff;

  --eds-white: #ffffff;
  --eds-bg: #ffffff;
  --eds-surface: #ffffff;
  --eds-surface-soft: #f8fafc;
  --eds-surface-blue: #f3f7ff;
  --eds-black: #080b12;
  --eds-text: #101828;
  --eds-text-soft: #344054;
  --eds-muted: #667085;
  --eds-border: #d9e2ef;
  --eds-border-strong: #b7c5d8;
  --eds-hover-surface: #eff6ff;
  --eds-success: #087443;
  --eds-warning: #a15c07;
  --eds-danger: #c8192e;

  --eds-font: "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif;
  --eds-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;

  --eds-step--1: clamp(.8125rem, .78rem + .16vw, .875rem);
  --eds-step-0: 1rem;
  --eds-step-1: clamp(1.125rem, 1.06rem + .32vw, 1.25rem);
  --eds-step-2: clamp(1.375rem, 1.22rem + .78vw, 1.75rem);
  --eds-step-3: clamp(1.75rem, 1.48rem + 1.35vw, 2.4rem);
  --eds-step-4: clamp(2.25rem, 1.82rem + 2.15vw, 3.5rem);

  --eds-space-1: 4px;
  --eds-space-2: 8px;
  --eds-space-3: 12px;
  --eds-space-4: 16px;
  --eds-space-5: 20px;
  --eds-space-6: 24px;
  --eds-space-8: 32px;
  --eds-space-10: 40px;
  --eds-space-12: 48px;
  --eds-space-16: 64px;
  --eds-space-20: 80px;

  --eds-radius-none: 0;
  --eds-radius-xs: 3px;
  --eds-radius-sm: 6px;
  --eds-radius-md: 8px;
  --eds-radius-lg: 10px;

  --eds-shadow-sm: 0 1px 2px rgba(15, 23, 42, .06);
  --eds-shadow-md: 0 8px 24px rgba(16, 24, 40, .08);
  --eds-shadow-blue: 0 12px 28px rgba(37, 99, 235, .18);

  --eds-focus: 0 0 0 3px rgba(37, 99, 235, .22);
  --eds-ease: cubic-bezier(.2, 0, 0, 1);
  --eds-fast: 150ms;
  --eds-base: 220ms;
  --eds-slow: 320ms;

  font-family: var(--eds-font);
  color: var(--eds-text);
  background: var(--eds-bg);
}
```

## Token Rules

- Use `--eds-blue-600` for primary CTAs, active states, focus rings, links, and selected filters.
- Use semantic aliases such as `--eds-primary`, `--eds-primary-hover`, and `--eds-primary-foreground` inside components so hover states stay consistent.
- Use `--eds-surface-blue` for selected rows, amount cells, and subtle category panels, never as the full page background.
- Use `--eds-muted` only for secondary text; never for body copy below `16px`.
- Use `--eds-radius-xs`, `--eds-radius-sm`, or `--eds-radius-md` for most UI. Avoid pill radius unless a component truly needs a capsule shape.
- Use shadows sparingly. Prefer spacing and type hierarchy; add shadows only for sticky bars, floating panels, and the primary CTA.
- Use borders sparingly. If every block has a border, remove half of them and re-create hierarchy with spacing and typography.
- Use the 4/8px grid. Avoid random values like `17px`, `23px`, `37px`.

## State Contracts

- Primary button: blue background, white text, darker blue hover/active. Never change primary button text to blue on hover.
- Secondary button: white background, dark text, strong border; hover may use blue-tinted surface and blue text.
- Ghost/text button: transparent background, blue text; hover uses a soft blue background, not underline plus fill plus border at once.
- Selected filter/amount/tab: use one state treatment only: filled blue, underline, or soft blue surface.
- Disabled controls: reduce opacity and remove pointer events or keep `cursor: not-allowed`; never only change color.
- Success/warning/danger colors are for feedback states, not decoration.

## Typography

- Use one system-font stack.
- Prefer `"Segoe UI"` first for Windows readability, followed by system fallbacks.
- Use weights `400`, `500`, `600`, and `700`; avoid ultra-thin text, heavy `850/900` weights, and large blocks of monospace labels.
- Keep letter spacing at `0` for headings and body unless a tiny uppercase label truly needs tracking.
- Use tabular numbers for prices, counters, discount percentages, order IDs, and stats:

```css
.eds-price,
.eds-stat,
.eds-code {
  font-variant-numeric: tabular-nums;
}
```

## Responsive Breakpoints

```css
/* Mobile default: 320-599px */
@media (min-width: 600px) { /* tablet */ }
@media (min-width: 840px) { /* small desktop / landscape tablet */ }
@media (min-width: 1200px) { /* desktop */ }
```

## Z-Index Scale

Use only these layers:

- `0` base
- `10` sticky local controls
- `20` dropdowns/popovers
- `40` sticky headers/bottom bars
- `80` modals/sheets
- `100` toast/urgent overlays

Do not use `9999`.
