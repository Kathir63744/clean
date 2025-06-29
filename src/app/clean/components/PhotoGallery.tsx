"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause, Leaf } from "lucide-react"

const cleaningImages = [
  {
    src: "/cont-img1.jpg",
    alt: "Eco-friendly cleaning",
    title: "Natural Cleaning",
    description: "Environmentally conscious cleaning solutions",
  },
  {
    src: "/cont-img3jpg.jpg",
    alt: "Green products",
    title: "Sustainable Products",
    description: "Eco-friendly products for a greener future",
  },
  {
    src: "/cont-img2jpg.jpg",
    alt: "Organic materials",
    title: "Organic Materials",
    description: "Sustainably sourced natural ingredients",
  },
  {
    src: "/clean.jpg",
    alt: "Professional cleaning",
    title: "Professional Service",
    description: "Expert cleaning with premium equipment",
  },
  {
    src: "/cont-img1.jpg", // Fallback if you need more images
    alt: "Deep cleaning",
    title: "Deep Cleaning",
    description: "Thorough sanitization for healthier spaces",
  },
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cleaningImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % cleaningImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + cleaningImages.length) % cleaningImages.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main image display */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-amber-800/30 border border-amber-300/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={cleaningImages[currentIndex].src || "/placeholder.svg"}
              alt={cleaningImages[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            onClick={prevImage}
            className="p-2 rounded-full bg-amber-800/80 backdrop-blur-sm text-amber-100 hover:bg-amber-700/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextImage}
            className="p-2 rounded-full bg-amber-800/80 backdrop-blur-sm text-amber-100 hover:bg-amber-700/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Image info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.div
            key={currentIndex}
            className="bg-amber-900/90 backdrop-blur-sm rounded-lg p-3 border border-amber-300/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-1">
              <Leaf className="w-4 h-4 mr-2 text-amber-300" />
              <h4 className="font-semibold text-amber-100">{cleaningImages[currentIndex].title}</h4>
            </div>
            <p className="text-sm text-amber-200/80">{cleaningImages[currentIndex].description}</p>
          </motion.div>
        </div>

        {/* Auto-play control */}
        <motion.button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 p-2 rounded-full bg-amber-800/80 backdrop-blur-sm text-amber-100 hover:bg-amber-700/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Thumbnail navigation */}
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
        {cleaningImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === currentIndex
                ? "border-amber-300 shadow-lg shadow-amber-500/30"
                : "border-amber-600/30 hover:border-amber-400/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentIndex ? "bg-amber-500/20" : "bg-amber-900/40"
              }`}
            />
          </motion.button>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="mt-3 flex justify-center space-x-2">
        {cleaningImages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-amber-300" : "w-1.5 bg-amber-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  )
}
