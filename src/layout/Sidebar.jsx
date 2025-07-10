import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaTachometerAlt,
  FaComments,
  FaSignOutAlt,
  FaBars,
  FaDna,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = (
    <nav className="flex flex-col space-y-6 mt-8">
      <Link to="/" className="flex items-center space-x-3 text-white hover:text-purple-400" onClick={() => setMobileOpen(false)}>
        <FaHome className="text-lg" />
        {!collapsed && <span>Home</span>}
      </Link>

      <Link to="/dashboard" className="flex items-center space-x-3 text-white hover:text-purple-400" onClick={() => setMobileOpen(false)}>
        <FaTachometerAlt className="text-lg" />
        {!collapsed && <span>Dashboard</span>}
      </Link>

      <Link to="/chat" className="flex items-center space-x-3 text-white hover:text-purple-400" onClick={() => setMobileOpen(false)}>
        <FaComments className="text-lg" />
        {!collapsed && <span>Chat</span>}
      </Link>

      <Link to="/genome" className="flex items-center space-x-3 text-white hover:text-purple-400" onClick={() => setMobileOpen(false)}>
        <FaDna className="text-lg" />
        {!collapsed && <span>Genome</span>}
      </Link>

      <button className="flex items-center space-x-3 text-white hover:text-red-400">
        <FaSignOutAlt className="text-lg" />
        {!collapsed && <span>Logout</span>}
      </button>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`h-full bg-white/10 backdrop-blur-md shadow-lg p-4 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } hidden md:flex flex-col`}
      >
        <div className="flex items-center justify-between">
          {!collapsed && <h2 className="text-2xl font-bold text-purple-300">Neuro Sync</h2>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-white focus:outline-none">
            <FaBars />
          </button>
        </div>
        {navLinks}
      </div>

      {/* Mobile Sidebar Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="bg-purple-600 text-white p-2 rounded-full shadow-md"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-0 left-0 bottom-0 w-64 bg-black/90 backdrop-blur-md z-50 p-6 flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-300">Neuro Sync</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white text-lg focus:outline-none"
              >
                ✕
              </button>
            </div>
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;