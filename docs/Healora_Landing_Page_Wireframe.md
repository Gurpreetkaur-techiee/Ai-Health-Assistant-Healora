# Healora — Landing Page Wireframe
### Route: `/landing` (public, unauthenticated) · Reference: PRD Section 20.1, Design System v1.0

Layout uses the 12-col / 1200px-max grid (Design System §3). Background throughout is `color.neutral.50` (#F7F9FA) with alternating full-bleed `color.neutral.0` (white) bands to separate sections — no hard divider lines between most sections, separation is achieved through background-color contrast and spacing alone, matching the Notion/Stripe "quiet sectioning" approach.

---

## 1. Navbar

**Layout**
A fixed-position, full-width bar, 72px tall, sitting above all content (`z.stickyHeader`). Inner content constrained to the 1200px max-width grid, so the bar itself is edge-to-edge but its contents align with the page below.

- **Left:** Healora logo mark + wordmark (chat-bubble/pulse hybrid icon in `primary.600` + wordmark in `neutral.900`, H3 weight).
- **Center:** Five text nav links — *Product · AI Assistant · For Families · Pricing · About* — Body style, `neutral.700`, `secondary.600` underline on hover/active.
- **Right:** Two buttons — **"Login"** (Tertiary/Ghost, `primary.600` text) and **"Get Started"** (Primary button, `primary.600` fill) — per PRD §20.1 Landing screen spec.

**Spacing:** 24px horizontal padding to grid edge on desktop, `space.lg` (32px) gap between center nav links, `space.sm` (16px) gap between the two right-side buttons.

**Behavior/animation:** Transparent/blends with hero at page top. On scroll past the hero (~600px), the bar transitions over `motion.base` (220ms) into the **glassmorphism state** defined in Design System §12: `rgba(255,255,255,0.72)` + 12px blur + a hairline 1px bottom border in `neutral.200` at 80% opacity, plus `shadow.xs`. This is the only glass surface on the page besides the chat launcher.

**Interaction:** Nav links smooth-scroll to in-page anchors (Product → Features, AI Assistant → AI Showcase, etc.) rather than navigating away, with 60px top offset to clear the fixed bar. On mobile (<768px), the center links collapse into a hamburger icon on the right that opens a full-screen `neutral.0` overlay menu (slide-down, `motion.slow`, 320ms) stacking the five links at H3 size plus the two buttons full-width at the bottom.

**Icons:** Logo mark only in the bar itself; hamburger (☰ → ✕ morph) icon at 24px on mobile.

---

## 2. Hero Section

**Purpose:** Communicate the core promise — an AI health companion you can trust — and drive the primary conversion action within the first screen, unauthenticated.

**Layout:** Two-column split on desktop (58% left / 42% right), stacking to single-column, text-first on mobile. Top padding `space.2xl` (64px) below the navbar, bottom padding `space.3xl` (96px).

- **Left column:**
  - Overline label: "AI-POWERED HEALTH ASSISTANT" — `font.size.overline`, `secondary.600`, letter-spacing +0.04em, sitting inside a soft pill chip (`secondary.100` background, `radius.pill`).
  - H1 headline (34–40px on desktop, exceeding the standard 28px H1 token deliberately for hero impact — a documented one-off "Display" size layered on top of the H1 style): *"Understand your health as easily as a conversation."*
  - Supporting body paragraph, `neutral.700`, max-width ~480px so line length stays readable (matches the vision statement in PRD §5).
  - Two CTAs side by side: **"Get Started Free"** (Primary, large 48px) and **"See How It Works"** (Ghost, scrolls to How It Works section).
  - A small trust row beneath: three inline mini-badges — "Private & Encrypted" (shield icon), "Not a replacement for your doctor" (info icon), "Built for every generation" (users icon) — Caption size, `neutral.500`.
- **Right column — AI Showcase teaser illustration:** a soft-edged illustrated mockup of the chat interface mid-conversation (see §3 for detail; the hero version is a static, simplified preview — 2–3 message bubbles only) inside a subtly elevated card (`shadow.lg`, `radius.lg`), tilted 0° (no skew/rotate, keeping the calm-clinical tone rather than a playful 3D tilt).

**Spacing:** `space.xl` (48px) gap between the two hero columns; `space.md` (24px) between headline/body/CTA-row internally.

**Animation:** On page load, headline and body fade-up (`motion.slow`, 320ms, 12px translate) staggered 80ms after each other; the illustration card fades in with a slight scale-from-0.98, 200ms after the text. The chat-bubble mockup inside the illustration has one subtle looping micro-animation: the "AI is thinking" three-dot pulse (`accent.lavender`, per Design System §10) plays once every ~6 seconds to imply liveliness without being distracting.

**Illustration style:** Flat, softly-rounded, editorial-style illustration (not a literal screenshot) — muted secondary/primary palette, thin-line details matching the icon stroke weight, one warm human touch (a simple abstract figure silhouette relaxing with a phone) to avoid the hero feeling clinical-cold.

**Interaction:** Hovering the illustration card lifts its shadow one step (`shadow.lg` → stays `shadow.lg`, no further increase — hero card is already at max elevation) with a 150ms transition; clicking it scrolls to the AI Showcase section rather than navigating.

---

## 3. AI Showcase Section

**Purpose:** Prove the core differentiator (PRD §7, Pillar 1) with a concrete, believable example rather than abstract marketing copy.

**Layout:** Centered H2 section header ("Meet your AI health companion") + one-line supporting copy, followed by a large, full-width interactive-looking mockup panel, `radius.lg`, `shadow.md`, on a white (`neutral.0`) card that breaks out of the standard 1200px grid slightly (1100px) for visual emphasis — this section sits on a `neutral.0` full-bleed band to separate it from the hero's `neutral.50`.

**Mockup contents (illustrated, not literal code/UI):**
- A simplified chat thread showing: a user message ("I've had a headache for two days and feel dizzy"), an AI response with a clarifying follow-up question, then a **Triage Card** preview (left-edge `warning.500` accent bar, "Recommended: See a doctor within 24 hours" + a "Save to Health Record" ghost button) — directly reflecting PRD §16.2 Structured Triage Output.
- A small persistent disclaimer strip beneath the thread, Caption size, `neutral.500`: "Healora does not replace professional medical advice."

**Three supporting callouts beneath the mockup** (3-column on desktop, stacked on mobile), each a small icon + H3 + one line of body copy:
1. Chat-bubble icon (`primary.600`) — "Personalized to your history" — factors in stored allergies/conditions.
2. Heart/pulse icon (`secondary.600`) — "Grounded in your real health record" — not generic web search results.
3. Triangle-exclamation icon (`danger.600`, filled variant per Design System §9) — "Instant emergency detection" — flags urgent symptoms immediately.

**Spacing:** `space.lg` (32px) between section header and mockup; `space.md` (24px) between the three callout columns; internal mockup padding `space.md`.

**Animation:** As the section scrolls into view (intersection-observer trigger), the chat thread "types itself" — each message bubble appears in sequence using `motion.chat` (staggered ~400ms per bubble, ease-out, no hard cut), simulating a live conversation exactly once per page visit (not looping, to avoid distraction on re-scroll).

**Interaction:** The mockup is illustrative/non-clickable chrome (no functional buttons) except the whole panel links to "Get Started" on click, with a subtle `shadow.sm → shadow.md` hover lift.

---

## 4. Features Section

**Purpose:** Lay out Healora's four pillars (PRD §7) as equally-weighted, scannable cards — directly reusing the PRD's "Feature highlight cards" requirement from §20.1.

**Layout:** H2 header ("Everything your health needs, in one place") centered, followed by a 4-column grid (2×2 on tablet, single column on mobile) of Info Cards (Design System §6).

Each card:
- Icon in a soft tinted circle (56px circle, icon 24px, background = that pillar's tint color at 100-level).
- H3 title.
- 2-line body description.
- No CTA per card (the section-level CTA at the bottom handles conversion) — kept deliberately quiet/informational, Notion-style.

**The four cards:**
1. **AI Health Assistant** (chat-bubble icon, `primary.100` circle) — 24/7 conversational symptom guidance with structured triage.
2. **Personal Health Record** (heart/pulse icon, `secondary.100` circle) — one private place for conditions, meds, labs, and visit history.
3. **Care Coordination** (calendar + pill icons combined, `warning.100` circle) — medication and appointment reminders, with family visibility.
4. **Insights & Reports** (bar-chart icon, `success.100` circle) — trend dashboards and a doctor-ready downloadable summary.

**Spacing:** `space.md` (24px) grid gutter; `space.sm` (16px) internal card padding on mobile, `space.md` on desktop; `space.xl` (48px) above and below the whole section.

**Animation:** Cards fade-up in a staggered grid reveal (row-by-row, 80ms stagger) on scroll-into-view; on hover, `shadow.sm → shadow.md` lift only (no scale), consistent with Design System §11.

**Icons:** All four use the Lucide/Feather line-style set at 24px per Design System §9 — no illustration here, kept crisp and functional to contrast with the more illustrative Hero/AI Showcase above.

---

## 5. How It Works Section

**Purpose:** Reduce first-time-user anxiety by showing the whole journey is short and simple — directly supports the Usability NFR in PRD §14 ("first-time user completes registration and first AI query in under 3 minutes").

**Layout:** H2 header ("Get started in three simple steps") + a horizontal 3-step layout on desktop (connected by a thin dotted `neutral.200` line running behind the step numbers), vertical stack on mobile.

Each step:
- A numbered circle badge (32px, `primary.600` fill, white numeral, Button Label weight) rather than an icon — numbers reinforce sequence/simplicity more than icons would here.
- H3 step title.
- One-sentence description.

**The three steps:**
1. **"Create your free account"** — a simple 5-field sign-up, ready in under a minute.
2. **"Tell us about your health"** — a short, optional 3-step onboarding wizard (conditions, allergies, meds) so the AI has context from day one.
3. **"Chat, track, and stay ahead"** — start your first AI conversation and set up your first reminder.

**Spacing:** `space.lg` between steps horizontally; the connecting dotted line sits vertically centered through the step-number badges, `1px` weight, `neutral.200`.

**Animation:** On scroll-into-view, the connecting line "draws" left-to-right over 600ms (stroke-dashoffset style reveal) as the three step badges pop in sequentially (`motion.base`, 220ms each, 150ms stagger) — a small moment of delight without breaking the calm tone.

**Interaction:** Entirely non-interactive/informational — no clickable elements within the steps themselves.

---

## 6. Statistics Section

**Purpose:** Build credibility/trust quickly through numbers, echoing the Business Goals in PRD §8, without overstating unlaunched-product metrics (copy should read as aspirational/platform-capability framing rather than fabricated live counters, given this is a v1.0 launch).

**Layout:** Full-bleed `primary.600` colored band (the one section that inverts to dark background, white text) — a deliberate visual "pause" in the page's mostly light palette, similar to how Stripe uses one dark band mid-page. 4-column stat grid, centered text, stacking to 2×2 on tablet and single column on mobile.

Each stat block:
- A large numeral (H1 scale, but weight 700 and rendered in white) + a unit suffix (e.g., "%", "min", "+").
- A short Caption-style label beneath in `primary.100` (a lighter tint of the same hue, for hierarchy on the dark band).

**Example stats** (framed as product capability targets, consistent with PRD §8/§45 targets, not claimed historical usage):
1. **"< 3 min"** — to your first AI health conversation.
2. **"100%"** — emergency symptoms flagged for urgent care.
3. **"4"** — family members supported on one account.
4. **"24/7"** — AI health guidance, always available.

**Spacing:** `space.2xl` (64px) vertical padding for the band; `space.lg` gutter between the four stat blocks.

**Animation:** Numerals count up from 0 to their final value over 1.2s when the section scrolls into view (ease-out, triggers once), a common, well-understood pattern for stat sections — kept subtle (no bounce/overshoot) to stay consistent with the calm-clinical motion language.

**Icons/Illustration:** None — this section is intentionally typography-only for maximum contrast against the icon- and illustration-heavy sections around it.

---

## 7. Testimonials Section

**Purpose:** Provide the "trust section" called for in PRD §20.1's Landing Page component list, giving each of the four personas (PRD §11) a relatable voice.

**Layout:** H2 header ("Trusted across every generation") + a 3-card carousel on desktop (with a peek of a 4th card's edge to hint scrollability), swipeable single-card view on mobile. Cards sit on `neutral.0` inside the section's `neutral.50` band for gentle contrast.

Each testimonial card:
- A small circular avatar illustration (abstract/generic, not a real photo — avoids any implication of real-person endorsement) + name + one-line persona descriptor (e.g., "Working Professional," "Caregiver for 2").
- A 2–3 sentence quote, Body size, in `neutral.700`, no quotation-mark glyphs (a thin `primary.600` left-border accent on the card indicates it's a quote instead, a quieter Notion-style treatment).
- Star rating row is intentionally **omitted** — a numeric star rating feels inconsistent with a trust-forward, non-transactional health product tone.

**Spacing:** `space.md` gutter between visible cards; `space.sm` internal card padding; `space.xl` above/below section.

**Animation:** Manual-drag or arrow-button navigation only, `motion.base` (220ms ease) slide transition — **no auto-advancing carousel**, since involuntary motion competes with reading and is worse for low-vision/elderly users (Elderly Mode disables the carousel entirely in favor of a static stacked list, per Design System §10/§13).

**Interaction:** Left/right chevron icon-buttons at card-row ends (44px touch target); dot indicators beneath show position; swipe-gesture supported on touch devices.

---

## 8. FAQ Section

**Purpose:** Pre-empt trust/safety objections specific to a health-adjacent AI product (e.g., "is this a replacement for my doctor," "is my data private") — directly supporting the Privacy/Compliance messaging in PRD §14/§25.

**Layout:** H2 header ("Common questions") + a single-column accordion, max-width ~720px, centered (deliberately narrower than the full grid — long-form reading content benefits from a tighter measure, per typography best practice).

Each accordion row:
- Question in H3 weight/size, `neutral.900`, full-width clickable row, 56px min height.
- A trailing chevron icon (rotates 180° on expand) or plus/minus icon — chevron chosen for consistency with the rest of the icon language.
- Expanded state reveals Body-size answer copy, `neutral.700`, `space.sm` top padding, with a 1px `neutral.200` divider between each row (List-Row Card style, Design System §6).

**Representative questions** (grounded in PRD scope/positioning):
1. "Does Healora diagnose or prescribe medication?" → No — clarifies the non-diagnostic, informational-only positioning (PRD §10).
2. "Is my health data kept private?" → De-identified AI context, encrypted storage (PRD §14).
3. "Can I manage my parents' or children's health too?" → Explains Family/Dependent profiles.
4. "What happens if the AI detects an emergency?" → Explains the emergency banner behavior (PRD §17.4).
5. "Is Healora free to use?" → Clarifies v1.0 pricing/waitlist positioning (PRD §10).

**Spacing:** `space.sm` (16px) vertical padding per row when collapsed; `space.md` when expanded; `space.lg` above/below the whole block.

**Animation:** Accordion expand/collapse uses `motion.base` (220ms), height auto-animated with an eased curve, chevron rotation synced to the same duration. Only one item open at a time on mobile (accordion behavior) to avoid an overwhelming long scroll; desktop allows multiple open simultaneously since there's more vertical room.

**Interaction:** Entire row is the tap target (not just the chevron), keyboard-operable via Enter/Space with visible focus outline per Design System §13.

---

## 9. CTA Section

**Purpose:** A final, low-friction conversion moment before the footer — the page's second and last "hard ask," mirroring the hero's CTA but with a more emotionally resonant framing.

**Layout:** Centered, full-bleed band using the `primary.50`→`secondary.100` very-soft tint (a barely-there gradient wash, not a bold color block, staying consistent with the calm palette — the only section on the page using a gradient, kept extremely subtle: two adjacent light tints rather than a saturated gradient).

- Overline chip: "JOIN HEALORA" (same pill style as hero).
- H2 headline: *"Your health, understood — starting today."*
- One supporting sentence.
- Single centered Primary button, large size: **"Create Your Free Account"** — deliberately only one CTA here (no secondary/ghost button) to keep this final moment decisive and unambiguous.
- A small Caption line beneath the button: "No credit card required · Takes less than 3 minutes."

**Spacing:** `space.2xl` (64px) vertical padding; `space.md` between headline/subcopy/button internally.

**Animation:** Simple fade-up on scroll-into-view (`motion.slow`), matching the hero's entrance animation to bookend the page consistently.

**Interaction:** Button links to `/register`; hovering shows the standard Primary-button hover state (Design System §5).

---

## 10. Footer

**Purpose:** Provide the legal/trust scaffolding and secondary navigation expected of any credible health product, per PRD §20.1's "Footer with links (About, Privacy Policy, Terms, Contact)."

**Layout:** Full-width `neutral.900`-adjacent dark band (using `primary.700`, not pure black, to stay on-brand rather than defaulting to generic dark-gray) with light text, organized in a 4-column layout collapsing to a stacked accordion-free list on mobile.

- **Column 1:** Logo (white/light variant) + one-line mission statement + small social icons row (if applicable) at 20px size.
- **Column 2 — Product:** AI Assistant, Health Record, Care Manager, Insights (anchors back to the Features section).
- **Column 3 — Company:** About, Careers, Contact, Blog.
- **Column 4 — Legal & Trust:** Privacy Policy, Terms of Service, Security, Accessibility Statement — the Accessibility Statement link is a deliberate addition beyond the PRD's minimum list, reinforcing the WCAG AA commitment (Design System §13) as a trust signal.

**Bottom strip:** a 1px top border (`rgba(255,255,255,0.12)`), centered/left-aligned copyright line ("© 2026 Healora. Not a substitute for professional medical advice.") — the disclaimer is deliberately repeated here as the last thing a visitor reads, reinforcing PRD §16.2's persistent-disclaimer requirement even at the marketing layer.

**Spacing:** `space.xl` (48px) top/bottom padding for the main footer band; `space.sm` between link-list items; `space.md` between the four columns; `space.lg` before the bottom copyright strip.

**Animation:** None — footer is static chrome, intentionally free of motion so it reads as stable "end of page" territory.

**Icons:** Small (20px) social icons only, outlined style, `neutral.0` at 70% opacity, full opacity on hover.

---

## Cross-Section Notes

**Overall vertical rhythm:** Section backgrounds alternate `neutral.50` → `neutral.0` → `neutral.50` → `primary.600` (Statistics) → `neutral.50` → `neutral.0` (FAQ) → soft-gradient (CTA) → `primary.700` (Footer), so no two adjacent sections share the same surface color — this is what creates visual sectioning without needing hard rule lines.

**Global entrance animation pattern:** every section uses the same intersection-observer-triggered fade-up (`motion.slow`, 12px translate) the first time it scrolls into view, never re-triggering on subsequent scroll-up/down — consistent, predictable, and non-distracting across the whole page.

**Elderly Mode on the landing page:** carousel auto-behavior removed, testimonials become a static stacked list, all fade/stagger animations collapse to a single 150ms fade, type scale steps up per Design System §2.2, and the CTA/nav buttons grow to the 48px+ Elderly touch-target size — toggle is available even pre-login via a small accessibility icon in the navbar's far-right corner, since the persona this serves (Prakash Rao) needs it *before* creating an account, not just after.

**Responsive summary:** Full 12-column layouts described above apply ≥1024px; Features/Statistics grids reflow to 2-column at tablet and single-column at mobile; the navbar collapses to a hamburger below 768px; all illustrations scale down proportionally rather than cropping, so the Hero and AI Showcase mockups remain fully legible on a 360px-wide screen.

---

Waiting for your approval before proceeding to the next screen.
