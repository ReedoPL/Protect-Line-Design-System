---
name: protect-line-design
description: Generate on-brand Protect Line visual assets using DESIGN.md, colors_and_type.css, and HTML/CSS specimens. Use when the user asks to design, mock up, or create landing pages, slides, social posts, email headers, or any Protect Line visual for Claude Design or Cursor.
---

# Protect Line design skill

## Quick start

When generating any Protect Line visual:

1. Read `DESIGN.md` (9-section contract)
2. Read `colors_and_type.css` (token source)
3. Find the closest specimen in `components/` or `kit/index.html`
4. Read `brand/voice.md` for copy tone
5. Generate HTML/CSS using only design-system tokens

## Output format

- Static HTML + CSS (Claude Design canvas-safe)
- Link `colors_and_type.css` and `components/components.css`
- Include desktop and mobile variants
- British English, sentence case

## Copy rules

- Warm, friendly, clear — like chatting over a cuppa
- Explain jargon once, then use the term
- Verbs over nouns ("start" not "commence")
- No fear-mongering
- Emojis as spice only

## Verification checklist

- [ ] All colours are CSS variables from `colors_and_type.css`
- [ ] Sentence case on all text
- [ ] Pink used sparingly (CTA, links, accents)
- [ ] Poppins for body/headings, Lora Bold-Italic for quotes only
- [ ] Mobile layout at 375px
- [ ] No generic SaaS styling

## Prompt templates

See Section 9 of `DESIGN.md` for copy-paste prompts (landing page, product page, social, email).
