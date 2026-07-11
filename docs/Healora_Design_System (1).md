# Healora Design System
### v1.0 — AI Health Assistant

**Design direction:** Calm clinical trust (Google Health) + precise product craft (Apple) + confident systemization (Stripe) + quiet, content-first structure (Notion). Every decision optimizes for a 68-year-old first-time user and a 34-year-old power user reading the same screen without either feeling underserved.

---

## 1. Color System

### 1.1 Primary Colors
| Token | Hex | Role |
|---|---|---|
| `color.primary.700` | `#082C4C` | Pressed/active state, dark text on tint |
| `color.primary.600` | `#0B3D66` | **Brand primary** — header, primary buttons, links, active nav |
| `color.primary.500` | `#164E7E` | Hover state for primary actions |
| `color.primary.100` | `#DCE7EF` | Primary tint — selected rows, subtle highlight backgrounds |
| `color.primary.50` | `#F0F5F8` | Faint wash — active nav-item background |

Deep teal-navy was chosen deliberately over "startup blue" — it reads as clinical and stable rather than trendy, closer to Google Health and Mayo Clinic digital properties than a consumer fintech app.

### 1.2 Secondary Colors
| Token | Hex | Role |
|---|---|---|
| `color.secondary.600` | `#1B7A72` | **Secondary/accent** — secondary buttons, chart accent, active-tab underline |
| `color.secondary.500` | `#22988E` | Hover for secondary actions |
| `color.secondary.100` | `#DCEFEC` | Tint — badges, chip backgrounds |

### 1.3 Accent Colors
| Token | Hex | Role |
|---|---|---|
| `color.accent.lavender` | `#6C63A6` | AI/assistant-only accents — chat bubble avatar ring, "AI thinking" indicator |
| `color.accent.gold` | `#C9A24B` | Premium/waitlist badges, milestone celebration states only |

Accents are used sparingly and never for functional/status meaning — they exist purely to give the AI Assistant a distinct visual "voice" separate from the rest of the product.

### 1.4 Neutral Colors
| Token | Hex | Role |
|---|---|---|
| `color.neutral.900` | `#1A1A1A` | Text Primary — headings, body copy |
| `color.neutral.700` | `#3A4247` | Secondary headings, strong body text |
| `color.neutral.500` | `#5B6770` | Text Secondary — captions, metadata, placeholders |
| `color.neutral.300` | `#A9B2B8` | Disabled text, disabled icons |
| `color.neutral.200` | `#E1E6E9` | Border / Divider — card borders, table dividers |
| `color.neutral.100` | `#F0F3F4` | Subtle fills — input backgrounds, hover row |
| `color.neutral.50` | `#F7F9FA` | **App Background** |
| `color.neutral.0` | `#FFFFFF` | **Surface/Card** — cards, modals, sheets |

### 1.5 Success
| Token | Hex | Role |
|---|---|---|
| `color.success.600` | `#227B48` | Success text/icon (meets 4.5:1 on white) |
| `color.success.500` | `#2E9E5B` | Success fill — "Taken" confirmation, adherence-met states |
| `color.success.100` | `#DFF3E7` | Success tint — banners, toasts |

### 1.6 Warning
| Token | Hex | Role |
|---|---|---|
| `color.warning.600` | `#8A6314` | Warning text/icon on tint |
| `color.warning.500` | `#E2A63B` | Warning fill — out-of-range vitals, soft alerts |
| `color.warning.100` | `#FBF0DA` | Warning tint — banners |

### 1.7 Error / Emergency
| Token | Hex | Role |
|---|---|---|
| `color.danger.700` | `#A02F2F` | Emergency banner text |
| `color.danger.600` | `#D64545` | **Danger/Emergency** — destructive actions, emergency triage banner only |
| `color.danger.100` | `#FBE3E3` | Error tint — inline form errors, destructive-confirm backgrounds |

**Governing rule:** red is reserved exclusively for genuine urgency or destructive confirmation — never used decoratively, never used for ordinary "required field" styling (use neutral-900 + icon instead). This is a deliberate anti-anxiety constraint given the health context.

---

## 2. Typography

### 2.1 Font Family
- **Primary:** `Inter`
- **Fallback stack:** `-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Numeric/data tables (optional):** Inter with `tabular-nums` feature enabled for vitals, dosage, and adherence tables so digits align in columns.

Inter was chosen — like Stripe and Notion — for its neutrality at small sizes and its humanist warmth at large sizes, avoiding the coldness of a pure geometric grotesk in a health context.

### 2.2 Type Scale

| Style | Standard Size | Elderly Mode | Weight | Line Height | Usage |
|---|---|---|---|---|---|
| **H1** | 28px | 34px | 700 Bold | 1.3 | Page titles |
| **H2** | 22px | 27px | 600 Semibold | 1.35 | Section headers |
| **H3** | 18px | 22px | 600 Semibold | 1.4 | Card titles, modal titles |
| **Body** | 16px | 20px | 400 Regular | 1.5 | Paragraphs, form labels |
| **Body Small** | 14px | 17px | 400 Regular | 1.5 | Secondary body copy, list items |
| **Caption** | 13px | 16px | 400 Regular | 1.45 | Metadata, timestamps, helper text |
| **Button Label** | 16px | 20px | 600 Semibold | 1.2 | All buttons |
| **Overline** | 12px | 14px | 600 Semibold, uppercase, +0.04em tracking | 1.3 | Eyebrow labels, section kickers |

- Letter spacing stays at default (0) for all reading text — no artificial tightening, matching Notion's plain, un-styled reading rhythm.
- Elderly Mode scales are not a CSS zoom hack — they are distinct, pre-defined sizes so line-length and card layouts remain intentional rather than just "bigger."

---

## 3. Spacing System

An 8pt base grid (4px used only for icon-to-label micro-gaps).

| Token | Value | Typical Use |
|---|---|---|
| `space.4xs` | 2px | Icon-glyph optical correction only |
| `space.3xs` | 4px | Icon-to-label gap, tight badge padding |
| `space.2xs` | 8px | Inline element gaps, chip padding |
| `space.xs` | 12px | Form field internal padding |
| `space.sm` | 16px | Default card padding (mobile), stack gap between related items |
| `space.md` | 24px | Card padding (desktop), gap between form groups |
| `space.lg` | 32px | Section gap within a page |
| `space.xl` | 48px | Gap between major page sections |
| `space.2xl` | 64px | Page top padding, hero/landing sections |
| `space.3xl` | 96px | Landing-page section breaks only |

**Grid:** 12-column, 24px gutter on desktop (≥1024px); 8-column, 16px gutter on tablet; 4-column, 16px gutter on mobile. Max content width 1200px, centered, with sidebar fixed at 260px (72px collapsed).

---

## 4. Border Radius

| Token | Value | Use |
|---|---|---|
| `radius.xs` | 4px | Badges, small chips, checkbox/radio |
| `radius.sm` | 8px | Inputs, buttons, small cards |
| `radius.md` | 12px | Standard cards, modals, dropdowns |
| `radius.lg` | 16px | Elevated feature cards, the Triage Card, onboarding panels |
| `radius.pill` | 999px | Tags, status pills, toggle switches, the FAB chat-entry button |

A consistent, moderate radius (never sharp, never bubbly) is core to the calm-clinical tone — sharper than Apple's Health app, softer than a children's app.

---

## 5. Button Styles

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| **Primary** | `primary.600`, hover `primary.500`, active `primary.700` | White | none | One per screen/section — the single most important action ("Send", "Save", "Get Started") |
| **Secondary** | `secondary.600` outline, transparent fill | `secondary.600`, white on hover-fill | 1.5px `secondary.600` | Supporting actions alongside a primary ("Cancel" pairs, "View Details") |
| **Tertiary / Ghost** | Transparent | `primary.600` | none | Low-emphasis actions, in-row links ("Edit", "Remove") |
| **Destructive** | `danger.600`, hover darker | White | none | Delete account, remove dependent, discard — always behind a confirm step |
| **Icon Button** | Transparent, `neutral.100` on hover | `neutral.700` | none | Header icons (bell, profile), row-level icon actions |

**Sizing:** Large 48px height (primary CTAs, onboarding) · Default 40px height · Small 32px height (inline table actions). Elderly Mode adds +8px height and +4px horizontal padding across all sizes, minimum 48×48px touch target per Section 25 of the PRD.

**States:** default → hover (6% darken or tint) → active/pressed (12% darken, scale 0.98) → focus (2px `primary.600` outline, 2px offset) → disabled (`neutral.300` bg, `neutral.500` text, no shadow, not-allowed cursor).

---

## 6. Card Styles

| Property | Value |
|---|---|
| Background | `color.neutral.0` (white) |
| Border | 1px solid `color.neutral.200` |
| Radius | `radius.md` (12px), `radius.lg` (16px) for feature/triage cards |
| Padding | `space.md` (24px) desktop, `space.sm` (16px) mobile |
| Shadow | `shadow.sm` at rest (see Section 11) |
| Hover (interactive cards only) | Lift to `shadow.md`, border to `neutral.300`, no scale transform |

**Card archetypes:**
- **Info Card** — dashboard tiles (Today's Reminders, Upcoming Appointments): icon top-left, H3 title, body metric, tertiary link bottom-right.
- **Triage Card** — the AI's structured output: `radius.lg`, colored left-edge accent bar (secondary/warning/danger by urgency), summary + recommended action + "Save to Health Record" button.
- **List-Row Card** — medications, documents: flatter, `radius.sm`, no shadow, only a bottom divider, for dense scannable lists.
- **Empty-State Card** — dashed 1px `neutral.200` border, centered icon + copy + single CTA.

---

## 7. Form Styles

- **Layout:** single-column forms by default (matches Stripe checkout patterns) — two-column only for tightly paired fields like DOB (month/day/year) or First/Last name.
- **Labels:** always visible above the field (never placeholder-only), Body weight 600, `neutral.700`, 4px margin below.
- **Helper text:** Caption, `neutral.500`, sits below the field.
- **Required fields:** marked with a subtle asterisk in `neutral.500`, never in red.
- **Error state:** field border → `danger.600`, helper text replaced with error message in `danger.700`, a small alert-triangle icon precedes the message (icon + color + text, never color alone).
- **Success/validated state:** thin `success.500` border + small checkmark icon, used sparingly (e.g., password strength met, email available).
- **Field grouping:** related fields wrapped in a `fieldset`-equivalent with an Overline group label (e.g., "MEDICATION DETAILS").
- **Multi-step forms** (onboarding, add-medication): a slim top progress bar (`secondary.600` fill on `neutral.200` track) plus "Step 2 of 3" caption — never a bare percentage with no step context.

---

## 8. Input Styles

| Property | Value |
|---|---|
| Height | 44px default, 52px Elderly Mode |
| Background | `neutral.0` (white), `neutral.100` when disabled |
| Border | 1px `neutral.200`, 1.5px `primary.600` on focus |
| Radius | `radius.sm` (8px) |
| Padding | 12px horizontal, 10px vertical |
| Text | Body style, `neutral.900`; placeholder in `neutral.500` |
| Focus ring | 2px `primary.100` glow outside the border (not just a border-color change, for low-vision visibility) |

**Variants:** text, email, password (with show/hide toggle icon), select/dropdown (chevron-down, same border language as text input), textarea (min 3 rows, resize-vertical only), date picker (calendar icon trailing, manual typing always allowed), file upload (dashed `neutral.200` dropzone, `radius.md`, drag-active state switches border to `primary.600` + `primary.50` fill), toggle switch (pill-shaped, `success.500` when on, `neutral.300` when off — never red/green alone, always paired with an on/off text label in Elderly Mode), and the chat composer (pill-shaped `radius.pill`, 48px height, trailing send-icon button in `primary.600`).

---

## 9. Icon Guidelines

- **Set:** a single consistent line-style icon family (Lucide or Feather — MIT-licensed, matches PRD Section 24). Never mix icon sets, never mix line-style with filled/glyph style except for the two intentional exceptions below.
- **Default size:** 24×24px, 1.5–1.75px stroke weight. Elderly Mode: 32×32px, same relative stroke weight (not just scaled — re-exported at correct weight so lines don't look thin/broken).
- **Color:** icons inherit `currentColor` from their text context; standalone functional icons use `neutral.700`; status icons use their matching semantic color (success/warning/danger).
- **Intentional exceptions (filled):** the emergency triangle-exclamation and the "Taken ✓" medication check use a filled/solid variant so they read instantly at a glance even for low-vision users — everything else stays outlined.
- **Semantic icon map:** chat bubble → AI Assistant · heart/pulse → Health Record & Vitals · pill/capsule → Medications · calendar → Appointments · bell → Notifications · users → Family/Dependents · document → Health Documents · bar-chart → Insights · shield/lock → Security & Privacy · triangle-exclamation → Warning/Urgent.
- **Accessibility:** every functional icon carries an `aria-label`; every purely decorative icon is `aria-hidden`.

---

## 10. Animation Guidelines

Motion is used to **explain state change**, never to decorate.

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion.instant` | 100ms | ease-out | Button press feedback, toggle flip |
| `motion.fast` | 150ms | ease-in-out | Hover states, focus ring appearance |
| `motion.base` | 220ms | ease-in-out (cubic-bezier 0.4, 0, 0.2, 1) | Modal open/close, dropdown expand, tab switch |
| `motion.slow` | 320ms | ease-out | Page-section reveal, onboarding step transition |
| `motion.chat` | 400ms staggered per line | ease-out | AI response streaming-in (text appears progressively, never a hard cut) |

**Principles:**
- Cards lift on hover with shadow only — no scale/rotate transforms (keeps the UI feeling stable and clinical, not playful).
- Loading states use a calm skeleton-shimmer (`neutral.100` → `neutral.200` pulse, 1.2s loop) rather than spinners wherever content shape is known in advance.
- The "AI is thinking" indicator is three softly pulsing dots in `accent.lavender`, never a spinning wheel, to keep the assistant feeling conversational rather than mechanical.
- **Elderly Mode disables all non-essential animation** — transitions collapse to instant or a single 150ms fade, per PRD Section 25. Essential motion (e.g., a progress bar filling) is kept but slowed and simplified.
- Respect `prefers-reduced-motion` system setting globally, independent of Elderly Mode.

---

## 11. Shadow System

Shadows are soft, low-opacity, and cool-toned (never pure black) to keep the clinical-calm feel.

| Token | Value | Use |
|---|---|---|
| `shadow.xs` | `0 1px 2px rgba(11,61,102,0.04)` | Inputs, list-row cards |
| `shadow.sm` | `0 2px 6px rgba(11,61,102,0.06)` | Default resting card state |
| `shadow.md` | `0 6px 16px rgba(11,61,102,0.10)` | Hovered/interactive cards, dropdown menus |
| `shadow.lg` | `0 12px 32px rgba(11,61,102,0.14)` | Modals, the chat composer's floating panel |
| `shadow.focus` | `0 0 0 2px rgba(11,61,102,0.18)` | Focus ring companion beneath the visible focus outline |

No shadow ever exceeds `shadow.lg` — nothing in Healora should feel like it's "floating" dramatically above the page; the deepest elevation is a standard modal.

---

## 12. Glassmorphism Rules

Glassmorphism is used **sparingly and only for two chrome elements**, never for content cards (health data must read with maximum clarity, never through a blurred layer):

1. **Top header/nav bar (desktop, on scroll):** `background: rgba(255,255,255,0.72)`, `backdrop-filter: blur(12px)`, 1px bottom border `rgba(225,230,233,0.8)`. Appears only once the page scrolls past the hero/first section, giving a Stripe-like "chrome floats above content" feel.
2. **The floating AI Chat launcher panel (collapsed/preview state, not the full chat):** `rgba(255,255,255,0.85)` with `blur(16px)` and `shadow.lg`, so it feels like a lightweight companion layer above the page rather than another opaque card.

**Rules:**
- Never apply blur/transparency to any element containing live health data, form inputs, or the Emergency banner — those must always render on a fully opaque `neutral.0` surface for legal/clarity reasons.
- Glass elements always maintain 4.5:1 text contrast against their *worst-case* underlying content — verified against a busy dashboard, not just a blank background.
- Glassmorphism is fully disabled in Elderly Mode (replaced with opaque `neutral.0` + `shadow.sm`) since transparency reduces legibility for low-vision users.

---

## 13. Accessibility Rules

Baseline: **WCAG 2.1 Level AA**, per PRD Section 25 — treated as Must Have, not polish.

- Minimum contrast: 4.5:1 body text, 3:1 large text (≥24px)/icons/graphical objects — every token pairing in Section 1 has been chosen to clear this against its intended background.
- Full keyboard operability: Tab / Shift+Tab / Enter / Space for all interactive elements; visible 2px focus outline (`shadow.focus` + solid outline) on every focusable element, never `outline: none` without a replacement.
- Color is never the sole carrier of meaning: every status (success/warning/danger) pairs color + icon + text label.
- All form fields have real, programmatically associated `<label>`s — placeholders supplement, never replace, labels.
- All non-decorative icons/images carry descriptive `alt`/`aria-label`; decorative ones are `aria-hidden`.
- Minimum touch target 44×44px standard, 48×48px in Elderly Mode.
- **Elderly Display Mode** (single toggle, Account Settings): +30% font scale, +25% spacing/touch-target size, icon+text navigation labels always (never icon-only), non-essential animation removed, glassmorphism disabled.
- Motion respects `prefers-reduced-motion` independently of Elderly Mode.
- Emergency/urgent states are announced to screen readers via `aria-live="assertive"` regions, not just visual banners.

---

## 14. Responsive Breakpoints

| Breakpoint | Range | Layout Behavior |
|---|---|---|
| `bp.mobile` | 360px – 767px | Single column, bottom tab navigation (5 top-level icons + text), sidebar hidden, cards full-width with `space.sm` padding |
| `bp.tablet` | 768px – 1023px | Collapsible icon-only sidebar (72px), 8-column grid, dashboard cards 2-up |
| `bp.desktop` | 1024px – 1439px | Full sidebar (260px) with icon+label, 12-column grid, dashboard cards 3-up |
| `bp.wide` | 1440px+ | Content max-width capped at 1200px and centered — layout does not stretch further, extra space stays as margin |

Navigation pattern switches structurally (not just visually) at the `bp.tablet` boundary: bottom tab bar below it, persistent sidebar at or above it — matching PRD Section 18/19's "sidebar (desktop) / bottom nav (mobile)" rule exactly.

---

## 15. Design Tokens — Master Reference

A consolidated, implementation-ready token map (naming convention: `category.property.variant`):

**Color:** `color.primary.{50,100,500,600,700}` · `color.secondary.{100,500,600}` · `color.accent.{lavender,gold}` · `color.neutral.{0,50,100,200,300,500,700,900}` · `color.success.{100,500,600}` · `color.warning.{100,500,600}` · `color.danger.{100,600,700}`

**Typography:** `font.family.base` (Inter) · `font.size.{h1,h2,h3,body,body-sm,caption,button,overline}` · `font.weight.{regular:400,semibold:600,bold:700}` · `font.lineheight.{tight:1.3,base:1.5}`

**Spacing:** `space.{4xs,3xs,2xs,xs,sm,md,lg,xl,2xl,3xl}` (2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px)

**Radius:** `radius.{xs,sm,md,lg,pill}` (4 / 8 / 12 / 16 / 999px)

**Shadow:** `shadow.{xs,sm,md,lg,focus}`

**Motion:** `motion.{instant,fast,base,slow,chat}`

**Breakpoints:** `bp.{mobile,tablet,desktop,wide}`

**Z-index scale:** `z.base` (0) · `z.dropdown` (100) · `z.stickyHeader` (200) · `z.modal` (300) · `z.toast` (400) · `z.tooltip` (500)

**Icon:** `icon.size.{default:24,elderly:32}` · `icon.stroke.default` (1.75px)

---

### Design Philosophy Summary

| Inspiration | What Healora Borrows |
|---|---|
| **Apple** | Restraint, generous whitespace, one clear primary action per screen, motion that explains rather than decorates |
| **Stripe** | Systemized tokens, disciplined single-column forms, chrome that floats above content on scroll |
| **Notion** | Content-first density control, quiet neutral-heavy palette, un-styled reading rhythm |
| **Google Health** | Clinical-calm color language, color-never-alone status system, data legibility above all |
| **Modern healthcare startups** | Warm-but-serious tone, Elderly Mode as a first-class feature rather than an accessibility afterthought |

*This document is derived entirely from and consistent with Sections 22–25 of the Healora PRD v1.0, extended into a complete, build-ready design system.*
