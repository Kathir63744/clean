"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ServiceHighlightProps {
  service: {
    title: string
    description: string
    features: string[]
    images: string[]
    icon?: React.ReactNode
  }
  theme: string
}

const colors = {
  amber: {
    title: "text-amber-50",
    description: "text-amber-200",
    feature: "text-amber-300",
    bg: "bg-amber-900/50",
    border: "border-amber-700",
    iconBg: "bg-amber-800/50",
    check: "text-amber-400",
  },
  "dark-amber": {
    title: "text-amber-50",
    description: "text-amber-200",
    feature: "text-amber-300",
    bg: "bg-amber-900/50",
    border: "border-amber-700",
    iconBg: "bg-amber-800/50",
    check: "text-amber-400",
  },
}

export default function ServiceHighlight({ service, theme = "dark-amber" }: ServiceHighlightProps) {
  const themeColors = colors[theme as keyof typeof colors] || colors["dark-amber"]

  return (
    <div className={`p-6 md:p-8 rounded-2xl ${themeColors.bg} border ${themeColors.border} shadow-lg backdrop-blur-sm`}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          {service.icon && (
            <div className={`w-16 h-16 rounded-full ${themeColors.iconBg} flex items-center justify-center mb-6 shadow-md border ${themeColors.border}`}>
              {service.icon}
            </div>
          )}
          <motion.h2
            className={`${themeColors.title} text-3xl md:text-4xl font-bold mb-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {service.title}
          </motion.h2>
          <motion.p
            className={`${themeColors.description} mb-6 text-lg`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {service.description}
          </motion.p>
          <ul className="space-y-3">
            {service.features.map((feature, index) => (
              <motion.li
                key={index}
                className={`flex items-start ${themeColors.feature}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <span className={`mr-2 ${themeColors.check}`}>✓</span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {service.images.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden shadow-md border border-amber-800/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Image
                  src={image}
                  alt={`${service.title} example ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority={index === 0} // Only prioritize first image
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}