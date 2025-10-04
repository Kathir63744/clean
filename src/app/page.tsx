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

// Service Intro Component - Made more compact
const ServiceIntro = ({ title, subtitle, gradient }: { title: string; subtitle: string; gradient: string }) => (
  <div className="py-12 bg-white border-b border-gray-100">
    <div className="container mx-auto px-4 text-center">
      <motion.h2
        className={`text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
    </div>
  </div>
)

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

  // Service data - kept all your original data
  const carServices = [
    {
      id: 1,
      name: "Airport Transfer",
      description: "Reliable pickup and drop-off services",
      image: "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg",
      path: "/services/airport-transfer",
      icon: <Navigation className="h-6 w-6 text-blue-500" />,
    },
    {
      id: 2,
      name: "City Tours",
      description: "Explore the city with our guided tours",
      image: "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg",
      path: "/services/city-tours",
      icon: <MapPin className="h-6 w-6 text-blue-500" />,
    },
    {
      id: 3,
      name: "Corporate Travel",
      description: "Professional transportation for business",
      image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
      path: "/services/corporate-travel",
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      id: 4,
      name: "Luxury Rides",
      description: "Premium vehicles for special occasions",
      image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
      path: "/services/luxury-rides",
      icon: <Award className="h-6 w-6 text-blue-500" />,
    },
  ]

  const cleaningServices = [
    {
      id: 1,
      name: "Home Cleaning",
      description: "Professional cleaning for all home spaces",
      image: "https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg",
      path: "/services/home-cleaning",
      icon: <CheckCircle className="h-6 w-6 text-amber-500" />,
    },
    {
      id: 2,
      name: "Office Cleaning",
      description: "Keep your workspace spotless and productive",
      image: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg",
      path: "/services/office-cleaning",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
    },
    {
      id: 3,
      name: "Deep Cleaning",
      description: "Thorough sanitization for a healthier environment",
      image: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
      path: "/services/deep-cleaning",
      icon: <Shield className="h-6 w-6 text-amber-500" />,
    },
    {
      id: 4,
      name: "Eco-Friendly Cleaning",
      description: "Sustainable solutions that protect your family and the planet",
      image: "https://images.pexels.com/photos/5217912/pexels-photo-5217912.jpeg",
      path: "/services/eco-cleaning",
      icon: <Droplet className="h-6 w-6 text-amber-500" />,
    },
  ]

  const groomingServices = [
    {
      id: 1,
      name: "Pet Grooming",
      description: "Professional care for your furry companions",
      image: "https://images.pexels.com/photos/6568956/pexels-photo-6568956.jpeg",
      path: "/services/pet-grooming",
      icon: <Award className="h-6 w-6 text-indigo-500" />,
    },
    {
      id: 2,
      name: "Hair Styling",
      description: "Expert cuts and styles for a fresh look",
      image: "https://images.pexels.com/photos/3993447/pexels-photo-3993447.jpeg",
      path: "/services/hair-styling",
      icon: <Sparkles className="h-6 w-6 text-indigo-500" />,
    },
    {
      id: 3,
      name: "Nail Care",
      description: "Manicures and pedicures for healthy, beautiful nails",
      image: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg",
      path: "/services/nail-care",
      icon: <Clock className="h-6 w-6 text-indigo-500" />,
    },
    {
      id: 4,
      name: "Spa Services",
      description: "Relaxing treatments for total rejuvenation",
      image: "https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg",
      path: "/services/spa-services",
      icon: <Shield className="h-6 w-6 text-indigo-500" />,
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
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Fixed navigation */}
      <MemoizedNavBar />

      {/* Compact Section Indicator */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <div className="flex flex-col items-center space-y-4">
          {[
            { id: "hero", label: "Home" },
            { id: "car", label: "Rides" },
            { id: "cleaning", label: "Clean" },
            { id: "grooming", label: "Groom" },
            { id: "testimonials", label: "Reviews" },
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/30"
                    : "bg-gray-300 hover:bg-gray-400 scale-100"
                }`}
                aria-label={`Scroll to ${label} section`}
              />
              
              {/* Tooltip */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div id="hero-section" ref={heroRef} className="relative bg-white mt-5">
        <MemoizedHeroSection />
      </div>

      {/* Car Services Section - Compact Urban Company Style */}
      <div
        id="car-section"
        ref={carRef}
        className="relative w-full py-16 bg-gray-50"
      >
        <ServiceIntro 
          title="Premium Car Services" 
          subtitle="Reliable transportation with luxury vehicles and professional drivers"
          gradient="from-blue-500 to-cyan-500"
        />
        
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* 3D View */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 mr-3">
                    <Car className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Fleet</h3>
                </div>
                <div className="aspect-video rounded-xl bg-gray-100 overflow-hidden">
                  <CarThreeDView />
                </div>
              </motion.div>

              {/* Services Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {carServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors group cursor-pointer"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <Link 
                          href={service.path}
                          className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium"
                        >
                          Book now <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Gallery and Features */}
            <div className="space-y-8">
              {/* Photo Gallery */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Gallery</h3>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <CarPhotoGallery />
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us</h3>
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
                        <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                        <p className="text-gray-600 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Cleaning Services Section */}
      <div
        id="cleaning-section"
        ref={cleaningRef}
        className="relative w-full py-16 bg-white"
      >
        <ServiceIntro 
          title="Professional Cleaning" 
          subtitle="Eco-friendly cleaning solutions for homes and offices"
          gradient="from-amber-500 to-orange-500"
        />
        
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* 3D View */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-amber-50 mr-3">
                    <Droplet className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Process</h3>
                </div>
                <div className="aspect-video rounded-xl bg-gray-100 overflow-hidden">
                  <ThreeDView />
                </div>
              </motion.div>

              {/* Services Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {cleaningServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-300 transition-colors group cursor-pointer"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-amber-50 group-hover:bg-amber-100 transition-colors">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <Link 
                          href={service.path}
                          className="inline-flex items-center text-amber-500 hover:text-amber-600 text-sm font-medium"
                        >
                          Book now <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Gallery and Features */}
            <div className="space-y-8">
              {/* Photo Gallery */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Gallery</h3>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <PhotoGallery />
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us</h3>
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
                        <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                        <p className="text-gray-600 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Grooming Services Section */}
      <div
        id="grooming-section"
        ref={groomingRef}
        className="relative w-full py-16 bg-gray-50"
      >
        <ServiceIntro 
          title="Expert Grooming" 
          subtitle="Professional grooming services for perfect styling"
          gradient="from-indigo-500 to-purple-500"
        />
        
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* 3D View */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-indigo-50 mr-3">
                    <Scissors className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Studio</h3>
                </div>
                <div className="aspect-video rounded-xl bg-gray-100 overflow-hidden">
                  <GroomingThreeDView />
                </div>
              </motion.div>

              {/* Services Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {groomingServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-300 transition-colors group cursor-pointer"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <Link 
                          href={service.path}
                          className="inline-flex items-center text-indigo-500 hover:text-indigo-600 text-sm font-medium"
                        >
                          Book now <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Column - Gallery and Features */}
            <div className="space-y-8">
              {/* Photo Gallery */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Gallery</h3>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <GroomingPhotoGallery />
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Us</h3>
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
                        <h4 className="font-medium text-gray-900 text-sm">{feature.title}</h4>
                        <p className="text-gray-600 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        id="testimonials-section"
        ref={testimonialsRef}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with our services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-colors"
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
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
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

      {/* Footer */}
      <footer
        id="footer-section"
        ref={footerRef}
        className="bg-gray-900 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">EliteServices</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Premium car services, eco-friendly cleaning, and professional grooming solutions for modern lifestyles.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Instagram", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            {[
              {
                title: "Services",
                links: [
                  { name: "Car Services", href: "/car-services" },
                  { name: "Cleaning Services", href: "/cleaning-services" },
                  { name: "Grooming Services", href: "/grooming-services" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Contact", href: "/contact" },
                  { name: "Careers", href: "/careers" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ],
              },
            ].map((column, index) => (
              <div key={column.title}>
                <h4 className="font-semibold mb-4 text-white">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="text-sm">&copy; 2025 EliteServices. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
