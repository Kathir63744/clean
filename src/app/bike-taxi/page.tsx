"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, MapPin, Star, Check, Zap, Shield, Bike } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import NavBar from "../clean/components/NavBar"
import ThemedBannerSlider from "../clean/components/ThemeBannerSlider"
import BikeServiceTab from "../clean/components/BikeServiceTab"

const BikeTaxi = () => {
  const [activeTab, setActiveTab] = useState("city")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const bikeServices = {
    city: {
      title: "City Rides",
      description: "Fast and efficient bike taxi service for navigating through city traffic.",
      features: [
        { text: "Quick pickups within 5 minutes", icon: Zap },
        { text: "Affordable city fares", icon: "₹" },
        { text: "Experienced riders", icon: Bike },
        { text: "Real-time tracking", icon: MapPin },
      ],
      images: [
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      ],
      stats: [
        { value: "2M+", label: "Rides Completed" },
        { value: "98%", label: "On Time" },
        { value: "4.9", label: "Rating" },
      ],
    },
    express: {
      title: "Express Delivery",
      description: "Rapid delivery service using our bike taxi network for packages and documents.",
      features: [
        { text: "Same-hour delivery", icon: Clock },
        { text: "Package tracking", icon: MapPin },
        { text: "Secure handling", icon: Shield },
        { text: "Insurance options", icon: Check },
      ],
      images: ["https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80"],
      stats: [
        { value: "500K+", label: "Deliveries" },
        { value: "99%", label: "Success Rate" },
        { value: "30min", label: "Avg. Time" },
      ],
    },
  }

  const bannerSlides = [
    {
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Fast & Reliable Bike Taxi",
      subtitle: "Beat the traffic with our quick services",
      cta: "Book Now",
    },
  ]

  const activeService = bikeServices[activeTab as keyof typeof bikeServices]
  const tabs = [
    { key: "city", label: "City Rides", icon: MapPin },
    { key: "express", label: "Express Delivery", icon: Clock },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-x-hidden">
      <NavBar />
      
      {/* Hero Banner */}
      <div className="pt-16">
        <ThemedBannerSlider slides={bannerSlides} theme="teal" />
      </div>

      {/* Main Content */}
      <motion.div
        className="px-4 py-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              Bike Taxi Services
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Fast, affordable, and reliable transportation powered by cutting-edge technology and professional riders
          </motion.p>
        </motion.div>

        {/* Service Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {tabs.map(({ key, label, icon }) => (
            <BikeServiceTab
              key={key}
              icon={icon}
              label={label}
              isActive={activeTab === key}
              onClick={() => setActiveTab(key)}
              theme="teal"
            />
          ))}
        </motion.div>

        {/* Service Highlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Service Images */}
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 z-10" />
                <Image
                  src={activeService.images[0]}
                  alt={activeService.title}
                  className="w-full h-full object-cover object-center"
                  width={800}
                  height={600}
                  priority
                />
              </div>

              {/* Service Content */}
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-100 mb-4"
                  variants={fadeIn}
                >
                  {activeService.title}
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-300 mb-6 leading-relaxed"
                  variants={fadeIn}
                >
                  {activeService.description}
                </motion.p>

                {/* Features List */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" variants={containerVariants}>
                  {activeService.features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-teal-400/30 transition-colors"
                        variants={itemVariants}
                        whileHover={{ y: -2 }}
                      >
                        {typeof Icon === 'string' ? (
                          <span className="text-teal-400 font-bold text-lg">{Icon}</span>
                        ) : (
                          <Icon className="text-teal-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-gray-200">{feature.text}</span>
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="flex flex-wrap gap-6 justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {activeService.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-teal-400">{stat.value}</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Testimonials Section */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Trusted by Thousands of Riders
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Don&apos;t just take our word for it. Here&apos;s what our community has to say.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                service: "Daily Commuter",
                quote: "Saves me at least 30 minutes each way compared to cabs. The riders are professional and the app is super easy to use.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                service: "Express Delivery User",
                quote: "I use their express service weekly for document deliveries. Lightning fast and reliable - never had a single issue!",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                rating: 5,
              },
              {
                name: "Amit Singh",
                service: "Weekend Rider",
                quote: "Perfect for avoiding traffic jams on weekends. Affordable prices and the riders know all the shortcuts in the city.",
                avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-teal-400/20 hover:border-teal-400/50 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(20, 184, 166, 0.2)" }}
              >
                <div className="flex items-start mb-4 gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">{testimonial.name}</h3>
                    <p className="text-teal-400 text-sm">{testimonial.service}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">&quot;{testimonial.quote}&quot;</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-teal-900/50 to-emerald-900/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-teal-400/20">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-100 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to Ride With Us?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Download our app now and get your first ride at 50% off!
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium px-8 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105">
                Download App
              </button>
              <button className="bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400/10 font-medium px-8 py-3 rounded-lg transition-all">
                Book Now
              </button>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}

export default BikeTaxi