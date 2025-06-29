import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SpinningCircle ,LoadingText, LogoElement } from './LoaderElements';
interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Outer circle */}
        <SpinningCircle 
          className="w-32 h-32 rounded-full border-4 border-amber-500 border-t-transparent"
          direction={1}
          duration={2}
        />
        
        {/* Inner circle */}
        <SpinningCircle 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-cyan-500 border-b-transparent"
          direction={-1}
          duration={1.5}
        />
        
        {/* Logo inside */}
        <LogoElement />
      </div>
      
      {/* Loading text */}
      <LoadingText />
    </motion.div>
  );
};

export default Loader;