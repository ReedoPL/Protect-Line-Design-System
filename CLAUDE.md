# Protect Line — Claude Design bootstrap

For all UI and visual design work, follow the design system in this repository.

## Read order

1. `DESIGN.md` — visual contract (colours, type, components, do/don't)
2. `colors_and_type.css` — CSS custom properties (Claude Design native token file)
3. `components/` — HTML/CSS specimens for each component
4. `kit/index.html` — finished marketing page example
5. `brand/voice.md` — copy tone and voice rules

## Rules

- British English, sentence case, two-word **Protect Line**
- Use **only** colours and spacing from `colors_and_type.css` — never invent hex
- Poppins primary, Lora Bold-Italic accent, Arial email fallback only
- Hot pink sparingly: CTAs, links, Hugo, small accents
- No generic SaaS styling, no fear-mongering tone
- Build desktop **and** mobile variants
- Mark missing assets `[REQUIRES SOURCE]`

## Claude Design setup

1. Link this repo at [claude.ai/design](https://claude.ai/design) → organisation → design system
2. Or run `/design-sync` from Claude Code against this repository
3. Publish the design system so team projects inherit it

## Cursor setup

Open this folder in Cursor. Rules in `.cursor/rules/` load automatically. Ask:

> "Design a [asset type] for Protect Line using the design system."

## Before delivering

- [ ] All colours map to CSS variables
- [ ] Sentence case on headings and body
- [ ] Pink used sparingly
- [ ] Mobile layout checked at 375px
- [ ] Copy matches brand voice (warm, clear, British)
