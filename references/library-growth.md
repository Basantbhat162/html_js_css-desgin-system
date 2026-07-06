# Library Growth

Use this file whenever a new component, pattern, or improvement should become reusable.

## Add a New Component

When creating a strong reusable component:

1. Add the component name and purpose to `references/component-catalog.md`.
2. Add any new tokens to `references/design-tokens.md` only if they are broadly reusable.
3. Add interaction behavior to `references/patterns-and-interactions.md` if it changes UX rules.
4. Add Elementor-specific implementation notes to `references/elementor-implementation.md` if the pattern needs JS, scoping, or integration rules.

## Component Entry Format

Use this structure:

```markdown
## Component Name

Use when: ...

Required:

- ...

Optional:

- ...

Mobile behavior:

- ...

Accessibility:

- ...
```

## Token Discipline

- Add tokens only when at least two components need them.
- Prefer extending existing token scales over adding one-off values.
- Do not create a new brand color without user approval.
- Keep the library white-theme only.

## Improvement Rules

Fold improvements back into the skill when they:

- Fix repeated Elementor issues.
- Improve mobile behavior.
- Improve accessibility.
- Reduce duplicated CSS/JS.
- Create a component likely to be reused on multiple pages.
- Clarify when to use or avoid a pattern.

Do not add:

- One-off copy.
- Page-specific product data.
- Reference-site clones.
- Framework-specific React/Vue/Tailwind code.
- External font or package requirements.
