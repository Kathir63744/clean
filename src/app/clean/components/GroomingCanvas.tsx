"use client"

import { useEffect, useRef } from "react"

const GroomingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number
    let time = 0

    const drawGroomingTool = (x: number, y: number, rotation: number, type: "scissors" | "comb") => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      if (type === "scissors") {
        // Draw scissors
        ctx.fillStyle = "rgba(99, 102, 241, 0.3)"
        ctx.beginPath()
        // Blade 1
        ctx.ellipse(-10, -5, 15, 3, 0, 0, Math.PI * 2)
        ctx.fill()
        // Blade 2
        ctx.beginPath()
        ctx.ellipse(-10, 5, 15, 3, 0, 0, Math.PI * 2)
        ctx.fill()
        // Handle
        ctx.fillStyle = "rgba(99, 102, 241, 0.4)"
        ctx.fillRect(5, -2, 8, 4)
      } else {
        // Draw comb
        ctx.fillStyle = "rgba(99, 102, 241, 0.3)"
        ctx.fillRect(-15, -2, 30, 4)
        // Comb teeth
        for (let i = 0; i < 8; i++) {
          ctx.fillRect(-12 + i * 3, -8, 1, 6)
        }
      }

      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight)
      gradient.addColorStop(0, "rgba(30, 58, 138, 0.1)")
      gradient.addColorStop(1, "rgba(67, 56, 202, 0.1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw floating grooming tools
      for (let i = 0; i < 12; i++) {
        const x = Math.sin(time * 0.001 + i) * 100 + canvas.offsetWidth * (0.2 + (i % 3) * 0.3)
        const y = Math.cos(time * 0.0015 + i * 0.5) * 80 + canvas.offsetHeight * (0.3 + (i % 2) * 0.4)
        const rotation = time * 0.002 + i * 0.5
        const type = i % 2 === 0 ? "scissors" : "comb"

        drawGroomingTool(x, y, rotation, type)
      }

      time += 16
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30" />
}

export default GroomingCanvas
