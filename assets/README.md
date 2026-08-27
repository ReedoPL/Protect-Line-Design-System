# Assets

Official Protect Line brand assets for the design system.

## Logos (`assets/logos/`)

| Canonical path | Source file | When to use |
|----------------|-------------|-------------|
| `primary-logo-white-pink.png` | Primary-Logo-White-&-Pink.png | Nav, footer, dark/navy backgrounds |
| `primary-logo-navy-pink.png` | Primary-Logo-Navy-&-Pink.png | Light/fair-blue backgrounds |
| `primary-logo-white.png` | Primary-Logo-White.png | Single-colour white on dark |

Also included: brandmarks, circle logos, and cobrand variants (original filenames preserved).

## Hugo (`assets/hugo/`)

Full Hugo mascot library (PNG). Canonical shortcuts:

| Path | When to use |
|------|-------------|
| `hugo-heart.png` | Small card icons, inline accents |
| `hugo-waving.png` | Friendly hero or slide accents |

Browse the folder for poses (thinking, celebrating, umbrella, etc.). Use Hugo sparingly — not on every component.

## Still `[REQUIRES SOURCE]`

- Hand-drawn pink underline stroke (for `.pl-underline-accent` in CSS — currently a flat bar)
- Lora Bold-Italic font file (Google Fonts used in specimens)

## Usage in specimens

```html
<!-- Header / footer on navy -->
<img src="../assets/logos/primary-logo-white-pink.png" alt="Protect Line" width="191" height="43">

<!-- Light background -->
<img src="../assets/logos/primary-logo-navy-pink.png" alt="Protect Line" width="191" height="43">

<!-- Hugo accent -->
<img src="../assets/hugo/hugo-heart.png" alt="" width="48" height="48">
```

## Fonts

Loaded via Google Fonts in `colors_and_type.css`:

- Poppins (400, 600, 700)
- Lora Bold-Italic (700 italic)

Arial is the email/customer-pack fallback only — do not use in web specimens.
