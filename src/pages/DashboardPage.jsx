// src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaBrain,
  FaRobot,
  FaMicrophone,
  FaUserAstronaut,
  FaDna,
  FaCogs, // 🧠 New icon for Neuro Augmentation
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import NeuroChatPanel from '../components/NeuroChatPanel';

const DashboardPage = () => {
  const [showChat, setShowChat] = useState(false);

  const handleAIAssistantClick = () => {
    setShowChat(true);
  };

  const cards = [
    {
      icon: FaBrain,
      title: 'Cognitive Sync',
      description: 'Monitor and sync your cognitive activity in real-time.',
      link: '/cognitive-sync',
    },
    {
      icon: FaRobot,
      title: 'AI Assistant',
      description: 'Chat, collaborate, and delegate tasks to your NeuroBot.',
      link: '',
    },
    {
      icon: FaMicrophone,
      title: 'Voice Interaction',
      description: 'Explore Neuro Sync Voice Modules',
      link: '/voice',
    },
    {
      icon: FaDna,
      title: 'Unlock Genome',
      description: 'Visualize your AI-augmented genetic identity.',
      link: '/genome',
    },
    {
      icon: FaCogs,
      title: 'Neuro Augmentation',
      description: 'Upgrade mental performance with AI-powered tools.',
      link: '/neuro-augmentation',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-950 text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-purple-400 mb-6">Neuro Sync Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const CardContent = (
              <motion.div
                key={index}
                className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onClick={card.title === 'AI Assistant' ? handleAIAssistantClick : undefined}
              >
                <card.icon className="text-3xl text-cyan-300 mb-4" />
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="text-sm text-gray-300">{card.description}</p>
              </motion.div>
            );

            return card.title === 'AI Assistant' ? (
              <div key={index}>{CardContent}</div>
            ) : (
              <Link to={card.link} key={index}>
                {CardContent}
              </Link>
            );
          })}
        </div>

        {/* NeuroBot Panel */}
        {showChat && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-purple-400 mb-6">Neuro Bot</h2>
            <NeuroChatPanel />
          </section>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;