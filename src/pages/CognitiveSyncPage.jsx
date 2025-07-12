import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import CognitiveMetrics from '../components/CognitiveMetrics';
import MemorySync from '../components/MemorySync';
import EEGUpload from '../components/EEGUpload';

const tabs = [
  { id: 'cognitive', label: 'Cognitive Metrics' },
  { id: 'memory', label: 'Memory Sync' },
  { id: 'eeg', label: 'EEG Upload' },
];

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const CognitiveSyncPage = () => {
  const [activeTab, setActiveTab] = useState('cognitive');
  const navigate = useNavigate();

  const renderTab = () => {
    switch (activeTab) {
      case 'memory':
        return <MemorySync />;
      case 'eeg':
        return <EEGUpload />;
      case 'cognitive':
      default:
        return <CognitiveMetrics />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-400 text-center flex-1">
          🧬 Cognitive Sync Module
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="ml-4 px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
        >
          ← Go Back
        </button>
      </div>

      {/* Tab Controls */}
      <div className="flex justify-center mb-10 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            transition={{ duration: 0.4 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CognitiveSyncPage;