// src/components/EEGUpload.jsx
import React from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

const EEGUpload = () => {
  return (
    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg text-white space-y-6">
      <div className="flex items-center gap-4">
        <FaCloudUploadAlt className="text-3xl text-cyan-400" />
        <div>
          <h2 className="text-xl font-semibold">Upload EEG Data</h2>
          <p className="text-sm text-gray-300">Simulated only for now</p>
        </div>
      </div>

      <input
        type="file"
        disabled
        className="w-full p-2 rounded bg-white/10 border border-gray-600 cursor-not-allowed"
        title="Simulated only"
      />

      <div className="mt-6">
        <h3 className="text-lg text-purple-300 mb-2">Last Simulated EEG Data</h3>
        <p className="text-sm text-gray-300">Alpha: ↑ Moderate | Beta: ↓ Calm | Delta: ↑↑ Deep Focus</p>
      </div>
    </div>
  );
};

export default EEGUpload;
