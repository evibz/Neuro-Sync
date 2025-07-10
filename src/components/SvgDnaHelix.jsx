// src/components/SvgDnaHelix.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SvgDnaHelix = () => {
  return (
    <motion.svg
      className="w-48 h-96 mx-auto drop-shadow-xl"
      viewBox="0 0 100 300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      {/* Left spiral */}
      <motion.path
        d="M30,0 C60,40 60,80 30,120 C0,160 0,200 30,240 C60,280 60,320 30,360"
        fill="none"
        stroke="url(#dnaGradient)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />

      {/* Right spiral */}
      <motion.path
        d="M70,0 C40,40 40,80 70,120 C100,160 100,200 70,240 C40,280 40,320 70,360"
        fill="none"
        stroke="url(#dnaGradient)"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Horizontal rungs */}
      {[...Array(9)].map((_, i) => {
        const y = 40 * i;
        const offset = 10 * Math.sin(i);
        return (
          <motion.line
            key={i}
            x1={30 + offset}
            y1={y}
            x2={70 - offset}
            y2={y}
            stroke="#ffffff"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          />
        );
      })}
    </motion.svg>
  );
};

export default SvgDnaHelix;
