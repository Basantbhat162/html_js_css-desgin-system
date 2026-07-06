# Library Growth

How to evolve the system. The code in `dist/` is the source of truth; docs and the style guide must always match it.

## Add a New Component

1. **Implement in `dist/`** — styles in `dist/eds.css` (own commented section, `eds-` prefix, tokens only), behavior in `dist/eds.js` (new `data-eds-*` binding registered inside `EDS.init` so dynamic content works).
2. **Document in `references/component-catalog.md`** using the entry format below.
3. **Add a live preview to `styleguide.html`** — rendered example + copyable markup, verified at 320px.
4. Update `references/design-tokens.md` only if the component introduced broadly reusable tokens.
5. Update `references/patterns-and-interactions.md` only if it changes UX rules.
6. Update `references/elementor-implementation.md` data-attribute table if it adds a `data-eds-*` behavior.

## Component Entry Format

```markdown
## Component Name — `.eds-class` / `data-eds-attr`

Use when: ...

(markup snippet)

- Required / optional parts
- Mobile behavior
- Accessibility contract
- JS behavior, if any
```

## Token Discipline

- Add tokens only when at least two components need them.
- New component tokens must derive from semantic tokens (`--eds-color-*`), never raw values — otherwise theming breaks.
- Prefer extending existing scales over one-off values.
- No new brand color without user approval.
- Light theme only; no dark mode layer.

## Quality Gates for New Code

- Works at 320px without shrinking text or hiding the primary action.
- Animates only transform/opacity, within the duration tokens.
- Keyboard operable; state expressed through ARIA attributes.
- Survives hostile theme CSS (defends its own font, color, hover states).
- No external requests, no dependencies, no framework syntax.
- Size budgets hold: `eds.css` ≤ 40KB, `eds.js` ≤ 20KB unminified.

## Improvement Rules

Fold improvements back into `dist/` when they:

- Fix repeated Elementor/WordPress issues.
- Improve mobile behavior or accessibility.
- Reduce duplicated CSS/JS across sections.
- Create a component likely to be reused on multiple pages.
- Clarify when to use or avoid a pattern.

Do not add:

- One-off copy or page-specific product data.
- Reference-site clones.
- Framework-specific React/Vue/Tailwind code.
- External font, CDN, or package requirements.
