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
