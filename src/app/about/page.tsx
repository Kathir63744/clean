"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  Star,
  Users,
  Award,
  Target,
  Heart,
  Shield,
  Zap,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react"
import NavBar from "../clean/components/NavBar"

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      bio: "With over 10 years in the service industry, Sarah founded EliteServices to revolutionize how people access premium services.",
      expertise: ["Service Innovation", "Customer Experience", "Business Strategy"],
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      bio: "Michael ensures every service meets our high standards of quality and reliability across all locations.",
      expertise: ["Quality Control", "Process Optimization", "Team Management"],
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Success Lead",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
      bio: "Emily and her team are dedicated to ensuring every customer has an exceptional experience with our services.",
      expertise: ["Client Relations", "Service Training", "Feedback Implementation"],
    },
    {
      name: "David Kim",
      role: "Service Excellence Manager",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      bio: "David focuses on continuous improvement and innovation in our service delivery methods.",
      expertise: ["Service Innovation", "Technology Integration", "Performance Metrics"],
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence in Service",
      description: "We never compromise on quality. Every service is delivered with precision and attention to detail that sets industry standards."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. We listen, adapt, and exceed expectations consistently."
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "We build relationships based on trust. Our reliability has made us the preferred choice for thousands of customers."
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description: "We continuously evolve our services and processes to incorporate the latest technologies and best practices."
    }
  ]

  const milestones = [
    { year: "2018", event: "Company Founded", description: "Started with a vision to transform service industry" },
    { year: "2019", event: "First 1000 Customers", description: "Reached milestone of serving 1000 happy customers" },
    { year: "2020", event: "Service Expansion", description: "Launched multiple new service categories" },
    { year: "2022", event: "National Presence", description: "Expanded operations to 50+ cities across the country" },
    { year: "2023", event: "Excellence Award", description: "Received Industry Excellence Award for service quality" },
    { year: "2024", event: "50K+ Customers", description: "Celebrated serving over 50,000 satisfied customers" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {/* Hero Section */}
      <div className="py-16 mt-20 bg-gradient-to-br from-white to-blue-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">EliteServices</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a team of passionate professionals dedicated to delivering exceptional service experiences. 
              We've been transforming how people access premium services with reliability, quality, 
              and customer-centric approach.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  EliteServices was born from a simple observation: people deserve better service experiences. 
                   our founder Sarah Johnson noticed that while technology was advancing rapidly, 
                  the service industry was lagging behind in quality and reliability.
                </p>
                <p className="text-lg">
                  We started with a small team of dedicated professionals who shared a common vision: 
                  to create a service platform that combines modern technology with old-fashioned dedication to quality. 
                  What began as a local service provider has grown into a trusted national brand.
                </p>
                <p className="text-lg">
                  Today, we serve thousands of customers across multiple cities, but our core philosophy remains unchanged: 
                  every customer deserves exceptional service, every single time.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-blue-600 mb-2">50K+</div>
                  <div className="text-gray-600 font-medium">Happy Customers</div>
                </div>
                <div className="bg-amber-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-amber-600 mb-2">100+</div>
                  <div className="text-gray-600 font-medium">Expert Professionals</div>
                </div>
              </div>
              <div className="space-y-6 mt-8">
                <div className="bg-green-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-green-600 mb-2">4.9/5</div>
                  <div className="text-gray-600 font-medium">Average Rating</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-black text-purple-600 mb-2">50+</div>
                  <div className="text-gray-600 font-medium">Cities Served</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our decisions and define our company culture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to delivering exceptional service experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-900 mb-2">{member.name}</h3>
                  <div className="text-blue-600 font-semibold mb-4">{member.role}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-black text-gray-900 mb-8">Our Commitment to Excellence</h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  At EliteServices, we believe that exceptional service is not just about meeting expectations, 
                  but about exceeding them consistently. Our commitment extends beyond the services we provide 
                  to the relationships we build with our customers and communities.
                </p>
                <p>
                  We invest in continuous training for our team, embrace innovative technologies, and maintain 
                  the highest standards of quality control. Every service professional undergoes rigorous vetting 
                  and ongoing evaluation to ensure they represent our values and deliver the EliteServices experience.
                </p>
                <p>
                  As we continue to grow, our focus remains on maintaining the personal touch and attention to detail 
                  that characterized our beginnings. We're not just providing services; we're building trust, 
                  one customer at a time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}