import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { stagger } from './motion'

/**
 * Scroll-reveal wrapper. Replaces the old IntersectionObserver + `.reveal`
 * class dance — Motion handles the observer and honours reduced motion via
 * the <MotionConfig reducedMotion="user"> in App.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  )
}
