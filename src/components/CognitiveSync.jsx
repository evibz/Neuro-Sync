import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Function to generate brainwave data
const generateBrainwaveData = () => {
  const labels = Array.from({ length: 20 }, (_, i) => `${i}s`);
  const wave = () => labels.map(() => Math.floor(Math.random() * 100));

  return {
    labels,
    datasets: [
      {
        label: 'Alpha',
        data: wave(),
        borderColor: '#00bcd4',
        fill: false,
      },
      {
        label: 'Beta',
        data: wave(),
        borderColor: '#ff9800',
        fill: false,
      },
      {
        label: 'Theta',
        data: wave(),
        borderColor: '#9c27b0',
        fill: false,
      },
    ],
  };
};

const CognitiveSync = () => {
  const [data, setData] = useState(generateBrainwaveData());
  const [traits, setTraits] = useState({
    focus: 72,
    creativity: 64,
    stress: 38,
    clarity: 81,
    energy: 55,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateBrainwaveData());
      setTraits({
        focus: Math.floor(Math.random() * 100),
        creativity: Math.floor(Math.random() * 100),
        stress: Math.floor(Math.random() * 100),
        clarity: Math.floor(Math.random() * 100),
        energy: Math.floor(Math.random() * 100),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12">
      {/* Brainwave Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md"
      >
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Brainwave Activity</h2>
        <Line
          data={data}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: '#ffffff',
                },
              },
            },
          }}
        />
      </motion.div>

      {/* Cognitive Trait Circular Progress Bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center"
      >
        {Object.entries(traits).map(([trait, value], index) => (
          <div key={trait}>
            <CircularProgressbar
              value={value}
              text={`${value}%`}
              styles={buildStyles({
                textColor: '#fff',
                pathColor: '#a855f7',
                trailColor: '#444',
              })}
            />
            <div className="mt-2 text-sm capitalize text-purple-200">{trait}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CognitiveSync;