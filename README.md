# Protect Line Design System

An agent-readable design kit for **Claude Design** and **Cursor**. Non-designers can connect this repo and generate on-brand Protect Line assets — landing pages, product pages, slides, social posts — without inventing colours or breaking brand rules.

**Internal brand use.** This repository is public for easy Claude Design / Cursor integration; treat brand assets accordingly.

## What's inside

| File / folder | Purpose |
|---------------|---------|
| [`DESIGN.md`](DESIGN.md) | Visual contract — colours, type, components, do/don't (Claude Design reads this) |
| [`colors_and_type.css`](colors_and_type.css) | CSS custom properties — the machine-readable token source |
| [`kit/index.html`](kit/index.html) | Finished marketing page example |
| [`components/`](components/) | HTML/CSS specimens (buttons, header, hero, cards, footer, FAQ) |
| [`preview/`](preview/) | Colour, typography, spacing, component, and brand preview cards |
| [`templates/`](templates/) | Landing page, product page, and slide starters |
| [`brand/voice.md`](brand/voice.md) | Distilled copy tone and voice rules |
| [`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md) | Agent bootstrap instructions |
| [`.cursor/rules/`](.cursor/rules/) | Cursor rules (auto-loaded) |

## Quick start — Claude Design

1. Go to [claude.ai/design](https://claude.ai/design)
2. Create or switch to your **Protect Line organisation**
3. **Create new design system** → upload or link this GitHub repo:
   - **Option A:** Upload `DESIGN.md` under "Add assets" at [claude.ai/design/#org](https://claude.ai/design/#org)
   - **Option B:** Link the full repo as a codebase (Settings → upload/link repository)
   - **Option C:** From Claude Code, run `/design-sync` against a local clone
4. Review the generated UI kit, then toggle **Published** so team projects inherit it
5. Create a project and prompt: *"Design a life insurance landing page using the Protect Line design system."*

See Anthropic's guide: [Set up your design system in Claude Design](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design)

## Quick start — Cursor

1. Clone this repo:
   ```bash
   git clone https://github.com/ReedoPL/Protect-Line-Design-System.git
   ```
2. Open the folder in Cursor
3. Ask the agent:
   > "Design a Protect Line product page for critical illness cover using the design system."
4. Rules in `.cursor/rules/` and `DESIGN.md` load automatically

### Local preview

```bash
npx serve .
```

Then open:

- Marketing page: `http://localhost:3000/kit/`
- Component preview: `http://localhost:3000/preview/components.html`
- Colour palette: `http://localhost:3000/preview/colours.html`

## Brand at a glance

| Element | Value |
|---------|-------|
| **Name** | Protect Line (two words) |
| **Purpose** | Investing in Our People to Protect Yours |
| **Navy** | `#0C073D` |
| **Hot pink** | `#F20779` (CTAs, links, Hugo — sparingly) |
| **Primary font** | Poppins |
| **Accent font** | Lora Bold-Italic only |
| **Voice** | Friendly, warm, British, sentence case |

## Figma reference

Visual truth for the website rebuild lives in Figma:

[PL-Website-Rebuild-2026](https://www.figma.com/design/PGlZNtaCk9EpQ1tP9KF79I/PL-Website-Rebuild-2026?node-id=9364-2559)

This repo is a **curated subset** — not a dump of the 49-page Figma file. Tokens come from the **Design System Foundations** library; components are simplified HTML/CSS specimens.

## Assets

Placeholder logos and Hugo SVGs are in [`assets/`](assets/). Replace with official brand files when available — see [`assets/README.md`](assets/README.md).

## Contributing

1. Edit tokens in `colors_and_type.css`
2. Update the matching section in `DESIGN.md`
3. Update the relevant specimen in `components/`
4. Preview in browser before committing

## Licence

Internal Protect Line brand asset. Not for external redistribution.
