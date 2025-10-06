"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause, Leaf, Star, Clock, Users, ShieldCheck, Zap } from "lucide-react"

const cleaningImages = [
  {
    src: "/cont-img1.jpg",
    alt: "Eco-friendly cleaning products",
    title: "Natural Cleaning Solutions",
    description: "Environmentally conscious cleaning with plant-based formulas that are safe for families and pets",
    features: ["Eco-Friendly", "Non-Toxic", "Pet Safe", "Natural"],
    rating: 4.9,
    time: "2-3 hours",
    team: "Expert Team",
    price: "₹499",
    coverage: "All Rooms"
  },
  {
    src: "/cont-img3jpg.jpg",
    alt: "Green cleaning products",
    title: "Sustainable Products",
    description: "Eco-friendly products for a greener and healthier home environment with guaranteed results",
    features: ["Biodegradable", "100% Natural", "Sustainable", "Green"],
    rating: 4.8,
    time: "1-2 hours",
    team: "Trained Staff",
    price: "₹399",
    coverage: "Basic Areas"
  },
  {
    src: "/cont-img2jpg.jpg",
    alt: "Organic cleaning materials",
    title: "Organic Materials",
    description: "Sustainably sourced natural ingredients for effective and thorough cleaning without chemicals",
    features: ["Organic", "Natural", "Effective", "Chemical-Free"],
    rating: 4.9,
    time: "3-4 hours",
    team: "Professional Team",
    price: "₹699",
    coverage: "Deep Clean"
  },
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cleaningImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % cleaningImages.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + cleaningImages.length) % cleaningImages.length)
  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying)

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main Image Display - More prominent */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-200/30 shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={cleaningImages[currentIndex].src || "/placeholder.svg"}
              alt={cleaningImages[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-800/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            onClick={prevImage}
            className="p-3 rounded-xl bg-white/95 backdrop-blur-md text-amber-600 hover:bg-white transition-all shadow-lg border border-amber-200/60 hover:shadow-xl"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextImage}
            className="p-3 rounded-xl bg-white/95 backdrop-blur-md text-amber-600 hover:bg-white transition-all shadow-lg border border-amber-200/60 hover:shadow-xl"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Enhanced Image info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.div
            key={currentIndex}
            className="bg-white/98 backdrop-blur-md rounded-xl p-4 border border-amber-200/50 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 rounded-lg shadow-sm">
                    <Leaf className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-gray-900 leading-tight">
                      {cleaningImages[currentIndex].title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-amber-700">{cleaningImages[currentIndex].rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{cleaningImages[currentIndex].time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {cleaningImages[currentIndex].description}
                </p>
                
                {/* Features tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {cleaningImages[currentIndex].features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold shadow-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Enhanced Details row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{cleaningImages[currentIndex].team}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-sm font-medium">{cleaningImages[currentIndex].coverage}</span>
                    </div>
                  </div>
                  <div className="text-green-600 font-black text-xl">
                    {cleaningImages[currentIndex].price}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Book Cleaning
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 hover:border-amber-400 text-gray-700 hover:text-amber-700 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg">
                View Details
              </button>
            </div>
          </motion.div>
        </div>

        {/* Auto-play control */}
        <motion.button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md text-amber-600 hover:bg-white transition-all shadow-lg border border-amber-200/60 hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>

        {/* Image counter */}
        <div className="absolute top-4 left-4 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl border border-amber-200/60 shadow-lg">
          <span className="text-sm font-bold text-amber-600">
            {currentIndex + 1} / {cleaningImages.length}
          </span>
        </div>
      </div>

      {/* Enhanced Thumbnail navigation */}
      <div className="mt-4 px-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700">Our Cleaning Services</span>
          <span className="text-xs text-gray-500 font-medium">Select service</span>
        </div>
        <div className="flex justify-between space-x-3">
          {cleaningImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-1 relative h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                index === currentIndex
                  ? "border-amber-500 shadow-lg shadow-amber-500/30 scale-105"
                  : "border-gray-300 hover:border-amber-300 shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src={image.src || "/placeholder.svg"} 
                alt={image.alt} 
                fill 
                className="object-cover"
              />
              <div className={`absolute inset-0 transition-all duration-300 ${
                index === currentIndex ? "bg-amber-500/20" : "bg-gray-900/40 group-hover:bg-gray-900/20"
              }`} />
              {/* Thumbnail label */}
              <div className="absolute bottom-1 left-1 right-1">
                <div className={`text-xs font-bold text-white text-center backdrop-blur-sm bg-black/30 rounded px-1 py-0.5 ${
                  index === currentIndex ? 'bg-amber-600/50' : ''
                }`}>
                  {image.title.split(' ')[0]}
                </div>
              </div>
              {index === currentIndex && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="mt-3 flex justify-center space-x-1 px-4">
        {cleaningImages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "flex-1 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/50" 
                : "w-3 bg-gray-300 hover:bg-gray-400"
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