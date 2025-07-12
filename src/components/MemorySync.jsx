// src/components/MemorySync.jsx
import React from 'react';

const dummyMemories = [
  { time: '2025-07-10 08:34', event: 'Read Article on Neural Networks', strength: 87 },
  { time: '2025-07-09 22:15', event: 'Watched Educational Video', strength: 72 },
  { time: '2025-07-09 18:40', event: 'Completed Meditation Session', strength: 93 },
  { time: '2025-07-09 12:20', event: 'Had a Creative Thought', strength: 65 },
];

const MemorySync = () => {
  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg">
      <h2 className="text-xl font-semibold text-purple-300 mb-4">Memory Sync Log</h2>
      <ul className="space-y-4">
        {dummyMemories.map((memory, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white/5 p-4 rounded-md"
          >
            <div>
              <p className="text-white text-sm">{memory.event}</p>
              <p className="text-gray-400 text-xs">{memory.time}</p>
            </div>
            <span className="text-cyan-300 font-bold">{memory.strength}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemorySync;
