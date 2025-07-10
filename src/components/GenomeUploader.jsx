import React, { useState } from 'react';

const GenomeUploader = () => {
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const preview = content.split('\n').slice(0, 10).join('\n');
      setFilePreview(preview);
    };
    reader.readAsText(file);
  };

  return (
    <div className="mt-12 bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md">
      <h3 className="text-2xl font-semibold mb-4 text-purple-300">🧬 Upload Genome / EEG Data</h3>

      <input
        type="file"
        accept=".txt,.csv,.edf"
        onChange={handleFileUpload}
        className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
      />

      {fileName && (
        <div className="mt-4 text-sm text-gray-300">
          <p><strong>Uploaded:</strong> {fileName}</p>
          <pre className="bg-black/30 mt-2 p-3 rounded-md text-xs whitespace-pre-wrap">
            {filePreview}
          </pre>
        </div>
      )}
    </div>
  );
};

export default GenomeUploader;
