import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  backgroundImage?: string;
  gradientOpacity?: number; // 0-1 range
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = '/photo-collage.png.png',
  gradientOpacity = 0.3, // Lighter default gradient
  gradientFrom = 'from-indigo-900',
  gradientVia = 'via-blue-800',
  gradientTo = 'to-cyan-800'
}) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax and opacity effects
  const calculateParallax = (factor: number) => {
    return scrollY * factor;
  };

  const parallaxBg = {
    transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`,
  };

  const parallaxContent = {
    transform: `translateY(${calculateParallax(-0.2)}px)`,
    opacity: Math.max(0, 1 - scrollY / 500),
  };

  // Service statistics with animation
  const stats = [
    { value: '98%', label: 'Satisfaction', icon: '✨' },
    { value: '24/7', label: 'Support', icon: '🕒' },
    { value: '1000+', label: 'Clients', icon: '👥' },
    { value: '15+', label: 'Years', icon: '🏆' },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden" ref={heroRef}>
      {/* Background layers */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out" style={parallaxBg}>
        {/* Background image - now fully visible */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
        
        {/* Optional subtle gradient overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo}`}
          style={{ opacity: gradientOpacity }}
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 60 + 5;
          const speed = Math.random() * 15 + 10;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const direction = Math.random() > 0.5 ? 1 : -1;
          
          return (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-300/10 backdrop-blur-sm"
              style={{
                width: size,
                height: size,
                left: `${initialX}%`,
                top: `${initialY}%`,
                animation: `float-${direction > 0 ? 'right' : 'left'} ${speed}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          );
        })}
      </div>

      {/* Content section */}
      <div 
        className="relative h-full w-full flex flex-col items-center justify-center px-4"
        style={parallaxContent}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-indigo-400/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fadeIn">
            <Sparkles className="h-5 w-5 text-indigo-300" />
            <span className="text-indigo-300 font-medium">Premium Services</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none tracking-tight animate-revealFromBottom">
            Transform Your Space
            <span className="block text-cyan-300 mt-2 animate-revealFromRight">
              With Expert Care
            </span>
          </h1>

          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12 opacity-90 animate-fadeIn delay-300">
            Experience unmatched quality in cleaning and grooming services, tailored to your needs and schedule.
          </p>
          
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12"
            ref={statsRef}
          >
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center animate-fadeInUp"
                style={{ animationDelay: `${index * 150 + 500}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="flex items-center text-cyan-200 mt-1">
                  <span className="mr-1">{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn delay-700">
            <button className="bg-white text-indigo-900 py-3 px-8 rounded-full font-medium text-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg">
              Explore Services
            </button>
            <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-medium text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{
          opacity: Math.max(0, 1 - scrollY / 200),
        }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-white rounded-full animate-scrollIndicator"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;