import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface BackgroundEffectsProps {
  activeSlide: number;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ activeSlide }) => {
  const controls = useAnimation();

  // Colors for each slide
  const bgColors = [
    'from-blue-900 via-blue-800 to-blue-950', // Cleaning
    'from-emerald-900 via-emerald-800 to-emerald-950', // Grooming
    'from-purple-900 via-purple-800 to-purple-950'  // Raiding
  ];

  // Update background when slide changes
  useEffect(() => {
    controls.start({
      opacity: [0.5, 1],
      scale: [1.1, 1],
      transition: { duration: 1.2 }
    });
  }, [activeSlide, controls]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <motion.div 
        animate={controls}
        className={`absolute inset-0 bg-gradient-to-b ${bgColors[activeSlide]}`}
      ></motion.div>

      {/* Animated particles */}
      <AnimatePresence>
        <motion.div
          key={`particles-${activeSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Particles count={30} activeSlide={activeSlide} />
        </motion.div>
      </AnimatePresence>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient opacity-70"></div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-vignette"></div>
    </div>
  );
};

interface ParticlesProps {
  count: number;
  activeSlide: number;
}

const Particles: React.FC<ParticlesProps> = ({ count, activeSlide }) => {
  // Colors for particles based on slide
  const particleColors = [
    ['bg-blue-400/20', 'bg-cyan-300/20', 'bg-sky-200/20'],
    ['bg-emerald-400/20', 'bg-teal-300/20', 'bg-green-200/20'],
    ['bg-purple-400/20', 'bg-indigo-300/20', 'bg-violet-200/20']
  ];

  const colors = particleColors[activeSlide];

  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        // Randomize particle properties
        const size = Math.random() * 120 + 30;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={index}
            className={`absolute rounded-full backdrop-blur-md ${color}`}
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.7, 0.5],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
    </>
  );
};

export default BackgroundEffects;