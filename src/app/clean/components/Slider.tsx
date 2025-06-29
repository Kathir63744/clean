"use client"
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const items = [
  {
    id: 1,
    icon: '🧼',
    title: 'Deep Cleaning',
  },
  {
    id: 2,
    icon: '🪒',
    title: 'Professional Grooming',
  },
  {
    id: 3,
    icon: '🚿',
    title: 'Bathroom Sanitization',
  },
  {
    id: 4,
    icon: '🐶',
    title: 'Pet Grooming',
  },
  {
    id: 5,
    icon: '🧹',
    title: 'Home Cleaning',
  },
  {
    id: 6,
    icon: '💇‍♀️',
    title: 'Hair Styling',
  },
  {
    id: 7,
    icon: '🧽',
    title: 'Eco-Friendly Products',
  },
  {
    id: 8,
    icon: '🧴',
    title: 'Skincare Services',
  },
];

const Slider = () => {
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidesPerView(2);
      } else if (width < 768) {
        setSlidesPerView(3);
      } else if (width < 1024) {
        setSlidesPerView(4);
      } else {
        setSlidesPerView(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 h-[16px] flex items-center">
      <div className="container mx-auto px-2">
        <div className="flex items-center">
          <h2 className="text-[8px] font-bold mr-2 text-white whitespace-nowrap">
            Our Services
          </h2>
          <div className="flex-grow overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={slidesPerView}
              spaceBetween={4}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={800}
              className="h-[10px]"
            >
              {items.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex items-center space-x-1">
                    <span className="text-[6px]">{item.icon}</span>
                    <span className="text-[6px] text-white font-medium">{item.title}</span>
                  </div>
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
