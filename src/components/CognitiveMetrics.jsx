// src/components/CognitiveMetrics.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const generateBrainwaveData = () => {
  const labels = Array.from({ length: 20 }, (_, i) => `${i}s`);
  const wave = () => labels.map(() => Math.floor(Math.random() * 100));

  return {
    labels,
    datasets: [
      { label: 'Alpha', data: wave(), borderColor: '#00bcd4', fill: false },
      { label: 'Beta', data: wave(), borderColor: '#ff9800', fill: false },
      { label: 'Theta', data: wave(), borderColor: '#9c27b0', fill: false },
    ],
  };
};

const CognitiveMetrics = () => {
  const [data, setData] = useState(generateBrainwaveData());
  const [traits, setTraits] = useState({
    focus: 70,
    creativity: 60,
    stress: 30,
    clarity: 75,
    energy: 50,
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
      <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Brainwave Activity</h2>
        <Line
          data={data}
          options={{
            responsive: true,
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { labels: { color: '#fff' } } },
          }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {Object.entries(traits).map(([trait, value]) => (
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
            <div className="mt-2 text-sm text-purple-200 text-center capitalize">{trait}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CognitiveMetrics;
