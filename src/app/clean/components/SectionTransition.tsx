"use client"

import type React from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"

interface SectionTransitionProps {
  fromColor: string
  toColor: string
  direction?: "up" | "down" | "left" | "right"
  pattern?: "wave" | "curve" | "zigzag" | "dots" | "polygon" | "steps" | "random"
  intensity?: number
  duration?: number
  particles?: boolean
  blur?: boolean
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  fromColor,
  toColor,
  direction = "down",
  pattern = "wave",
  intensity = 1,
  duration = 1,
  particles = true,
  blur = false,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 100 })
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: Math.min(100, window.innerHeight * 0.15)
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Generate SVG path based on pattern
  const getPath = () => {
    const { width, height } = dimensions
    const amplitude = height * 0.5 * intensity

    switch (pattern) {
      case "wave":
        return `M0 ${height} 
                C ${width * 0.25} ${height - amplitude}, 
                   ${width * 0.75} ${height + amplitude}, 
                   ${width} ${height} 
                L${width} ${direction === "up" ? 0 : height * 2} 
                L0 ${direction === "up" ? 0 : height * 2} Z`

      case "curve":
        return `M0 ${height} 
                Q ${width * 0.5} ${direction === "up" ? height + amplitude : height - amplitude}, 
                   ${width} ${height} 
                L${width} ${direction === "up" ? 0 : height * 2} 
                L0 ${direction === "up" ? 0 : height * 2} Z`

      case "zigzag":
        return `M0 ${height} 
                L ${width * 0.2} ${height - amplitude * 0.8} 
                L ${width * 0.4} ${height + amplitude * 0.6} 
                L ${width * 0.6} ${height - amplitude * 0.4} 
                L ${width * 0.8} ${height + amplitude * 0.2} 
                L ${width} ${height} 
                L${width} ${direction === "up" ? 0 : height * 2} 
                L0 ${direction === "up" ? 0 : height * 2} Z`

      case "dots":
        return `M0 ${height} 
                Q ${width * 0.5} ${direction === "up" ? height + amplitude : height - amplitude}, 
                   ${width} ${height} 
                L${width} ${direction === "up" ? 0 : height * 2} 
                L0 ${direction === "up" ? 0 : height * 2} Z`

      case "polygon":
        return `M0 ${height} 
                L ${width * 0.2} ${height - amplitude * 0.5} 
                L ${width * 0.4} ${height + amplitude} 
                L ${width * 0.6} ${height - amplitude} 
                L ${width * 0.8} ${height + amplitude * 0.5} 
                L ${width} ${height} 
                L${width} ${direction === "up" ? 0 : height * 2} 
                L0 ${direction === "up" ? 0 : height * 2} Z`

      case "steps":
        return `M0 ${height} 
                L ${width * 0.2} ${height} 
                L ${width * 0.2} ${height - amplitude} 
                L ${width * 0.4} ${height - amplitude} 
                L ${width * 0.4} ${height + amplitude * 0.5} 
                L ${width * 0.6} ${height + amplitude * 0.5} 
                L ${width * 0.6} ${height - amplitude * 0.3} 
                L ${width * 0.8} ${height - amplitude * 0.3} 
                L ${width * 0.8} ${height + amplitude * 0.7} 
                L ${width} ${height + amplitude * 0.7} 
                L${width} ${direction === "up" ? 0 : height * 2} 
                L0 ${direction === "up" ? 0 : height * 2} Z`

      case "random":
        let path = `M0 ${height} `
        const segments = 10
        for (let i = 1; i <= segments; i++) {
          const x = (width * i) / segments
          const y = height + (Math.random() * 2 - 1) * amplitude
          path += `L ${x} ${y} `
        }
        path += `L${width} ${direction === "up" ? 0 : height * 2} L0 ${direction === "up" ? 0 : height * 2} Z`
        return path

      default:
        return `M0 ${height} 
                C ${width * 0.25} ${height - amplitude}, 
                   ${width * 0.75} ${height + amplitude}, 
                   ${width} ${height} 
                L${width} ${direction === "up" ? 0 : height * 2} 
                L0 ${direction === "up" ? 0 : height * 2} Z`
    }
  }

  const getDirectionalProps = () => {
    switch (direction) {
      case "up":
        return { y: 100, className: "bottom-0" }
      case "down":
        return { y: -100, className: "top-0" }
      case "left":
        return { x: 100, className: "right-0 h-full w-24" }
      case "right":
        return { x: -100, className: "left-0 h-full w-24" }
      default:
        return { y: -100, className: "top-0" }
    }
  }

  const directionalProps = getDirectionalProps()

  return (
    <div 
      ref={ref}
      className={`relative w-full ${direction === "left" || direction === "right" ? "h-full" : "h-24"}`}
      style={{ 
        background: fromColor,
        filter: blur ? "blur(0.5px)" : "none" 
      }}
    >
      <div className="absolute inset-0" style={{ background: fromColor }} />

      <svg
        className={`absolute ${directionalProps.className} left-0 w-full`}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
        fill={toColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={getPath()}
       
          animate={controls}
          variants={{
            visible: { 
              [direction === "left" || direction === "right" ? "x" : "y"]: 0, 
              opacity: 1 
            }
          }}
          transition={{ 
            duration,
            ease: [0.16, 1, 0.3, 1] 
          }}
        />
        {pattern === "dots" && (
          <g>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={(dimensions.width * (i + 0.5)) / 20}
                cy={dimensions.height / 2}
                r={3 + Math.random() * 4}
                fill={`rgba(255, 255, 255, ${0.2 + Math.random() * 0.3})`}
        
                animate={controls}
                variants={{
                  visible: { 
                    [direction === "left" || direction === "right" ? "x" : "y"]: 0, 
                    opacity: 1 
                  }
                }}
                transition={{ 
                  duration: duration * 0.8, 
                  delay: i * 0.05,
                  ease: [0.34, 1.56, 0.64, 1] 
                }}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Animated particles */}
      {particles && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            const size = Math.random() * 20 + 5
            const isDirectional = direction === "left" || direction === "right"
            const initialX = isDirectional ? (direction === "left" ? 100 : -100) : 0
            const initialY = isDirectional ? 0 : (direction === "up" ? 100 : -100)
            
            return (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.1 + Math.random() * 0.3,
                }}
                initial={{ 
                  x: initialX,
                  y: initialY,
                  opacity: 0 
                }}
                animate={controls}
                variants={{
                  visible: { 
                    x: 0,
                    y: 0,
                    opacity: 0.1 + Math.random() * 0.3,
                  }
                }}
                transition={{
                  duration: duration * 2 + Math.random(),
                  delay: Math.random() * 0.5,
                  ease: "backOut"
                }}
              />
            )
          })}
        </div>
      )}

      {/* Gradient overlay for smoother transition */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(${
          direction === "up" ? "to top" : 
          direction === "down" ? "to bottom" : 
          direction === "left" ? "to left" : "to right"
        }, ${fromColor} 0%, transparent 30%, transparent 70%, ${toColor} 100%)`,
        opacity: 0.3
      }} />
    </div>
  )
}

export default SectionTransition