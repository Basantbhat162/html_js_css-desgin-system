# Design Tokens

The canonical token source is `dist/eds-tokens.css` (also inlined at the top of `dist/eds.css` — never load both files). Tokens attach to both `:root` and `.eds`, so they work site-wide or scoped to a wrapper.

**Do not copy token snippets from this doc into projects — load the shipped file.** This doc explains the architecture and the override recipes.

## Three-Layer Architecture

```
Layer 1: PRIMITIVES   --eds-blue-600, --eds-gray-200, --eds-space-4 ...
            ↓  feed
Layer 2: SEMANTIC     --eds-primary, --eds-text, --eds-border, --eds-ring ...
            ↓  feed
Layer 3: COMPONENT    --eds-btn-height, --eds-card-radius, --eds-modal-width ...
```

Rules:

- **Component CSS references layers 2 and 3 only.** Never reference a primitive (`--eds-blue-600`) or a raw hex value inside a component.
- **Theming happens at layer 2.** Overriding ~12 semantic variables rebrands every component at once.
- **Tuning happens at layer 3.** Change one component (e.g. taller buttons) without forking its CSS.

## Layer 1 — Primitives

- **Color ramps:** `--eds-blue-{50..950}` (default brand), `--eds-gray-{50..950}` (neutral), abbreviated status ramps `--eds-green/amber/red-{50,100,600,700,800}`, and `--eds-white`.
- **Spacing:** 4px grid — `--eds-space-{0,1,2,3,4,5,6,8,10,12,16,20,24}` (4px × N). No random values like 17px or 23px.
- **Fluid type scale:** `--eds-text--1` through `--eds-text-6`, each a `clamp()` that grows slightly from mobile to desktop (e.g. `--eds-text-0` is 14→15px, `--eds-text-6` is 34→48px). Body copy uses `--eds-text-0`/`--eds-text-1`; never body text below 14px.
- **Fonts:** `--eds-font-sans` (system stack, zero network requests) and `--eds-font-mono`.
- **Weights/line-heights:** `--eds-weight-{normal,medium,semibold,bold}` (400/500/600/700 — never 850/900), `--eds-leading-{tight,snug,normal}`.
- **Radius:** `--eds-radius-{sm,md,lg,xl,full}` = 6/10/14/20px/pill.
- **Shadows:** `--eds-shadow-{sm,md,lg,xl}` — soft, layered, light-theme tuned. Use sparingly: sticky bars, floating panels, hover elevation.
- **Motion:** `--eds-duration-{fast,base,slow}` = 120/180/280ms; easings `--eds-ease`, `--eds-ease-out`, `--eds-ease-spring`.
- **Z-index:** `--eds-z-sticky` 100, `--eds-z-dropdown` 200, `--eds-z-modal` 300, `--eds-z-toast` 400. Never 9999.
- **Layout:** `--eds-container` 1180px, `--eds-container-narrow` 760px. Breakpoints (media queries, not vars): 600px, 840px, 1200px.

## Layer 2 — Semantic (the theming API)

| Group | Tokens | Notes |
|---|---|---|
| Brand | `--eds-primary`, `--eds-primary-hover`, `--eds-primary-active`, `--eds-primary-fg`, `--eds-primary-soft`, `--eds-primary-soft-fg` | `-fg` = text ON primary; `-soft` = tinted backgrounds with `-soft-fg` text |
| Surfaces | `--eds-bg`, `--eds-surface`, `--eds-surface-sunken`, `--eds-surface-raised` | sunken = wells/alt sections; raised = modals/popovers |
| Text | `--eds-text`, `--eds-text-muted`, `--eds-text-faint` | muted = secondary copy; faint = placeholders/dividers only |
| Lines | `--eds-border`, `--eds-border-strong`, `--eds-ring` | ring = focus color |
| Status | `--eds-success[-soft,-soft-fg]`, `--eds-warning[-soft,-soft-fg]`, `--eds-danger[-hover,-soft,-soft-fg]` | for feedback states, never decoration |

## Layer 3 — Component Knobs

`--eds-btn-height{,-sm,-lg}`, `--eds-btn-radius`, `--eds-btn-px`, `--eds-field-height`, `--eds-field-radius`, `--eds-card-pad`, `--eds-card-radius`, `--eds-chip-height`, `--eds-modal-width`, `--eds-modal-radius`.

## Override Recipes

Paste after `eds.css` loads. Target `:root` (site-wide) or `.eds` (scoped).

**Rebrand (teal example):**

```css
:root {
  --eds-primary: #0f766e;
  --eds-primary-hover: #115e59;
  --eds-primary-active: #134e4a;
  --eds-primary-soft: #f0fdfa;
  --eds-primary-soft-fg: #134e4a;
  --eds-ring: #14b8a6;
}
```

**Brand font (only if the user provides one):**

```css
:root { --eds-font-sans: "Brand Font", -apple-system, "Segoe UI", Roboto, sans-serif; }
```

**Sharper corners:**

```css
:root { --eds-radius-sm: 3px; --eds-radius-md: 5px; --eds-radius-lg: 8px; --eds-radius-xl: 12px; }
```

**Tune one component:**

```css
:root { --eds-btn-height: 48px; --eds-card-pad: var(--eds-space-6); }
```

The Theming section of `styleguide.html` generates override blocks interactively.

## Usage Rules

- Use `--eds-primary` for CTAs, active states, links, and selected filters — one accent treatment per section.
- Use `--eds-primary-soft` for selected rows and subtle panels, never as the full page background.
- Use `--eds-text-muted` only for secondary text; never for body copy.
- Prices, counters, order IDs, stats: apply `font-variant-numeric: tabular-nums` (utility: `.eds-tabular`).
- Borders sparingly — if every block has a border, remove half and re-create hierarchy with spacing and type.
- Light theme only. No dark mode layer.

## State Contracts

- **Primary button:** blue fill, white text; hover/active go darker blue. Text NEVER turns blue on hover.
- **Secondary button:** white fill, dark text, strong border; hover uses sunken surface.
- **Ghost button:** transparent, primary-colored text; hover uses `--eds-primary-soft`.
- **Selected chip/tab:** ONE treatment — filled primary (chips) or underline (tabs). Never both.
- **Disabled:** reduced opacity + `cursor: not-allowed`; never color change alone.
- **Success/warning/danger:** feedback only, never decoration.
