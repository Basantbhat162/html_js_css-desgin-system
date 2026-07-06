# Anti-Slop Rules

Read this before finalizing any Elementor section. These rules come from the local `de-slop` skill and the provided frontend UI transcript.

## Hard Bans

- Do not wrap every content group in a card.
- Do not use nested cards.
- Do not use decorative gradient blobs, orbs, bokeh, oversized glow, or frosted panels.
- Do not use huge pill radius everywhere.
- Do not add borders between every heading, group, card, and sidebar.
- Do not add decorative vertical color rails beside text blocks, trust cues, notes, or statuses.
- Do not push every possible action to the top level.
- Do not use inset segmented tabs for top-level page navigation.
- Do not paste framework utility soup, Preline class names, Tailwind-only variants, or React-style component assumptions into Elementor output.
- Do not let hover states drift outside the color system, such as primary buttons changing to blue text.
- Do not add subheadings that restate the heading.
- Do not invent metrics, review counts, ratings, trust claims, delivery guarantees, or user activity.
- Do not leave placeholders, fake product names that look like examples, `TODO`, lorem ipsum, dead links, or chat residue.

## Quality Bar

Good UI should pass these questions:

- What is the one job of this section?
- What should the visitor notice first?
- What action should the visitor take next?
- Which content can be removed, delayed, or hidden behind a menu?
- Can spacing, type, and alignment communicate hierarchy before adding a border or card?
- Would this still work at `320px` without shrinking text or hiding the main action?

## Cards

Use cards only when they represent repeated objects:

- Products
- Gift cards
- Game top-ups
- Plans
- Orders
- FAQ rows when native `details` styling is not enough

Do not use cards for:

- Page headers
- Every feature claim
- Trust strips that can be inline
- Layout sections that can be separated by whitespace
- Whole page bands

## Borders

Use borders for functional separation:

- Inputs
- Product rows
- Tables/lists
- Selected states
- Sticky bars

Avoid borders when hierarchy can come from:

- Larger/smaller type
- Weight changes
- More/less spacing
- Alignment
- A single accent line

## Action Hierarchy

Keep only immediate actions visible.

- Primary purchase flow: one primary CTA.
- Product card: `Buy` or `View`, not five icons.
- Secondary actions: move to compact text link, details view, menu, or later step.
- Destructive actions: never sit beside primary purchase actions.

## Copy Discipline

- Delete generic subtitles like "Manage your products and settings" when the section title already says it.
- Use concrete button labels: `Buy now`, `Check ID`, `View offers`, `Reset filters`.
- Keep labels short.
- Put explanations near the thing they explain, not in a marketing paragraph above the UI.

## Visual Audit Before Delivery

Flag and fix:

- More than one dominant accent in a viewport.
- More than two border styles in one component.
- More than one shadow level in one section.
- Vertical accent lines that look like accidental generated artifacts.
- Headings with negative letter spacing, cramped line-height, or overly heavy weights.
- Primary buttons whose hover state changes text color instead of darkening the blue background.
- Motion that causes overlap, layout shift, or content that only appears after animation.
- More than three top-level actions in a card or row.
- More than four colors used for non-state UI.
- Product cards that show decorative badges without useful meaning.
- Components that look like default shadcn, generic SaaS templates, or generated dashboards.
