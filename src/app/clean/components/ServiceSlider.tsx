import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SlideContent from './SlideContent';
import ProgressBar from './ProgressBar';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  buttonColor: string;
  textColor: string;
}

interface ServiceSliderProps {
  activeSlide: number;
  onSlideChange: (index: number) => void;
  onInteraction: () => void;
}

type Direction = -1 | 0 | 1;

const ServiceSlider: React.FC<ServiceSliderProps> = ({ 
  activeSlide, 
  onSlideChange,
  onInteraction
}) => {
  const [direction, setDirection] = useState<Direction>(0);
  const [progress, setProgress] = useState(0);

  const slides = useMemo(() => [
    {
      id: 0,
      title: "Professional Cleaning",
      subtitle: "Transform your space",
      description: "Our professional team delivers spotless results for homes and businesses with eco-friendly products and meticulous attention to detail.",
      color: "from-blue-600 to-cyan-500",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-blue-100",
    },
    {
      id: 1,
      title: "Premium Grooming",
      subtitle: "Look your best",
      description: "Expert stylists providing personalized care with premium products for a refreshed appearance that makes a lasting impression.",
      color: "from-emerald-600 to-teal-500",
      buttonColor: "bg-emerald-500 hover:bg-emerald-600",
      textColor: "text-emerald-100",
    },
    {
      id: 2,
      title: "Specialized Raiding",
      subtitle: "Expert solutions",
      description: "Our specialized raiding services tackle complex cleaning and organization projects with precision, efficiency, and exceptional results.",
      color: "from-purple-600 to-indigo-500",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      textColor: "text-purple-100",
    },
  ], []);

  const handlePrevSlide = useCallback(() => {
    setDirection(-1);
    onSlideChange((activeSlide - 1 + slides.length) % slides.length);
    onInteraction();
  }, [activeSlide, onSlideChange, onInteraction, slides.length]);

  const handleNextSlide = useCallback(() => {
    setDirection(1);
    onSlideChange((activeSlide + 1) % slides.length);
    onInteraction();
  }, [activeSlide, onSlideChange, onInteraction, slides.length]);

  // Auto-advance slides with smooth progress animation
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 6000; // 6 seconds per slide

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = (elapsed / duration) * 100;

      if (newProgress >= 100) {
        handleNextSlide();
        setProgress(0);
        startTime = null;
      } else {
        setProgress(newProgress);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeSlide, handleNextSlide]);

  const handleDotClick = useCallback((index: number) => {
    setDirection(index > activeSlide ? 1 : -1);
    onSlideChange(index);
    onInteraction();
  }, [activeSlide, onSlideChange, onInteraction]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevSlide, handleNextSlide]);

  return (
    <div 
      className="h-screen w-full flex items-center justify-center relative"
      onClick={onInteraction}
      role="region"
      aria-label="Service slider"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Slider Content */}
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {slides.map((slide) => (
            activeSlide === slide.id && (
              <SlideContent 
                key={slide.id}
                slide={slide} 
                direction={direction}
                isActive={activeSlide === slide.id}
              />
            )
          ))}
        </AnimatePresence>

        {/* Slide Navigation */}
        <div className="absolute bottom-[15%] left-0 right-0 flex justify-center items-center space-x-6 z-30">
          <motion.button
            onClick={handlePrevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex space-x-4">
            {slides.map((_, index) => (
              <ProgressBar 
                key={index}
                isActive={activeSlide === index}
                progress={activeSlide === index ? progress : 0}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;