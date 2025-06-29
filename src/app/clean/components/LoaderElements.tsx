import React from 'react';
import { motion } from 'framer-motion';

// Pulsing dot component for the loader
export const PulsingDot: React.FC<{ delay: number }> = ({ delay }) => {
  return (
    <motion.span
      animate={{ opacity: [0, 1, 0] }}
      transition={{ 
        duration: 1.5, 
        delay: delay, 
        repeat: Infinity, 
        times: [0, 0.5, 1] 
      }}
    >
      .
    </motion.span>
  );
};

// Spinning circle component for the loader
export const SpinningCircle: React.FC<{ 
  className: string, 
  direction?: 1 | -1, 
  duration?: number 
}> = ({ 
  className, 
  direction = 1, 
  duration = 2 
}) => {
  return (
    <motion.div
      className={className}
      animate={{ rotate: direction * 360 }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    />
  );
};

// Logo component for the loader
export const LogoElement: React.FC = () => {
  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-xl font-bold bg-gradient-to-r from-amber-500 to-cyan-500 bg-clip-text text-transparent">
        CleanScience
      </div>
    </motion.div>
  );
};

// Loading text component
export const LoadingText: React.FC = () => {
  return (
    <motion.div
      className="absolute bottom-[40%] left-1/2 -translate-x-1/2 text-gray-600 font-medium"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <span>Loading</span>
        <PulsingDot delay={0} />
        <PulsingDot delay={0.5} />
        <PulsingDot delay={1} />
      </div>
    </motion.div>
  );
};