'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Sparkle, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Star, 
  Shield,
  Clock,
  Users,
  Award,
  CheckCircle,
  MapPin,
  Calendar,
  Phone,
  MessageCircle
} from 'lucide-react'

// ===== TYPE DEFINITIONS =====
type ServiceCategory = 'grooming' | 'cleaning' | 'bike'
type BadgeColor = 'red' | 'green' | 'blue' | 'yellow' | 'purple'

interface Service {
  title: string
  iconSrc: string
  description: string
  badge?: {
    text: string
    color: BadgeColor
  }
  category: ServiceCategory
  rating?: number
  time?: string
  price?: string
}

interface VideoSlide {
  id: number
  title: string
  description: string
  videoUrl: string
  poster: string
  category: ServiceCategory
  features: string[]
  thumbnail: string // Added this
  images: string[] // Added this - array of image URLs for grid
}

interface CategoryConfig {
  name: string
  buttonColor: string
  icon: React.ReactNode
  stats: string
}

interface HeroConfig {
  header: {
    badge: {
      icon: React.ReactNode
      text: string
      bgColor: string
      textColor: string
    }
    title: string
    titleHighlight: string
    highlightColor: string
    description: string
  }
  categories: Record<ServiceCategory, CategoryConfig>
  services: Service[]
  videoSlides: VideoSlide[]
  buttons: {
    explore: string
    contact: string
    download: string
  }
  colors: {
    badge: Record<BadgeColor, string>
    serviceCard: Record<ServiceCategory, string>
  }
  features: {
    icon: React.ReactNode
    text: string
  }[]
  stats: {
    value: string
    label: string
  }[]
}

// ===== CONFIGURATION =====
const heroConfig: HeroConfig = {
  header: {
    badge: {
      icon: <Sparkle className="w-4 h-4" />,
      text: "⭐ Trusted by 10K+ Customers",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
      textColor: "text-blue-700"
    },
    title: "Experience premium services",
    titleHighlight: "in Taxi,cleaning,grooming",
    highlightColor: "text-blue-600",
    description: "Experience the convenience of professional home services. Book experts for cleaning, grooming, and transportation with guaranteed satisfaction."
  }, 
  categories: {
    bike: {
      name: "Taxi Services",
      buttonColor: "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
      icon: <MapPin className="w-4 h-4" />,
      stats: "5min arrival"
    },
    cleaning: {
      name: "Cleaning",
      buttonColor: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
      icon: <Shield className="w-4 h-4" />,
      stats: "Spotless guarantee"
    },
    grooming: {
      name: "Grooming",
      buttonColor: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      icon: <Award className="w-4 h-4" />,
      stats: "Expert stylists"
    },
  },
  services: [
    {
      title: 'Premium Taxi Rides',
      iconSrc: '/car2.png',
      description: 'Luxury cars with professional drivers',
      category: 'bike',
      rating: 4.9,
      time: '5-10 min',
      price: 'Explore Now',
      badge: {
        text: 'Fast',
        color: 'green'
      }
    },
    {
      title: 'Elite Membership',
      iconSrc: '/membership.png',
      description: 'Exclusive benefits & priority service',
      category: 'bike',
      rating: 4.8,
      price: 'Join Free'
    },
    {
      title: 'Deep Home Cleaning',
      iconSrc: '/housecl.png',
      description: 'Complete home sanitization',
      category: 'cleaning',
      rating: 4.9,
      time: '2-3 hours',
      price: 'Explore Now',
      badge: {
        text: 'Popular',
        color: 'red'
      }
    },
    {
      title: 'Car Detailing',
      iconSrc: '/car-det.png',
      description: 'Premium interior & exterior cleaning',
      category: 'cleaning',
      rating: 4.7,
      time: '1-2 hours',
      price: 'Explore Now'
    },
    {
      title: 'Hair Styling',
      iconSrc: '/wax.png',
      description: 'Professional cuts & styling',
      category: 'grooming',
      rating: 4.9,
      time: '45 min',
      price: 'Explore Now',
      badge: {
        text: 'Trending',
        color: 'purple'
      }
    },
    {
      title: 'Pet Spa & Grooming',
      iconSrc: '/pet.png',
      description: 'Luxury treatments for pets',
      category: 'grooming',
      rating: 4.8,
      time: '1 hour',
      price: 'Explore Now'
    }
  ],
  videoSlides: [
    {
      id: 1,
      title: 'Luxury Grooming Experience',
      description: 'Professional stylists with premium products at your doorstep',
      videoUrl: '/groom.mp4',
      poster: '/man-gr.png',
      category: 'grooming',
      features: ['Expert Stylists', 'Premium Products', 'Home Service'],
      thumbnail: '/gr2.jpg', // Added
      images: [ // Added - multiple images for grid
        '/gr1.jpg',
        '/nail.jpg',
        '/pet.jpg'
      ]
    },
    {
      id: 2,
      title: 'Deep Cleaning Experts',
      description: 'Eco-friendly cleaning with 100% satisfaction guarantee',
      videoUrl: '/clea.mp4',
      poster: '/cleaning-poster.jpg',
      category: 'cleaning',
      features: ['Eco-Friendly', 'Trained Staff', 'Spotless Guarantee'],
      thumbnail: '/Kitchen-Cleaning-Services.jpg',
      images: [ 
        '/house 2.jpeg',
        '/Kitchen-Cleaning-Services. 2jpg.jpg',
        '/Kitchen-Cleaning-Services.jpg'
      ]
    },
    {
      id: 3,
      title: 'Premium Rides',
      description: 'Luxury cars with professional chauffeurs',
      videoUrl: '/taxi.mp4',
      poster: '/bike.png',
      category: 'bike',
      features: ['Luxury Cars', 'Professional Drivers', '24/7 Service'],
      thumbnail: '/c22.jpeg', // Added
      images: [ // Added
        '/c33.jpeg',
        '/c1.png',
        '/c22.jpeg'
      ]
    }
  ],
  buttons: {
    explore: "Explore All Services",
    contact: "Book Now",
    download: "Download App"
  },
  colors: {
    badge: {
      red: 'bg-red-500 text-white shadow-lg shadow-red-500/25',
      green: 'bg-green-500 text-white shadow-lg shadow-green-500/25',
      blue: 'bg-blue-500 text-white shadow-lg shadow-blue-500/25',
      yellow: 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/25',
      purple: 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
    },
    serviceCard: {
      grooming: 'bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200',
      cleaning: 'bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200',
      bike: 'bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-blue-200'
    }
  },
  features: [
    { icon: <Shield className="w-5 h-5" />, text: "Verified Professionals" },
    { icon: <Clock className="w-5 h-5" />, text: "Quick Service" },
    { icon: <Award className="w-5 h-5" />, text: "Quality Guaranteed" },
    { icon: <Users className="w-5 h-5" />, text: "10K+ Happy Customers" }
  ],
  stats: [
    { value: "50K+", label: "Services Done" },
    { value: "4.9/5", label: "Customer Rating" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "15min", label: "Average Response" }
  ]
}

const HeroSection = () => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceCategory>('all')
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [fadeClass, setFadeClass] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-advance slides with fade effect
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setFadeClass('opacity-0')
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroConfig.videoSlides.length)
        setFadeClass('opacity-100')
      }, 500)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Play video when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e))
    }
  }, [currentSlide])

  // Navigation functions with fade effect
  const navigateSlide = (direction: 'next' | 'prev' | number) => {
    setIsAutoPlaying(false)
    setFadeClass('opacity-0')
    
    setTimeout(() => {
      if (typeof direction === 'number') {
        setCurrentSlide(direction)
      } else {
        setCurrentSlide(prev =>
          direction === 'next'
            ? (prev + 1) % heroConfig.videoSlides.length
            : (prev - 1 + heroConfig.videoSlides.length) % heroConfig.videoSlides.length
        )
      }
      setFadeClass('opacity-100')
    }, 500)
    
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  // Filter services by category
  const filteredServices = activeCategory === 'all'
    ? heroConfig.services
    : heroConfig.services.filter(service => service.category === activeCategory)

  const handleServiceClick = (service: Service) => {
    router.push(`/services/${service.category}/${service.title.toLowerCase().replace(/\s+/g, '-')}`)
  }

  const currentSlideData = heroConfig.videoSlides[currentSlide]

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content - Services */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Header Section */}
            <div className="space-y-10 mt-8">

              <div className="space-y-8">
<h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight whitespace-nowrap">
  {heroConfig.header.title}{' '}
  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
    {heroConfig.header.titleHighlight}
  </span>
</h1>

                <p className="text-gray-600 text-lg md:text-xl max-w-lg leading-relaxed">
                  {heroConfig.header.description}
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {heroConfig.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Category Filters */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeCategory === 'all' 
                      ? 'bg-gray-900 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
                  }`}
                >
                  <Sparkle className="w-4 h-4" />
                  All Services
                </button>
                {(Object.keys(heroConfig.categories) as ServiceCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-lg ${
                      activeCategory === category 
                        ? heroConfig.categories[category].buttonColor + ' shadow-xl scale-105'
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`}
                  >
                    {heroConfig.categories[category].icon}
                    {heroConfig.categories[category].name}
                  </button>
                ))}
              </div>

              {/* Category Stats */}
              {activeCategory !== 'all' && (
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 w-fit">
                  <Clock className="w-4 h-4" />
                  {heroConfig.categories[activeCategory].stats}
                </div>
              )}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map((service, idx) => (
                <div
                  key={idx}
                  onClick={() => handleServiceClick(service)}
                  className="group cursor-pointer transition-all duration-300"
                >
                  <div className={`${heroConfig.colors.serviceCard[service.category]} border-2 rounded-2xl p-4 h-full transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-hover:border-blue-300 relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <div className="absolute top-2 right-2 w-8 h-8 bg-current rounded-full"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 bg-current rounded-full"></div>
                    </div>

                    {service.badge && (
                      <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold ${heroConfig.colors.badge[service.badge.color]} z-10`}>
                        {service.badge.text}
                      </div>
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border">
                            <img 
                              src={service.iconSrc || "/placeholder.svg"} 
                              alt={service.title} 
                              className="w-6 h-6 object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-base mb-1 truncate">
                              {service.title}
                            </h4>
                            <p className="text-gray-600 text-sm leading-tight">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          {service.rating && (
                            <div className="flex items-center gap-1 text-amber-600">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="font-semibold">{service.rating}</span>
                            </div>
                          )}
                          {service.time && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{service.time}</span>
                            </div>
                          )}
                        </div>
                        {service.price && (
                          <div className="text-green-600 font-bold">
                            {service.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons & Stats */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/services')}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  {heroConfig.buttons.explore}
                </button>
                <button
                  onClick={() => router.push('/contact')}
                  className="flex-1 border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {heroConfig.buttons.contact}
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
                {heroConfig.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Grid Banner */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-4xl">
              {/* Grid Banner Container */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 aspect-square rounded-3xl overflow-hidden shadow-2xl">
                
                {/* Main Featured Item - Top Left */}
                <div className="relative col-span-1 row-span-2 rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-10" />
                  <img 
                    src={currentSlideData.images[0] || currentSlideData.poster} 
                    alt="Featured"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-white/30">
                      <Play className="w-3 h-3" />
                      Featured
                    </div>
                    <h3 className="text-xl font-bold mb-2">{currentSlideData.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                      {currentSlideData.description}
                    </p>
                  </div>
                </div>

                {/* Top Right Grid Item */}
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                  <img 
                    src={currentSlideData.images[1] || currentSlideData.poster} 
                    alt="Feature 1"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-medium">{currentSlideData.features[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Right Grid Item */}
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                  <img 
                    src={currentSlideData.images[2] || currentSlideData.poster} 
                    alt="Feature 2"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-medium">{currentSlideData.features[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute top-4 right-4 z-30">
                  <button className="flex items-center gap-2 bg-black/50 backdrop-blur-lg hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border border-white/20 hover:scale-105 shadow-lg">
                    <MessageCircle className="w-4 h-4" />
                    Download App
                  </button>
                </div>
              </div>

              {/* Interactive Navigation Grid */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {heroConfig.videoSlides.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigateSlide(idx)}
                    className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-300 ${
                      idx === currentSlide 
                        ? 'ring-2 ring-blue-500 ring-offset-2 scale-105 shadow-lg' 
                        : 'opacity-80 hover:opacity-100 hover:scale-102'
                    }`}
                  >
                    <img 
                      src={slide.thumbnail || slide.poster} 
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${
                      idx === currentSlide ? 'bg-blue-500/20' : 'bg-black/40'
                    }`} />
                    <div className="absolute bottom-1 left-1 right-1">
                      <div className={`h-1 rounded-full ${
                        idx === currentSlide 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                          : 'bg-white/40'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Animated Background Elements */}
              <div className="absolute -z-10 -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -z-10 -bottom-8 -left-8 w-28 h-28 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute -z-10 top-1/2 -left-12 w-16 h-16 bg-orange-400/15 rounded-full blur-xl animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection