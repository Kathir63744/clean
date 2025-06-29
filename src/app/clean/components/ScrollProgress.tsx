"use client"
import type React from "react"
import { motion, useScroll, useSpring } from "framer-motion"
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-cyan-500 z-50 origin-left"
      style={{ scaleX }}
    />
  )
}
export default ScrollProgress
