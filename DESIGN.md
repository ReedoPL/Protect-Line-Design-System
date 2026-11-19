# Protect Line design system

British English. This file is the visual contract for Claude Design, Cursor, and any agent generating Protect Line UI.

**Purpose:** *Investing in Our People to Protect Yours.*

**Name:** Always two words — **Protect Line** (never "Protectline").

---

## 1. Visual theme and atmosphere

Protect Line feels **British, warm, confident, and human** — like a chat over a cuppa, not a lecture from a financial institution.

- **Dominant mood:** Navy-first layouts with white space and friendly copy.
- **Accent:** Hot pink used **sparingly** — CTAs, links, Hugo, small highlights only.
- **Density:** Comfortable, readable, not cramped. Left-aligned long copy.
- **Avoid:** Generic SaaS (sky blue, Inter, card-in-card shadows), fear-mongering insurance tone, American spelling, Title Case headings.

---

## 2. Colour palette and roles

Use **only** tokens from `colors_and_type.css`. Map to CSS variables — never hardcode hex in components.

### Primary colours

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Navy | `--color-navy` | `#0C073D` | Backgrounds, text, dominant brand colour |
| White | `--color-white` | `#FFFFFF` | Backgrounds, text on dark/pink |
| Hot pink | `--color-hot-pink` | `#F20779` | CTA buttons, links, icons, Hugo — **sparingly** |

### Secondary blues (backgrounds and sections only)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-mid-blue` | `#A3C8F5` | Section backgrounds |
| `--color-light-blue` | `#CFDBF2` | Section backgrounds |
| `--color-fair-blue` | `#ECF1FA` | Section backgrounds |

### Secondary pinks

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-mid-pink` | `#FF61B1` | Graphs, CTA borders |
| `--color-light-pink` | `#FDB3DF` | Headings on navy backgrounds only |
| `--color-fair-pink` | `#FCE6F2` | Illustrations and icon backgrounds only |

### Semantic shortcuts

| Token | Maps to |
|-------|---------|
| `--color-bg-primary` | Navy |
| `--color-bg-nav` | Dark Blue 700 `#18124D` |
| `--color-cta-bg` | Hot pink |
| `--color-text-link` | Hot pink |

### Figma ramps

Optional extended ramps (`--color-dark-blue-50` … `900`, `--color-pink-50` … `900`) exist in `colors_and_type.css` for gradients and subtle tints. Prefer named brand tokens first.

---

## 3. Typography rules

### Font stack

| Role | Font | Fallback | Notes |
|------|------|----------|-------|
| Primary | Poppins | Arial | Everything: body, headings, buttons, nav |
| Accent | Lora **Bold-Italic only** | Georgia | Quotes, mixed headings, decorative emphasis |
| Fallback | Arial | sans-serif | Email/packs only — **never for creative headings** |

Load via Google Fonts (included in `colors_and_type.css`).

### Hierarchy

| Level | Style | Example |
|-------|-------|---------|
| Display | Poppins Bold, largest | Hero headline |
| H1 | Poppins Bold / Semibold | Page title |
| Top subheading | Poppins Regular, ALL CAPS, tracked | Eyebrow label |
| Section heading | Poppins Bold, ALL CAPS, white on navy block | Section dividers |
| H2–H3 | Poppins Bold / Semibold | Subsections |
| Body | Poppins Regular, 16px | Paragraphs — **sentence case** |
| Quote | Lora Bold-Italic, centred | Pull quotes |
| Button | Poppins Bold, white on pink | CTAs |
| Link | Poppins Bold, pink, underlined | Inline links |

### Creative typography (use sparingly)

- **Outline words:** hollow outlined headings for value posters
- **Highlighter:** pink background block behind a word in a sentence
- **Tracking:** increased letter-spacing on short all-caps headings
- **Hand-drawn underline:** pink wavy underline under key words
- **Mixed fonts:** Poppins + Lora in one heading ("Mix" sans + "fonts" serif)
- **Weight contrast:** bold pink + light white weights in one heading

### Alignment

- **Left-align** long copy and body text (F-shaped reading pattern).
- **Centre-align** only short, simple lines (hero headlines, quotes).

---

## 4. Component stylings

Reference specimens in `components/`. Use class names from `components/components.css`.

### Buttons

| Variant | Class | When to use |
|---------|-------|-------------|
| Primary | `.pl-btn-primary` | Main CTA — pink pill, white bold text, optional shine |
| Secondary (dark) | `.pl-btn-secondary` | Outlined navy pill on light backgrounds |
| Secondary (light) | `.pl-btn-secondary-light` | Outlined white pill on dark backgrounds |
| Tertiary | `.pl-btn-tertiary` | Text-only action, pink bold underline |
| Link | `.pl-link` | Inline text link |

Primary button spec (from Figma): pink fill `#F20779`, pink-300 border `#FF61B1`, pill radius, padding 12px 36px, Poppins Bold 16px.

### Header / navigation

- Class: `.pl-header`
- Pill-shaped nav bar on navy `#18124D` with border `#3A337D`
- White bold nav links with dropdown chevrons
- Primary CTA button right-aligned
- Desktop max-width 1200px; mobile collapses to hamburger

### Hero

- Class: `.pl-hero`
- Large headline, supporting copy, primary CTA
- Navy or fair-blue background variants
- Mobile: stacked, centred headline

### Cards

| Variant | Class | When to use |
|---------|-------|-------------|
| Product card | `.pl-card-product` | Product carousel items |
| Expandable | `.pl-card-expandable` | FAQ-style expandable content |
| Review | `.pl-card-review` | Trustpilot-style testimonial |
| Content block | `.pl-card-content` | Image + text side-by-side |

### Footer

- Class: `.pl-footer`
- Navy background, white text, link columns, social icons, legal row

### FAQ accordion

- Class: `.pl-accordion`
- Navy question row, fair-blue expanded answer

### Tags

- Class: `.pl-tag`
- Small pill labels, fair-pink background or navy outline

### Testimonials

- Class: `.pl-testimonial`
- Quote + name + role, optional star rating

---

## 5. Layout principles

### Spacing scale

Use tokens only — do not invent intermediate values.

| Token | Value |
|-------|-------|
| `--spacing-xxsm` | 4px |
| `--spacing-xsm` | 8px |
| `--spacing-sm` | 12px |
| `--spacing-md` | 16px |
| `--spacing-lg` | 24px |
| `--spacing-xlg` | 32px |
| `--spacing-hg` | 40px |
| `--spacing-xhg` | 48px |
| `--spacing-xxlg` | 64px |
| `--spacing-xxhg` | 80px |
| `--spacing-xxxhg` | 96px |
| `--spacing-enorm` | 128px |

### Grid

- Max container: `--container-max` (1200px)
- Section vertical padding: `--spacing-xxhg`
- Component gap: `--spacing-lg`
- Card radius: `--radius-lg` (16px)
- Button/nav radius: `--radius-pill` (100px)

---

## 6. Depth and elevation

Protect Line is **mostly flat**. Do not add generic card shadows or gradients.

- Nav bar: subtle `--shadow-nav` only
- Emphasis via **colour blocks** (pink highlighter, navy section headings) not drop shadows
- No card-in-card nesting
- No decorative gradients unless from brand blue/pink ramps

---

## 7. Do's and don'ts

### Do

- Spell **Protect Line** as two words
- Use **British English** (colour, organise, cheque)
- Write in **sentence case** (only capitalise sentences and proper nouns)
- Use **verbs over nouns** ("start" not "commence")
- Explain jargon once, then use the term
- Use emojis as **spice**, not the main course
- Left-align long copy
- Use hot pink **sparingly** for CTAs and links
- Build desktop **and** mobile variants
- Mark missing assets `[REQUIRES SOURCE]`

### Don't

- Use Title Case For Every Heading
- Use Arial for creative or decorative headings
- Use Lora weights other than Bold-Italic
- Use Inter, Roboto, or system-default sans-serif
- Use sky-blue or generic SaaS accent colours
- Make pink a full-page background
- Use secondary blues/pinks outside their designated roles
- Fear-monger ("your family will struggle")
- Over-capitalise or use unnecessary formal language
- Invent hex values not in `colors_and_type.css`
- Add card shadows, glassmorphism, or gradient overlays

---

## 8. Responsive behaviour

| Breakpoint | Width | Behaviour |
|------------|-------|-----------|
| Mobile | < 768px | Single column, stacked nav (hamburger), centred short headlines |
| Tablet | 768–1023px | Two columns where appropriate, condensed nav |
| Desktop | ≥ 1024px | Full layout, horizontal nav, max-width container |

- Minimum touch target: **44px**
- Body text stays 16px minimum on mobile
- Images scale fluidly; cards stack vertically on mobile
- Navigation collapses to mobile menu below 768px

---

## 9. Agent prompt guide

Copy-paste these when starting a new design in Claude Design or Cursor.

### Landing page

```
Design a Protect Line life insurance landing page using DESIGN.md and colors_and_type.css.
Include: pill nav header with "Get a quote" CTA, hero with warm headline in sentence case,
three benefit cards on fair-blue background, testimonial section, FAQ accordion, navy footer.
British English. No generic SaaS styling.
```

### Product page

```
Design a Protect Line product page for [product name] using the design system.
Include: sub-hero, content blocks with left-aligned copy, expandable FAQ cards,
primary pink CTA buttons, trust signals. Sentence case throughout.
```

### Social / slide asset

```
Create a 1080×1080 social post for Protect Line about [topic].
Navy background, pink CTA text, Poppins Bold headline, one Hugo heart icon.
Warm and friendly tone — not fear-based.
```

### Email header

```
Design an email header banner for Protect Line (600px wide).
Use Poppins (or Arial fallback note), navy background, pink CTA button, Protect Line logo.
```

### Before finishing any design

1. Check all colours map to CSS variables in `colors_and_type.css`
2. Confirm sentence case on all headings and body
3. Verify pink is used sparingly (CTAs, links, accents only)
4. Check mobile layout at 375px width
5. Run accessibility check: contrast ratios on navy/pink/white combinations

---

## 10. App UI

Sections 1–9 are the marketing contract and still apply to anything a customer reads as a page. This section is the **app layer**: product screens such as admin tools, dashboards, data tables and chat. It adds what the marketing kit does not have — status colours, dark mode, a compact type scale, a monospace and a data-viz palette — and changes none of the marketing tokens.

| File | What it is |
|------|------------|
| `tokens/app.tokens.json` | Source of truth for the app layer (W3C Design Tokens format). Every new value carries its reason. |
| `tokens/foundation.tokens.json` | The marketing tokens from `colors_and_type.css`, mirrored so aliases resolve |
| `app-tokens.css` | Generated. Every token as a CSS custom property, light and dark. Self-contained: an app can load it without `colors_and_type.css`. |
| `app-fonts.css` | Generated. The Google Fonts import, on its own. Link it, or leave it out and host Poppins, Lora and JetBrains Mono in the app. |
| `components/app-components.css` | App component classes, built on the tokens only |
| `tokens/tailwind.css` | Generated. A Tailwind v4 theme |
| `tokens/shadcn.css` | Optional. shadcn/ui's variable names mapped onto the app layer, for an app that keeps Radix-based components (10.10) |
| `tokens/app.resolved.json` | Generated. Every token resolved, per mode, for Python and other non-CSS code |
| `preview/app-colours.html`, `app-type.html`, `app-components.html`, `app-layout.html`, `data-viz.html` | Specimens. Add `?theme=dark` to force dark mode. |

```html
<link rel="stylesheet" href="app-fonts.css">
<link rel="stylesheet" href="app-tokens.css">
<link rel="stylesheet" href="components/app-components.css">
<body class="pl-app">
```

App component classes (`.pl-button`, `.pl-input`, `.pl-table`…) never share a name with the marketing classes (`.pl-btn`, `.pl-card`…), so both stylesheets can load on one page.

### 10.1 When to use what

| Use the app layer for | Keep the marketing kit for |
|---|---|
| Tables, filters, forms, settings | Landing and product pages |
| Dashboards and charts | Emails, letters, customer packs |
| Chat and assistant screens | Slides and social posts |
| Internal and customer-facing tools | Long help articles a customer reads as a page |

### 10.2 Semantic colours

Build screens from these roles, never from raw hex or the ramps directly. Light is the default; dark is a mapping of the same names (see 10.5).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--app-surface-canvas` | dark-blue-50 `#F4F3F9` | dark-blue-900 `#08052E` | App background behind panels |
| `--app-surface` | white | navy `#0C073D` | Panels, tables, the working surface |
| `--app-surface-raised` | white | dark-blue-700 `#18124D` | Dialogs, menus, toasts |
| `--app-surface-sunken` | dark-blue-50 | dark-blue-900 | Wells, table headers, progress tracks |
| `--app-surface-hover` / `-pressed` | navy at 5% / 9% | dark-blue-200 at 8% / 14% | Translucent, so they work on any surface |
| `--app-surface-selected` | fair blue `#ECF1FA` | dark-blue-600 `#2A2368` | Selected rows, with the hot-pink bar |
| `--app-surface-inverse` | navy | dark-blue-50 | Sidebar, tooltips |
| `--app-border-subtle` / `--app-border` | dark-blue-100 / -200 | dark-blue-600 / -500 | Row dividers / panel outlines (decorative) |
| `--app-border-strong` | dark-blue-400 `#6B67A8` | dark-blue-400 | Form-control boundaries (≥3:1) |
| `--app-text` | navy | dark-blue-50 | Primary text |
| `--app-text-muted` | dark-blue-500 `#3A337D` | dark-blue-200 | Secondary text |
| `--app-text-subtle` | dark-blue-450 `#5E599C` | dark-blue-300 | Captions, placeholders, column headers |
| `--app-text-link` | pink-700 `#B8055A` | mid pink `#FF61B1` | Links in app text |
| `--app-accent` | pink-600 `#D9066C` | pink-600 | Primary button, checked controls |
| `--app-accent-strong` | hot pink `#F20779` | hot pink | Active tab, selected bar, switch, progress |
| `--app-accent-subtle` | fair pink | pink-950 `#431A4D` | Your chat bubble, a selected chip |
| `--app-focus-ring` | hot pink | hot pink | Focus ring, 2px, 2px offset |
| `--app-selection-bg` | light pink | pink-800 | Text selection |
| `--app-scrim` | navy at 48% | dark-blue-900 at 72% | Behind dialogs |

**Hot pink in the app.** Hot pink on white is 4.13:1 — enough for a focus ring or an indicator bar (3:1), not enough for text at 12–14px (4.5:1), and white text on it is the same 4.13:1. So in the app:

- fills under white text use **pink-600** (5.01:1);
- pink text uses **pink-700** (6.55:1) on light, **mid pink** on dark;
- hot pink itself is for things that are not text: the focus ring, the active-tab bar, the selected-row bar, the switch track, progress.

The marketing primary button keeps hot pink. Its 16px bold label is also below 4.5:1 — worth a separate look by the brand team.

**Depth.** The app is flat like the website. Panels separate by tone and a 1px border. The single shadow, `--app-shadow-overlay`, is for things that float over content — menus, popovers, toasts, dialogs — never for cards or panels.

### 10.3 Status colours

Every status has five roles: `bg` (tint), `border`, `fg` (text and icon), `solid` and `on-solid`. Use them as `--app-status-<status>-<role>`.

| Status | Words it carries | Built from |
|---|---|---|
| `info` | Running, processing, tips | Fair blue, mid blue and the navy ramp — no new hex, no sky blue |
| `attention` | Waiting for you | The brand pinks. The user has to act: it is a call to action, not an error |
| `success` | Complete, passed, saved | New ramp, teal-leaning green |
| `warning` | Needs review, partial | New ramp, amber; the light solid is deep ochre because bright amber is under 2:1 on white |
| `danger` | Failed, blocked, destructive | New ramp, a true red 26° of hue away from the brand pinks (21 ΔE00 from pink-600), so an error never reads as a call to action |
| `neutral` | Queued, draft, cancelled | The navy ramp |

- Status is **never colour alone**: always a word, plus a dot or an icon.
- Solids flip in dark mode: deep fills with white text on light, bright fills with navy text on navy. Destructive buttons are the exception: `--app-destructive` stays red-600 with white text in both modes, because a salmon pill reads too gently for something that cannot be undone.
- Never use a status colour for a chart series, or a series colour for a status.

### 10.4 New colour values (for brand approval)

The app layer needed colours the marketing kit does not have. These are all of them; everything else maps onto the existing palette.

| Token | Hex | Why |
|---|---|---|
| `--color-dark-blue-450` | `#5E599C` | Subtle text. Halfway between dark-blue-400 and -500 on the same hue: 400 is 4.49:1 on fair blue, so captions fail AA on a selected row |
| `--color-success-50 / 200 / 600 / 700 / 900` | `#E7FBF0` `#7BCBA5` `#037D55` `#056242` `#0A384B` | Tint / border (dark: text and solid) / solid under white / text / dark tint |
| `--color-warning-50 / 200 / 600 / 700 / 900` | `#FFF3E7` `#EDB06B` `#9C6005` `#7A4B03` `#3E303C` | As above |
| `--color-danger-50 / 200 / 600 / 700 / 900` | `#FEF2F0` `#FEA496` `#D02E23` `#AA1811` `#532540` | As above |
| `--color-pink-950` | `#431A4D` | Attention tint and pink wash on dark: pink-600 mixed 30% into navy |
| `--color-chart-*-on-light` | `#5286D3` `#E5A323` `#079A94` `#E77140` `#7F4BB1` `#53933A` | Chart slots 3–8 (blue, amber, teal, coral, violet, green) |
| `--color-chart-*-on-dark` | `#5E93E1` `#C58501` `#18A7A1` `#E16A3E` `#9763CC` `#5DA443` | The same hues stepped for navy |

The 900 steps are each 600 mixed 40% into navy (in OKLab), so dark-mode tints read as navy with a cast of colour, not as black boxes. Each solid sits at a relative luminance of about 0.155: white text on it is ≥5.1:1, and it stays ≥3.3:1 against the navy page, panel and raised surfaces.

### 10.5 Dark mode

Dark mode is **navy, not grey or black**: surfaces step up the dark-blue ramp (canvas 900 → surface 800 → raised 700 → selected 600).

- It follows the operating system by default. `data-theme="dark"` or `data-theme="light"` on `<html>` overrides it.
- `data-theme` works on **any element**, so a panel can opt into the other mode — a navy sidebar inside a light app is `data-theme="dark"` on the sidebar.
- Swap the logo: navy-and-pink on light, white-and-pink on dark.
- Hugo is outlined in navy, which vanishes on navy. Put him on `--app-illustration-plate` (a light disc in both modes).

### 10.6 Type and density

Same typeface, a tighter scale. Classes are in `components/app-components.css`.

| Style | Class | Size / line | Weight | Use |
|---|---|---|---|---|
| Stat | `.pl-text-stat` | 28/36 | 600 | The one figure a tile leads with |
| Page title | `.pl-text-page-title` | 28/36 | 700 | The page's own name (“Calls”, “Team coaching”). One per screen, and nothing larger |
| Title | `.pl-text-title` | 20/28 | 700 | A page titled with a record's or a person's name, which can run long and wrap |
| Section | `.pl-text-section` | 18/24 | 600 | Headings inside a page |
| Heading | `.pl-text-heading` | 16/24 | 600 | Card and dialog titles |
| Body large | `.pl-text-body-lg` | 16/24 | 400 | Reading text: chat replies, descriptions |
| Body | `.pl-text-body` | 14/20 | 400 | The default for app UI |
| Label | `.pl-text-label` | 13/18 | 500 | Form labels, tabs |
| Table | `.pl-text-table` | 13/18 | 400 | Dense table cells |
| Caption | `.pl-text-caption` | 12/16 | 400 | Timestamps, hints. Nothing smaller |
| Eyebrow | `.pl-text-eyebrow` | 12/16, +0.06em, caps | 500 | One or two words only |
| Mono | `.pl-mono` | 0.96em | 400 | Ids, codes, durations, money, scores in columns |

**Monospace: JetBrains Mono.** The Google Fonts build of Poppins has proportional figures only — a “1” is about half the width of a “0” — and `font-variant-numeric: tabular-nums` does nothing to it (measured in Chromium). So figures that must line up go in the monospace. JetBrains Mono was picked over IBM Plex Mono and DM Mono because it is the closest match to Poppins: the same x-height at the same size, digits within 5% of Poppins’ width, and clear 0/O and 1/l/I. Its caps and figures are 4% taller, so `.pl-mono` sets it at 0.96em. Big standalone figures (a stat tile) stay in Poppins.

**Keeping dense tables readable in Poppins.** Poppins is wide and round, so:

- 13px text on 36px rows for data tables; 14px everywhere else; never below 12px;
- leave tracking at 0 below 16px; tighten (−0.01em) only for headings 18px and up;
- make hierarchy with weight (500 for the primary column) and ink (muted for the rest), not size;
- right-align figures in the monospace, with the same decimal places down a column;
- sentence-case headers at 12px in subtle ink; all-caps only for one-word labels;
- truncate long text with an ellipsis and keep the full value in a tooltip or the detail view;
- when it does not fit, drop a column — do not switch to a narrower font.

**Density.** Controls are 32px (`--app-control-height-sm`) or 40px (`-md`), and grow to 44px under `(pointer: coarse)` to keep the §8 touch minimum. Table rows are 36px (`--app-row-height-compact`) or 44px. Spacing reuses `--spacing-*`, plus `--app-space-2` (2px) and `--app-space-6` (6px) for badges and icon gaps. Radius: controls 8px, panels 12px, dialogs 16px, buttons and pills the brand pill.

### 10.7 Data visualisation

**Categorical** (`--viz-cat-1` … `-8`) — assign in order, never skip or cycle, and keep a series' colour when a filter removes others. Past eight, fold the tail into `--viz-other`.

| Slot | Light | Dark |
|---|---|---|
| 1 brand ink | navy `#0C073D` | dark-blue-200 `#C5C3E0` |
| 2 | hot pink `#F20779` | hot pink |
| 3 blue | `#5286D3` | `#5E93E1` |
| 4 amber | `#E5A323` | `#C58501` |
| 5 teal | `#079A94` | `#18A7A1` |
| 6 coral | `#E77140` | `#E16A3E` |
| 7 violet | `#7F4BB1` | `#9763CC` |
| 8 green | `#53933A` | `#5DA443` |

Slot 1 is deliberately outside the usual 0.43–0.77 lightness band for chart colours: it is the brand ink and plays the “main series” role, as navy does in our PDF charts. Amber is 2.19:1 on white, so amber marks need a visible label or a table view beside the chart; coral (3.07:1) is only just over 3:1.

**Colour-blind check** (`node scripts/cvd-report.js`): Machado et al. 2009 simulation at full severity, CIEDE2000 between neighbouring slots. Worst neighbouring pair — light: normal 42.6, protanopia 20.3, deuteranopia 34.8, tritanopia 30.2; dark: 36.9, 24.2, 28.3, 25.6 (gate: 10). The first three slots also clear 10 for every pair, so scatter plots and maps (where any two colours can touch) should stop at three series.

**Sequential** — `--viz-seq-navy-1…6` (the dark-blue ramp, low to high) and `--viz-seq-pink-1…6` (the pink ramp). In dark mode they flip so small values sink into the navy.

**Diverging** — `--viz-div-1…7`: navy-blue arm (dark-blue-500, -400, mid blue), a neutral midpoint (dark-blue-50; on dark, the raised navy surface), pink arm (mid pink, pink-600, pink-900). The cool arm ends in mid blue rather than pale lavender because pale lavender and light pink look identical with protanopia (ΔE00 1.6). Every step stays ≥13.5 ΔE00 from its opposite number in all three simulations.

**Chart chrome** — gridlines `--viz-grid`, axes `--viz-axis`, labels in the text tokens (never the series colour). Bars at most 24px thick with a 4px rounded end, a 2px surface gap between touching marks, and a table view for every chart.

**Replacing the PDF chart colours.** The company's PDF charts use four off-palette colours. Map them as follows (nothing outside this repository has been changed):

| Today | Used for | Token | Light | Dark |
|---|---|---|---|---|
| `GREY #A6ADBF` | “Other” series, muted text | `--viz-other` | `#9F9CCB` | `#6B67A8` |
| `GREY #A6ADBF` | Gridlines, heatmap cell edge | `--viz-grid` | `#E8E7F3` | `#2A2368` |
| `MID #86839E` | Third stacked segment | `--viz-cat-3` | `#5286D3` | `#5E93E1` |
| `LIGHT_PINK #FFCCE3` | Fourth stacked segment | `--viz-cat-4` | `#E5A323` | `#C58501` |
| `FAIR #F4F6FB` | Heatmap floor | `--viz-seq-navy-1` | `#F4F3F9` | `#18124D` |
| `FAIR #F4F6FB` | Panel and table-cell backgrounds | `--app-surface-sunken` | `#F4F3F9` | `#08052E` |

The same code also uses `NAVY_LIFT #1E175C` (use `--app-surface-raised`, `#18124D`) and generated heatmap steps `#BABACC #807E9C #46436C` (use `--viz-seq-navy-2…5`). Mapping MID and LIGHT_PINK to slots 3 and 4 changes how a stacked chart looks: blue and amber instead of grey-lavender and pale pink.

### 10.8 Components

| Component | Classes |
|---|---|
| Buttons | `.pl-button` + `--primary` / `--secondary` / `--tertiary` / `--danger`, `--sm`, `--icon`; `disabled`; `aria-busy="true"` with a `.pl-spinner` |
| Link button | `.pl-link`: a button that reads as a link (“Show more”, “Clear filters”). It does something on this page; a link that goes somewhere stays a bare `<a>` |
| Segmented control | `.pl-segmented` (`--sm`) around buttons with `aria-pressed`, or `role="radio"` with `aria-checked`. Two to five choices of one thing, all in view; past five, a select |
| Fields | `.pl-field`, `.pl-label`, `.pl-hint`, `.pl-error`, `.pl-input`, `.pl-input-group`, `.pl-textarea`, `.pl-select` (wraps a native select) |
| Choices | `.pl-choice` with `.pl-check`, `.pl-radio`, or `.pl-switch` (`role="switch"`) |
| Table | `.pl-table-frame`, `.pl-table-toolbar`, `.pl-table-scroll`, `.pl-table`, `.is-num`, `.pl-sort` with `aria-sort`, `tr[aria-selected="true"]`, `.pl-table__empty`, `.pl-table-footer`, `.pl-id` |
| Tabs | `.pl-tabs`, `.pl-tab[aria-selected]` |
| Status | `.pl-pill` + `--info` / `--success` / `--warning` / `--danger` / `--attention`, `--solid`, `--live`; `.pl-badge` |
| Feedback | `.pl-alert`, `.pl-toast`, `.pl-progress`, `.pl-spinner`, `.pl-skeleton`, `.pl-empty` |
| Overlay | `.pl-scrim`, `.pl-dialog` (480px) + `--lg` (720px) / `--xl` (880px). A dialog taller than the window keeps its title and buttons in view and scrolls its body |
| People | `.pl-avatar`: initials or a photo in a fair-pink circle, the same wherever the person appears |
| Page | `.pl-page`, `.pl-page-header`, `.pl-page-tabs`, `.pl-two-col` (10.12) |
| Chat | `.pl-chat`, `.pl-msg` (`--user`), `.pl-msg-card`, `.pl-notice`, `.pl-composer`; `.pl-msg__text` styles the Markdown a reply carries (lists, headings, tables, quotes, code, rules), so a CSS reset never strips it. A reply's table has a full grid in the strong border: with no frame and no row hover, the lines are all that keeps a cell with its column |

### 10.9 Do's and don'ts for data-dense screens

**Do**

- Give each view one primary (pink) button; everything else is secondary or tertiary.
- Put labels above fields, hints below, and errors in words beside an icon.
- Show progress with real numbers when you have them (“312 of 1,284”).
- Let a dense table scroll sideways inside its frame on a phone — never the page.
- In chat, keep the assistant's reply on the page at 16px; put anything to approve in a card with one clear action, and say nothing runs until it is approved.
- Use Hugo once, where a screen would otherwise be empty.
- Write sentence case and British English — in empty states, toasts and errors too.

**Don't**

- Put hot pink on text, or on whole table rows and columns.
- Use status colours for decoration, or colour alone to carry a status.
- Add shadows to cards or panels, gradients, or glassmorphism.
- Use Inter, Roboto or a system font to fit more in; Lora is not for product UI.
- Go below 12px, or set dense tables in all caps.
- Invent new colours — add a token here, with its reason, and get it approved.

### 10.10 Tokens for every stack

`tokens/app.tokens.json` is the source. `node scripts/build-tokens.js` regenerates `app-tokens.css`, `app-fonts.css`, `tokens/tailwind.css` and `tokens/app.resolved.json`; `node scripts/build-tokens.js --check` fails if any of them is stale or if `tokens/foundation.tokens.json` no longer matches `colors_and_type.css`. Run the check before committing.

Naming: the CSS name is `--` plus the token path joined with `-`; a trailing `default` is dropped and the `theme.light.` / `theme.dark.` prefix is removed. `theme.light.app.surface.default` is `--app-surface`; `color.success.600` is `--color-success-600`.

**Fonts.** `app-tokens.css` loads no fonts. Link `app-fonts.css` from the page head, or host the three families in the app and leave the file out. Do not `@import` it from a bundled stylesheet: a bundler inlines it mid-file, where browsers ignore an `@import url(...)`.

**Tailwind v4.** Import the generated theme after Tailwind and the tokens:

```css
@import "tailwindcss";
@import "./design-system/app-tokens.css";
@import "./design-system/tokens/tailwind.css";
```

```html
<div class="bg-surface text-fg border border-line rounded-panel p-4">
  <span class="bg-success-bg text-success-fg rounded-pill px-2 text-app-xs">Complete</span>
  <button class="bg-accent hover:bg-accent-hover text-fg-on-accent rounded-pill">Approve plan</button>
</div>
```

The theme clears Tailwind's default colours, fonts, radii and shadows, so only brand values exist: `bg-sky-500` and `shadow-md` are not available. Themed utilities read the custom properties at runtime, so `data-theme="dark"` re-themes them without a rebuild.

A class Tailwind does not know produces no CSS and no error, so a misspelt `text-app-base` or `pl-link` fails silently. An app should check the classes it uses against the ones that exist; gui2 found two of its own this way.

Layout utilities from the theme: `wide:` applies from 1200px (`md:` is Tailwind's own 768px), `max-w-content` is the 1200px content width, and the layers are read as `z-(--app-layer-sticky)`.

**shadcn/ui and Radix.** An app that keeps Radix-based components for their behaviour (menus, popovers, sliders) imports `tokens/shadcn.css` after the theme. It maps shadcn's variable names onto the app layer, and carries three things learned in use: `--primary` is pink-600, never hot pink (10.2); the variables are declared on every `[data-theme]` element, because a custom property inherits as its computed value and a dark sidebar would otherwise get the page's light colours; and `--accent` means the brand accent, not shadcn's hover tint.

**Python** (PDF charts, decks). Read the resolved file — no alias handling needed:

```python
import json

tokens = json.load(open("tokens/app.resolved.json"))
light, dark = tokens["light"], tokens["dark"]
SERIES = [light[f"viz.cat.{i}"] for i in range(1, 9)]   # ['#0c073d', '#f20779', '#5286d3', …]
OTHER, GRID = light["viz.other"], light["viz.grid"]
```

Or resolve aliases from the source files directly:

```python
import json, re

def load_tokens(*paths):
    tree = {}
    def merge(a, b):
        for k, v in b.items():
            if isinstance(v, dict) and isinstance(a.get(k), dict) and "$value" not in v:
                merge(a[k], v)
            else:
                a[k] = v
    for p in paths:
        merge(tree, json.load(open(p)))
    def value(path):
        node = tree
        for part in path.split("."):
            node = node[part]
        v = node["$value"]
        if isinstance(v, str) and re.fullmatch(r"\{[^}]+\}", v):
            return value(v[1:-1])
        return v["hex"] if isinstance(v, dict) and "hex" in v else v
    return value

value = load_tokens("tokens/foundation.tokens.json", "tokens/app.tokens.json")
value("theme.light.app.status.success.fg")   # '#056242'
```

### 10.11 Checks

| Command | What it checks |
|---|---|
| `node scripts/build-tokens.js --check` | Generated files are current; foundation JSON matches `colors_and_type.css`; every custom property the component CSS reads is a token |
| `node scripts/contrast-report.js` | WCAG 2.x contrast of every text pair (≥4.5:1) and UI boundary (≥3:1) the components use, light and dark |
| `node scripts/cvd-report.js` | Colour-blind separation of the chart palette, ramp monotonicity, diverging arms |

All three are dependency-free (Node 18+) and exit non-zero on failure.

### 10.12 Page layout

One frame for every page: a navy sidebar, a page with one title, and a side column that arrives at 1200px. Specimens are in `preview/app-layout.html`.

**The shell** is the app's own, so it has no classes here, only measurements:

| Part | Rule |
|---|---|
| Sidebar | 248px wide, full height, `data-theme="dark"` so it is navy in either mode. The current page has the selected surface and the hot-pink bar |
| Main | Everything else. It holds one `.pl-page` |
| On a phone (under 768px) | The sidebar becomes a drawer, at most 280px wide, opened from a navy bar that stays at the top of the window |

**The page**

| Class | What it is |
|---|---|
| `.pl-page` | The page. It owns the padding (16px by 20px on a phone, 32px from 768px), so a band can run edge to edge by undoing exactly that much |
| `.pl-page__content` | Content that stops growing at 1200px (`--app-width-content`) and stays on the left, under its title |
| `.pl-page-header` | The header band of a record's page, on the surface tone |
| `.pl-page-header__row` | The title on the left, wrapping in its own column; `.pl-page-header__actions` on the right, level with the title's first line. On a phone the actions are a row under the title |
| `.pl-page-header__facts` | A `<dl>` of labelled facts under the title: a wrapped row, or a two-column grid on a phone |
| `.pl-page-tabs` | The page's own tab row under the band. From 768px it sticks to the top of the window, and whatever sticks beneath it clears it |
| `.pl-two-col` | `__main` and a 340px `__side` (`--app-width-side`) beside it from 1200px. Below that the side column follows the main one at full width. `--sticky-side` makes the whole side column follow the reader, and scroll itself when it is taller than the window |

Rules that came from use:

- **A page that is not a record has no band**: its name in `.pl-text-page-title`, then its content. The band is for a record, whose name can be long, has a state, and has things you can do to it.
- **One group of actions, top right, with one pink button in it.** Everything else in the group is secondary, and several downloads are one Download menu, not a row of buttons.
- **The side column never wraps to a width of its own.** Between 768px and 1200px it sits under the main column at full width. A narrow side column beside a squeezed main one is the layout nobody can read.
- **Offsets come from one value.** Everything that sticks under the tab row reads the row's height from the page (`--pl-page-sticky-top`), so they cannot drift apart.

**Fixed numbers.** Two breakpoints and a few widths; everything else is fluid.

| Token | Value | Use |
|---|---|---|
| `--app-breakpoint-md` | 768px | Below it, the phone layout. A media query cannot read a custom property, so stylesheets write the value out; the token is the record of it |
| `--app-breakpoint-wide` | 1200px | From here a side column sits beside the main one. A 248px sidebar, 64px of padding and a 340px side column leave the main column about 520px, the narrowest a table or a paragraph reads well |
| `--app-width-content` | 1200px | The widest a page's content runs |
| `--app-width-side` | 340px | The side column |
| `--app-width-dialog`, `-lg`, `-xl` | 480 / 720 / 880px | A confirm or short form; two columns of fields; a table to check before acting |
| `--app-layer-sticky` | 10 | A row that sticks inside the page |
| `--app-layer-popover` | 20 | A menu opened from a control in the page; a page's sticky tab row |
| `--app-layer-bar` | 40 | The app's bar on a phone |
| `--app-layer-overlay` | 50 | Scrims, dialogs, drawers, toasts |

Four layers, and never a value between them. A component that seems to need one has usually been put in the wrong layer.
