# Protect Line — agent working agreement

British English throughout. Do not invent brand colours, fonts, logos, or customer facts.

## Goal

Help non-designers create on-brand Protect Line visual assets using Claude Design, Cursor, or any AI design tool connected to this repository.

## Required read order (any visual task)

1. `AGENTS.md` (this file)
2. `DESIGN.md` — the visual contract
3. `colors_and_type.css` — token source of truth
4. Matching specimen in `components/` or `kit/index.html`
5. `brand/voice.md` for copy tone

## Immutable brand guardrails

- **Name:** Protect Line (two words, never "Protectline")
- **Purpose:** Investing in Our People to Protect Yours
- **Voice:** Friendly, Trustworthy, Warm, Professional, Passionate
- **Fonts:** Poppins primary, Lora Bold-Italic accent only, Arial fallback for email/packs only
- **Colours:** Navy `#0C073D`, White `#FFFFFF`, Hot pink `#F20779` — use CSS variables only
- **Case:** Sentence case everywhere except short tracked all-caps subheadings
- **Spelling:** British English

## Commands (local preview)

Open any HTML file directly in a browser, or serve locally:

```bash
npx serve .
```

Then visit `http://localhost:3000/kit/` or `http://localhost:3000/preview/`.

## Do not

- Invent hex values not defined in `colors_and_type.css`
- Use Arial for headings or creative typography
- Use Inter, Roboto, or other sans-serif substitutes
- Use Title Case headings
- Use American spelling
- Add generic SaaS styling (sky blue, card shadows, glassmorphism)
- Use fear-mongering insurance language
- Overwrite approved designs without explicit request
- Invent logos or Hugo artwork — mark gaps `[REQUIRES SOURCE]`

## Figma reference

Visual truth lives in [PL-Website-Rebuild-2026](https://www.figma.com/design/PGlZNtaCk9EpQ1tP9KF79I/PL-Website-Rebuild-2026) (file key `PGlZNtaCk9EpQ1tP9KF79I`). Use Figma MCP for spot-checks; do not dump the full 49-page file into this repo.

## Complete handoff

A design is complete when it uses only design-system tokens, follows `DESIGN.md` do/don't rules, has desktop and mobile variants, and copy matches `brand/voice.md`.
