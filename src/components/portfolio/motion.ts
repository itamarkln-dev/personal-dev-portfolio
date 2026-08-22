import type { Variants } from 'framer-motion'

/** Shared easing/spring so every animation on the page feels like one system. */
export const EASE = [0.22, 0.7, 0.2, 1] as const
export const SPRING = { type: 'spring', stiffness: 320, damping: 28, mass: 0.7 } as const

/** Parent: fades in and staggers its children. */
export const stagger: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

/** Child: rises into place. Paired with `stagger` on the parent. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
