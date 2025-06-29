import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ScrollProgress from "./clean/components/ScrollProgress"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CleanScience - Premium Cleaning & Grooming Services",
  description: "Advanced cleaning and grooming solutions powered by science, designed for modern homes and lifestyles.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
