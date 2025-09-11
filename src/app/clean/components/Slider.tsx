"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

const items = [
  { id: 1, icon: "🧼", title: "Deep Cleaning" },
  { id: 2, icon: "🪒", title: "Professional Grooming" },
  { id: 3, icon: "🚿", title: "Bathroom Sanitization" },
  { id: 4, icon: "🐶", title: "Pet Grooming" },
  { id: 5, icon: "🧹", title: "Home Cleaning" },
  { id: 6, icon: "💇‍♀️", title: "Hair Styling" },
  { id: 7, icon: "🧽", title: "Eco-Friendly Products" },
  { id: 8, icon: "🧴", title: "Skincare Services" },
];

const Slider = () => {
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesPerView(2);
      else if (width < 768) setSlidesPerView(3);
      else if (width < 1024) setSlidesPerView(4);
      else setSlidesPerView(6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-900/80 to-slate-900 
                    h-[42px] flex items-center relative overflow-hidden">
      {/* moving gradient shimmer border */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      animate-[shimmer_5s_linear_infinite]" />

      {/* glowing top & bottom border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-pink-400 via-indigo-400 to-teal-400 animate-[shimmer_6s_linear_infinite]" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-teal-400 via-indigo-400 to-pink-400 animate-[shimmer_6s_linear_infinite]" />

      <div className="container mx-auto px-3 relative z-10">
        <div className="flex items-center">
          <h2 className="text-[12px] font-semibold mr-3 text-slate-100 tracking-wide whitespace-nowrap">
            ✨ Our Services
          </h2>

          <div className="flex-grow overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={slidesPerView}
              spaceBetween={12}
              loop={true}
              autoplay={{ delay: 0, disableOnInteraction: false }}
              speed={4000} // continuous ticker effect
              className="h-[28px] flex items-center"
            >
              {items.map((item) => (
                <SwiperSlide key={item.id} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex items-center space-x-1 px-3 py-[3px] rounded-full
                               bg-white/10 border border-white/20 backdrop-blur-md
                               shadow-md relative overflow-hidden group"
                  >
                    {/* animated gradient glow border */}
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r 
                                     from-pink-500 via-indigo-400 to-teal-400 
                                     opacity-30 blur-md group-hover:opacity-50 transition-opacity" />

                    {/* sparkles on hover */}
                    <motion.span
                      className="absolute -top-1 -right-1 text-xs"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1, rotate: 45 }}
                      transition={{ duration: 0.4 }}
                    >
                      ✨
                    </motion.span>

                    {/* icon with parallax float */}
                    <motion.span
                      animate={{ y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="relative text-[11px]"
                    >
                      {item.icon}
                    </motion.span>

                    {/* glowing text */}
                    <motion.span
                      whileHover={{ textShadow: "0px 0px 8px rgba(255,255,255,0.9)" }}
                      className="relative text-[11px] text-slate-100 font-medium tracking-wide"
                    >
                      {item.title}
                    </motion.span>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
