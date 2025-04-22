import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 0.2 
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-8px)' };
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(8px)' };
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-8px)' };
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(8px)' };
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-8px)' };
    }
  };

  const getAnimation = () => {
    switch (position) {
      case 'top':
        return { y: [-5, 0], opacity: [0, 1] };
      case 'bottom':
        return { y: [5, 0], opacity: [0, 1] };
      case 'left':
        return { x: [-5, 0], opacity: [0, 1] };
      case 'right':
        return { x: [5, 0], opacity: [0, 1] };
      default:
        return { y: [-5, 0], opacity: [0, 1] };
    }
  };

  return (
    <div 
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="tooltip"
            style={getPositionStyles()}
            initial={{opacity:1  }}
            animate={getAnimation()}
            exit={{   }}
            transition={{ duration: 0.2, delay }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 