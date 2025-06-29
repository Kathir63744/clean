"use client"

import { FC } from "react"
import { cn } from "@/lib/utils"

interface BikeServiceTabProps {
  icon: React.ElementType
  label: string
  isActive: boolean
  onClick: () => void
  theme?: "teal" | "indigo" | "amber" // Extendable for future themes
}

const themeStyles: Record<
  NonNullable<BikeServiceTabProps["theme"]>,
  { active: string; inactive: string }
> = {
  teal: {
    active: "bg-teal-600 text-white border-teal-500",
    inactive: "bg-transparent text-teal-400 border-teal-400 hover:bg-teal-500/10",
  },
  indigo: {
    active: "bg-indigo-600 text-white border-indigo-500",
    inactive: "bg-transparent text-indigo-400 border-indigo-400 hover:bg-indigo-500/10",
  },
  amber: {
    active: "bg-amber-500 text-black border-amber-500",
    inactive: "bg-transparent text-amber-500 border-amber-500 hover:bg-amber-500/10",
  },
}

const BikeServiceTab: FC<BikeServiceTabProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  theme = "teal",
}) => {
  const styles = themeStyles[theme]

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200",
        isActive ? styles.active : styles.inactive
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  )
}

export default BikeServiceTab
