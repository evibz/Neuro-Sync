import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';

const initialTraits = () => [
  { name: 'Creativity', value: Math.floor(Math.random() * 41) + 60 },
  { name: 'Memory Retention', value: Math.floor(Math.random() * 41) + 50 },
  { name: 'Focus Level', value: Math.floor(Math.random() * 41) + 50 },
  { name: 'Emotional Insight', value: Math.floor(Math.random() * 41) + 50 },
];

const getAnimationProps = (name) => {
  switch (name) {
    case 'Creativity':
      return {
        animate: { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] },
        transition: { duration: 1.5, repeat: Infinity },
      };
    case 'Memory Retention':
      return {
        animate: { scale: [1, 1.1, 1] },
        transition: { duration: 1.2, repeat: Infinity },
      };
    case 'Focus Level':
      return {
        animate: { y: [0, -2, 2, 0] },
        transition: { duration: 1.2, repeat: Infinity },
      };
    case 'Emotional Insight':
      return {
        animate: { scale: [1, 1.05, 1] },
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      };
    default:
      return {};
  }
};

const NeuralTraitSimulation = forwardRef((_, ref) => {
  const [traits, setTraits] = useState(initialTraits());
  const audioRef = useRef(null);

  const randomizeTraits = () => {
    setTraits(initialTraits());
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useImperativeHandle(ref, () => ({
    simulate: randomizeTraits,
  }));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <audio ref={audioRef} src="/sounds/simulate.mp3" preload="auto" />

      <h2 className="text-3xl font-bold text-purple-300 mb-8 text-center">
        Neural Trait Profile
      </h2>

      {traits.map(({ name, value }, i) => (
        <div key={name}>
          <div className="flex justify-between mb-1 text-white font-medium">
            <span>{name}</span>
            <span>{value}%</span>
          </div>

          <div className="w-full bg-white/20 rounded-full h-5 overflow-hidden">
            <motion.div
              className="h-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              {/* Trait-specific animated wrapper */}
              <motion.div
                className="h-full w-full"
                {...getAnimationProps(name)}
              />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default NeuralTraitSimulation;