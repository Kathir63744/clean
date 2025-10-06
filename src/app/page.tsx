"use client"

import { useState, useRef, useEffect, memo, useCallback } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import NavBar from "./clean/components/NavBar"
import HeroSection from "./clean/components/HeroSection"
import ThreeDView from "./clean/components/ThreeDView"
import PhotoGallery from "./clean/components/PhotoGallery"
import GroomingThreeDView from "./clean/components/GroomingThreeDView"
import GroomingPhotoGallery from "./clean/components/GroomingPhotoGallery"
import CarThreeDView from "./clean/components/CarThreeDView"
import CarPhotoGallery from "./clean/components/CarPhotoGallery"
import {
  Star,
  Sparkles,
  ArrowRight,
  Droplet,
  CheckCircle,
  Award,
  Clock,
  Shield,
  Zap,
  ShieldCheck,
  Recycle,
  Leaf,
  Scissors,
  ChevronDown,
  Car,
  Navigation,
  MapPin,
  Users,
  Phone,
  MessageCircle,
  Calendar,
  Heart,
  ThumbsUp,
  Crown,
  Gem,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Memoized components for better performance
const MemoizedNavBar = memo(NavBar)
const MemoizedHeroSection = memo(HeroSection)

// Enhanced Service Intro Component
const ServiceIntro = ({ title, subtitle, gradient, stats }: { title: string; subtitle: string; gradient: string; stats?: { value: string; label: string }[] }) => (
  <div className="py-16 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 border-b border-gray-200/50">
    <div className="container mx-auto px-4 text-center">
      <motion.h2
        className={`text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
      
      {/* Stats Row */}
      {stats && (
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg">
              <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  </div>
)

// Enhanced ServiceHighlights Component - Properly Centered
const ServiceHighlights = ({ highlights, theme = "blue" }: { highlights: string[], theme?: "blue" | "amber" | "indigo" }) => {
  const themeColors = {
    blue: { 
      bg: "from-blue-50 to-cyan-50", 
      border: "border-blue-200", 
      text: "text-blue-700", 
      accent: "bg-blue-100",
      gradient: "from-blue-500 to-cyan-500"
    },
    amber: { 
      bg: "from-amber-50 to-orange-50", 
      border: "border-amber-200", 
      text: "text-amber-700", 
      accent: "bg-amber-100",
      gradient: "from-amber-500 to-orange-500"
    },
    indigo: { 
      bg: "from-indigo-50 to-purple-50", 
      border: "border-indigo-200", 
      text: "text-indigo-700", 
      accent: "bg-indigo-100",
      gradient: "from-indigo-500 to-purple-500"
    }
  }

  const colors = themeColors[theme]

  return (
    <div className="w-full flex justify-center px-4">
      <div className={`w-full max-w-7xl bg-gradient-to-br ${colors.bg} rounded-3xl p-8 border ${colors.border} shadow-2xl`}>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-r ${colors.gradient} shadow-lg`}>
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-3xl font-black ${colors.text}`}>Why Choose Our Service</h3>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the difference with our premium services designed for your complete satisfaction
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 p-5 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-md hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className={`p-3 rounded-xl ${colors.accent} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <CheckCircle className={`w-6 h-6 ${colors.text}`} />
              </div>
              <div className="flex-1">
                <span className="text-gray-800 font-semibold text-base leading-relaxed">{highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced call to action */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-2 rounded-full bg-amber-100">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm font-bold text-gray-700">All services include 100% quality guarantee</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// New Component: Quick Action Card
const QuickActionCard = ({ theme = "blue" }: { theme?: "blue" | "amber" | "indigo" }) => {
  const themeColors = {
    blue: { 
      gradient: "from-blue-600 to-cyan-600", 
      hover: "from-blue-700 to-cyan-700", 
      light: "bg-blue-50",
      border: "border-blue-200"
    },
    amber: { 
      gradient: "from-amber-600 to-orange-600", 
      hover: "from-amber-700 to-orange-700", 
      light: "bg-amber-50",
      border: "border-amber-200"
    },
    indigo: { 
      gradient: "from-indigo-600 to-purple-600", 
      hover: "from-indigo-700 to-purple-700", 
      light: "bg-indigo-50",
      border: "border-indigo-200"
    }
  }

  const colors = themeColors[theme]

  return (
    <div className={`rounded-3xl p-8 ${colors.light} border ${colors.border} shadow-xl`}>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-white to-white/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border">
          <Gem className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">Ready to Get Started?</h3>
        <p className="text-gray-600">Book your service in seconds</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button 
          className={`flex-1 bg-gradient-to-r ${colors.gradient} hover:${colors.hover} text-white py-4 px-8 rounded-xl font-black text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Calendar className="w-5 h-5" />
          Book Now
        </motion.button>
        <motion.button 
          className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="w-5 h-5" />
          Call Us
        </motion.button>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const cleaningRef = useRef<HTMLDivElement>(null)
  const groomingRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleLoadingComplete()
    }, 1500)
    return () => clearTimeout(timer)
  }, [handleLoadingComplete])

  // Enhanced Service data with more content
  const carServices = [
    {
      id: 1,
      name: "Airport Transfer",
      description: "Reliable pickup and drop-off services with flight tracking",
      image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg",
      path: "/bike-taxi",
      icon: <Navigation className="h-6 w-6 text-blue-500" />,
      features: ["Flight Tracking", "Meet & Greet", "Luggage Help"],
      time: "30-45 min"
    },
    {
      id: 2,
      name: "City Tours",
      description: "Explore the city with our expert guided tours",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      path: "/bike-taxi",
      icon: <MapPin className="h-6 w-6 text-blue-500" />,
      features: ["Expert Guide", "Flexible Routes", "Photo Stops"],
      time: "4-8 hours"
    },
    {
      id: 3,
      name: "Corporate Travel",
      description: "Professional transportation for business meetings",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
      path: "/bike-taxi",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      features: ["WiFi", "Charging Ports", "Professional"],
      time: "As needed"
    },
    {
      id: 4,
      name: "Luxury Rides",
      description: "Premium vehicles for special occasions",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      path: "/bike-taxi",
      icon: <Award className="h-6 w-6 text-blue-500" />,
      features: ["Luxury Cars", "Chauffeur", "Complimentary"],
      time: "Custom"
    },
  ]

  const carHighlights = [
    "Real-time GPS tracking for all rides with live updates",
    "Professional background-verified drivers with 5+ years experience",
    "24/7 customer support with instant response guarantee",
    "Multiple vehicle categories from economy to luxury",
    "Instant booking confirmation with digital receipts",
    "Cashless and secure payment options with encryption",
    "Complimentary WiFi and phone charging in all vehicles",
    "Child safety seats available on request",
    "Flight tracking for airport transfers with free waiting time",
  ]

  const carStats = [
    { value: "10K+", label: "Happy Riders" },
    { value: "4.9/5", label: "Customer Rating" },
    { value: "5 min", label: "Avg. Arrival" },
    { value: "50+", label: "Cities" }
  ]

  const cleaningServices = [
    {
      id: 1,
      name: "Home Cleaning",
      description: "Professional cleaning for all home spaces with eco-friendly products",
      image: "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg",
      path: "/service-page",
      icon: <CheckCircle className="h-6 w-6 text-amber-500" />,
      features: ["Eco-friendly", "Deep Clean", "All Rooms"],
      time: "2-3 hours"
    },
    {
      id: 2,
      name: "Office Cleaning",
      description: "Keep your workspace spotless and productive",
      image: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg",
      path: "/service-page",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      features: ["Commercial", "Daily/Weekly", "Equipment"],
      time: "1-2 hours"
    },
    {
      id: 3,
      name: "Deep Cleaning",
      description: "Thorough sanitization for a healthier environment",
      image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
      path: "/service-page",
      icon: <Shield className="h-6 w-6 text-amber-500" />,
      features: ["Sanitization", "Deep Clean", "All Areas"],
      time: "3-4 hours"
    },
    {
      id: 4,
      name: "Eco-Friendly Cleaning",
      description: "Sustainable solutions that protect your family and the planet",
      image: "https://images.pexels.com/photos/5217912/pexels-photo-5217912.jpeg",
      path: "/service-page",
      icon: <Droplet className="h-6 w-6 text-amber-500" />,
      features: ["100% Natural", "Non-toxic", "Eco-friendly"],
      time: "2-3 hours"
    },
  ]

  const cleaningHighlights = [
    "100% eco-friendly and non-toxic cleaning products",
    "Trained and background-verified professional cleaners",
    "Customized cleaning plans tailored to your specific needs",
    "100% satisfaction guarantee with free re-cleaning",
    "Flexible scheduling with same-day service available",
    "Deep cleaning and sanitization with hospital-grade disinfectants",
    "Green cleaning certification for environmental safety",
    "Pet-friendly cleaning solutions that are completely safe",
    "All cleaning equipment provided including premium tools",
  ]

  const groomingServices = [
    {
      id: 1,
      name: "Pet Grooming",
      description: "Professional care for your furry companions with premium products",
      image: "https://images.pexels.com/photos/6568956/pexels-photo-6568956.jpeg",
      path: "/grooming-details",
      icon: <Award className="h-6 w-6 text-indigo-500" />,
      features: ["Professional", "Gentle", "Premium"],
      time: "1-2 hours"
    },
    {
      id: 2,
      name: "Hair Styling",
      description: "Expert cuts and styles for a fresh look with modern techniques",
      image: "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg",
      path: "/grooming-details",
      icon: <Sparkles className="h-6 w-6 text-indigo-500" />,
      features: ["Expert Stylists", "Modern Styles", "Consultation"],
      time: "45 min"
    },
    {
      id: 3,
      name: "Nail Care",
      description: "Manicures and pedicures for healthy, beautiful nails",
      image: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg",
      path: "/grooming-details",
      icon: <Clock className="h-6 w-6 text-indigo-500" />,
      features: ["Professional", "Hygienic", "Luxury"],
      time: "1 hour"
    },
    {
      id: 4,
      name: "Spa Services",
      description: "Relaxing treatments for total rejuvenation and wellness",
      image: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg",
      path: "/grooming-details",
      icon: <Shield className="h-6 w-6 text-indigo-500" />,
      features: ["Relaxing", "Professional", "Luxury"],
      time: "1.5 hours"
    },
  ]

  const groomingHighlights = [
    "Expert stylists with 5+ years of professional experience",
    "Premium quality grooming products from top international brands",
    "Hygienic and fully sanitized tools after every service",
    "Personalized style consultation with expert recommendations",
    "Modern and latest grooming techniques and trends",
    "Comfortable and relaxing studio environment with amenities",
    "Flexible appointment scheduling with online booking",
    "100% satisfaction guarantee on all services",
    "Loyalty programs with exclusive member benefits",
  ]

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      initials: "JD",
      rating: 5,
      text: "The cleaning service was exceptional! My home has never looked better. The team was professional, thorough, and paid attention to every detail.",
    },
    {
      id: 2,
      name: "Sarah Miller",
      initials: "SM",
      rating: 5,
      text: "I've tried many grooming services, but this one stands out. The stylists are skilled and really listen to what you want. Highly recommend!",
    },
    {
      id: 3,
      name: "Alex Kim",
      initials: "AK",
      rating: 5,
      text: "From booking to completion, everything was seamless. The cleaning products smell amazing and my allergies haven't acted up at all. Will definitely use again!",
    },
  ]

if (isLoading) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-cyan-50 to-gray-100 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md px-6"
      >
        {/* Enhanced Multi-layered spinner */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Outer ring with gradient */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-indigo-100"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          
          {/* Middle spinning ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-t-indigo-400 border-r-amber-400 border-b-cyan-400 border-l-lime-400"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          
          {/* Inner pulsing circle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-300 to-cyan-300 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="text-white text-lg"
            >
              ✦
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced catchy content */}
        <div className="space-y-3">
          <motion.h2
            className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to EliteServices
          </motion.h2>
          
          <motion.p
            className="text-sm text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Premium Services, Exceptional Experience
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {["Instant Booking", "Expert Professionals", "Eco-Friendly", "24/7 Support"].map((item, index) => (
              <motion.span
                key={index}
                className="px-3 py-1.5 bg-white/80 rounded-full text-xs font-semibold text-indigo-700 shadow-sm border border-indigo-100"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)" }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
              >
                ✓ {item}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Enhanced progress indicator */}
        <motion.div 
          className="mt-6 mx-auto w-48 h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full relative"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <motion.div
              className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>
        
        {/* Enhanced tip */}
        <motion.p
          className="text-xs text-gray-500 mt-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Loading your premium experience...
        </motion.p>
      </motion.div>
    </div>
  )
}

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Fixed navigation */}
      <MemoizedNavBar />

      {/* Enhanced Section Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-4">
          {[
            { id: "hero", label: "Home", icon: "🏠" },
            { id: "car", label: "Rides", icon: "🚗" },
            { id: "cleaning", label: "Clean", icon: "✨" },
            { id: "grooming", label: "Groom", icon: "✂️" },
            { id: "testimonials", label: "Reviews", icon: "⭐" },
          ].map(({ id, label, icon }) => (
            <div key={id} className="relative group">
              <button
                onClick={() => {
                  const element = document.getElementById(id + "-section")
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                    setActiveSection(id)
                  }
                }}
                className={`w-12 h-12 rounded-2xl transition-all duration-300 flex items-center justify-center text-lg font-semibold shadow-lg ${
                  activeSection === id
                    ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white scale-110 shadow-blue-500/50"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:scale-105"
                }`}
              >
                {icon}
              </button>
              <div className="absolute right-14 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-xl">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div id="hero-section" ref={heroRef} className="relative bg-white mt-7">
        <MemoizedHeroSection />
      </div>

      {/* Enhanced Car Services Section */}
      <div
        id="car-section"
        ref={carRef}
        className="relative w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50/30"
      >
        <ServiceIntro 
          title="Premium Car Services" 
          subtitle="Experience luxury transportation with professional drivers, real-time tracking, and premium vehicles for all your travel needs"
          gradient="from-blue-600 to-cyan-600"
          stats={carStats}
        />
        
        <div className="container mx-auto px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column - Enhanced Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced 3D View Container */}
              <motion.div
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl">
                      <Car className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">Our Premium Fleet</h3>
                      <p className="text-gray-600">Luxury vehicles maintained to perfection</p>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-black text-blue-600 text-lg">50+</div>
                      <div className="text-gray-500">Vehicles</div>
                    </div>
                    <div className="text-center">
                      <div className="font-black text-green-600 text-lg">4.9</div>
                      <div className="text-gray-500">Rating</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-blue-200/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                  <CarThreeDView />
                </div>
              </motion.div>

              {/* Enhanced Services Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {carServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group-hover:scale-105 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-black text-gray-900 text-lg mb-2">{service.name}</h4>
                            <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Service Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Service Details */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">{service.time}</span>
                          </div>
                        </div>
                        <Link 
                          href={service.path}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 group-hover:scale-105"
                        >
                          Try It
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Enhanced Gallery and Additional Content */}
            <div className="space-y-8">
              {/* Enhanced Photo Gallery */}
              <motion.div
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-xl">
                      <div className="w-6 h-6 text-blue-600 flex items-center justify-center">
                        📸
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-gray-900">Vehicle Gallery</h3>
                  </div>
                  <div className="text-sm text-gray-500">Premium vehicles</div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-blue-200/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                  <CarPhotoGallery />
                </div>
              </motion.div>

              {/* Quick Action Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <QuickActionCard theme="blue" />
              </motion.div>

              {/* Features */}
              <motion.div
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-black text-gray-900 mb-4">Why Choose Us</h3>
                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, title: "Verified Drivers", desc: "Background-checked professionals" },
                    { icon: Clock, title: "24/7 Service", desc: "Always available when you need" },
                    { icon: Award, title: "Luxury Fleet", desc: "Premium maintained vehicles" },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="p-2 rounded-lg bg-blue-50">
                        <feature.icon className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                        <p className="text-gray-600 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Service Highlights - Full Width and Centered */}
          <motion.div
            className="mt-16 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <ServiceHighlights highlights={carHighlights} theme="blue" />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Cleaning Services Section */}
      <div
        id="cleaning-section"
        ref={cleaningRef}
        className="relative w-full py-20 bg-gradient-to-br from-white to-amber-50/30"
      >
        <ServiceIntro 
          title="Professional Cleaning" 
          subtitle="Transform your space with our eco-friendly cleaning solutions. Professional teams, premium products, and guaranteed satisfaction"
          gradient="from-amber-600 to-orange-600"
          stats={[
            { value: "5K+", label: "Homes Cleaned" },
            { value: "4.8/5", label: "Rating" },
            { value: "98%", label: "Satisfaction" },
            { value: "Eco", label: "Friendly" }
          ]}
        />
        
        <div className="container mx-auto px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced 3D View */}
              <motion.div
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-2xl">
                      <Droplet className="h-7 w-7 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">Our Cleaning Process</h3>
                      <p className="text-gray-600">Eco-friendly products and professional techniques</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-amber-200/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                  <ThreeDView />
                </div>
              </motion.div>

              {/* Enhanced Services Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {cleaningServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-amber-300 hover:shadow-2xl transition-all duration-300 h-full"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-amber-50 rounded-xl">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-gray-900 text-lg mb-2">{service.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{service.time}</span>
                      </div>
                      <Link href={service.path} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2">
                        Explore Now
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <PhotoGallery />
              </motion.div>
              
              <QuickActionCard theme="amber" />
              
              <motion.div
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-black text-gray-900 mb-4">Why Choose Us</h3>
                <div className="space-y-4">
                  {[
                    { icon: Leaf, title: "100% Natural", desc: "Safe for family and pets" },
                    { icon: Recycle, title: "Eco Packaging", desc: "Environmentally friendly" },
                    { icon: ShieldCheck, title: "Proven Results", desc: "Clinically tested effective" },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="p-2 rounded-lg bg-amber-50">
                        <feature.icon className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                        <p className="text-gray-600 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Service Highlights - Full Width and Centered */}
          <motion.div
            className="mt-16 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <ServiceHighlights highlights={cleaningHighlights} theme="amber" />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Grooming Services Section */}
      <div
        id="grooming-section"
        ref={groomingRef}
        className="relative w-full py-20 bg-gradient-to-br from-gray-50 to-indigo-50/30"
      >
        <ServiceIntro 
          title="Expert Grooming" 
          subtitle="Experience professional grooming with expert stylists, premium products, and modern techniques for perfect results"
          gradient="from-indigo-600 to-purple-600"
          stats={[
            { value: "8K+", label: "Happy Clients" },
            { value: "4.9/5", label: "Rating" },
            { value: "Expert", label: "Stylists" },
            { value: "Premium", label: "Products" }
          ]}
        />
        
        <div className="container mx-auto px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced 3D View */}
              <motion.div
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl">
                      <Scissors className="h-7 w-7 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">Our Grooming Studio</h3>
                      <p className="text-gray-600">Premium tools and expert techniques</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-indigo-200/30 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
                  <GroomingThreeDView />
                </div>
              </motion.div>

              {/* Enhanced Services Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {groomingServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 h-full"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-indigo-50 rounded-xl">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-gray-900 text-lg mb-2">{service.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{service.time}</span>
                      </div>
                      <Link href={service.path} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2">
                        Try It
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="space-y-8">
              <motion.div
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <GroomingPhotoGallery />
              </motion.div>
              
              <QuickActionCard theme="indigo" />
              
              <motion.div
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xl"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-black text-gray-900 mb-4">Why Choose Us</h3>
                <div className="space-y-4">
                  {[
                    { icon: Scissors, title: "Precision Cuts", desc: "Expert stylists with latest techniques" },
                    { icon: Shield, title: "Hygienic Tools", desc: "Sterilized equipment for safety" },
                    { icon: Award, title: "Premium Products", desc: "Luxury products for best results" },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="p-2 rounded-lg bg-indigo-50">
                        <feature.icon className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                        <p className="text-gray-600 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Service Highlights - Full Width and Centered */}
          <motion.div
            className="mt-16 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <ServiceHighlights highlights={groomingHighlights} theme="indigo" />
          </motion.div>
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
      <div
        id="testimonials-section"
        ref={testimonialsRef}
        className="py-20 bg-gradient-to-br from-white to-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their service needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.initials}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer
        id="footer-section"
        ref={footerRef}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500 rounded-full translate-x-20 translate-y-20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">EliteServices</h3>
                  <p className="text-gray-300 text-sm mt-1">Premium Services, Exceptional Experience</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Your trusted partner for premium transportation, eco-friendly cleaning, and professional grooming services. Experience excellence with every service.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-sm font-semibold">{social[0]}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            {[
              {
                title: "Our Services",
                links: [
                  { name: "Taxi Services", href: "/bike-taxi" },
                  { name: "Cleaning Services", href: "/cleaning-details" },
                  { name: "Grooming Services", href: "/grooming-details" },
                  { name: "All Services", href: "/services" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" },
                  { name: "Careers", href: "/careers" },
                  { name: "Blog", href: "/blog" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "FAQ", href: "/faq" },
                ],
              },
            ].map((column, index) => (
              <div key={column.title}>
                <h4 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium flex items-center gap-2 group"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-cyan-400 transition-colors"></div>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="font-bold text-lg mb-2 text-white">Stay Updated</h4>
                <p className="text-gray-300 text-sm">Get the latest offers and service updates</p>
              </div>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm mb-4 md:mb-0">&copy; 2024 EliteServices. All rights reserved. Premium services for modern living.</p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}