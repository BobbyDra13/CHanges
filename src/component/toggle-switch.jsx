import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ checked, onCheckedChange, disabled = false, size = 'md' }) => {
  const sizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 16
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 20
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 28
    }
  };

  return (
    <div
      className={`
        relative inline-flex shrink-0 cursor-pointer items-center
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      `}
      onClick={!disabled ? onCheckedChange : undefined}
    >
      {/* Track */}
      <motion.div
        className={`
          ${sizes[size].track}
          rounded-full
          transition-colors
          duration-200
          ${checked ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gray-600'}
        `}
        animate={{
          backgroundColor: checked ? '#3B82F6' : '#4B5563'
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: checked ? '0 0 12px rgba(59, 130, 246, 0.5)' : 'none'
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Thumb */}
        <motion.div
          className={`
            ${sizes[size].thumb}
            absolute left-0.5 top-0.5
            rounded-full
            bg-white
            shadow-lg
          `}
          animate={{
            x: checked ? sizes[size].translate : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20
          }}
        >
          {/* Inner circle effect */}
          <motion.div
            className="absolute inset-1 rounded-full bg-gradient-to-br from-white to-gray-100"
            animate={{
              x: checked ? sizes[size].translate - 1 : 0,
              opacity: checked ? 1 : 0.7
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ToggleSwitch;
