"use client"
import React from "react"
import { motion } from "framer-motion"

export interface BikeServiceHighlightProps {
  title: string
  description: string
  features: string[]
  images: string[]
  theme: "amber" | "blue" | string
}

const BikeServiceHighlight: React.FC<BikeServiceHighlightProps> = ({
  title,
  description,
  features,
  images,
  theme
}) => {
  const colorMap: Record<string, string> = {
    amber: "text-amber-800",
    blue: "text-blue-800"
  }

  const themeText = colorMap[theme] || "text-gray-800"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Image Section */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            className="rounded-xl overflow-hidden shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
          >
            <img src={src} alt={`Service ${idx + 1}`} className="w-full h-48 object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Text Content */}
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${themeText}`}>{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="leading-relaxed">{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BikeServiceHighlight
