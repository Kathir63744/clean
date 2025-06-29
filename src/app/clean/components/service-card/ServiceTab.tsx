"use client"

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ServiceTabProps {
  icon: LucideIcon
  label: string
  isActive: boolean
  onClick: () => void
  theme: 'amber' | 'dark-amber' | 'indigo'
}

export default function ServiceTab({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  theme
}: ServiceTabProps) {
  
  const themeVariants = {
    amber: {
      active: {
        backgroundColor: "rgba(251, 191, 36, 0.2)",
        borderColor: "rgb(251, 191, 36)",
        color: "rgb(146, 64, 14)",
        scale: 1.05,
      },
      inactive: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgb(229, 231, 235)",
        color: "rgb(107, 114, 128)",
        scale: 1,
      },
    },
    "dark-amber": {
      active: {
        backgroundColor: "rgba(180, 83, 9, 0.3)",
        borderColor: "rgb(217, 119, 6)",
        color: "rgb(254, 243, 199)",
        scale: 1.05,
      },
      inactive: {
        backgroundColor: "rgba(68, 64, 60, 0.5)",
        borderColor: "rgb(120, 113, 108)",
        color: "rgb(214, 211, 209)",
        scale: 1,
      },
    },
    indigo: {
      active: {
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "rgb(79, 70, 229)",
        color: "rgb(55, 48, 163)",
        scale: 1.05,
      },
      inactive: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgb(229, 231, 235)",
        color: "rgb(107, 114, 128)",
        scale: 1,
      },
    }
  }

  const tabVariants = themeVariants[theme] || themeVariants["dark-amber"]

  return (
    <motion.button
      onClick={onClick}
      className="flex items-center px-6 py-3 rounded-full border-2 shadow-sm backdrop-blur-sm"
      variants={tabVariants}
      initial={isActive ? "active" : "inactive"}
      animate={isActive ? "active" : "inactive"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }}
    >
      <Icon className="mr-2 h-5 w-5" />
      <span>{label}</span>
    </motion.button>
  )
}