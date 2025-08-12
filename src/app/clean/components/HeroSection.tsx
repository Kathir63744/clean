'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkle, ChevronLeft, ChevronRight } from 'lucide-react'

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
}

interface VideoSlide {
  id: number
  title: string
  description: string
  videoUrl: string
  poster: string
  category: ServiceCategory
}

interface CategoryConfig {
  name: string
  buttonColor: string
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
  }
  colors: {
    badge: Record<BadgeColor, string>
    serviceCard: Record<ServiceCategory, string>
  }
}

// ===== CONFIGURATION =====
const heroConfig: HeroConfig = {
  header: {
    badge: {
      icon: <Sparkle className="w-4 h-4" />,
      text: "Trusted Home Services",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
      textColor: "text-cyan-700 dark:text-cyan-300"
    },
    title: "Home services at your",
    titleHighlight: "doorstep",
    highlightColor: "text-cyan-600",
    description: "Professional services delivered to your home. Book trusted experts for cleaning, beauty, repairs, and more."
  },
  categories: {
    bike: {
      name: "Bike Services",
      buttonColor: "bg-teal-500 hover:bg-blue-600"
    },
    cleaning: {
      name: "Cleaning",
      buttonColor: "bg-amber-500 hover:bg-green-600"
    },
    grooming: {
      name: "Grooming",
      buttonColor: "bg-blue-500 hover:bg-pink-600"
    },
  },
  services: [
    {
      title: 'Book a Taxi Ride',
      iconSrc: '/car2.png',
      description: 'Fast and affordable rides for daily travel',
      category: 'bike'
    },
    {
      title: 'Become a Star Customer',
      iconSrc: '/car1.png',
      description: 'Join as a customer and start earning today',
      category: 'bike'
    },
    {
      title: 'Home Cleaning',
      iconSrc: '/house-cleaning.png',
      description: 'Deep cleaning for your living space',
      category: 'cleaning'
    },
    {
      title: 'Car Cleaning',
      iconSrc: '/car.png',
      description: 'Professional detailing inside & out',
      category: 'cleaning',
      badge: {
        text: 'Sale',
        color: 'red'
      }
    },
    {
      title: 'Hair Grooming',
      iconSrc: '/wax.png',
      description: 'Professional styling for men & women',
      category: 'grooming',
      badge: {
        text: 'Popular',
        color: 'green'
      }
    },
    {
      title: 'Pet Grooming',
      iconSrc: '/pet.png',
      description: 'Spa treatments for your pets',
      category: 'grooming'
    }
  ],
  videoSlides: [
    {
      id: 1,
      title: 'Premium Grooming Services',
      description: 'Professional stylists at your doorstep',
      videoUrl: '/groom.mp4',
      poster: '/home-salon-service.png',
      category: 'grooming'
    },
    {
      id: 2,
      title: 'Deep Cleaning Solutions',
      description: 'Spotless results every time',
      videoUrl: '/clea.mp4',
      poster: '/cleaning-poster.jpg',
      category: 'cleaning'
    },
    {
      id: 3,
      title: 'Best Experiences',
      description: 'Adventure awaits on four wheels',
      videoUrl: '/ride.mp4',
      poster: '/bike-poster.jpg',
      category: 'bike'
    }
  ],
  buttons: {
    explore: "Explore Services",
    contact: "Contact Us"
  },
  colors: {
    badge: {
      red: 'bg-red-500 text-white',
      green: 'bg-green-500 text-white',
      blue: 'bg-blue-500 text-white',
      yellow: 'bg-yellow-500 text-white',
      purple: 'bg-purple-500 text-white'
    },
    serviceCard: {
      grooming: 'bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-150',
      cleaning: 'bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-150',
      bike: 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-150'
    }
  }
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
      }, 300)
    }, 8000)

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
    }, 300)
    
    // Resume auto-play after 8 seconds
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
    <section className="w-full mt-5 min-h-screen bg-white dark:bg-gray-900 flex flex-col lg:flex-row">
      {/* Left Content - Services */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:py-20">
        <div className="max-w-lg">
          {/* Premium Badge */}
          <div className={`flex items-center gap-2 ${heroConfig.header.badge.bgColor} ${heroConfig.header.badge.textColor} px-4 py-2 rounded-full w-max mb-8`}>
            {heroConfig.header.badge.icon}
            <span className="font-medium text-sm">{heroConfig.header.badge.text}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            {heroConfig.header.title}{' '}
            <span className={heroConfig.header.highlightColor}>{heroConfig.header.titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
            {heroConfig.header.description}
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All Services
            </button>
            {(Object.keys(heroConfig.categories) as ServiceCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? heroConfig.categories[category].buttonColor + ' text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {heroConfig.categories[category].name}
              </button>
            ))}
          </div>

          {/* Service Categories */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              What are you looking for?
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {filteredServices.map((service, idx) => (
                <div
                  key={idx}
                  onClick={() => handleServiceClick(service)}
                  className="relative group cursor-pointer transition-all duration-200"
                >
                  <div className={`${heroConfig.colors.serviceCard[service.category]} dark:bg-gray-800 dark:hover:bg-gray-700 rounded-xl p-4 h-full transition-all duration-300 group-hover:shadow-lg border border-gray-100 dark:border-gray-700`}>
                    {service.badge && (
                      <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${heroConfig.colors.badge[service.badge.color]}`}>
                        {service.badge.text}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                        <img 
                          src={service.iconSrc || "/placeholder.svg"} 
                          alt={service.title} 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=24&width=24&text=" + service.title.charAt(0)
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {service.title}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons - Both Visible */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push('/services')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-8 rounded-full font-semibold transition-all duration-200 hover:shadow-lg"
            >
              {heroConfig.buttons.explore}
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="border-2 border-cyan-600 hover:bg-cyan-600 text-cyan-600 hover:text-white py-3 px-8 rounded-full font-semibold transition-all duration-200 hover:shadow-lg"
            >
              {heroConfig.buttons.contact}
            </button>
          </div>
        </div>
      </div>

      {/* Right Content - Video Slider */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="relative w-full max-w-lg">
          {/* Video Container */}
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-black">
            {/* Video with Fade Effect */}
            <div className={`relative w-full h-full transition-opacity duration-300 ${fadeClass || 'opacity-100'}`}>
              <video
                ref={videoRef}
                key={currentSlideData.id}
                className="w-full h-full object-cover"
                poster={currentSlideData.poster}
                playsInline
                loop
                muted
                autoPlay
              >
                <source src={currentSlideData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {heroConfig.categories[currentSlideData.category].name}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {currentSlideData.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {currentSlideData.description}
                </p>
              </div>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={() => navigateSlide('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => navigateSlide('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Indicators - Outside Container */}
          <div className="flex justify-center gap-2 mt-6">
            {heroConfig.videoSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => navigateSlide(idx)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  idx === currentSlide 
                    ? 'bg-cyan-600 w-8' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2'
                }`}
              />
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-100 dark:bg-cyan-900/30 rounded-full -z-10" />
          <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full -z-10" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection