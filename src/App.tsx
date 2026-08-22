import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import Background from './components/portfolio/Background'
import Navbar from './components/portfolio/Navbar'
import Sections from './components/portfolio/Sections'

function App() {
  // violet hairline across the top that tracks read progress
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-rail" style={{ scaleX: progress }} />
      <Background />
      <Navbar />
      <Sections />
    </MotionConfig>
  )
}

export default App
