'use client'
import { motion, useAnimation, useInView } from "framer-motion"
import { Car, Zap, Award, ShieldCheck, Sparkles, Clock, Users } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"

export default function CarThreeDView() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const features = [
    { icon: <Car className="w-4 h-4" />, text: "Luxury Fleet" },
    { icon: <Zap className="w-4 h-4" />, text: "Fast Arrival" },
    { icon: <Award className="w-4 h-4" />, text: "Top Rated" },
    { icon: <ShieldCheck className="w-4 h-4" />, text: "Safe Rides" }
  ]

  const stats = [
    { value: "5 min", label: "Avg. Arrival" },
    { value: "4.9/5", label: "Rating" },
    { value: "24/7", label: "Service" }
  ]

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative">
      <motion.div
        className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, scale: 1 }
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Main image with enhanced styling */}
        <motion.div
          className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-blue-200/50 shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/ca77.png"
            alt="Premium Taxi Service"
            fill
            className="object-cover"
            quality={85}
            priority={false}
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent" />
          
          {/* Top badge - enhanced */}
          <motion.div
            className="absolute top-6 left-6 flex items-center bg-white/95 backdrop-blur-lg px-4 py-2 rounded-2xl border border-blue-200/50 shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { y: 0, opacity: 1 }
            }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-bold text-blue-700 text-sm">Premium Taxi</span>
          </motion.div>
          
          {/* Stats bar */}
          <motion.div
            className="absolute top-6 right-6 flex gap-3"
            initial={{ x: 30, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { x: 0, opacity: 1 }
            }}
            transition={{ delay: 0.3 }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-blue-200/30 shadow-sm">
                <div className="text-xs font-bold text-blue-600">{stat.value}</div>
                <div className="text-[10px] text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          
          {/* Features floating badges - enhanced */}
          <div className="absolute top-20 right-6 flex flex-col space-y-2">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-center bg-white/90 backdrop-blur-lg px-3 py-2 rounded-xl border border-blue-200/30 shadow-lg"
                initial={{ x: 30, opacity: 0 }}
                animate={controls}
                variants={{
                  visible: { x: 0, opacity: 1 }
                }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="text-blue-600 mr-2">
                  {feature.icon}
                </div>
                <span className="text-gray-800 text-xs font-semibold">{feature.text}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Bottom info card */}
          <motion.div
            className="absolute bottom-6 left-6 right-6"
            initial={{ y: 20, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { y: 0, opacity: 1 }
            }}
            transition={{ delay: 0.5 }}
          >
            <div className=" shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-black text-gray-100 flex items-center mb-2">
                    <Car className="w-6 h-6 mr-3 text-blue-600" />
                    Luxury Taxi Service
                  </h3>
                  <p className="text-gray-100 text-sm mb-4">Professional drivers with premium vehicles and real-time tracking</p>
                  
                  {/* Quick booking CTA */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg"
                    >
                      Book Now
                    </motion.button>
                    <div className="flex items-center gap-2 text-gray-100 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>5 min arrival</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Interactive floating elements */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-blue-400/20 backdrop-blur-sm border border-blue-300/30"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-blue-300/20"
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}