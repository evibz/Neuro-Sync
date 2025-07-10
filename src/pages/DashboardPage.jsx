import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaRobot, FaMicrophone, FaUserAstronaut, FaDna } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import NeuroChatPanel from '../components/NeuroChatPanel';

const Dashboard = () => {
  const [showChat, setShowChat] = useState(false);

  const handleAIAssistantClick = () => {
    setShowChat(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-950 text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-purple-400 mb-6">Neuro Sync Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            if (card.title === 'AI Assistant') {
              return (
                <motion.div
                  key={index}
                  className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:bg-white/20 cursor-pointer transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  onClick={handleAIAssistantClick}
                >
                  <card.icon className="text-3xl text-cyan-300 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                  <p className="text-sm text-gray-300">{card.description}</p>
                </motion.div>
              );
            }

            return (
              <Link to={card.link} key={index}>
                <motion.div
                  className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md hover:bg-white/20 transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <card.icon className="text-3xl text-cyan-300 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                  <p className="text-sm text-gray-300">{card.description}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Show NeuroChatPanel if AI Assistant card clicked */}
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

const cards = [
  {
    icon: FaBrain,
    title: 'Cognitive Sync',
    description: 'Monitor and sync your cognitive activity in real-time.',
    link: '/',
  },
  {
    icon: FaRobot,
    title: 'AI Assistant',
    description: 'Chat, collaborate, and delegate tasks to your NeuroBot.',
    link: '', // no link, uses click handler
  },
  {
    icon: FaMicrophone,
    title: 'Voice Interaction',
    description: 'Use voice to control and interact with your environment.',
    link: '/',
  },
  {
    icon: FaUserAstronaut,
    title: 'Immersive UI',
    description: 'Step into a futuristic interface with ambient interaction.',
    link: '/',
  },
  {
    icon: FaDna,
    title: 'Unlock Genome',
    description: 'Visualize your AI-augmented genetic identity.',
    link: '/genome', // ✅ routes to /genome
  },
];

export default Dashboard;