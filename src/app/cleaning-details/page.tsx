"use client"

import { useState, useEffect } from "react"
import { motion, Variants, Transition } from "framer-motion"
import { ArrowLeft, Droplet, Home, Hospital, Car, Building2, Sparkles, Shield, Leaf, CalendarCheck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import NavBar from "../clean/components/NavBar"
import BannerSlider from "../clean/components/banner-slider/BannerSlider"
import ServiceTab from "../clean/components/service-card/ServiceTab"
import ServiceHighlight from "../clean/components/ServiceHighlight"

interface CleaningService {
  title: string
  description: string
  features: string[]
  images: string[]
  icon: React.ReactNode
}

const cleaningServices: Record<string, CleaningService> = {
  house: {
    title: "House Cleaning",
    description: "Professional cleaning services for your home, ensuring every corner shines with cleanliness and freshness.",
    features: [
      "Deep cleaning of all rooms",
      "Dusting and vacuuming",
      "Bathroom sanitization",
      "Kitchen deep cleaning",
      "Window cleaning",
      "Floor mopping and polishing",
    ],
    images: [
      "/house 2.jpeg",
      "/house-service.1.jpeg",
      "/house-service.3.jpeg",
    ],
    icon: <Home className="w-8 h-8 text-amber-400" />,
  },
  kitchen: {
    title: "Kitchen Cleaning",
    description: "Specialized cleaning for the heart of your home, focusing on hygiene and eliminating grease and grime.",
    features: [
      "Appliance cleaning (inside and out)",
      "Cabinet degreasing",
      "Countertop sanitization",
      "Sink and faucet polishing",
      "Floor deep cleaning",
      "Trash area disinfection",
    ],
    images: [
      "/Kitchen-Cleaning-Services 2.jpg",
      "/Kitchen-Cleaning-Services. 2jpg.jpg",
      "/Kitchen-Cleaning-Services.jpg",
    ],
    icon: <Droplet className="w-8 h-8 text-amber-400" />,
  },
  hospital: {
    title: "Hospital & Medical Cleaning",
    description: "Medical-grade cleaning and sanitization services for healthcare facilities, prioritizing patient safety.",
    features: [
      "Medical-grade disinfection",
      "Pathogen elimination",
      "Operating room sterilization",
      "Patient room sanitization",
      "Biohazard waste management",
      "Air purification",
    ],
    images: [
      "/hospital.jpg",
      "/hospital 1.jpg",
      "/hospital 2.jpg",
    ],
    icon: <Hospital className="w-8 h-8 text-amber-400" />,
  },
  car: {
    title: "Car Cleaning",
    description: "Comprehensive auto detailing services that restore your vehicle's appearance inside and out.",
    features: [
      "Exterior washing and waxing",
      "Interior vacuuming",
      "Upholstery cleaning",
      "Dashboard and console detailing",
      "Window and mirror cleaning",
      "Tire and rim cleaning",
    ],
    images: [
      "/car.jpg",
      "/car.jpg",
      "/car 1.jpg",
    ],
    icon: <Car className="w-8 h-8 text-amber-400" />,
  },
  apartment: {
    title: "Apartment Cleaning",
    description: "Tailored cleaning solutions for apartments of all sizes, making your living space spotless and comfortable.",
    features: [
      "Full apartment sanitization",
      "Move-in/move-out cleaning",
      "Small space optimization",
      "Balcony and patio cleaning",
      "Common area maintenance",
      "Air vent cleaning",
    ],
    images: [
      "/house 2.jpeg",
      "/hospital.jpg",
      "/house-service.1.jpeg",
    ],
    icon: <Building2 className="w-8 h-8 text-amber-400" />,
  },
}

const bannerSlides = [
  {
    image: "https://images.pexels.com/photos/4108270/pexels-photo-4108270.jpeg",
    title: "Professional Cleaning Services",
    subtitle: "We make every space shine with our expert cleaning solutions",
    overlay: "bg-amber-900/70",
  },
  {
    image: "https://images.pexels.com/photos/4107297/pexels-photo-4107297.jpeg",
    title: "Custom Cleaning Plans",
    subtitle: "Tailored services to meet your specific needs and requirements",
    overlay: "bg-amber-800/70",
  },
  {
    image: "https://images.pexels.com/photos/4107288/pexels-photo-4107288.jpeg",
    title: "Eco-Friendly Products",
    subtitle: "Safe for your family and the environment",
    overlay: "bg-amber-700/70",
  },
]

const benefits = [
  {
    title: "Premium Quality",
    description: "We use only the highest quality products and equipment",
    icon: <Sparkles className="w-6 h-6 text-amber-400" />,
  },
  {
    title: "Safety First",
    description: "All our staff are fully trained and insured",
    icon: <Shield className="w-6 h-6 text-amber-400" />,
  },
  {
    title: "Eco-Friendly",
    description: "Environmentally safe cleaning products available",
    icon: <Leaf className="w-6 h-6 text-amber-400" />,
  },
  {
    title: "Flexible Scheduling",
    description: "Available when you need us, including weekends",
    icon: <CalendarCheck className="w-6 h-6 text-amber-400" />,
  },
]

const testimonials = [
  {
    name: "Sarah Thompson",
    service: "House Cleaning",
    quote: "The attention to detail was amazing. My home has never looked so clean!",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    name: "Michael Johnson",
    service: "Car Detailing",
    quote: "My car looks brand new again. The team was professional and thorough.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
  {
    name: "Emma Rodriguez",
    service: "Kitchen Deep Clean",
    quote: "I was amazed at how they got my kitchen spotless. Worth every penny!",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
  },
]

const tabs = [
  { key: "house", label: "House", icon: Home },
  { key: "kitchen", label: "Kitchen", icon: Droplet },
  { key: "hospital", label: "Hospital", icon: Hospital },
  { key: "car", label: "Car", icon: Car },
  { key: "apartment", label: "Apartment", icon: Building2 },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: springTransition,
  },
}

export default function CleaningDetails() {
  const [activeTab, setActiveTab] = useState("house")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const activeService = cleaningServices[activeTab]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 overflow-x-hidden">
      <NavBar />
      
      <div className="pt-20">
        <BannerSlider slides={bannerSlides} theme="amber" />
      </div>
      
      <motion.div
        className="px-4 sm:px-6 py-12 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="inline-flex items-center text-amber-300 hover:text-amber-100 mb-10 transition-colors duration-200 font-medium group"
            aria-label="Back to home"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-amber-50 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Our <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">Cleaning Services</span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg text-amber-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Discover our comprehensive range of professional cleaning services tailored to your specific needs.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          variants={itemVariants}
        >
          {tabs.map(({ key, label, icon: Icon }) => (
            <ServiceTab
            key={key}
            icon={Icon} 
            label={label}
            isActive={activeTab === key}
            onClick={() => setActiveTab(key)}
            theme="dark-amber"
            />
            ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <ServiceHighlight
            service={activeService}
            theme="dark-amber"
          />
        </motion.div>

        <motion.div className="mt-24" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-50 text-center mb-12">
            Why Choose Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-amber-900/50 p-6 rounded-xl shadow-lg border border-amber-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="w-12 h-12 rounded-full bg-amber-800/50 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-amber-100 mb-2">{benefit.title}</h3>
                <p className="text-amber-200">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-24" variants={itemVariants}>
          <div className="bg-gradient-to-r from-amber-800 to-amber-700 rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-700/50">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-50 text-center mb-12">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-amber-900/50 p-6 rounded-2xl shadow-lg border border-amber-800/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 ring-2 ring-amber-500">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-100 text-lg">{testimonial.name}</h3>
                      <p className="text-amber-300 text-sm">{testimonial.service}</p>
                    </div>
                  </div>
                  <p className="text-amber-100 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-amber-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-24 text-center"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-50 mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto mb-8">
            Book your cleaning service today and enjoy a spotless space tomorrow!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Book now"
            >
              Book Now
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-amber-900/50 text-amber-100 font-bold rounded-full shadow-lg hover:shadow-xl border border-amber-700 transition-all hover:scale-105 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact us"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}