'use client'
import { motion, useAnimation, useInView } from "framer-motion"
import { Car, Zap, Award, ShieldCheck, Sparkles } from "lucide-react"
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

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative">
      <motion.div
        className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, scale: 1 }
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Main image with parallax effect */}
        <motion.div
          className="relative w-full h-full rounded-xl overflow-hidden border border-teal-300/30 shadow-lg"
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
          
          {/* Teal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-teal-800/30 to-transparent" />
          
          {/* Noise texture */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10" />
          
          {/* Top badge - teal version */}
          <motion.div
            className="absolute top-4 left-4 flex items-center bg-teal-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-teal-300/20"
            initial={{ y: -20, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { y: 0, opacity: 1 }
            }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-teal-300 mr-2" />
            <span className="text-white font-medium text-sm">Premium Taxi</span>
          </motion.div>
          
          {/* Features floating badges - teal */}
          <div className="absolute top-16 right-4 flex flex-col space-y-2">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-center bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-teal-300/10"
                initial={{ x: 30, opacity: 0 }}
                animate={controls}
                variants={{
                  visible: { x: 0, opacity: 1 }
                }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="text-teal-300 mr-1.5">
                  {feature.icon}
                </div>
                <span className="text-white text-xs font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom info card - teal */}
          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ y: 20, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { y: 0, opacity: 1 }
            }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-teal-900/60 to-teal-800/40 backdrop-blur-sm p-4 rounded-lg border border-teal-300/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium flex items-center text-lg">
                    <Car className="w-5 h-5 mr-2 text-teal-300" />
                    Elite Taxi Service
                  </h3>
                  <p className="text-white/80 text-sm mt-1">Professional transportation with luxury vehicles</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-600 hover:bg-teal-500 text-white rounded-lg p-2 cursor-pointer transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Interactive floating elements - teal */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-teal-400/20 backdrop-blur-sm border border-teal-300/30"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-teal-300/20"
            animate={{
              y: [0, 10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}