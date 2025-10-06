"use client"

import { useState, useRef, useEffect, memo } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Star,
  Sparkles,
  ArrowRight,
  Car,
  Droplet,
  Scissors,
  Award,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Users,
  MapPin,
  Phone,
  Calendar,
  Crown,
  Gem,
  ThumbsUp,
} from "lucide-react"
import NavBar from "../clean/components/NavBar"

// Memoized NavBar Component
const MemoizedNavBar = memo(({ activeSection }: { activeSection: string }) => (
  <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200/50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            EliteServices
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Services', 'About', 'Contact'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`font-semibold transition-all duration-300 ${
                activeSection === item.toLowerCase() 
                  ? 'text-blue-600 scale-105' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          Book Now
        </button>
      </div>
    </div>
  </nav>
))

const ServiceCard = ({ 
  service, 
  theme = "blue",
  index 
}: { 
  service: any
  theme?: "blue" | "amber" | "indigo"
  index: number
}) => {
  const themeColors = {
    blue: { 
      gradient: "from-blue-500 to-cyan-500",
      light: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200"
    },
    amber: { 
      gradient: "from-amber-500 to-orange-500",
      light: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200"
    },
    indigo: { 
      gradient: "from-indigo-500 to-purple-500",
      light: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-200"
    }
  }

  const colors = themeColors[theme]

  return (
    <motion.div
      className="bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${colors.light} group-hover:scale-110 transition-transform duration-300`}>
            {service.icon}
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">{service.name}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${colors.gradient} text-white font-bold text-lg`}>
          {service.price}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Service Features
        </h4>
        <div className="flex flex-wrap gap-2">
          {service.features.map((feature: string, idx: number) => (
            <span key={idx} className={`px-3 py-1 ${colors.light} ${colors.text} rounded-full text-sm font-medium`}>
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{service.popularity}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <Link 
            href={service.path}
            className={`bg-gradient-to-r ${colors.gradient} hover:shadow-lg text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 group-hover:scale-105`}
          >
            Book Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const ServiceCategory = ({ 
  title, 
  subtitle, 
  services, 
  theme = "blue",
  stats 
}: { 
  title: string
  subtitle: string
  services: any[]
  theme?: "blue" | "amber" | "indigo"
  stats?: { value: string; label: string }[]
}) => {
  const themeColors = {
    blue: { 
      gradient: "from-blue-600 to-cyan-600",
      light: "bg-blue-50",
      border: "border-blue-200"
    },
    amber: { 
      gradient: "from-amber-600 to-orange-600",
      light: "bg-amber-50",
      border: "border-amber-200"
    },
    indigo: { 
      gradient: "from-indigo-600 to-purple-600",
      light: "bg-indigo-50",
      border: "border-indigo-200"
    }
  }

  const colors = themeColors[theme]

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Stats */}
        {stats && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg">
                <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              theme={theme}
              index={index}
            />
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          className="mt-12 bg-white rounded-3xl p-8 border border-gray-200 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Quality Guarantee", desc: "100% satisfaction or we make it right" },
              { icon: Clock, title: "On Time Service", desc: "We value your time with prompt arrivals" },
              { icon: Award, title: "Expert Professionals", desc: "Verified and trained service providers" },
            ].map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const QuickBooking = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-cyan-600">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Crown className="w-16 h-16 mx-auto mb-6 text-amber-300" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Book Your Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the EliteServices difference. Premium quality, expert professionals, and exceptional customer service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              Book Service Now
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              Call: +1 (555) 123-ELITE
            </motion.button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-blue-100">
            {["Instant Confirmation", "24/7 Support", "Secure Payment", "Easy Rescheduling"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-300" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState("services")
  const [isLoading, setIsLoading] = useState(true)

  // Service data matching the homepage
  const carServices = [
    {
      id: 1,
      name: "Airport Transfer",
      description: "Reliable pickup and drop-off services with flight tracking",
      price: "₹899",
      time: "30-45 min",
      popularity: "Most Popular",
      features: ["Flight Tracking", "Meet & Greet", "Luggage Help", "Professional Driver"],
      path: "/services/airport-transfer",
      icon: <Car className="h-8 w-8 text-blue-500" />
    },
    {
      id: 2,
      name: "City Tours",
      description: "Explore the city with our expert guided tours",
      price: "₹1,499",
      time: "4-8 hours",
      popularity: "Highly Rated",
      features: ["Expert Guide", "Flexible Routes", "Photo Stops", "Custom Itinerary"],
      path: "/services/city-tours",
      icon: <MapPin className="h-8 w-8 text-blue-500" />
    },
    {
      id: 3,
      name: "Corporate Travel",
      description: "Professional transportation for business meetings",
      price: "₹1,199",
      time: "As needed",
      popularity: "Business Choice",
      features: ["WiFi Enabled", "Charging Ports", "Professional", "Punctual"],
      path: "/services/corporate-travel",
      icon: <Users className="h-8 w-8 text-blue-500" />
    },
    {
      id: 4,
      name: "Luxury Rides",
      description: "Premium vehicles for special occasions",
      price: "₹2,499+",
      time: "Custom",
      popularity: "Luxury Experience",
      features: ["Luxury Cars", "Chauffeur", "Complimentary", "VIP Service"],
      path: "/services/luxury-rides",
      icon: <Crown className="h-8 w-8 text-blue-500" />
    },
  ]

  const cleaningServices = [
    {
      id: 1,
      name: "Home Cleaning",
      description: "Professional cleaning for all home spaces with eco-friendly products",
      price: "₹499",
      time: "2-3 hours",
      popularity: "Most Booked",
      features: ["Eco-friendly", "Deep Clean", "All Rooms", "Sanitized"],
      path: "/services/home-cleaning",
      icon: <Droplet className="h-8 w-8 text-amber-500" />
    },
    {
      id: 2,
      name: "Office Cleaning",
      description: "Keep your workspace spotless and productive",
      price: "₹799",
      time: "1-2 hours",
      popularity: "Commercial",
      features: ["Commercial Grade", "Daily/Weekly", "Equipment", "Thorough"],
      path: "/services/office-cleaning",
      icon: <Zap className="h-8 w-8 text-amber-500" />
    },
    {
      id: 3,
      name: "Deep Cleaning",
      description: "Thorough sanitization for a healthier environment",
      price: "₹999",
      time: "3-4 hours",
      popularity: "Intensive",
      features: ["Sanitization", "Deep Clean", "All Areas", "Germ Protection"],
      path: "/services/deep-cleaning",
      icon: <Shield className="h-8 w-8 text-amber-500" />
    },
    {
      id: 4,
      name: "Eco-Friendly Cleaning",
      description: "Sustainable solutions that protect your family and the planet",
      price: "₹699",
      time: "2-3 hours",
      popularity: "Eco Choice",
      features: ["100% Natural", "Non-toxic", "Eco-friendly", "Safe"],
      path: "/services/eco-cleaning",
      icon: <Sparkles className="h-8 w-8 text-amber-500" />
    },
  ]

  const groomingServices = [
    {
      id: 1,
      name: "Pet Grooming",
      description: "Professional care for your furry companions with premium products",
      price: "₹599",
      time: "1-2 hours",
      popularity: "Pet Lovers",
      features: ["Professional", "Gentle", "Premium", "Loving Care"],
      path: "/services/pet-grooming",
      icon: <Award className="h-8 w-8 text-indigo-500" />
    },
    {
      id: 2,
      name: "Hair Styling",
      description: "Expert cuts and styles for a fresh look with modern techniques",
      price: "₹299",
      time: "45 min",
      popularity: "Trending",
      features: ["Expert Stylists", "Modern Styles", "Consultation", "Precision"],
      path: "/services/hair-styling",
      icon: <Sparkles className="h-8 w-8 text-indigo-500" />
    },
    {
      id: 3,
      name: "Nail Care",
      description: "Manicures and pedicures for healthy, beautiful nails",
      price: "₹399",
      time: "1 hour",
      popularity: "Pampering",
      features: ["Professional", "Hygienic", "Luxury", "Relaxing"],
      path: "/services/nail-care",
      icon: <Clock className="h-8 w-8 text-indigo-500" />
    },
    {
      id: 4,
      name: "Spa Services",
      description: "Relaxing treatments for total rejuvenation and wellness",
      price: "₹899",
      time: "1.5 hours",
      popularity: "Luxury",
      features: ["Relaxing", "Professional", "Luxury", "Rejuvenating"],
      path: "/services/spa-services",
      icon: <Shield className="h-8 w-8 text-indigo-500" />
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <NavBar/>
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-white to-blue-50/30">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-black text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Services</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Premium services designed for modern living. Experience excellence with our 
            professional car services, eco-friendly cleaning, and expert grooming solutions.
          </motion.p>
        </div>
      </div>

      {/* Car Services */}
      <ServiceCategory
        title="Premium Car Services"
        subtitle="Luxury transportation with professional drivers, real-time tracking, and premium vehicles for all your travel needs"
        services={carServices}
        theme="blue"
        stats={[
          { value: "10K+", label: "Happy Riders" },
          { value: "4.9/5", label: "Customer Rating" },
          { value: "5 min", label: "Avg. Arrival" },
          { value: "50+", label: "Cities" }
        ]}
      />

      {/* Cleaning Services */}
      <ServiceCategory
        title="Professional Cleaning"
        subtitle="Transform your space with our eco-friendly cleaning solutions. Professional teams, premium products, and guaranteed satisfaction"
        services={cleaningServices}
        theme="amber"
        stats={[
          { value: "5K+", label: "Homes Cleaned" },
          { value: "4.8/5", label: "Rating" },
          { value: "98%", label: "Satisfaction" },
          { value: "Eco", label: "Friendly" }
        ]}
      />

      {/* Grooming Services */}
      <ServiceCategory
        title="Expert Grooming"
        subtitle="Experience professional grooming with expert stylists, premium products, and modern techniques for perfect results"
        services={groomingServices}
        theme="indigo"
        stats={[
          { value: "8K+", label: "Happy Clients" },
          { value: "4.9/5", label: "Rating" },
          { value: "Expert", label: "Stylists" },
          { value: "Premium", label: "Products" }
        ]}
      />

      <QuickBooking />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black">EliteServices</span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium Services, Exceptional Experience
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}