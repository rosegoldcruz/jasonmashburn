/**
 * Centralized motion tokens for the Jason Mashburn homepage.
 * Every animated element must reference these constants.
 *
 * Laws:
 *  1. Motion has 3 jobs: Orient, Assure, Advance.
 *  2. No constant motion except ambient micro.
 *  3. One primary motion focus per viewport.
 *  4. Easing must feel "financial": smooth, weighted, no bounce.
 */

// ── Durations (seconds) ─────────────────────────────────────────────
export const duration = {
  fast: 0.16,   // 160ms — hover, button feedback
  base: 0.38,   // 380ms — card rise, section reveal
  slow: 0.75,   // 750ms — hero transitions, graph toggles
} as const

// ── Distances (px) ──────────────────────────────────────────────────
export const distance = {
  micro: 3,     // hover nudge
  lift: 8,      // card elevate
  enter: 22,    // section rise-in
} as const

// ── Opacity ─────────────────────────────────────────────────────────
export const opacity = {
  enter: { from: 0, to: 1 },
  deEmphasize: { from: 1, to: 0.65 },
  backgroundFloor: 0.35,
} as const

// ── Blur ────────────────────────────────────────────────────────────
export const blur = {
  glassReveal: { from: 0, to: 8 }, // px, slow duration, glass panels only
} as const

// ── Scale ───────────────────────────────────────────────────────────
export const scale = {
  hover: 1.01,
  heroShrink: 0.6,
} as const

// ── Easing ──────────────────────────────────────────────────────────
export const easing = {
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
} as const

export const easingCSS = {
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const

// ── Stagger ─────────────────────────────────────────────────────────
export const stagger = {
  children: 0.07, // 70ms between children in SectionReveal
} as const

// ── Reusable Framer Motion variants ────────────────────────────────
export const sectionReveal = {
  initial: { opacity: 0, y: distance.enter },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: duration.base, ease: easing.easeOut },
} as const

export const cardHover = {
  whileHover: { y: -distance.lift, scale: scale.hover },
  transition: { duration: duration.fast, ease: easing.easeOut },
} as const

export const heroReveal = {
  initial: { opacity: 0, y: distance.enter },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slow, ease: easing.easeOut },
} as const

export const stickyDockReveal = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.base, ease: easing.easeOut },
} as const
