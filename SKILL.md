---
name: elementor-design-system
description: EDS v2 — a zero-dependency, drop-in design system shipped as ready-to-paste CSS/JS (dist/eds.css, dist/eds.js) for WordPress + Elementor HTML widgets and any plain HTML site. Use when building, styling, reviewing, or extending UI sections; composing components (buttons, cards, tabs, accordions, modals, toasts, forms, tables, navbars, heroes, footers, sticky CTAs); theming/rebranding via semantic tokens; or adding new patterns back into the library. Mobile-first, light theme, blue accent by default, fully themeable, system fonts only.
---

# EDS — Elementor Design System (v2)

A complete, production-ready UI system shipped as plain files — no build step, no npm, no external requests. Treat it as a living library: improvements go back into the `dist/` files, the style guide, and these docs.

## Shipped files

| File | Purpose | Load order |
|---|---|---|
| `dist/eds.css` | The full library: tokens + reset + components + utilities (self-contained) | `<head>` |
| `dist/eds-tokens.css` | Tokens only — for projects that want variables without components | optional |
| `dist/eds.js` | Behaviors via `window.EDS`: tabs, modal, dropdown, toast, accordion, navbar, sticky CTA, scroll reveal | end of `<body>` or `defer` |
| `styleguide.html` | Living reference: every token and component rendered live from the files above, with copy-to-clipboard code, responsive preview toggles, live theming, and search | open in a browser |

## Quick start

```html
<link rel="stylesheet" href="dist/eds.css" />
...
<script src="dist/eds.js" defer></script>
```

Elementor: enqueue both files in the child theme (preferred) or paste the CSS into Site Settings → Custom CSS and load the JS from an HTML widget. Component markup goes into HTML widgets. Details: `references/elementor-implementation.md`.

## Operating rules (non-negotiable)

1. **Semantic tokens only.** Style with `--eds-primary`, `--eds-text`, `--eds-surface`, etc. Never hardcode hex values in component CSS and never reference primitives (`--eds-blue-600`) outside the token file. Rebranding must require only overriding semantic variables.
2. **Zero external requests.** System font stack, inline SVG only. No CDNs, no icon fonts, no web fonts unless the user provides them.
3. **No build step.** Everything ships runnable. Improvements are edits to the `dist/` files directly.
4. **Native elements first.** `<dialog>` for modals, `<details>`/`<summary>` for accordions, real `<button>`/`<a>`, labeled form controls. JS enhances; content never depends on it.
5. **Animate transform/opacity only.** Never animate layout properties. The library respects `prefers-reduced-motion` — do not undo it.
6. **Mobile-first.** Every component must work at 320px with no horizontal scroll. Breakpoints: 640px (`sm`), 768px (`md`), 1024px (`lg`). Touch targets ≥ 44px.
7. **Light theme only.** White canvas, blue accent by default, themeable via semantic tokens. No dark mode.
8. **`eds-` prefix everywhere.** All classes, data attributes (`data-eds-*`), and variables (`--eds-*`) are prefixed to avoid theme/plugin collisions.
9. **De-slop before delivery.** Apply `references/anti-slop-rules.md`: no gradient blobs, no emoji icons, no fake stats or reviews, no placeholder copy, no card-around-everything layouts.

## Theming a project

Override semantic tokens after loading `eds.css` — that is the entire rebrand. Always target `:root, .eds` (not `:root` alone) so the override also wins on the element carrying the `.eds` scope class:

```css
:root,
.eds {
  --eds-primary: #0d9488;
  --eds-primary-hover: #0f766e;
  --eds-primary-soft: #ccfbf1;
  --eds-focus-ring: #0d9488;
  --eds-font-sans: "Brand Font", ui-sans-serif, system-ui, sans-serif;
}
```

The Theming section of `styleguide.html` generates this block interactively.

## Workflow

1. Identify the section job: discovery, conversion, trust, navigation, form, content, or support.
2. Open `styleguide.html` to see what already exists; compose from the catalog before writing new CSS.
3. Read `references/design-tokens.md` before touching variables.
4. Read `references/component-catalog.md` for each component's markup contract, variants, and JS hooks.
5. Read `references/patterns-and-interactions.md` for the `EDS` JS API and motion/interaction rules.
6. Read `references/elementor-implementation.md` before packaging for WordPress/Elementor.
7. Read `references/anti-slop-rules.md` before finalizing visual direction.
8. Adding something new? Follow `references/library-growth.md`: tokens → markup contract → CSS in `dist/eds.css` → behavior in `dist/eds.js` → demo in `styleguide.html` → docs in the catalog.
9. Verify at widths `320`, `375`, `768`, `1024`, `1440` before delivery.

## Quality gate

- No horizontal scroll at 320px; all taps ≥ 44×44px with 8px separation.
- One primary job and one obvious next action per section.
- Body text ≥ 16px; WCAG AA contrast; visible focus rings on every interactive element.
- Cards only for repeated items; borders only where spacing/type cannot separate content.
- Images reserve space (`aspect-ratio` or explicit dimensions).
- Forms have labels, correct input types, helper/error text wired with `aria-describedby`/`aria-invalid`.
- No placeholders, fake numbers, fake reviews, or invented trust claims.

## References

- `references/design-tokens.md` — full token dictionary: primitives → semantic → component layers, override recipes.
- `references/component-catalog.md` — every shipped component: markup contract, variants, states, JS hooks, accessibility notes.
- `references/patterns-and-interactions.md` — the `window.EDS` API, `data-eds-*` attributes, composition patterns, motion rules.
- `references/elementor-implementation.md` — WordPress/Elementor integration: enqueueing, widget workflow, specificity strategy.
- `references/anti-slop-rules.md` — visual quality gate for avoiding AI-looking UI.
- `references/reference-inspiration.md` — calibration references and how to translate them into EDS decisions.
- `references/library-growth.md` — how to add new components and tokens without breaking the system.
