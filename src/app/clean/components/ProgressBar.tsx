import { motion } from 'framer-motion';

interface ProgressBarProps {
  isActive: boolean;
  progress: number;
  onClick: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isActive, progress, onClick }) => {
  return (
    <div 
      className="relative h-3 cursor-pointer"
      onClick={onClick}
    >
      <motion.div 
        className={`w-12 h-3 rounded-full ${isActive ? 'bg-white/30' : 'bg-white/20'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isActive && (
          <motion.div
            className="absolute top-0 left-0 h-full bg-white rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProgressBar;