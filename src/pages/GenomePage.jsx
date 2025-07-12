import React, { useState, useRef } from 'react';
import { FaDna } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NeuralTraitSimulation from '../components/NeuralTraitSimulation';
import GenomeUploader from '../components/GenomeUploader';
import DnaCanvas from '../components/DnaCanvas';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const GenomePage = () => {
  const [dnaPulse, setDnaPulse] = useState(false);
  const navigate = useNavigate();
  const traitRef = useRef(null); // Ref for trait simulation

  const triggerPulse = () => {
    setDnaPulse(true);

    if (traitRef.current) {
      traitRef.current.simulate(); // only calls local trait simulate
    }

    setTimeout(() => setDnaPulse(false), 1000);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-950 text-white flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <main className="flex-1 p-6 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          {/* Page Title */}
          <motion.h1
            className="text-4xl font-bold text-purple-300 mb-6 flex items-center gap-3"
            variants={itemVariants}
          >
            <FaDna className="text-purple-400 text-5xl" />
            Unlock Your Genome
          </motion.h1>

          {/* 3D DNA Animation */}
          <motion.div
            className="h-[220px] md:h-[300px] rounded-xl overflow-hidden shadow-2xl"
            animate={{
              scale: dnaPulse ? 1.05 : 1,
              boxShadow: dnaPulse
                ? '0 0 20px 8px rgba(139, 92, 246, 0.7)'
                : '0 0 10px 2px rgba(139, 92, 246, 0.3)',
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            variants={itemVariants}
          >
            <DnaCanvas />
          </motion.div>

          {/* Simulate Again Button */}
          <motion.div
            className="flex justify-center mt-6 mb-10"
            variants={itemVariants}
          >
            <motion.button
              onClick={triggerPulse}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full shadow-md transition"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              Simulate Again
            </motion.button>
          </motion.div>

          {/* Trait Simulation */}
          <motion.div
            className="max-w-3xl mx-auto w-full"
            variants={itemVariants}
          >
            <NeuralTraitSimulation ref={traitRef} />
          </motion.div>

          {/* Genome File Uploader */}
          <motion.div className="mt-12" variants={itemVariants}>
            <GenomeUploader />
          </motion.div>
        </div>
      </main>

      {/* Footer + Go Back */}
      <motion.div
        className="w-full max-w-6xl mx-auto px-6 py-4 flex flex-col items-center"
        variants={itemVariants}
      >
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-5 py-2 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-medium shadow-md transition"
        >
          ← Go Back
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GenomePage;