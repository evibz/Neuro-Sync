import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="text-center py-4 text-sm text-gray-400 bg-white/5 backdrop-blur-sm mt-10 rounded-xl shadow-inner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span>Powered by </span>
      <a
        href="https://digsoftlabs.web.app"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 font-semibold hover:underline hover:text-purple-300 transition"
      >
        Digsoft Labs
      </a>
    </motion.footer>
  );
};

export default Footer;