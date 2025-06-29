// src/app/clean/components/ThemeBannerSlider.tsx
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Slide = {
  image: string
  title?: string
  subtitle?: string
}

type Theme = "teal" | "blue" | "emerald"

interface ThemeBannerSliderProps {
  slides: Slide[]
  theme: Theme
}

const themeStyles: Record<Theme, { overlay: string; text: string }> = {
  teal: {
    overlay: "from-teal-800/60 to-transparent",
    text: "text-teal-300",
  },
  blue: {
    overlay: "from-blue-800/60 to-transparent",
    text: "text-blue-300",
  },
  emerald: {
    overlay: "from-emerald-800/60 to-transparent",
    text: "text-emerald-300",
  },
}

const ThemeBannerSlider: React.FC<ThemeBannerSliderProps> = ({ slides, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)

  const selectedTheme = themeStyles[theme]

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
        />
      </AnimatePresence>

      <div className={`absolute inset-0 bg-gradient-to-t ${selectedTheme.overlay}`} />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
        <motion.h2
          className={`text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg ${selectedTheme.text}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {slides[currentIndex].title}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-white max-w-2xl drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {slides[currentIndex].subtitle}
        </motion.p>
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={prevSlide}
          className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={nextSlide}
          className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default ThemeBannerSlider
