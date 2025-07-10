import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaBrain,
  FaRobot,
  FaMicrophone,
  FaUserAstronaut,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: FaBrain,
    title: 'Neural Intelligence',
    description: 'AI tailored to your cognitive patterns for hyper-personalization.',
  },
  {
    icon: FaRobot,
    title: 'NeuroBot Assistant',
    description: 'Chat and collaborate with your digital twin across any task.',
  },
  {
    icon: FaMicrophone,
    title: 'Voice Interaction',
    description: 'Command the app using your voice — fast, seamless, and natural.',
  },
  {
    icon: FaUserAstronaut,
    title: 'Immersive UI',
    description: 'Experience a holographic interface designed for the future.',
  },
];

const LandingPage = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [showStartButton, setShowStartButton] = useState(false);
  const audioRef = useRef(null);

  const introText = 'Initializing Neuro Sync OS...';

  useEffect(() => {
    if (!hasInteracted) {
      let index = 0;
      const interval = setInterval(() => {
        setTypedText((prev) => prev + introText[index]);
        index++;
        if (index === introText.length) {
          clearInterval(interval);
          setTimeout(() => setShowStartButton(true), 500);
        }
      }, 80);
      return () => clearInterval(interval);
    }
  }, [hasInteracted]);

  const handleStart = () => {
    setHasInteracted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsPlaying(!audioRef.current.muted);
    }
  };

  useEffect(() => {
    if (audioRef.current && hasInteracted) {
      audioRef.current.play().catch(() => {});
    }
  }, [hasInteracted]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-black via-gray-900 to-indigo-900 text-white flex flex-col overflow-hidden">
      <audio ref={audioRef} src="/sounds/neural-ambience.mp3" preload="auto" loop />

      {/* 🔊 Volume Toggle */}
      {hasInteracted && (
        <button
          onClick={toggleMute}
          className="absolute top-20 right-1 z-40 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition"
        >
          {isPlaying ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
        </button>
      )}

      {/* 🧠 Animated Neural Pulses */}
      {hasInteracted &&
        [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-purple-500 rounded-full blur-lg opacity-30 animate-pulse-glow"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${i * 1.5}s`,
            }}
            animate={{
              x: [0, 10, -10, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        ))}

      {/* 🌊 Brainwave Lines */}
      {hasInteracted && (
        <div className="absolute bottom-0 left-0 w-full h-40 z-0 overflow-hidden">
          <div className="w-full h-full animate-wave bg-gradient-to-r from-purple-600/20 via-cyan-400/20 to-indigo-500/20 blur-lg" />
        </div>
      )}

      {/* Overlay with Typing Intro */}
{!hasInteracted && (
  <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-green-400 font-mono text-xl">
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mb-6 tracking-widest text-center"
    >
      {typedText}
    </motion.p>

    {showStartButton && (
      <motion.button
        onClick={handleStart}
        className="mt-12 px-8 py-4 bg-purple-600 text-white text-xl rounded-full shadow-xl hover:bg-purple-500 transition"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Start Experience
      </motion.button>
    )}
  </div>
)}

      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md shadow-md z-10">
        <h2 className="text-2xl font-bold text-purple-300">Neuro Sync</h2>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-purple-400">Home</Link>
          <Link to="/dashboard" className="text-white hover:text-purple-400">Dashboard</Link>
          <Link to="/genome" className="text-white hover:text-purple-400">Genome</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        >
          Neuro Sync
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          The future of human-AI collaboration. Sync your mind, enhance your reality.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md flex items-center space-x-4 hover:bg-white/20 transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
            >
              <feature.icon className="text-3xl text-purple-300" />
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-400 text-sm bg-white/5 backdrop-blur-sm z-10">
        © {new Date().getFullYear()} Neuro Sync. All Rights Reserved
      </footer>
    </div>
  );
};

export default LandingPage;