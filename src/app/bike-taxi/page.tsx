"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ArrowLeft, Clock, MapPin, Star, Check, Zap, Shield, Car, Luggage, Wifi, UserCheck, Phone, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import NavBar from "../clean/components/NavBar"
import ThemedBannerSlider from "../clean/components/ThemeBannerSlider"
import TaxiServiceTab from "../clean/components/BikeServiceTab"

const TaxiService = () => {
  const [activeTab, setActiveTab] = useState("premium")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const taxiServices = {
    premium: {
      title: "Premium Taxi Service",
      description: "Luxury rides with executive vehicles and professional chauffeurs for business or special occasions.",
      features: [
        { text: "Mercedes E-Class & BMW 5 Series", icon: Car },
        { text: "Complimentary WiFi & Water", icon: Wifi },
        { text: "Meet & Greet Service", icon: UserCheck },
        { text: "Flight Tracking", icon: Clock },
        { text: "Child Seats Available", icon: Shield },
        { text: "Multiple Payment Options", icon: CreditCard }
      ],
      images: [
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
        "https://images.unsplash.com/photo-1555212697-194d092e3b8f"
      ],
      stats: [
        { value: "4.9★", label: "Customer Rating" },
        { value: "99.7%", label: "On Time" },
        { value: "2000+", label: "Premium Vehicles" }
      ],
      highlights: [
        "Executive class comfort",
        "24/7 availability",
        "Corporate accounts"
      ]
    },
    airport: {
      title: "Airport Transfers",
      description: "Hassle-free airport transportation with fixed pricing and flight monitoring.",
      features: [
        { text: "Flight Delay Protection", icon: Clock },
        { text: "60 Min Free Waiting", icon: Check },
        { text: "Extra Luggage Space", icon: Luggage },
        { text: "Meet at Arrivals", icon: MapPin },
        { text: "Flat Rate Pricing", icon: "₹" },
        { text: "24/7 Customer Support", icon: Phone }
      ],
      images: [
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
        "https://images.unsplash.com/photo-1470847355775-e0fe3c35f8a4"
      ],
      stats: [
        { value: "1.2M+", label: "Transfers" },
        { value: "45min", label: "Avg. Wait Time" },
        { value: "4.8★", label: "Rating" }
      ],
      highlights: [
        "Pre-book your transfer",
        "Flight tracking included",
        "Meet & greet service"
      ]
    },
    city: {
      title: "City Taxi",
      description: "Affordable and reliable point-to-point transportation within the city.",
      features: [
        { text: "5 Min Pickup Guarantee", icon: Zap },
        { text: "Live Tracking", icon: MapPin },
        { text: "Cashless Payments", icon: CreditCard },
        { text: "Women Drivers Available", icon: UserCheck },
        { text: "AC Vehicles", icon: Car },
        { text: "24/7 Service", icon: Clock }
      ],
      images: [
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a"
      ],
      stats: [
        { value: "10M+", label: "Rides" },
        { value: "4.7★", label: "Rating" },
        { value: "98%", label: "On Time" }
      ],
      highlights: [
        "Instant bookings",
        "Multiple vehicle options",
        "Share ride option"
      ]
    }
  }

  const bannerSlides = [
    {
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
      title: "Premium Taxi Services",
      subtitle: "Travel in comfort with our professional drivers",
      cta: "Book Now",
      overlay: "bg-blue-900/60"
    },
    {
      image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
      title: "Airport Transfer Specialists",
      subtitle: "Fixed rates with flight tracking",
      cta: "Pre-book Now",
      overlay: "bg-cyan-900/60"
    }
  ]

  const tabs = [
    { key: "premium", label: "Premium", icon: Star },
    { key: "airport", label: "Airport", icon: MapPin },
    { key: "city", label: "City Taxi", icon: Car }
  ]

  const activeService = taxiServices[activeTab as keyof typeof taxiServices]

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 100 
      }
    }
  }

  const featureVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring" as const,
        stiffness: 100
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 overflow-x-hidden">
      <NavBar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
      
      {/* Animated Banner Slider */}
      <div className="pt-16 relative z-10">
        <ThemedBannerSlider slides={bannerSlides} theme="blue" />
      </div>

      {/* Main Content */}
      <motion.div
        className="px-4 py-12 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants}>
          <Link href="/" className="group flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors w-fit">
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
              Premium Taxi Services
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Experience luxury, reliability and convenience with our professional chauffeur services
          </motion.p>
        </motion.div>

        {/* Service Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          variants={containerVariants}
        >
          {tabs.map((tab) => (
            <TaxiServiceTab
              key={tab.key}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              theme="blue"
            />
          ))}
        </motion.div>

        {/* Service Highlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-24"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl shadow-blue-100/50 border border-blue-200/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Image Gallery */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 z-10" />
                  <Image
                    src={activeService.images[0]}
                    alt={activeService.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Floating Badges */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {activeService.highlights.map((highlight, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600/80 text-white backdrop-blur-sm"
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Service Content */}
                <div>
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {activeService.title}
                  </motion.h2>
                  <motion.p
                    className="text-lg text-gray-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {activeService.description}
                  </motion.p>

                  {/* Features Grid */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                    variants={containerVariants}
                  >
                    {activeService.features.map((feature, i) => {
                      const Icon = feature.icon
                      return (
                        <motion.div
                          key={i}
                          custom={i}
                          variants={featureVariants}
                          className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-lg backdrop-blur-sm border border-blue-200/50 hover:border-blue-300/50 transition-all"
                          whileHover={{ y: -3 }}
                        >
                          {typeof Icon === 'string' ? (
                            <span className="text-blue-500 font-bold text-lg">{Icon}</span>
                          ) : (
                            <Icon className="text-blue-500 h-5 w-5 mt-0.5 flex-shrink-0" />
                          )}
                          <span className="text-gray-700">{feature.text}</span>
                        </motion.div>
                      )
                    })}
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    className="flex flex-wrap gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {activeService.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Testimonials */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Trusted by Thousands
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              What our customers say about their experiences
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Business Traveler",
                quote: "The premium service is exceptional. Always on time with clean cars and professional drivers.",
                rating: 5,
                avatar: "/avatars/business-man.jpg"
              },
              {
                name: "Priya Patel",
                role: "Frequent Flyer",
                quote: "Airport transfers are seamless with their flight tracking. Never missed a pickup!",
                rating: 5,
                avatar: "/avatars/woman-traveler.jpg"
              },
              {
                name: "Arjun Kapoor",
                role: "Daily Commuter",
                quote: "Affordable and reliable. The 5-minute pickup guarantee actually works!",
                rating: 4,
                avatar: "/avatars/young-man.jpg"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200/50 hover:border-blue-300/50 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start mb-4 gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-gray-200">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-blue-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex gap-1">
                  {Array(5).fill(0).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-5 h-5 ${j < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
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
          <div className="bg-gradient-to-r from-blue-100/50 to-cyan-100/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-blue-200/50">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready for Your Next Ride?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Download our app now and get 20% off your first premium ride!
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>Download App</span>
              </button>
              <button className="bg-transparent border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium px-8 py-3 rounded-lg transition-all flex items-center gap-2">
                <Car className="w-5 h-5" />
                <span>Book Now</span>
              </button>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}

export default TaxiService