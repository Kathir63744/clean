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
} from "lucide-react"
import Link from "next/link"
import Slider from "./clean/components/Slider"
import SectionTransition from "./clean/components/SectionTransition"
import Image from "next/image"

// Memoized components for better performance
const MemoizedNavBar = memo(NavBar)
const MemoizedSlider = memo(Slider)
const MemoizedHeroSection = memo(HeroSection)

// Service Intro Component
const ServiceIntro = ({ title, subtitle, gradient }: { title: string; subtitle: string; gradient: string }) => (
  <div className="py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden border-b border-gray-200">
    <div className="absolute inset-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gray-300/50 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <motion.h2
        className={`text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-xl text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  </div>
)

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(true)
  const [scrollDirection, setScrollDirection] = useState("down")
  const [lastScrollY, setLastScrollY] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const carRef = useRef<HTMLDivElement>(null)
  const cleaningRef = useRef<HTMLDivElement>(null)
  const groomingRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const { scrollY, scrollYProgress } = useScroll()
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 })

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    if (currentScrollY > lastScrollY) {
      setScrollDirection("down")
    } else {
      setScrollDirection("up")
    }
    setLastScrollY(currentScrollY)

  }, [lastScrollY])

  useEffect(() => {
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [handleScroll])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleLoadingComplete()
    }, 1500)
    return () => clearTimeout(timer)
  }, [handleLoadingComplete])

  // Service data
  const carServices = [
    {
      id: 1,
      name: "Airport Transfer",
      description: "Reliable pickup and drop-off services",
      image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg",
      path: "/services/airport-transfer",
      icon: <Navigation className="h-10 w-10 text-blue-500" />,
    },
    {
      id: 2,
      name: "City Tours",
      description: "Explore the city with our guided tours",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      path: "/services/city-tours",
      icon: <MapPin className="h-10 w-10 text-blue-500" />,
    },
    {
      id: 3,
      name: "Corporate Travel",
      description: "Professional transportation for business",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
      path: "/services/corporate-travel",
      icon: <Users className="h-10 w-10 text-blue-500" />,
    },
    {
      id: 4,
      name: "Luxury Rides",
      description: "Premium vehicles for special occasions",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      path: "/services/luxury-rides",
      icon: <Award className="h-10 w-10 text-blue-500" />,
    },
  ]

  const cleaningServices = [
    {
      id: 1,
      name: "Home Cleaning",
      description: "Professional cleaning for all home spaces",
      image: "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg",
      path: "/services/home-cleaning",
      icon: <CheckCircle className="h-10 w-10 text-amber-500" />,
    },
    {
      id: 2,
      name: "Office Cleaning",
      description: "Keep your workspace spotless and productive",
      image: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg",
      path: "/services/office-cleaning",
      icon: <Zap className="h-10 w-10 text-amber-500" />,
    },
    {
      id: 3,
      name: "Deep Cleaning",
      description: "Thorough sanitization for a healthier environment",
      image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
      path: "/services/deep-cleaning",
      icon: <Shield className="h-10 w-10 text-amber-500" />,
    },
    {
      id: 4,
      name: "Eco-Friendly Cleaning",
      description: "Sustainable solutions that protect your family and the planet",
      image: "https://images.pexels.com/photos/5217912/pexels-photo-5217912.jpeg",
      path: "/services/eco-cleaning",
      icon: <Droplet className="h-10 w-10 text-amber-500" />,
    },
  ]

  const groomingServices = [
    {
      id: 1,
      name: "Pet Grooming",
      description: "Professional care for your furry companions",
      image: "https://images.pexels.com/photos/6568956/pexels-photo-6568956.jpeg",
      path: "/services/pet-grooming",
      icon: <Award className="h-10 w-10 text-indigo-500" />,
    },
    {
      id: 2,
      name: "Hair Styling",
      description: "Expert cuts and styles for a fresh look",
      image: "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg",
      path: "/services/hair-styling",
      icon: <Sparkles className="h-10 w-10 text-indigo-500" />,
    },
    {
      id: 3,
      name: "Nail Care",
      description: "Manicures and pedicures for healthy, beautiful nails",
      image: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg",
      path: "/services/nail-care",
      icon: <Clock className="h-10 w-10 text-indigo-500" />,
    },
    {
      id: 4,
      name: "Spa Services",
      description: "Relaxing treatments for total rejuvenation",
      image: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg",
      path: "/services/spa-services",
      icon: <Shield className="h-10 w-10 text-indigo-500" />,
    },
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
        {/* Multi-layered spinner */}
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

        {/* Catchy content with staggered animation */}
        <div className="space-y-3">
          <motion.h2
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Various User-Friendly Services With Us
          </motion.h2>
          
          <motion.p
            className="text-sm text-gray-600 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            More than a Service, A Complete Experience
          </motion.p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {["One-Click Booking", "Expert Technicians", "Eco-Friendly", "Time-Saving"].map((item, index) => (
              <motion.span
                key={index}
                className="px-3 py-1.5 bg-white/80 rounded-full text-xs font-medium text-indigo-700 shadow-sm border border-indigo-100"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)" }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
              >
                ✓ {item}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Fun progress indicator */}
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
        
        {/* Friendly tip */}
        <motion.p
          className="text-xs text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Pro tip: Book multiple services together!!!
        </motion.p>
      </motion.div>
    </div>
  )
}
  return (
    <div className="min-h-screen mt-5 bg-white overflow-hidden">
      {/* Fixed navigation */}
      <MemoizedNavBar />

{/* Enhanced Section Indicator */}
<div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
  <div className="flex flex-col items-center space-y-6">
    {[
      { id: "hero", label: "Welcome" },
      { id: "car", label: "Taxi" },
      { id: "cleaning", label: "Clean" },
      { id: "grooming", label: "Groom" },
      { id: "testimonials", label: "Reviews" },
      { id: "footer", label: "Contact" }
    ].map(({ id, label }) => (
      <div key={id} className="relative group">
        <button
          onClick={() => {
            const element = document.getElementById(id + "-section")
            if (element) {
              element.scrollIntoView({ behavior: "smooth" })
              setActiveSection(id)
            }
          }}
          className={`w-4 h-4 rounded-full transition-all duration-300 border-2
            ${activeSection === id
              ? "border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-400 shadow-lg"
              : "border-gray-300 bg-white hover:bg-gray-100 shadow-sm"
            }`}
          aria-label={`Scroll to ${label} section`}
        />



        {/* Active indicator (only visible when active) */}
        {activeSection === id && (
          <motion.div
            className="absolute right-11 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded-lg uppercase
              bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold
              shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-white/20 backdrop-blur-sm"
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {label}
          </motion.div>
        )}
      </div>
    ))}
  </div>
</div>

      {/* Hero Section */}
      <div id="hero-section" ref={heroRef} className="relative">
        <div className="min-h-screen relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/photo-collage.png.png"
              alt="Background"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-gray-100/90"></div>
          </div>
          <div className="relative z-10">
            <MemoizedHeroSection />
          </div>
        </div>
      </div>

      {/* Car Services Section */}
      <div
        id="car-section"
        ref={carRef}
        className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden"
      >
        {/* Animated floating elements background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => {
            const size = Math.random() * 120 + 30
            const duration = Math.random() * 15 + 15
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/30 backdrop-blur-[1px]"
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  width: size,
                  height: size,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            )
          })}
        </div>

        {/* Main content container */}
        <div className="relative z-10 container mx-auto px-4 py-12 h-full flex items-center">
          <motion.div
            className="w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-200/50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Three-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full divide-x divide-blue-100/50">
              {/* Left Column - Content & 3D View */}
              <motion.div
                className="p-8 md:p-10 flex flex-col h-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
              >
                <div className="mb-8">
                  <motion.div
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="p-2 rounded-lg bg-blue-100/50 backdrop-blur-sm border border-blue-200/30">
                      <Car className="h-6 w-6 text-blue-500" />
                    </div>
                    <h1 className="ml-3 text-2xl font-bold text-blue-600">
                      EliteCars
                    </h1>
                  </motion.div>
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Premium <span className="text-blue-500">Car</span> Services
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 text-lg max-w-md"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Professional transportation services with luxury vehicles, experienced drivers, and 24/7
                    availability for all your travel needs.
                  </motion.p>
                </div>

                {/* Enhanced 3D View Container with Image Placeholder */}
                <motion.div
                  className="flex-1 min-h-[300px] rounded-xl overflow-hidden mb-6 border border-blue-200/50 shadow-inner shadow-blue-100/30 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CarThreeDView />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href="/bike-taxi"
                    className="group relative w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium shadow-lg hover:shadow-blue-400/40 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Book Your Ride
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Middle Column - Photo Gallery */}
              <motion.div
                className="h-full flex flex-col relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 via-transparent to-blue-50/10 z-10 pointer-events-none" />
                <div className="h-full w-full p-4">
                  <CarPhotoGallery />
                </div>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div
                className="p-8 md:p-10 bg-blue-50/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
              >
                <motion.h3
                  className="text-2xl font-bold text-gray-800 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Why Choose Us
                </motion.h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
                      title: "Licensed Drivers",
                      description: "Professional, background-verified chauffeurs with years of experience",
                      color: "from-blue-100/50 to-blue-200/50",
                    },
                    {
                      icon: <Car className="w-5 h-5 text-blue-500" />,
                      title: "Luxury Fleet",
                      description: "Premium vehicles maintained to the highest standards",
                      color: "from-cyan-100/50 to-cyan-200/50",
                    },
                    {
                      icon: <Clock className="w-5 h-5 text-blue-500" />,
                      title: "24/7 Service",
                      description: "Round-the-clock availability for all your transportation needs",
                      color: "from-emerald-100/50 to-emerald-200/50",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-blue-200/30 hover:border-blue-300/50 transition-all duration-300 relative overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start relative z-10">
                        <div className="p-2 rounded-lg bg-blue-100/50 mr-3 border border-blue-200/30">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 p-5 rounded-xl bg-gradient-to-br from-blue-100/30 to-transparent border border-blue-200/30"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <h4 className="font-semibold text-gray-800 mb-4">Our Car Services</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {carServices.map((service) => (
                      <motion.div
                        key={service.id}
                        className="p-3 rounded-lg bg-blue-100/30 border border-blue-200/30 hover:border-blue-300/50 transition-all duration-300"
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="mr-3 text-blue-500">{service.icon}</div>
                          <h5 className="font-medium text-gray-800 text-sm">{service.name}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cleaning Services Section */}
      <div
        id="cleaning-section"
        ref={cleaningRef}
        className="relative w-full min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 overflow-hidden"
      >
        {/* Animated floating bubbles background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => {
            const size = Math.random() * 120 + 30
            const duration = Math.random() * 15 + 15
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-amber-200/30 to-yellow-200/30 backdrop-blur-[1px]"
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  width: size,
                  height: size,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            )
          })}
        </div>

        {/* Main content container */}
        <div className="relative z-10 container mx-auto px-4 py-12 h-full flex items-center">
          <motion.div
            className="w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-amber-100/50 border border-amber-200/50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Three-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full divide-x divide-amber-100/50">
              {/* Left Column - Content & 3D View */}
              <motion.div
                className="p-8 md:p-10 flex flex-col h-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
              >
                <div className="mb-8">
                  <motion.div
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="p-2 rounded-lg bg-amber-100/50 backdrop-blur-sm border border-amber-200/30">
                      <Droplet className="h-6 w-6 text-amber-500" />
                    </div>
                    <h1 className="ml-3 text-2xl font-bold text-amber-600">
                      EcoClean
                    </h1>
                  </motion.div>
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Sustainable <span className="text-amber-500">Cleaning</span> Solutions
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 text-lg max-w-md"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Our plant-based formulas deliver sparkling clean without harsh chemicals, protecting both your home
                    and the environment.
                  </motion.p>
                </div>

                {/* Enhanced 3D View Container with Image Placeholder */}
                <motion.div
                  className="flex-1 min-h-[300px] rounded-xl overflow-hidden mb-6 border border-amber-200/50 shadow-inner shadow-amber-100/30 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <ThreeDView />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href="/cleaning-details"
                    className="group relative w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium shadow-lg hover:shadow-amber-400/40 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Explore Our Process
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Middle Column - Photo Gallery */}
              <motion.div
                className="h-full flex flex-col relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-amber-50/10 via-transparent to-amber-50/10 z-10 pointer-events-none" />
                <div className="h-full w-full p-4">
                  <PhotoGallery />
                </div>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div
                className="p-8 md:p-10 bg-amber-50/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
              >
                <motion.h3
                  className="text-2xl font-bold text-gray-800 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Why Choose Us
                </motion.h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Leaf className="w-5 h-5 text-lime-500" />,
                      title: "100% Natural",
                      description: "Plant-derived ingredients that are safe for your family and pets",
                      color: "from-lime-100/50 to-lime-200/50",
                    },
                    {
                      icon: <Recycle className="w-5 h-5 text-lime-500" />,
                      title: "Eco Packaging",
                      description: "Biodegradable containers that reduce plastic waste",
                      color: "from-teal-100/50 to-teal-200/50",
                    },
                    {
                      icon: <ShieldCheck className="w-5 h-5 text-lime-500" />,
                      title: "Proven Results",
                      description: "Clinically tested to be as effective as chemical cleaners",
                      color: "from-emerald-100/50 to-emerald-200/50",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-amber-200/30 hover:border-amber-300/50 transition-all duration-300 relative overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.1)",
                      }}
                    >
                      <div className="flex items-start relative z-10">
                        <div className="p-2 rounded-lg bg-amber-100/50 mr-3 border border-amber-200/30">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 p-5 rounded-xl bg-gradient-to-br from-amber-100/30 to-transparent border border-amber-200/30"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <h4 className="font-semibold text-gray-800 mb-4">Our Cleaning Services</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {cleaningServices.map((service) => (
                      <motion.div
                        key={service.id}
                        className="p-3 rounded-lg bg-amber-100/30 border border-amber-200/30 hover:border-amber-300/50 transition-all duration-300"
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.1)" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="mr-3 text-amber-500">{service.icon}</div>
                          <h5 className="font-medium text-gray-800 text-sm">{service.name}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>        
      </div>

      {/* Grooming Services Section */}
      <div
        id="grooming-section"
        ref={groomingRef}
        className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden"
      >
        {/* Animated floating bubbles background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => {
            const size = Math.random() * 120 + 30
            const duration = Math.random() * 15 + 15
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-indigo-200/30 to-blue-200/30 backdrop-blur-[1px]"
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                  width: size,
                  height: size,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            )
          })}
        </div>

        {/* Main content container */}
        <div className="relative z-10 container mx-auto px-4 py-12 h-full flex items-center">
          <motion.div
            className="w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-200/50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Three-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full divide-x divide-indigo-100/50">
              {/* Left Column - Content & 3D View */}
              <motion.div
                className="p-8 md:p-10 flex flex-col h-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
              >
                <div className="mb-8">
                  <motion.div
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="p-2 rounded-lg bg-indigo-100/50 backdrop-blur-sm border border-indigo-200/30">
                      <Scissors className="h-6 w-6 text-indigo-500" />
                    </div>
                    <h1 className="ml-3 text-2xl font-bold text-indigo-600">
                      EliteGroom
                    </h1>
                  </motion.div>
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Precision <span className="text-indigo-500">Grooming</span> Services
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 text-lg max-w-md"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    Our professional grooming techniques deliver a polished, refined look tailored to your style and
                    preferences.
                  </motion.p>
                </div>
                {/* Enhanced 3D View Container with Image Placeholder */}
                <motion.div
                  className="flex-1 min-h-[300px] rounded-xl overflow-hidden mb-6 border border-indigo-200/50 shadow-inner shadow-indigo-100/30 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                   <GroomingThreeDView />            
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href="/grooming-details"
                    className="group relative w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-indigo-400/40 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Book Appointment
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </motion.div>
              </motion.div>
              {/* Middle Column - Photo Gallery */}
              <motion.div
                className="h-full flex flex-col relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/10 via-transparent to-indigo-50/10 z-10 pointer-events-none" />
                <div className="h-full w-full p-4">
                  <GroomingPhotoGallery />
                </div>
              </motion.div>
              {/* Right Column - Features */}
              <motion.div
                className="p-8 md:p-10 bg-indigo-50/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
              >
                <motion.h3
                  className="text-2xl font-bold text-gray-800 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Why Choose Us
                </motion.h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Scissors className="w-5 h-5 text-indigo-500" />,
                      title: "Precision Cuts",
                      description: "Master barbers trained in the latest techniques for perfect styling",
                      color: "from-indigo-100/50 to-indigo-200/50",
                    },
                    {
                      icon: <Shield className="w-5 h-5 text-indigo-500" />,
                      title: "Hygienic Tools",
                      description: "Sterilized equipment and single-use products for your safety",
                      color: "from-blue-100/50 to-blue-200/50",
                    },
                    {
                      icon: <Award className="w-5 h-5 text-indigo-500" />,
                      title: "Premium Products",
                      description: "Luxury grooming products for lasting results and protection",
                      color: "from-violet-100/50 to-violet-200/50",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-indigo-200/30 hover:border-indigo-300/50 transition-all duration-300 relative overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.1)",
                      }}
                    >
                      <div className="flex items-start relative z-10">
                        <div className="p-2 rounded-lg bg-indigo-100/50 mr-3 border border-indigo-200/30">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 p-5 rounded-xl bg-gradient-to-br from-indigo-100/30 to-transparent border border-indigo-200/30"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <h4 className="font-semibold text-gray-800 mb-4">Our Grooming Services</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {groomingServices.map((service) => (
                      <motion.div
                        key={service.id}
                        className="p-3 rounded-lg bg-indigo-100/30 border border-indigo-200/30 hover:border-indigo-300/50 transition-all duration-300"
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.1)" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="mr-3 text-indigo-500">{service.icon}</div>
                          <h5 className="font-medium text-gray-800 text-sm">{service.name}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        id="testimonials-section"
        ref={testimonialsRef}
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with our services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4 relative z-10">
                  <motion.div
                    className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.initials}
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div className="flex">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.p
                  className="text-gray-600 italic relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {item.text}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-blue-400/30 transition-all duration-300 group"
            >
              <span>Read More Reviews</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer
        id="footer-section"
        ref={footerRef}
        className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-800 relative overflow-hidden border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <motion.div
              className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-gray-200 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 flex items-center justify-center">
                  <Droplet className="h-5 w-5 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-bold text-gray-800">
                  EliteServices
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Premium car services, eco-friendly cleaning, and professional grooming solutions for modern lifestyles.
              </p>
              <div className="flex space-x-4">
                {["facebook", "instagram", "twitter"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-8 w-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center hover:from-cyan-400 hover:to-blue-500 transition-all duration-300">
                      {social === "facebook" && <span className="text-sm font-bold text-white">f</span>}
                      {social === "instagram" && <span className="text-sm font-bold text-white">i</span>}
                      {social === "twitter" && <span className="text-sm font-bold text-white">t</span>}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick links columns */}
            {[
              {
                title: "Services",
                links: [
                  { name: "Car Services", href: "/car-services" },
                  { name: "Cleaning Services", href: "/cleaning-services" },
                  { name: "Grooming Services", href: "/grooming-services" },
                  { name: "Airport Transfer", href: "/services/airport-transfer" },
                  { name: "Deep Cleaning", href: "/services/deep-cleaning" },
                ],
                icon: <CheckCircle className="h-5 w-5" />,
                gradient: "from-blue-300 to-cyan-400",
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Our Team", href: "/team" },
                  { name: "Blog", href: "/blog" },
                  { name: "Careers", href: "/careers" },
                  { name: "Contact", href: "/contact" },
                ],
                icon: <Star className="h-5 w-5" />,
                gradient: "from-amber-300 to-orange-400",
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Booking Guide", href: "/booking-guide" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "FAQ", href: "/faq" },
                ],
                icon: <ShieldCheck className="h-5 w-5" />,
                gradient: "from-indigo-300 to-blue-400",
              },
            ].map((column, colIndex) => (
              <motion.div
                key={column.title}
                className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-gray-200 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.1 + colIndex * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`h-8 w-8 rounded-full bg-gradient-to-br ${column.gradient} flex items-center justify-center text-white`}
                  >
                    {column.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-bold text-gray-800">{column.title}</h3>
                </div>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: 0.3 + linkIndex * 0.05 + colIndex * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center group"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-400 mr-2 group-hover:bg-gray-600 transition-colors duration-300"></div>
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter subscription */}
          <motion.div
            className="mt-12 backdrop-blur-lg bg-white/50 rounded-2xl p-6 border border-gray-200 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Stay Updated</h3>
                <p className="text-gray-600">Subscribe to our newsletter for exclusive offers and service updates.</p>
              </div>
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 EliteServices. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-500 hover:text-gray-800 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}