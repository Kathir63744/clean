"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

const carImages = [
  {
    src: "/c22.jpeg",
    alt: "Luxury Sedan",
    title: "Premium Sedan",
    description: "Comfortable rides for business and leisure",
  },
  {
    src: "/c33.jpeg",
    alt: "Executive SUV",
    title: "Executive SUV",
    description: "Spacious and elegant for group travel",
  },
  {
    src: "/c44.jpeg",
    alt: "Sports Car",
    title: "Sports Car",
    description: "High-performance vehicles for special occasions",
  },
  {
    src: "/c55.jpg",
    alt: "Luxury Coupe",
    title: "Luxury Coupe",
    description: "Stylish and sophisticated transportation",
  },
  {
    src: "/car 1.jpg",
    alt: "Classic Car",
    title: "Classic Car",
    description: "Vintage elegance for memorable events",
  },
]

export default function CarPhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % carImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + carImages.length) % carImages.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main image display */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-teal-800/30 border border-teal-300/20">
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
              src={carImages[currentIndex].src || "/placeholder.svg"}
              alt={carImages[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            onClick={prevImage}
            className="p-2 rounded-full bg-teal-800/80 backdrop-blur-sm text-teal-100 hover:bg-teal-700/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextImage}
            className="p-2 rounded-full bg-teal-800/80 backdrop-blur-sm text-teal-100 hover:bg-teal-700/80 transition-colors"
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
            className="bg-teal-900/90 backdrop-blur-sm rounded-lg p-3 border border-teal-300/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-teal-100 mb-1">{carImages[currentIndex].title}</h4>
            <p className="text-sm text-teal-200/80">{carImages[currentIndex].description}</p>
          </motion.div>
        </div>

        {/* Auto-play control */}
        <motion.button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 p-2 rounded-full bg-teal-800/80 backdrop-blur-sm text-teal-100 hover:bg-teal-700/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Thumbnail navigation */}
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
        {carImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              index === currentIndex
                ? "border-teal-300 shadow-lg shadow-teal-500/30"
                : "border-teal-600/30 hover:border-teal-400/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentIndex ? "bg-teal-500/20" : "bg-teal-900/40"
              }`}
            />
          </motion.button>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="mt-3 flex justify-center space-x-2">
        {carImages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-teal-300" : "w-1.5 bg-teal-600"
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
