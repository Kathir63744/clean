"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface ServiceSlideProps {
  slide: {
    id: number
    title: string
    subtitle: string
    description: string
    color: string
    textColor: string
    buttonColor: string
    image: string
  }
  isActive: boolean
}

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
  { value: "100%", label: "Satisfaction" },
]

export default function ServiceSlide({ slide, isActive }: ServiceSlideProps) {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, x: 100 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full"
      aria-hidden={!isActive}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Content Column */}
        <div className="order-2 lg:order-1">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 bg-gradient-to-r ${slide.color} bg-opacity-20 backdrop-blur-sm`}
          >
            <span className="text-white font-medium">Premium Services</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {slide.title}
            <span className={`block ${slide.textColor}`}>{slide.subtitle}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg text-gray-200 mb-8 max-w-xl"
          >
            {slide.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/services"
              className={`${slide.buttonColor} px-8 py-3 rounded-full font-medium text-white transition-all transform hover:scale-105 hover:shadow-lg`}
              aria-label={`Explore ${slide.title} services`}
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-medium text-white hover:bg-white/10 transition-all transform hover:scale-105"
              aria-label="Contact us"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="grid grid-cols-3 gap-4 mt-12"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="order-1 lg:order-2 relative"
        >
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-2xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-30 mix-blend-overlay z-10`} />
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`${slide.title} service`}
              fill
              className="object-cover object-center"
              priority={isActive}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md z-20"
            animate={isActive ? {
              y: [0, -15, 0],
              rotate: [0, 5, 0],
            } : {}}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md z-20"
            animate={isActive ? {
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            } : {}}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}