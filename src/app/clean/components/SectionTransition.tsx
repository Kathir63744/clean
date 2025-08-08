"use client"

import React, { useState, useEffect } from "react"

interface SectionTransitionProps {
  fromColor: string
  toColor: string
  direction?: "up" | "down" | "left" | "right"
  waveHeight?: number
  flipWave?: boolean
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  fromColor,
  toColor,
  direction = "down",
  waveHeight = 50,
  flipWave = false,
}) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getWavePath = () => {
    const waveWidth = width / 2
    const height = waveHeight
    const flipFactor = flipWave ? -1 : 1

    if (direction === "left" || direction === "right") {
      return `
        M0 0
        Q${waveWidth * 0.25} ${height * 0.5 * flipFactor}, ${waveWidth * 0.5} 0
        Q${waveWidth * 0.75} ${height * 0.5 * -flipFactor}, ${waveWidth} 0
        L${waveWidth} 100
        L0 100
        Z
      `
    }

    return `
      M0 0
      Q${width * 0.25} ${height * 0.5 * flipFactor}, ${width * 0.5} 0
      Q${width * 0.75} ${height * 0.5 * -flipFactor}, ${width} 0
      L${width} 100
      L0 100
      Z
    `
  }

  const getContainerClass = () => {
    switch (direction) {
      case "up": return "bottom-0"
      case "down": return "top-0"
      case "left": return "right-0 h-full w-24"
      case "right": return "left-0 h-full w-24"
      default: return "top-0"
    }
  }

  const getSvgDimensions = () => {
    if (direction === "left" || direction === "right") {
      return { width: waveHeight * 2, height: "100%" }
    }
    return { width: "100%", height: waveHeight }
  }

  return (
    <div className={`relative w-full ${direction === "left" || direction === "right" ? "h-full" : "h-24"}`}>
      <div className="absolute inset-0" style={{ background: fromColor }} />
      
      <div className={`absolute ${getContainerClass()} w-full h-full overflow-hidden`}>
        <svg
          width={getSvgDimensions().width}
          height={getSvgDimensions().height}
          viewBox={`0 0 ${direction === "left" || direction === "right" ? waveHeight * 2 : width} ${direction === "left" || direction === "right" ? "100" : waveHeight}`}
          preserveAspectRatio="none"
          style={{
            transform: direction === "left" ? "rotate(90deg)" : direction === "right" ? "rotate(-90deg)" : "none"
          }}
        >
          <path 
            d={getWavePath()} 
            fill={toColor} 
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </div>
    </div>
  )
}

export default SectionTransition