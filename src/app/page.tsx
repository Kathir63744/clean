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
  <div className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    <div className="absolute inset-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
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
        className="text-xl text-gray-300 max-w-2xl mx-auto"
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

    const sections = [
      { ref: heroRef, id: "hero" },
      { ref: carRef, id: "car" },
      { ref: cleaningRef, id: "cleaning" },
      { ref: groomingRef, id: "grooming" },
      { ref: testimonialsRef, id: "testimonials" },
      { ref: footerRef, id: "footer" },
    ]

    for (const section of sections) {
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
          setActiveSection(section.id)
          break
        }
      }
    }
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
      icon: <Navigation className="h-10 w-10 text-teal-500" />,
    },
    {
      id: 2,
      name: "City Tours",
      description: "Explore the city with our guided tours",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      path: "/services/city-tours",
      icon: <MapPin className="h-10 w-10 text-teal-500" />,
    },
    {
      id: 3,
      name: "Corporate Travel",
      description: "Professional transportation for business",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
      path: "/services/corporate-travel",
      icon: <Users className="h-10 w-10 text-teal-500" />,
    },
    {
      id: 4,
      name: "Luxury Rides",
      description: "Premium vehicles for special occasions",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      path: "/services/luxury-rides",
      icon: <Award className="h-10 w-10 text-teal-500" />,
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
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-950 to-gray-900 flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{
              rotate: 360,
              transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 rounded-full border-4 border-t-indigo-500 border-r-amber-500 border-b-cyan-500 border-l-lime-500 border-t-4 animate-spin"></div>
          </motion.div>
          <motion.h2
            className="text-2xl font-bold text-white"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Get Better Experience in Car Services, Cleaning & Grooming
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Fixed navigation */}
      <MemoizedNavBar />
  

      {/* Section indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col items-center space-y-4">
          {["hero", "car", "cleaning", "grooming", "testimonials", "footer"].map((section) => (
            <motion.div
              key={section}
              className="relative"
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: activeSection === section ? 1 : 0.6,
                scale: activeSection === section ? 1.3 : 1,
              }}
              whileHover={{
                opacity: 0.9,
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <button
                onClick={() => {
                  const element = document.getElementById(section + "-section")
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className={`w-3 h-3 rounded-full ${
                  activeSection === section ? "bg-gradient-to-r from-indigo-600 to-cyan-400" : "bg-gray-500"
                } transition-all duration-300`}
                aria-label={`Scroll to ${section} section`}
              />
              {activeSection === section && (
                <motion.span
                  className="absolute -left-28 top-0 whitespace-nowrap text-sm font-semibold bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    textShadow: "0 0 8px rgba(99, 102, 241, 0.3)",
                  }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 0.3,
                  }}
                  style={{
                    color: "hsl(243.5, 82.6%, 62.9%)",
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.span>
              )}
            </motion.div>
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
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 to-gray-900/80"></div>
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
        className="relative w-full min-h-screen bg-gradient-to-br from-teal-900 to-cyan-900 overflow-hidden"
      >
        {/* Animated floating elements background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => {
            const size = Math.random() * 120 + 30
            const duration = Math.random() * 15 + 15
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-teal-500/10 to-cyan-400/10 backdrop-blur-[1px]"
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
            className="w-full bg-gradient-to-br from-teal-800/20 via-cyan-900/40 to-teal-600/20 backdrop-blur-lg rounded-3xl shadow-2xl shadow-teal-900/30 border border-teal-300/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Three-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full divide-x divide-teal-300/10">
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
                    <div className="p-2 rounded-lg bg-teal-500/20 backdrop-blur-sm border border-teal-300/10">
                      <Car className="h-6 w-6 text-teal-200" />
                    </div>
                    <h1 className="ml-3 text-2xl font-bold text-teal-100 bg-gradient-to-r from-teal-100 to-teal-200 bg-clip-text">
                      EliteCars
                    </h1>
                  </motion.div>
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-50 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Premium <span className="text-teal-300">Car</span> Services
                  </motion.h2>
                  <motion.p
                    className="text-teal-100/80 text-lg max-w-md"
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
                  className="flex-1 min-h-[300px] rounded-xl overflow-hidden mb-6 border border-teal-300/20 shadow-inner shadow-teal-900/30 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CarThreeDView />
                  {/* Image Placeholder Overlay */}
                
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href="/bike-taxi"
                    className="group relative w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium shadow-lg hover:shadow-teal-500/40 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Book Your Ride
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 via-transparent to-teal-900/10 z-10 pointer-events-none" />
                <div className="h-full w-full p-4">
                  <CarPhotoGallery />
                </div>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div
                className="p-8 md:p-10 bg-teal-900/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
              >
                <motion.h3
                  className="text-2xl font-bold text-teal-100 mb-8 bg-gradient-to-r from-teal-100 to-teal-200 bg-clip-text"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Why Choose Us
                </motion.h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: <ShieldCheck className="w-5 h-5 text-teal-300" />,
                      title: "Licensed Drivers",
                      description: "Professional, background-verified chauffeurs with years of experience",
                      color: "from-teal-600/10 to-teal-700/20",
                    },
                    {
                      icon: <Car className="w-5 h-5 text-teal-300" />,
                      title: "Luxury Fleet",
                      description: "Premium vehicles maintained to the highest standards",
                      color: "from-cyan-600/10 to-cyan-700/20",
                    },
                    {
                      icon: <Clock className="w-5 h-5 text-teal-300" />,
                      title: "24/7 Service",
                      description: "Round-the-clock availability for all your transportation needs",
                      color: "from-emerald-600/10 to-emerald-700/20",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-teal-300/10 hover:border-teal-300/30 transition-all duration-300 relative overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.1)",
                      }}
                    >
                      <div className="flex items-start relative z-10">
                        <div className="p-2 rounded-lg bg-teal-700/30 mr-3 border border-teal-300/10">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-teal-100">{feature.title}</h4>
                          <p className="text-sm text-teal-100/70 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 p-5 rounded-xl bg-gradient-to-br from-teal-800/30 to-transparent border border-teal-300/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <h4 className="font-semibold text-teal-100 mb-4">Our Car Services</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {carServices.map((service) => (
                      <motion.div
                        key={service.id}
                        className="p-3 rounded-lg bg-teal-800/30 border border-teal-300/10 hover:border-teal-300/30 transition-all duration-300"
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(20, 184, 166, 0.1)" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="mr-3 text-teal-300">{service.icon}</div>
                          <h5 className="font-medium text-teal-100 text-sm">{service.name}</h5>
                        </div>
                        <p className="text-xs text-teal-100/70">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <SectionTransition fromColor="#0f766e" toColor="#7c2d12" pattern="wave" />
      </div>

      {/* Service Intro - Cleaning Services */}
    

      {/* Cleaning Services Section */}
      <div
        id="cleaning-section"
        ref={cleaningRef}
        className="relative w-full min-h-screen bg-gradient-to-br from-amber-900 to-yellow-700 overflow-hidden"
      >
        {/* Animated floating bubbles background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => {
            const size = Math.random() * 120 + 30
            const duration = Math.random() * 15 + 15
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-400/10 backdrop-blur-[1px]"
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
            className="w-full bg-gradient-to-br from-amber-800/20 via-amber-900/40 to-yellow-600/20 backdrop-blur-lg rounded-3xl shadow-2xl shadow-amber-900/30 border border-amber-300/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Three-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full divide-x divide-amber-300/10">
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
                    <div className="p-2 rounded-lg bg-amber-500/20 backdrop-blur-sm border border-amber-300/10">
                      <Droplet className="h-6 w-6 text-amber-200" />
                    </div>
                    <h1 className="ml-3 text-2xl font-bold text-amber-100 bg-gradient-to-r from-amber-100 to-amber-200 bg-clip-text">
                      EcoClean
                    </h1>
                  </motion.div>
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-50 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Sustainable <span className="text-amber-300">Cleaning</span> Solutions
                  </motion.h2>
                  <motion.p
                    className="text-amber-100/80 text-lg max-w-md"
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
                  className="flex-1 min-h-[300px] rounded-xl overflow-hidden mb-6 border border-amber-300/20 shadow-inner shadow-amber-900/30 relative"
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
                    className="group relative w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-medium shadow-lg hover:shadow-amber-500/40 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Explore Our Process
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-amber-900/10 z-10 pointer-events-none" />
                <div className="h-full w-full p-4">
                  <PhotoGallery />
                </div>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div
                className="p-8 md:p-10 bg-amber-900/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
              >
                <motion.h3
                  className="text-2xl font-bold text-amber-100 mb-8 bg-gradient-to-r from-amber-100 to-amber-200 bg-clip-text"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Why Choose Us
                </motion.h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Leaf className="w-5 h-5 text-lime-300" />,
                      title: "100% Natural",
                      description: "Plant-derived ingredients that are safe for your family and pets",
                      color: "from-lime-600/10 to-lime-700/20",
                    },
                    {
                      icon: <Recycle className="w-5 h-5 text-lime-300" />,
                      title: "Eco Packaging",
                      description: "Biodegradable containers that reduce plastic waste",
                      color: "from-teal-600/10 to-teal-700/20",
                    },
                    {
                      icon: <ShieldCheck className="w-5 h-5 text-lime-300" />,
                      title: "Proven Results",
                      description: "Clinically tested to be as effective as chemical cleaners",
                      color: "from-emerald-600/10 to-emerald-700/20",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-amber-300/10 hover:border-amber-300/30 transition-all duration-300 relative overflow-hidden`}
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
                        <div className="p-2 rounded-lg bg-amber-700/30 mr-3 border border-amber-300/10">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-100">{feature.title}</h4>
                          <p className="text-sm text-amber-100/70 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 p-5 rounded-xl bg-gradient-to-br from-amber-800/30 to-transparent border border-amber-300/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <h4 className="font-semibold text-amber-100 mb-4">Our Cleaning Services</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {cleaningServices.map((service) => (
                      <motion.div
                        key={service.id}
                        className="p-3 rounded-lg bg-amber-800/30 border border-amber-300/10 hover:border-amber-300/30 transition-all duration-300"
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.1)" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="mr-3 text-amber-300">{service.icon}</div>
                          <h5 className="font-medium text-amber-100 text-sm">{service.name}</h5>
                        </div>
                        <p className="text-xs text-amber-100/70">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <SectionTransition fromColor="#7c2d12" toColor="#1e3a8a" pattern="wave" />
      </div>

    

      {/* Grooming Services Section */}
      <div
        id="grooming-section"
        ref={groomingRef}
        className="relative w-full min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden"
      >
        {/* Animated floating bubbles background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => {
            const size = Math.random() * 120 + 30
            const duration = Math.random() * 15 + 15
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-400/10 backdrop-blur-[1px]"
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
            className="w-full bg-gradient-to-br from-blue-800/20 via-indigo-900/40 to-indigo-600/20 backdrop-blur-lg rounded-3xl shadow-2xl shadow-indigo-900/30 border border-blue-300/20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Three-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full divide-x divide-blue-300/10">
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
                    <div className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm border border-blue-300/10">
                      <Scissors className="h-6 w-6 text-blue-200" />
                    </div>
                    <h1 className="ml-3 text-2xl font-bold text-blue-100 bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text">
                      EliteGroom
                    </h1>
                  </motion.div>
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-50 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Precision <span className="text-blue-300">Grooming</span> Services
                  </motion.h2>
                  <motion.p
                    className="text-blue-100/80 text-lg max-w-md"
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
                  className="flex-1 min-h-[300px] rounded-xl overflow-hidden mb-6 border border-blue-300/20 shadow-inner shadow-blue-900/30 relative"
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
                    className="group relative w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Book Appointment
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-indigo-900/10 z-10 pointer-events-none" />
                <div className="h-full w-full p-4">
                  <GroomingPhotoGallery />
                </div>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div
                className="p-8 md:p-10 bg-indigo-900/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
              >
                <motion.h3
                  className="text-2xl font-bold text-blue-100 mb-8 bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Why Choose Us
                </motion.h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Scissors className="w-5 h-5 text-blue-300" />,
                      title: "Precision Cuts",
                      description: "Master barbers trained in the latest techniques for perfect styling",
                      color: "from-blue-600/10 to-blue-700/20",
                    },
                    {
                      icon: <Shield className="w-5 h-5 text-blue-300" />,
                      title: "Hygienic Tools",
                      description: "Sterilized equipment and single-use products for your safety",
                      color: "from-indigo-600/10 to-indigo-700/20",
                    },
                    {
                      icon: <Award className="w-5 h-5 text-blue-300" />,
                      title: "Premium Products",
                      description: "Luxury grooming products for lasting results and protection",
                      color: "from-violet-600/10 to-violet-700/20",
                    },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-blue-300/10 hover:border-blue-300/30 transition-all duration-300 relative overflow-hidden`}
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
                        <div className="p-2 rounded-lg bg-blue-700/30 mr-3 border border-blue-300/10">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-100">{feature.title}</h4>
                          <p className="text-sm text-blue-100/70 mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8 p-5 rounded-xl bg-gradient-to-br from-blue-800/30 to-transparent border border-blue-300/10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <h4 className="font-semibold text-blue-100 mb-4">Our Grooming Services</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {groomingServices.map((service) => (
                      <motion.div
                        key={service.id}
                        className="p-3 rounded-lg bg-blue-800/30 border border-blue-300/10 hover:border-blue-300/30 transition-all duration-300"
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1)" }}
                      >
                        <div className="flex items-center mb-2">
                          <div className="mr-3 text-blue-300">{service.icon}</div>
                          <h5 className="font-medium text-blue-100 text-sm">{service.name}</h5>
                        </div>
                        <p className="text-xs text-blue-100/70">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <SectionTransition fromColor="#1e3a8a" toColor="#f3f4f6" pattern="wave" />
      </div>

      {/* Testimonials Section */}
      <div
        id="testimonials-section"
        ref={testimonialsRef}
        className="py-20 bg-gradient-to-b from-gray-100 to-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with our services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4 relative z-10">
                  <motion.div
                    className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.initials}
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
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
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300 group"
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
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <motion.div
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Droplet className="h-5 w-5 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">
                  EliteServices
                </h3>
              </div>
              <p className="text-gray-300 mb-6">
                Premium car services, eco-friendly cleaning, and professional grooming solutions for modern lifestyles.
              </p>
              <div className="flex space-x-4">
                {["facebook", "instagram", "twitter"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-8 w-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                      {social === "facebook" && <span className="text-sm font-bold">f</span>}
                      {social === "instagram" && <span className="text-sm font-bold">i</span>}
                      {social === "twitter" && <span className="text-sm font-bold">t</span>}
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
                gradient: "from-teal-400 to-cyan-600",
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
                gradient: "from-amber-400 to-orange-600",
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
                gradient: "from-blue-400 to-indigo-600",
              },
            ].map((column, colIndex) => (
              <motion.div
                key={column.title}
                className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl"
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
                  <h3 className="ml-3 text-lg font-bold">{column.title}</h3>
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
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mr-2 group-hover:bg-white transition-colors duration-300"></div>
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
            className="mt-12 backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-gray-300">Subscribe to our newsletter for exclusive offers and service updates.</p>
              </div>
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 EliteServices. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
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
