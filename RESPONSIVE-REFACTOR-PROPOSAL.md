# Kourro — Responsive Architecture Refactor Proposal

> Goal: turn Kourro into a **device-agnostic masterpiece** that feels *mobile-first* on phones,
> deliberately tailored on tablets, and built-for-the-big-screen on desktop — with Apple-level
> HIG polish — **without changing a single word of copy or business objective**.

**Baseline verified:** `npm run build` passes (React 18 + Vite 5 + TS). Current bundle: CSS 49 KB,
JS 220 KB. Site is a clean, well-structured React codebase using plain CSS custom properties.

---

## 1. Diagnosis — where the current architecture falls short

### 1.1 Breakpoint strategy is chaotic, not principled
There are **10 separate `max-width` breakpoints** scattered through `site.css` (480, 640, 700,
720, 760, 860, 900, 1000, 1080, 1120). They are tuned to *component accidents* rather than to
**device classes and content behavior**. Result: at any given width between, say, 770–850px, the
layout is a patchwork of half-applied rules.

### 1.2 Hero wastes the viewport on mobile
`.hero { padding: 190px 0 130px }` — that is **≈4–5 viewport heights of empty air** above the fold
on a phone before the headline is read. The 3-slot device cycle is `display:none`'d on mobile, but
the `.hero-visual { height: 420px }` container and the 340px phone mock still consume most of the
screen, pushing the primary CTA below the fold.

### 1.3 All 7 PNG screenshots load eagerly — including ones never seen
Every device loads `register.png` (900 KB), `desktop-register.png` (560 KB), `tablet-register.png`
(740 KB), etc. On mobile the tablet/desktop shots are `display:none` yet **still downloaded**.
PNGs are uncompressed. This alone is ~3–4 MB of avoidable bytes on a 3G phone.

### 1.4 Typography is a mix of `clamp()`, px, and inline styles — no shared scale
Some headings use `clamp()`, others use hardcoded inline `style={{ fontSize: "..." }}` with their
own clamp values, and CSS rules set px. There is **no modular scale**, no `line-height` system,
no `text-wrap: balance`, and Fraunces' variable-`opsz` axis is unused despite being requested.

### 1.5 Hover interactions break on touch
Cards and buttons use `:hover { transform: translateY(-6px) }`. On iOS this triggers
**sticky-hover** (the element stays "hovered" until tap-away). There is no `:active` press state
and no `@media (hover: hover)` gating, so the experience feels broken on tap.

### 1.6 No `prefers-reduced-motion`
Marquee scroll, chip-float, slot-cycle, bar grow, and progress-dash animations all run
unconditionally — ignoring the user's OS-level motion preference (a core HIG tenet).

### 1.7 `100vh` is unreliable on mobile
`.tour-pin { height: 100vh }` and `.tour-zone { height: 70vh }` use `vh`, which collapses/jumps
with browser chrome on scroll — the scroll-driven tour stutters.

### 1.8 Mobile nav lacks polish & accessibility
The hamburger menu slides down with `transform`, but there is **no focus trap, no ESC-to-close,
no `aria-expanded`/`aria-controls`, and the background is not inerted** while open.

### 1.9 No system-level dark mode
The page is light-paper with `onink` dark sections baked in. There is no `prefers-color-scheme`
or toggle — a missed Apple-level refinement.

### 1.10 Horizontal padding is inconsistent
`.wrap` shifts from `calc(100% - 48px)` → `calc(100% - 40px)` → `calc(100% - 28px)` across
breakpoints rather than following one spacing token.

---

## 2. Proposed breakpoint strategy (3 content tiers)

| Tier | Width | Device feel | Layout intent |
|------|-------|-------------|---------------|
| **Mobile** | `< 768px` | Built *for* the phone | Single column, hamburger, simplified hero (static phone mock + stacked CTAs) |
| **Tablet** | `768px – 1199px` | Tailored, not scaled | Multi-column reflow, condensed visual cycle, fewer hero slots, denser cards |
| **Desktop** | `≥ 1200px` | Built *for* the big screen | Full-width visual cycle, 3-column cards, sticky tour, generous whitespace |

`--site-max: 1180px` is kept (the existing wrap max). This collapses 10 breakpoints into **2
content queries + a max-width guard** — easier to reason about and to test.

```css
/* site.css — new foundation */
:root {
  --site-max: 1180px;
  --gap-xs:    clamp(8px, 2vw, 14px);
  --gap-sm:    clamp(14px, 3vw, 24px);
  --gap-md:    clamp(24px, 4vw, 40px);
  --gap-lg:    clamp(40px, 6vw, 64px);
}

@media (min-width: 768px) { /* tablet+ */ }
@media (min-width: 1200px) { /* desktop only */ }
```

---

## 3. CSS architecture — design tokens + scales

### 3.1 Tokenize the palette (already good, just formalize)
Keep the existing warm-bone / ink / ember / gold palette, but expose **semantic aliases** so
dark-mode and `onink` variants swap cleanly:

```css
:root {
  /* primitives — unchanged */
  --paper:#f6f1e4; --ink:#16130c; --ember:#ff4d00; --gold:#c8a24a;
  /* semantics */
  --color-bg: var(--paper);
  --color-text: var(--ink);
  --color-accent: var(--ember);
  --color-surface: var(--paper-2);
  --color-border: var(--line);
}
@media (prefers-color-scheme: dark) { :root { --color-bg: var(--ink); --color-text: var(--paper); } }
.onink { --_on:1; } /* scoped overrides instead of broad .onink rules */
```

### 3.2 A single 1.25 fluid type scale (mobile→desktop)
Replace every ad-hoc heading size with one macro. `clamp()` gives fluidity; the scale gives
*rhythm*:

```css
/* root font-size 16px → 18px on desktop via clamp */
html { font-size: clamp(14px, 0.9vw + 13px, 18px); }

/*   step / min … ideal … max */
--t-5: clamp(2.5rem, 4.2vw + 1rem, 5.25rem); /* display-1 (hero h1) */
--t-4: clamp(1.75rem, 3.4vw + 1rem, 3.25rem); /* display-2 */
--t-3: clamp(1.375rem, 2.6vw + 1rem, 2rem);   /* display-3 */
--t-2: clamp(1.125rem, 1.8vw + 0.9rem, 1.3125rem); /* body-lead */
--t-1: clamp(0.95rem, 1.2vw + 0.8rem, 1rem);  /* body */

.display     { font-size: var(--t-5); }
.display h2  { font-size: var(--t-4); }
.lead        { font-size: var(--t-2); line-height: 1.7; }
```

Fraunces' `opsz` axis should be driven by size so large display type gets the optically-tall
variant:

```css
.display { font-variation-settings: 'opsz' 48; }           /* mobile */
@media (min-width: 1200px) { .display { font-variation-settings: 'opsz' 84; } }
```

### 3.3 Spacing grid (4px → 8/12/16/24/32/48/64/80/96)
One source of truth, enforced via tokens so `.section`, `.wrap`, `.app-card`, and the footer grid
all share the same rhythm instead of bespoke px values.

```css
--s-3: .75rem;   /* 12px */
--s-4: 1rem;     /* 16px */
--s-5: 1.5rem;   /* 24px */
--s-6: 2rem;     /* 32px */
--s-7: 3rem;     /* 48px */
--s-8: 4rem;     /* 64px */
.section { padding: var(--s-8) 0; }
@media (max-width: 767px) { .section { padding: var(--s-6) 0; } }
```

---

## 4. Mobile-first hero restructure

**Goal:** mobile gets a *different*, lighter hero — not a squeezed version.

| Element | Mobile (`<768`) | Tablet (`768–1199`) | Desktop (`≥1200`) |
|---|---|---|---|
| Top padding | `--s-5` (~3rem) | `--s-7` | `--s-8` |
| Headline | `--t-5`, centered | left-aligned, `--t-5` | `--t-5` wider |
| Hero visual | **single static phone** (no cycle) | cycle, but 2 slots | cycle, 3 slots |
| Device mock | `max-width: 300px` | `340px` | `340px` |
| CTAs | stacked, full-width buttons | side-by-side | side-by-side |
| Cycle dots | removed | small | full |

Implementation: a `hero--mobile` modifier class, or (cleaner) a `data-device` attribute set in
React via `matchMedia`. The cycle animation's heavy JS timers are **not initialized on mobile**.

```tsx
// in Hero()
const mobile = useMediaQuery("(max-width: 767px)");
const HeroVisual = mobile ? <PhoneMock static /> : <DeviceCycle />;
```

---

## 5. Touch + motion polish (HIG-aligned)

### 5.1 Gate hover effects so they never fire on touch-only devices
```css
@media (hover: hover) {
  .feat:hover, .plan:hover { transform: translateY(-6px); }
}
@media (hover: none) {
  .feat, .plan { /* no hover transform; rely on :active */ }
}
```

### 5.2 Add press states for tactile feedback
```css
.btn, .app-card, .plan, .tour-step {
  transition: ... 0.2s var(--ease-soft);
}
@media (hover: none) {
  .btn:active, .plan:active { transform: scale(0.97); }
}
```

### 5.3 Respect `prefers-reduced-motion` globally
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: none !important; }   /* show immediately */
  .marquee-track { animation: none; }
}
```

### 5.4 Pause motion when the tab is hidden (battery savings)
```ts
// hook: reduce CPU while backgrounded
useEffect(() => {
  const on = () => document.body.classList.toggle("bg", document.hidden);
  document.addEventListener("visibilitychange", on);
  return () => document.removeEventListener("visibilitychange", on);
}, []);
```

---

## 6. Performance — make the mobile experience "lightweight and snappy"

### 6.1 Responsive, lazy, modern images
- Convert all 7 PNGs → **AVIF** (primary) + **WebP** (fallback) + PNG (last-resort). The 900 KB
  `register.png` drops to ~120 KB AVIF.
- Use `<picture>` + `srcset` + `loading="lazy"` + `decoding="async"` so a phone only downloads the
  mobile shot it actually displays.
- Tablet/desktop shots are `fetchpriority="low"` (or omitted from mobile markup entirely).

### 6.2 Don't render hidden device mocks
In `mockups.tsx`, the `TabletMock` and `DesktopMock` components are **not mounted on mobile** at all
(conditional render), instead of `display:none`. This removes them from the DOM, from React's
reconciliation, and from the image preload list.

### 6.3 Defer non-critical CSS
Font-display swap is already set. Split the large `site.css` (840 lines) into logical chunks
(`base.css`, `layout.css`, `components.css`) and defer non-critical (mockup + tour + chart) styles
so above-the-fold paints faster.

### 6.4 Viewport units — use `dvh`/`dvb`
```css
.tour-pin   { height: 100dvh; }
.tour-zone  { height: 70dvh; }
.hero       { min-height: 100dvh; }   /* new: make hero fill the screen */
```

---

## 7. Mobile nav — add Apple-level interaction detail

```tsx
// Nav.tsx enhancements
<button
  className="nav-burger"
  aria-expanded={menu}
  aria-controls="mobile-menu"
  onClick={() => setMenu(!menu)}
>
<main id="main-content" inert={menu}>...</main>
```

- `inert` (polyfilled) on `<main>` + `<footer>` while the menu is open so screen readers and
  scroll are locked to the menu.
- Focus trap: first `Esc` or last tab wraps within `.mobile-menu`.
- Close-on-route-change (already partially handled via `onClick={() => setMenu(false)}`).
- Press-state on the burger with a subtle `scale(0.96)`.

---

## 8. Dark mode — system-level, not an afterthought

Add a toggle that persists to `localStorage` and mirrors `prefers-color-scheme`. The palette
already has an ink/paper duality; dark mode just flips the semantic aliases (§3.1). The `onink`
blocks become the default canvas in dark mode, with `--paper`/`--emer`-accent surfaces.

```tsx
// theme toggle in the burger bar area on desktop
<button className="nav-theme" onClick={toggleTheme}>
  <Ic name="moon" size={17} />
</button>
```

---

## 9. Accessibility & inclusive motion (tie-out)

- `text-wrap: balance` on all `.display` headings (short, punchy lines balance better).
- `:focus-visible` with a visible ring matching `--ember`.
- `role="region"` + `aria-roledescription="carousel"` on the device cycle (when shown) with
  pause-on-hover.
- Reduce the marquee speed on `prefers-reduced-motion` (don't disable — just slow it).

---

## 10. Implementation order (recommended)

> **Phase 1 (DONE ✅)** — below is what was actually implemented and verified
> (`npm run build` passes; breakpoints collapsed from 10 → 2 layout tiers).
> Remaining phases are still pending.

1. ✅ **Tokens + breakpoint refactor** (`site.css`) — unified `:root` tokens,
   3-tier breakpoint strategy (767 / 1199), `dvh` viewport fix.
2. ✅ **Typography scale + `text-wrap: balance`** — `.display` now drives a
   1.25-step fluid scale; stripped every inline `fontSize: clamp(...)` from the
   pages in favour of `display-md / display-lg / display-sm` modifiers +
   `.mt-*` utilities.
3. ✅ **Mobile hero restructure** — `useMediaQuery("(min-width:768px)")` in
   `Hero()` now renders a single static `PhoneMock` on mobile (no cycle, no
   tablet/desktop screenshots downloaded) and the full cycle only on tablet+.
4. ✅ **Performance basics** — `loading="lazy" decoding="async"` on all mockup
   images; `fetchPriority="high"` on the above-fold logo.
5. ✅ **Touch + motion polish** — `@media (hover: hover)` gates all hover
   transforms; `:active` press states for touch; global
   `prefers-reduced-motion` block for marquee/reveal/FAQ; marquee font-size
   made fluid via `clamp()`.
6. ✅ **Mobile nav polish** — `aria-expanded` / `aria-controls`, Escape-to-close,
   outside-tap close, and `html.menu-open` scroll-lock.

### Remaining phases
7. **Image format conversion + responsive density `srcset`** (Phase 2 — DONE ✅)
   — `scripts/convert-images.js` converts all 7 mockups + logo to AVIF + WebP
   at 1× / 2× density via `sharp` (`npm run imgs`). A shared `<Img>` (`<picture>`
   with AVIF→WebP→PNG fallback + `width`/`height` for CLS) is now wired into every
   image. Mobile hero phone shot: 546 KB PNG → **23 KB AVIF @1×**.
8. **Dark-mode toggle** (Phase 2 — DONE ✅) — `useTheme()` + `<ThemeToggle>` in
   `core.tsx`; FOUC-free inline bootstrap in `index.html`; `html.dark` swaps the
   warm sepia ink↔paper palette; `color-scheme` meta + dynamic `theme-color`.
9. **Perf budgets / CI** — still pending: add Vite `imagetools` plugin for
   `srcset` automation, critical-CSS split, and Lighthouse CI.
10. **Focus trap** for `.mobile-menu` on Tab (Escape + outside-tap already done).

---

## What stays exactly the same (per the constraint)

- ✅ All copy, headlines, feature text, pricing, FAQ answers.
- ✅ Business narrative flow: Brand Awareness → Consideration → Conversion.
- ✅ Color palette, fonts (Fraunces + Inter), icon set.
- ✅ The Kourro product voice ("gourde", "Creole", "offline", Haiti-specific messaging).

Only the **visual delivery and layout** evolve.
