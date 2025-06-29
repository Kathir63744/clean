import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  buttonColor: string;
  textColor: string;
}

interface SlideProps {
  slide: Slide;
  direction: number;
  isActive: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const SlideContent: React.FC<SlideProps> = ({ slide, direction, isActive }) => {
  return (
    <motion.div
      className="w-full"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate={isActive ? "center" : "exit"}
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      }}
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Text Content Section */}
        <div className="w-full md:w-1/2 px-4">
          <motion.div
            custom={1}
            variants={textVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className={`${slide.textColor} font-medium mb-3 text-lg uppercase tracking-wide`}
          >
            {slide.subtitle}
          </motion.div>
          
          <motion.h1
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {slide.title}
          </motion.h1>
          
          <motion.p
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="text-white/80 mb-8 text-base md:text-lg max-w-xl"
          >
            {slide.description}
          </motion.p>
          
          <motion.div
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${slide.buttonColor} text-white px-8 py-3 rounded-full font-medium flex items-center group`}
              aria-label="Get started"
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>            
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium border border-white/20 hover:bg-white/20 transition-colors"
              aria-label="Learn more"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>      
        
        {/* Visual Content Section */}
        <div className="w-full md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isActive ? { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { delay: 0.3, duration: 0.8 } 
            } : {}}
            className="relative"
          >
            <div className={`bg-gradient-to-br ${slide.color} rounded-3xl overflow-hidden shadow-lg aspect-[4/3] max-w-lg mx-auto relative`}>
              <ServiceVisual serviceId={slide.id} isActive={isActive} />             
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>           
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { 
                opacity: 1, 
                y: 0, 
                transition: { delay: 0.6 } 
              } : {}}
              className="absolute -bottom-5 -left-5 bg-white rounded-full px-4 py-2 shadow-lg flex items-center"
            >
              <div className={`w-3 h-3 rounded-full bg-green-500 mr-2`}></div>
              <span className="text-sm font-medium text-gray-800">Available Now</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface ServiceVisualProps {
  serviceId: number;
  isActive: boolean;
}

const ServiceVisual = ({ serviceId, isActive }: ServiceVisualProps) => {
  if (!isActive) return null;

  switch (serviceId) {
    case 0: // Cleaning service
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-4 w-full h-full">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { delay: 0.2 + i * 0.1, duration: 0.5 }
                }}
                className="bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden relative group"
              >
                <motion.div 
                  className="absolute inset-0 bg-blue-500/30"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: '100%',
                    transition: { delay: 0.5 + i * 0.2, duration: 1.5 }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ); 
    case 1: // Grooming service
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.3 + i * 0.2, duration: 0.6 }
                }}
                className="absolute"
                style={{
                  top: `${20 + i * 25}%`,
                  left: `${20 + i * 15}%`,
                  width: `${40 - i * 10}%`,
                  height: '8px',
                  borderRadius: '4px',
                  background: `rgba(255,255,255,${0.8 - i * 0.2})`
                }}
              />
            ))}           
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { delay: 0.8, duration: 0.5 }
              }}
              className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-emerald-400/30 backdrop-blur-md flex items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-white/80" />
            </motion.div>
          </div>
        </div>
      );   
    case 2: // Raiding service
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-3/4 h-3/4">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  rotate: 0,
                  scale: 1,
                  transition: { 
                    delay: 0.1 * i, 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
                className="bg-purple-300/20 backdrop-blur-sm rounded-md flex items-center justify-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 1],
                    transition: { 
                      delay: 0.3 + i * 0.1, 
                      duration: 0.8,
                      times: [0, 0.6, 1]
                    }
                  }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              </motion.div>
            ))}
          </div>
        </div>
      );  
    default:
      return null;
  }
};

export default SlideContent;