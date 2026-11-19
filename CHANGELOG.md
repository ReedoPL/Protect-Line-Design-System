# Changelog — app layer

Changes to the app layer (`DESIGN.md` §10): the tokens, `components/app-components.css`,
the generated files and the checks. The marketing kit (sections 1–9) is not versioned here.

A release is a tag, `app-layer-vMAJOR.MINOR.PATCH`. A renamed or removed token or class, or
a colour that changes what people see, is a major version; a new token, class or component
is a minor one. See `DESIGN.md` §10.14.

## 1.0.0 — unreleased

The first release: the app layer as it runs in production in gui2, the Protect Line AI
platform's admin app, with what a few months of use there showed was missing or wrong.

### The layer

- Semantic colour tokens for light and dark, status colours, a compact type scale, JetBrains
  Mono for figures, and a colour-blind-checked chart palette (§10.2–10.7). Tokens are W3C
  Design Tokens JSON, generated into CSS, a Tailwind v4 theme and a resolved JSON file.
- Components: buttons, fields, choices, data table, tabs, pills and badges, alerts, toasts,
  progress, skeleton, empty state, dialog, chat (§10.8).
- Three dependency-free checks: generated files current, WCAG contrast in both modes,
  colour-blind separation of the chart palette (§10.11).

### Added after use in gui2

- **Page layout** (§10.12): `.pl-page`, `.pl-page-header`, `.pl-page-tabs`, `.pl-two-col`,
  with tokens for the two breakpoints, the content, side-column and dialog widths, and four
  stacking layers. `preview/app-layout.html`.
- **`.pl-segmented`**: a segmented control. gui2 had built two that had drifted apart.
- **`.pl-link`**: a button that reads as a link.
- **`.pl-avatar`**: a person's circle, the same in the menu and in chat.
- **`.pl-text-page-title`** (28/36): a page's own name. `.pl-text-title` (20/28) is now for a
  page titled with a record's name, which is how gui2 had come to use the two sizes.
- **`.pl-dialog--lg`** (720px) and **`--xl`** (880px).
- **`tokens/shadcn.css`**: shadcn/ui's variable names mapped onto the app layer.
- **Icons** (§10.13): Lucide, and the sizes to use it at.
- **Ownership and versions** (§10.14), this changelog, and a workflow that runs the checks
  on every pull request.
- `build-tokens.js --check` now fails when the component CSS reads a custom property that
  is not a token.

### Fixed

- A dialog taller than the window was cut off top and bottom. It now keeps its title and
  buttons in view and scrolls its body.
- A table in a chat reply had a 1.2:1 grid that could not be seen. It now has a full grid in
  the strong border, 3:1 or better in both modes.
- The user's chat avatar was info blue, a status colour. It is now the same fair-pink circle
  as `.pl-avatar`.
- A wide table in a chat reply set the width of the whole message, which ran off the side
  of a phone. The table now scrolls inside the message, as its comment always said it did.
- `.pl-scrim` now sets its own layer (`--app-layer-overlay`).

### Changed — check when moving up from a commit before this release

- **Fonts are a separate file.** `app-tokens.css` no longer imports Google Fonts. Link
  `app-fonts.css` as well, or host the fonts in the app. An app that stripped the import
  when copying the file (gui2 did) can stop doing so.
- A reply table's header cells keep the sunken tone. gui2's local fix used the selected tone,
  where the grid line is 2.68:1 in dark mode.
