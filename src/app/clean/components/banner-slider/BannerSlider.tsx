"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface BannerSliderProps {
  slides: {
    image: string
    title: string
    subtitle?: string
  }[]
  theme?: 'amber' | 'indigo'
  interval?: number
  autoplay?: boolean
}

export default function BannerSlider({ 
  slides, 
  theme = 'amber',
  interval = 5000,
  autoplay = true
}: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const themeColors = {
    amber: {
      overlay: 'from-amber-950/70 to-amber-900/40',
      title: 'text-amber-100',
      subtitle: 'text-amber-200',
      dot: {
        active: 'bg-amber-400',
        inactive: 'bg-amber-200/50'
      },
      button: 'bg-amber-100/20 hover:bg-amber-100/30 text-amber-100'
    },
    indigo: {
      overlay: 'from-indigo-950/70 to-indigo-900/40',
      title: 'text-indigo-100',
      subtitle: 'text-indigo-200',
      dot: {
        active: 'bg-indigo-400',
        inactive: 'bg-indigo-200/50'
      },
      button: 'bg-indigo-100/20 hover:bg-indigo-100/30 text-indigo-100'
    }
  }

  const selectedTheme = themeColors[theme]

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!autoplay || isHovering) return
    
    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [nextSlide, autoplay, interval, isHovering])

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${selectedTheme.overlay}`} />
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${selectedTheme.title} mb-4 max-w-4xl`}
            >
              {slides[currentIndex].title}
            </motion.h2>
            
            {slides[currentIndex].subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-lg md:text-xl ${selectedTheme.subtitle} max-w-2xl`}
              >
                {slides[currentIndex].subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
        <button 
          onClick={prevSlide}
          className={`${selectedTheme.button} p-3 rounded-full transform transition duration-300 ease-in-out hover:scale-110`}
          aria-label="Previous slide"
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className={`${selectedTheme.button} p-3 rounded-full transform transition duration-300 ease-in-out hover:scale-110`}
          aria-label="Next slide"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? `${selectedTheme.dot.active} w-6` 
                : selectedTheme.dot.inactive
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}