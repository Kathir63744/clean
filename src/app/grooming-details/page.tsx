"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants, Transition } from "framer-motion"
import { ArrowLeft, Scissors, Palette, Sparkles, Droplet } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import NavBar from "../clean/components/NavBar"
import BannerSlider from "../clean/components/banner-slider/BannerSlider"

interface GroomingService {
  title: string
  description: string
  features: string[]
  images: string[]
}

interface BannerSlide {
  image: string
  title: string
  subtitle: string
}

interface Tab {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const groomingServices: Record<string, GroomingService> = {
  haircut: {
    title: "Professional Haircuts",
    description: "Expert haircuts tailored to your style preferences, face shape, and hair type.",
    features: [
      "Consultation with expert stylist",
      "Precision cutting techniques",
      "Styling and finishing",
      "Hair care recommendations",
      "Complimentary neck and shoulder massage",
      "Product recommendations",
    ],
    images: [
      "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg",
      "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg",
      "https://images.pexels.com/photos/3993301/pexels-photo-3993301.jpeg",
    ],
  },
  nailPolishing: {
    title: "Nail Polishing",
    description: "Premium nail care services that leave your nails looking flawless and beautiful.",
    features: [
      "Nail shaping and buffing",
      "Cuticle care and treatment",
      "Premium polish application",
      "Long-lasting finish",
      "Nail strengthening treatments",
      "Artistic nail designs available",
    ],
    images: [
      "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg",
      "https://images.pexels.com/photos/3997304/pexels-photo-3997304.jpeg",
      "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg",
    ],
  },
  hairColoring: {
    title: "Hair Coloring",
    description: "Transform your look with our professional hair coloring services using premium products.",
    features: [
      "Color consultation",
      "Custom color formulation",
      "Highlights and lowlights",
      "Balayage and ombre techniques",
      "Color correction",
      "Post-color treatment",
    ],
    images: [
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
      "https://images.pexels.com/photos/3993425/pexels-photo-3993425.jpeg",
      "https://images.pexels.com/photos/3993012/pexels-photo-3993012.jpeg",
    ],
  },
  manicure: {
    title: "Manicure Services",
    description: "Comprehensive hand and nail care treatments that pamper and rejuvenate.",
    features: [
      "Hand exfoliation",
      "Nail shaping and buffing",
      "Cuticle care",
      "Hand massage",
      "Premium polish application",
      "Paraffin treatments",
    ],
    images: [
      "https://images.pexels.com/photos/3997304/pexels-photo-3997304.jpeg",
      "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg",
      "https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg",
    ],
  },
  pedicure: {
    title: "Pedicure Services",
    description: "Luxurious foot care treatments that relax, refresh, and beautify your feet.",
    features: [
      "Foot soak and exfoliation",
      "Callus removal",
      "Nail shaping and buffing",
      "Cuticle care",
      "Foot massage",
      "Premium polish application",
    ],
    images: [
      "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg",
      "https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg",
      "https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg",
    ],
  },
  petGrooming: {
    title: "Pet Grooming",
    description: "Professional grooming services for your furry companions, ensuring they look and feel their best.",
    features: [
      "Breed-specific haircuts",
      "Bathing and conditioning",
      "Ear cleaning",
      "Nail trimming",
      "Teeth brushing",
      "Dematting and deshedding",
    ],
    images: [
      "https://images.pexels.com/photos/6568956/pexels-photo-6568956.jpeg",
      "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg",
      "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",
    ],
  },
}

const bannerSlides: BannerSlide[] = [
  {
    image: "https://images.pexels.com/photos/3993256/pexels-photo-3993256.jpeg",
    title: "Expert Grooming Services",
    subtitle: "Enhancing your natural beauty with our premium salon services"
  },
  {
    image: "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg",
    title: "Style Transformation",
    subtitle: "Let our expert stylists create your perfect look"
  },
  {
    image: "https://images.pexels.com/photos/3993492/pexels-photo-3993492.jpeg",
    title: "Complete Beauty Solutions",
    subtitle: "From hair to nails, we've got you covered"
  }
]

const tabs: Tab[] = [
  { key: "haircut", label: "Haircut", icon: Scissors },
  { key: "nailPolishing", label: "Nail Polishing", icon: Sparkles },
  { key: "hairColoring", label: "Hair Coloring", icon: Palette },
  { key: "manicure", label: "Manicure", icon: Droplet },
  { key: "pedicure", label: "Pedicure", icon: Droplet },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: springTransition
  }
}

export default function GroomingDetails() {
  const [activeTab, setActiveTab] = useState("haircut")
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const activeService = groomingServices[activeTab]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-950 to-indigo-900 overflow-x-hidden text-white">
      <NavBar />
      
      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-indigo-800 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-10 w-60 h-60 rounded-full bg-indigo-900 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-indigo-800 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      {/* Banner Slider */}
      <div className="pt-16 relative z-10">
        <BannerSlider slides={bannerSlides} />
      </div>
      
      {/* Main Content */}
      <motion.div 
        className="px-4 py-8 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Link 
            href="/" 
            className="inline-flex items-center text-indigo-300 hover:text-indigo-100 mb-8 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
        
        {/* Page Title */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Grooming Services</h1>
          <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
            Discover our premium grooming services designed to enhance your natural beauty and style
          </p>
        </motion.div>
        
        {/* Service Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === key 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                  : 'bg-indigo-900/70 text-indigo-200 border border-indigo-800 hover:bg-indigo-800/50 hover:border-indigo-600'
              }`}
              aria-label={`Select ${label} service`}
            >
              <Icon className="mr-2 h-5 w-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </motion.div>
        
        {/* Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-indigo-900/40 rounded-2xl shadow-xl overflow-hidden border border-indigo-800/50 backdrop-blur-sm">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-indigo-900/50 to-indigo-950/70">
                  <h2 className="text-3xl font-bold text-white mb-4">{activeService.title}</h2>
                  <p className="text-indigo-200 mb-6">{activeService.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {activeService.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-indigo-800 p-1 rounded-full mr-3 mt-0.5">
                          <div className="bg-indigo-500 p-1 rounded-full">
                            <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-indigo-100">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button 
                    className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-300 font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Book this service"
                  >
                    Book This Service
                  </motion.button>
                </div>
                
                <div className="md:w-1/2">
                  <div className="h-full w-full relative aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-indigo-950/80 z-10"></div>
                    <Image 
                      src={activeService.images[0]} 
                      alt={activeService.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Additional Service Images */}
        <motion.div 
          className="mt-16"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">More From This Service</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {activeService.images.slice(1).map((image, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-lg border border-indigo-800/50"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-square w-full relative">
                  <Image 
                    src={image} 
                    alt={`${activeService.title} example ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium">View Details</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Booking CTA */}
        <motion.div 
          className="mt-24 text-center"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden border border-indigo-800/50">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-indigo-800/20"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-indigo-700/20"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Elevate Your Look?</h2>
              <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
                Book your appointment today and experience our premium grooming services tailored to your needs.
              </p>
              <motion.button 
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Book appointment now"
              >
                Book Appointment Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}