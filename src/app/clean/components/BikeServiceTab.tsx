"use client"
import { FC } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TaxiServiceTabProps {
  icon: React.ElementType
  label: string
  isActive: boolean
  onClick: () => void
  theme?: "blue" | "teal" | "amber" | "indigo"
}

const themeStyles = {
  blue: {
    active: "bg-blue-600 text-white shadow-lg shadow-blue-500/20",
    inactive: "bg-transparent text-blue-400 border-blue-400 hover:bg-blue-500/10",
    activeIcon: "text-white",
    inactiveIcon: "text-blue-400"
  },
  teal: {
    active: "bg-teal-600 text-white shadow-lg shadow-teal-500/20",
    inactive: "bg-transparent text-teal-400 border-teal-400 hover:bg-teal-500/10",
    activeIcon: "text-white",
    inactiveIcon: "text-teal-400"
  },
  indigo: {
    active: "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20",
    inactive: "bg-transparent text-indigo-400 border-indigo-400 hover:bg-indigo-500/10",
    activeIcon: "text-white",
    inactiveIcon: "text-indigo-400"
  },
  amber: {
    active: "bg-amber-500 text-gray-900 shadow-lg shadow-amber-500/20",
    inactive: "bg-transparent text-amber-500 border-amber-500 hover:bg-amber-500/10",
    activeIcon: "text-gray-900",
    inactiveIcon: "text-amber-500"
  }
}

const TaxiServiceTab: FC<TaxiServiceTabProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  theme = "blue"
}) => {
  const styles = themeStyles[theme]

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-200",
        isActive ? styles.active : styles.inactive
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={cn(
        "w-5 h-5 transition-colors",
        isActive ? styles.activeIcon : styles.inactiveIcon
      )} />
      <span className="font-medium">{label}</span>
    </motion.button>
  )
}

export default TaxiServiceTab