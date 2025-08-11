"use client"
import Image from "next/image";
import Link from "next/link";
import NavBar from "../clean/components/NavBar";
import { CheckCircle, Droplet, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const About = () => {
    const footerRef = useRef<HTMLDivElement>(null)
  return (
    <div className="bg-teal-900 py-10 min-h-screen">
      <NavBar />

      <div className="max-w-5xl mx-auto px-4">
        {/* Image Container */}
        <div className="border-4 mt-12 border-gray-800 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/car.jpg"
            alt="Car service"
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Heading */}
        <h3 className="text-center text-3xl font-extrabold text-cyan-400 mt-6">
          About Us
        </h3>

        {/* Content */}
        <p className="text-gray-200 text-lg font-medium text-center mt-3 tracking-tight leading-relaxed max-w-3xl mx-auto px-2">
          From quick rides in bikes and cars to spotless cleaning and premium grooming, 
          <span className="text-cyan-400 font-semibold"> Click </span>
          connects you to trusted services with just a tap.
        </p>
      </div>
       {/* Footer */}
      <footer
        id="footer-section"
        ref={footerRef}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <motion.div
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Droplet className="h-5 w-5 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">
                  EliteServices
                </h3>
              </div>
              <p className="text-gray-300 mb-6">
                Premium car services, eco-friendly cleaning, and professional grooming solutions for modern lifestyles.
              </p>
              <div className="flex space-x-4">
                {["facebook", "instagram", "twitter"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-8 w-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center hover:from-cyan-600 hover:to-blue-600 transition-all duration-300">
                      {social === "facebook" && <span className="text-sm font-bold">f</span>}
                      {social === "instagram" && <span className="text-sm font-bold">i</span>}
                      {social === "twitter" && <span className="text-sm font-bold">t</span>}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick links columns */}
            {[
              {
                title: "Services",
                links: [
                  { name: "Car Services", href: "/car-services" },
                  { name: "Cleaning Services", href: "/cleaning-services" },
                  { name: "Grooming Services", href: "/grooming-services" },
                  { name: "Airport Transfer", href: "/services/airport-transfer" },
                  { name: "Deep Cleaning", href: "/services/deep-cleaning" },
                ],
                icon: <CheckCircle className="h-5 w-5" />,
                gradient: "from-teal-400 to-cyan-600",
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "/about" },
                  { name: "Our Team", href: "/team" },
                  { name: "Blog", href: "/blog" },
                  { name: "Careers", href: "/careers" },
                  { name: "Contact", href: "/contact" },
                ],
                icon: <Star className="h-5 w-5" />,
                gradient: "from-amber-400 to-orange-600",
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Booking Guide", href: "/booking-guide" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "FAQ", href: "/faq" },
                ],
                icon: <ShieldCheck className="h-5 w-5" />,
                gradient: "from-blue-400 to-indigo-600",
              },
            ].map((column, colIndex) => (
              <motion.div
                key={column.title}
                className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.1 + colIndex * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`h-8 w-8 rounded-full bg-gradient-to-br ${column.gradient} flex items-center justify-center text-white`}
                  >
                    {column.icon}
                  </div>
                  <h3 className="ml-3 text-lg font-bold">{column.title}</h3>
                </div>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.3, delay: 0.3 + linkIndex * 0.05 + colIndex * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-500 mr-2 group-hover:bg-white transition-colors duration-300"></div>
                        <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter subscription */}
          <motion.div
            className="mt-12 backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-gray-300">Subscribe to our newsletter for exclusive offers and service updates.</p>
              </div>
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 EliteServices. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default About;