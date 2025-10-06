"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause, Car, Star, Clock, MapPin, Zap, Users, Shield } from "lucide-react"

const carImages = [
  {
    src: "/c22.jpeg",
    alt: "Luxury Sedan",
    title: "Premium Sedan Class",
    description: "Executive comfort with premium amenities for business and leisure travel",
    features: ["Free WiFi", "AC Control", "Premium Sound", "Charging"],
    rating: 4.9,
    time: "30-45 min arrival",
    price: "₹899",
    passengers: "4 Passengers",
    luggage: "2 Bags"
  },
  {
    src: "/c33.jpeg",
    alt: "Executive SUV",
    title: "Executive SUV",
    description: "Spacious luxury SUV perfect for group travel and extra comfort",
    features: ["7 Seater", "Extra Luggage", "Premium", "Family Friendly"],
    rating: 4.8,
    time: "Same Day Booking",
    price: "₹1,499",
    passengers: "7 Passengers",
    luggage: "4 Bags"
  },
  {
    src: "/c44.jpeg",
    alt: "Sports Car",
    title: "Sports Luxury",
    description: "High-performance premium vehicles for special occasions",
    features: ["Sport Mode", "VIP Service", "Luxury", "Special Events"],
    rating: 4.9,
    time: "Advance Booking",
    price: "₹2,999",
    passengers: "2 Passengers",
    luggage: "2 Bags"
  },
]

export default function CarPhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % carImages.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + carImages.length) % carImages.length)
  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying)

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main Image Display - More prominent */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-200/30 shadow-lg">
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
              src={carImages[currentIndex].src || "/placeholder.svg"}
              alt={carImages[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            onClick={prevImage}
            className="p-3 rounded-xl bg-white/95 backdrop-blur-md text-blue-600 hover:bg-white transition-all shadow-lg border border-blue-200/60 hover:shadow-xl"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextImage}
            className="p-3 rounded-xl bg-white/95 backdrop-blur-md text-blue-600 hover:bg-white transition-all shadow-lg border border-blue-200/60 hover:shadow-xl"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Enhanced Image info overlay - More comprehensive */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.div
            key={currentIndex}
            className="bg-white/98 backdrop-blur-md rounded-xl p-4 border border-blue-200/50 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                    <Car className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-gray-900 leading-tight">
                      {carImages[currentIndex].title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-amber-700">{carImages[currentIndex].rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{carImages[currentIndex].time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {carImages[currentIndex].description}
                </p>
                
                {/* Enhanced Features tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {carImages[currentIndex].features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold shadow-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Enhanced Details row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{carImages[currentIndex].passengers}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">{carImages[currentIndex].luggage}</span>
                    </div>
                  </div>
                  <div className="text-green-600 font-black text-xl">
                    {carImages[currentIndex].price}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Action buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Book This Vehicle
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-700 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg">
                View Details
              </button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Auto-play control */}
        <motion.button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md text-blue-600 hover:bg-white transition-all shadow-lg border border-blue-200/60 hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>

        {/* Enhanced Image counter */}
        <div className="absolute top-4 left-4 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl border border-blue-200/60 shadow-lg">
          <span className="text-sm font-bold text-blue-600">
            {currentIndex + 1} / {carImages.length}
          </span>
        </div>
      </div>

      {/* Enhanced Thumbnail navigation */}
      <div className="mt-4 px-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700">Our Premium Fleet</span>
          <span className="text-xs text-gray-500 font-medium">Select vehicle</span>
        </div>
        <div className="flex justify-between space-x-3">
          {carImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-1 relative h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                index === currentIndex
                  ? "border-blue-500 shadow-lg shadow-blue-500/30 scale-105"
                  : "border-gray-300 hover:border-blue-300 shadow-md"
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
                index === currentIndex ? "bg-blue-500/20" : "bg-gray-900/40 group-hover:bg-gray-900/20"
              }`} />
              {/* Thumbnail label */}
              <div className="absolute bottom-1 left-1 right-1">
                <div className={`text-xs font-bold text-white text-center backdrop-blur-sm bg-black/30 rounded px-1 py-0.5 ${
                  index === currentIndex ? 'bg-blue-600/50' : ''
                }`}>
                  {image.title.split(' ')[0]}
                </div>
              </div>
              {index === currentIndex && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Enhanced Progress indicators */}
      <div className="mt-3 flex justify-center space-x-1 px-4">
        {carImages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50" 
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