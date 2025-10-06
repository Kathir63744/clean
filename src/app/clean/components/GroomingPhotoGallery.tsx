"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Pause, Scissors, Star, Clock, Users, Award, Sparkles, Heart } from "lucide-react"

const groomingImages = [
  {
    src: "/gr1.jpg",
    alt: "Premium haircut service",
    title: "Precision Haircut & Styling",
    description: "Expert styling with modern techniques and premium products for the perfect look",
    features: ["Expert Stylist", "Modern Styles", "Consultation", "Premium Products"],
    rating: 4.9,
    time: "45-60 min",
    stylist: "Senior Stylist",
    price: "₹299",
    specialty: "Hair Cutting"
  },
  {
    src: "/gr2.jpg",
    alt: "Beard grooming service",
    title: "Beard Sculpting & Care",
    description: "Detailed beard shaping and premium care with luxury grooming products",
    features: ["Precision Trim", "Luxury Products", "Skin Care", "Styling"],
    rating: 4.8,
    time: "30-45 min",
    stylist: "Beard Specialist",
    price: "₹199",
    specialty: "Beard Grooming"
  },
  {
    src: "/groom.jpg",
    alt: "Full grooming service",
    title: "Complete Grooming Package",
    description: "Head-to-toe premium grooming experience with full service and relaxation",
    features: ["Full Service", "Premium", "Relaxing", "Luxury"],
    rating: 4.9,
    time: "1.5-2 hours",
    stylist: "Master Stylist",
    price: "₹599",
    specialty: "Full Service"
  },
  {
    src: "/gr1.jpg",
    alt: "Hair styling service",
    title: "Professional Hair Styling",
    description: "Professional cuts and modern styles with expert consultation and care",
    features: ["Professional", "Modern", "Styling", "Consultation"],
    rating: 4.7,
    time: "1 hour",
    stylist: "Style Expert",
    price: "₹399",
    specialty: "Hair Styling"
  },
]

export default function GroomingPhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % groomingImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % groomingImages.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + groomingImages.length) % groomingImages.length)
  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying)

  return (
    <div className="w-full h-full flex flex-col">
      {/* Main Image Display - More prominent */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-200/30 shadow-lg">
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
              src={groomingImages[currentIndex].src || "/placeholder.svg"}
              alt={groomingImages[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-purple-800/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <motion.button
            onClick={prevImage}
            className="p-3 rounded-xl bg-white/95 backdrop-blur-md text-indigo-600 hover:bg-white transition-all shadow-lg border border-indigo-200/60 hover:shadow-xl"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextImage}
            className="p-3 rounded-xl bg-white/95 backdrop-blur-md text-indigo-600 hover:bg-white transition-all shadow-lg border border-indigo-200/60 hover:shadow-xl"
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
            className="bg-white/98 backdrop-blur-md rounded-xl p-4 border border-indigo-200/50 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-100 rounded-lg shadow-sm">
                    <Scissors className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-gray-900 leading-tight">
                      {groomingImages[currentIndex].title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-full">
                        <Star className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                        <span className="text-sm font-bold text-indigo-700">{groomingImages[currentIndex].rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{groomingImages[currentIndex].time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {groomingImages[currentIndex].description}
                </p>
                
                {/* Enhanced Features tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {groomingImages[currentIndex].features.map((feature, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-semibold shadow-sm">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Enhanced Details row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{groomingImages[currentIndex].stylist}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">{groomingImages[currentIndex].specialty}</span>
                    </div>
                  </div>
                  <div className="text-green-600 font-black text-xl">
                    {groomingImages[currentIndex].price}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Action buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Book Appointment
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 hover:border-indigo-400 text-gray-700 hover:text-indigo-700 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg">
                View Details
              </button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Auto-play control */}
        <motion.button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md text-indigo-600 hover:bg-white transition-all shadow-lg border border-indigo-200/60 hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>

        {/* Enhanced Image counter */}
        <div className="absolute top-4 left-4 px-3 py-2 bg-white/95 backdrop-blur-md rounded-xl border border-indigo-200/60 shadow-lg">
          <span className="text-sm font-bold text-indigo-600">
            {currentIndex + 1} / {groomingImages.length}
          </span>
        </div>

        {/* Premium Badge */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <motion.div 
            className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-3 h-3" />
            <span className="text-xs font-bold">PREMIUM SERVICE</span>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Thumbnail navigation */}
      <div className="mt-4 px-2">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700">Our Grooming Services</span>
          <span className="text-xs text-gray-500 font-medium">Select service</span>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {groomingImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                index === currentIndex
                  ? "border-indigo-500 shadow-lg shadow-indigo-500/30 scale-105"
                  : "border-gray-300 hover:border-indigo-300 shadow-md"
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
                index === currentIndex ? "bg-indigo-500/20" : "bg-gray-900/40 group-hover:bg-gray-900/20"
              }`} />
              
              {/* Thumbnail label */}
              <div className="absolute bottom-1 left-1 right-1">
                <div className={`text-xs font-bold text-white text-center backdrop-blur-sm bg-black/40 rounded px-1 py-0.5 ${
                  index === currentIndex ? 'bg-indigo-600/60' : ''
                }`}>
                  {image.title.split(' ')[0]}
                </div>
              </div>
              
              {/* Active indicator */}
              {index === currentIndex && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              )}
              
              {/* Favorite indicator for popular services */}
              {index === 0 && (
                <div className="absolute top-1 left-1">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Enhanced Progress indicators */}
      <div className="mt-3 flex justify-center space-x-1 px-4">
        {groomingImages.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50" 
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