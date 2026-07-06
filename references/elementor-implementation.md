# Elementor Implementation

Use this when packaging code for Elementor HTML widgets and Advanced -> Custom CSS.

## Structure

Prefer this split:

- HTML widget: semantic HTML plus optional small `<script>`.
- Advanced -> Custom CSS: scoped CSS using the wrapper class.

If delivering a copy-ready single block, include `<style>` and `<script>` only when the user asks for all-in-one HTML.

## Scope

- Prefix all reusable classes with `eds-`.
- Add a unique section class for each component, e.g. `eds-home-hero`, `eds-voucher-grid`.
- Avoid generic selectors like `.card`, `.button`, `.title`, `section h2`, or `img`.
- Avoid styling Elementor/global theme classes unless the user asks.

## CSS Reset Inside Wrapper

```css
.eds-section,
.eds-section * {
  box-sizing: border-box;
}

.eds-section img,
.eds-section svg {
  display: block;
  max-width: 100%;
}

.eds-section a {
  color: inherit;
}
```

## JavaScript

Use vanilla JS only.

Rules:

- Wrap code in an IIFE.
- Query inside the section wrapper, not `document` broadly.
- Support multiple copies of the same Elementor section on one page.
- Exit quietly when required elements do not exist.
- Do not add global listeners unless needed; cleanly namespace data attributes.
- Bind behavior to `data-eds-*` attributes instead of visual classes when the component may be restyled.
- Toggle attributes and small state classes; do not inject framework markup or rewrite large DOM fragments.
- Use transform/opacity exit classes for dismissible UI, then set `hidden` after the transition.
- Keep hover/focus behavior in CSS; JS should not simulate hover states.

Pattern:

```html
<script>
(() => {
  document.querySelectorAll('.eds-filter-grid').forEach((section) => {
    const buttons = section.querySelectorAll('[data-eds-filter]');
    const cards = section.querySelectorAll('[data-eds-category]');
    if (!buttons.length || !cards.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.edsFilter;
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        cards.forEach((card) => {
          const show = value === 'all' || card.dataset.edsCategory === value;
          card.hidden = !show;
        });
      });
    });
  });
})();
</script>
```

## Data Attributes

Use `data-eds-*` for JS behavior:

- `data-eds-filter`
- `data-eds-category`
- `data-eds-tab`
- `data-eds-panel`
- `data-eds-search`
- `data-eds-toast`

Never bind JS to visual classes when a data attribute is clearer.

## Performance

- Keep section JS under 3KB when possible.
- Use event delegation for repeated lists.
- Use `loading="lazy"` on non-hero images.
- Use `decoding="async"` on images.
- Reserve layout with `aspect-ratio`.
- Use `content-visibility: auto` only for long below-fold sections, and set `contain-intrinsic-size`.

## Elementor Gotchas

- Elementor may wrap widgets with extra containers; avoid CSS that depends on direct children unless the wrapper is inside your HTML.
- Sticky/fixed elements can conflict with Elementor headers. Use modest z-index values from the token scale.
- Elementor custom CSS may scope selectors automatically in some contexts; still include the explicit wrapper class.
- Do not rely on module imports, bundlers, npm packages, or framework syntax.
- If using SVG icons inline, keep them small and set `aria-hidden="true"` unless the icon conveys unique meaning.
