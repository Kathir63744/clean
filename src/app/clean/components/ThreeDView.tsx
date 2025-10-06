"use client"

import type React from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Sparkles, Leaf, Droplet, Zap, ShieldCheck, Clock, Users } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"

const ThreeDView: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const features = [
    { icon: <Leaf className="w-4 h-4" />, text: "100% Natural" },
    { icon: <Droplet className="w-4 h-4" />, text: "Non-Toxic" },
    { icon: <Zap className="w-4 h-4" />, text: "Fast Acting" },
    { icon: <ShieldCheck className="w-4 h-4" />, text: "Proven Results" }
  ]

  const stats = [
    { value: "30 min", label: "Setup" },
    { value: "4.8/5", label: "Rating" },
    { value: "Eco", label: "Friendly" }
  ]

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center relative">
      <motion.div
        className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, scale: 1 }
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Enhanced Main image */}
        <motion.div 
          className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-amber-200/50 shadow-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src="/clean1.jpg" 
            alt="Cleaning Service" 
            className="w-full h-full object-cover"
            width={800}
            height={600}
            priority
          />

          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 via-amber-800/40 to-transparent" />

          {/* Top badge - enhanced */}
          <motion.div 
            className="absolute top-6 left-6 flex items-center bg-white/95 backdrop-blur-lg px-4 py-2 rounded-2xl border border-amber-200/50 shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={controls}
            variants={{
              visible: { y: 0, opacity: 1 }
            }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-amber-600 mr-2" />
            <span className="font-bold text-amber-700 text-sm">Eco-Friendly Formula</span>
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
              <div key={i} className="text-center bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-amber-200/30 shadow-sm">
                <div className="text-xs font-bold text-amber-600">{stat.value}</div>
                <div className="text-[10px] text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Features floating badges - enhanced */}
          <div className="absolute top-20 right-6 flex flex-col space-y-2">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-center bg-white/90 backdrop-blur-lg px-3 py-2 rounded-xl border border-amber-200/30 shadow-lg"
                initial={{ x: 30, opacity: 0 }}
                animate={controls}
                variants={{
                  visible: { x: 0, opacity: 1 }
                }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="text-amber-600 mr-2">
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
                    <Leaf className="w-6 h-6 mr-3 text-amber-600" />
                    Premium Cleaning Service
                  </h3>
                  <p className="text-white text-sm mb-4">Plant-based formula that's safe for your family, pets, and the environment</p>
                  
                  {/* Quick booking CTA */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors shadow-lg"
                    >
                      Book Cleaning
                    </motion.button>
                    <div className="flex items-center gap-2 text-gray-100 text-sm">
                      <Users className="w-4 h-4" />
                      <span>Expert Team</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive floating elements */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-300/30"
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
            className="absolute top-1/2 right-1/3 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-amber-300/20"
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

export default ThreeDView