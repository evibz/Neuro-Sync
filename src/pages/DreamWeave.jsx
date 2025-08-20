import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Environment, Float } from '@react-three/drei';
import { FaCloudMoon, FaSearch, FaPlus, FaMagic, FaStar, FaBook, FaChartBar, FaBrain, FaTimes } from 'react-icons/fa';
import { GiStaryu, GiNightSleep } from 'react-icons/gi';

const DreamWeave = () => {
  const [dreams, setDreams] = useState([]);
  const [newDream, setNewDream] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('log');
  const [generatingStory, setGeneratingStory] = useState(false);
  const [dreamStory, setDreamStory] = useState('');
  const [mood, setMood] = useState('neutral');
  const [selectedDream, setSelectedDream] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('night');
  const [stats, setStats] = useState({
    totalDreams: 0,
    avgLength: 0,
    commonSymbols: []
  });

  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on load
    inputRef.current?.focus();
    
    // Calculate stats when dreams change
    if (dreams.length > 0) {
      const total = dreams.length;
      const lengths = dreams.map(d => d.text.split(' ').length);
      const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / total);
      
      // Count symbols
      const symbolCounts = {};
      dreams.forEach(dream => {
        dream.symbols?.forEach(symbol => {
          symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
        });
      });
      
      const commonSymbols = Object.entries(symbolCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([symbol]) => symbol);
      
      setStats({ totalDreams: total, avgLength: avg, commonSymbols });
    } else {
      setStats({ totalDreams: 0, avgLength: 0, commonSymbols: [] });
    }
  }, [dreams]);

  const handleAddDream = () => {
    if (!newDream.trim()) return;
    
    const entry = {
      id: Date.now(),
      text: newDream,
      timestamp: new Date().toLocaleString(),
      date: new Date(),
      mood,
      symbols: []
    };
    
    setDreams([entry, ...dreams]);
    setNewDream('');
    setMood('neutral');
  };

  const handleAnalyze = async (dream) => {
    setAnalyzing(true);
    setAnalysis(null);
    setDreamStory('');
    setSelectedDream(dream);
    
    // Simulated AI Analysis with multiple interpretations
    setTimeout(() => {
      const possibleSymbols = [
        ['water', 'flying', 'darkness'],
        ['forest', 'chase', 'mirror'],
        ['ocean', 'falling', 'light'],
        ['castle', 'flight', 'unknown'],
        ['door', 'animal', 'vehicle']
      ];
      
      const possibleMeanings = [
        'You are undergoing emotional transformation with a sense of freedom and hidden fears.',
        'You may be avoiding confronting an issue in your waking life that requires attention.',
        'Your subconscious is signaling a need for change and new perspectives.',
        'There is untapped creativity within you waiting to be expressed.',
        'You may be feeling uncertain about a decision or direction in life.'
      ];
      
      const possibleEmotions = ['anxious', 'hopeful', 'confused', 'excited', 'peaceful'];
      
      const symbols = possibleSymbols[Math.floor(Math.random() * possibleSymbols.length)];
      const meaning = possibleMeanings[Math.floor(Math.random() * possibleMeanings.length)];
      const emotion = possibleEmotions[Math.floor(Math.random() * possibleEmotions.length)];
      
      // Update dream with symbols
      const updatedDreams = dreams.map(d => 
        d.id === dream.id ? {...d, symbols} : d
      );
      setDreams(updatedDreams);
      
      setAnalysis({
        symbols,
        meaning,
        emotion,
        insights: [
          'Recurring symbols suggest a pattern in your subconscious mind',
          'The emotional tone matches your recent life experiences',
          'This dream connects to events from 2 days ago'
        ]
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleGenerateStory = () => {
    if (!analysis) return;
    
    setGeneratingStory(true);
    setTimeout(() => {
      const stories = [
        `In the realm of dreams, you found yourself surrounded by ${analysis.symbols[0]}. As you navigated through this landscape, a sense of ${analysis.emotion} washed over you. Suddenly, ${analysis.symbols[1]} appeared, offering a path forward that filled you with wonder and curiosity.`,
        `The dream began with ${analysis.symbols.join(' and ')} dancing in harmony. You felt ${analysis.emotion} yet compelled to explore further. This journey through your subconscious revealed hidden truths about your waking life.`,
        `As you drifted into slumber, ${analysis.symbols[0]} emerged as the central theme. The experience was permeated with ${analysis.emotion}, reflecting your current emotional state. By dream's end, ${analysis.symbols[1]} provided a surprising resolution.`
      ];
      
      setDreamStory(stories[Math.floor(Math.random() * stories.length)]);
      setGeneratingStory(false);
    }, 3000);
  };

  const filteredDreams = dreams.filter(dream => 
    dream.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dream.symbols?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getMoodColor = (mood) => {
    const colors = {
      happy: 'bg-yellow-500',
      sad: 'bg-blue-500',
      anxious: 'bg-red-500',
      excited: 'bg-orange-500',
      peaceful: 'bg-green-500',
      neutral: 'bg-purple-500'
    };
    return colors[mood] || 'bg-purple-500';
  };

  const MoodSelector = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {['happy', 'sad', 'anxious', 'excited', 'peaceful', 'neutral'].map(m => (
        <motion.button
          key={m}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 rounded-full text-sm capitalize ${getMoodColor(m)} ${mood === m ? 'ring-2 ring-white' : 'opacity-70'}`}
          onClick={() => setMood(m)}
        >
          {m}
        </motion.button>
      ))}
    </div>
  );

  const DreamMap = () => (
  <div className="h-[400px] rounded-xl overflow-hidden shadow-2xl relative">
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#9d4edd" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4cc9f0" />
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        autoRotate={true} 
        autoRotateSpeed={0.5}
      />
      
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} />
      
      {dreams.slice(0, 5).map((dream, i) => {
        const angle = (i / dreams.length) * Math.PI * 2;
        const radius = 5 + Math.random() * 3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = -2 + Math.random() * 4;
        
        return (
          <Float key={dream.id} speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[x, y, z]}>
              <icosahedronGeometry args={[0.7, 1]} />
              <meshStandardMaterial 
                color={getMoodColor(dream.mood).replace('bg-', '#').slice(0, 7)} 
                emissive={getMoodColor(dream.mood).replace('bg-', '#').slice(0, 7)}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
              {dream.symbols && dream.symbols.length > 0 && (
                <Text
                  position={[0, 0, 1.5]}
                  fontSize={0.3}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  {dream.symbols[0]}
                </Text>
              )}
            </mesh>
          </Float>
        );
      })}
      
      {/* Central dream sphere */}
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial 
            color="#7b2cbf" 
            emissive="#5a189a"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
          <Text
            position={[0, 0, 1.6]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {dreams.length > 0 ? dreams[0].symbols?.[0] || 'Dream' : 'Dream'}
          </Text>
        </mesh>
      </Float>
    </Canvas>
    
    <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded-lg">
      <div className="flex items-center gap-2">
        <GiStaryu className="text-purple-400" />
        <span>{dreams.length} dream{dreams.length !== 1 ? 's' : ''} mapped</span>
      </div>
    </div>
  </div>
);

  const DreamDetail = ({ dream, onClose }) => (
    <motion.div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{dream.text.substring(0, 40)}{dream.text.length > 40 && '...'}</h2>
              <div className="text-sm text-gray-400 mt-1">{dream.timestamp}</div>
            </div>
            <div className={`px-3 py-1 rounded-full ${getMoodColor(dream.mood)}`}>
              {dream.mood}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Full Dream:</h3>
            <p className="bg-gray-800 rounded-lg p-4">{dream.text}</p>
          </div>
          
          {dream.symbols && dream.symbols.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Symbols:</h3>
              <div className="flex flex-wrap gap-2">
                {dream.symbols.map((symbol, idx) => (
                  <span key={idx} className="bg-purple-900 px-3 py-1 rounded-full">
                    {symbol}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <button 
            className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-xl w-full flex items-center justify-center gap-2"
            onClick={() => handleAnalyze(dream)}
          >
            <FaMagic /> Re-analyze with AI
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme === 'night' ? 'from-[#0f0c29] via-[#302b63] to-[#24243e]' : 'from-[#4a00e0] via-[#8e2de2] to-[#4a00e0]'} text-white p-4 md:p-6`}>
      <header className="flex justify-between items-center mb-8">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GiNightSleep className="text-4xl text-purple-400" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            DreamWeave
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
            onClick={() => setTheme(theme === 'night' ? 'purple' : 'night')}
            aria-label="Toggle theme"
          >
            <FaCloudMoon className="text-xl" />
          </motion.button>
        </div>
      </header>

      <motion.section 
        className="mb-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-2">
              <FaPlus className="text-purple-400" />
              <h3 className="text-lg font-semibold">Log New Dream</h3>
            </div>
            
            <textarea
              ref={inputRef}
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 shadow-inner min-h-[120px]"
              placeholder="Describe your dream in detail..."
              value={newDream}
              onChange={(e) => setNewDream(e.target.value)}
              aria-label="Dream description input"
            />
            
            <MoodSelector />
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddDream}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              disabled={!newDream.trim()}
              aria-label="Log new dream"
            >
              <FaPlus /> Log Dream
            </motion.button>
            
            <div className="bg-gray-800 rounded-xl p-4">
              <h4 className="text-sm font-medium mb-2">Dream Stats</h4>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Total Dreams:</span>
                  <span className="font-semibold">{stats.totalDreams}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Length:</span>
                  <span className="font-semibold">{stats.avgLength} words</span>
                </div>
                {stats.commonSymbols.length > 0 && (
                  <div>
                    <div>Common Symbols:</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {stats.commonSymbols.map((s, i) => (
                        <span key={i} className="bg-purple-900 px-2 py-0.5 rounded-full text-xs">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-3 bg-gray-900/50 backdrop-blur-sm rounded-xl p-3">
            <button 
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'log' ? 'bg-purple-700' : 'hover:bg-gray-800'}`}
              onClick={() => setActiveTab('log')}
            >
              <div className="flex items-center gap-2">
                <FaBook /> Dream Log
              </div>
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'analysis' ? 'bg-purple-700' : 'hover:bg-gray-800'}`}
              onClick={() => setActiveTab('analysis')}
            >
              <div className="flex items-center gap-2">
                <FaBrain /> Analysis
              </div>
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'stats' ? 'bg-purple-700' : 'hover:bg-gray-800'}`}
              onClick={() => setActiveTab('stats')}
            >
              <div className="flex items-center gap-2">
                <FaChartBar /> Statistics
              </div>
            </button>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 pl-10 rounded-xl bg-gray-800 border border-gray-700 shadow-inner"
                placeholder="Search dreams or symbols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search dreams"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {activeTab === 'log' && (
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2">
              {filteredDreams.length === 0 ? (
                <div className="col-span-2 text-center py-10 text-gray-400">
                  <GiNightSleep className="text-4xl mx-auto mb-3" />
                  <p>No dreams found. Start by logging your first dream!</p>
                </div>
              ) : (
                filteredDreams.map((dream) => (
                  <motion.div
                    key={dream.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-gray-800 rounded-xl p-4 shadow-inner hover:bg-gray-700 cursor-pointer relative group"
                    onClick={() => {
                      setSelectedDream(dream);
                      setShowDetail(true);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-gray-400">{dream.timestamp}</div>
                        <div className="text-lg font-medium mt-1 truncate">{dream.text}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getMoodColor(dream.mood)}`}></div>
                    </div>
                    
                    {dream.symbols && dream.symbols.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {dream.symbols.slice(0, 3).map((symbol, idx) => (
                          <span key={idx} className="bg-purple-900 px-2 py-1 rounded-full text-xs">
                            {symbol}
                          </span>
                        ))}
                        {dream.symbols.length > 3 && (
                          <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">
                            +{dream.symbols.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="bg-purple-700 hover:bg-purple-800 p-2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnalyze(dream);
                          setActiveTab('analysis');
                        }}
                        aria-label="Analyze dream"
                      >
                        <FaMagic size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
        
        {activeTab === 'analysis' && (
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-5">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaMagic /> AI Dream Analysis
                </h2>
                
                {analyzing && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                    <div className="animate-pulse text-purple-400">Analyzing dream symbols...</div>
                  </div>
                )}
                
                {analysis && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">Dream:</span>
                        <span className="text-sm text-gray-400">{selectedDream?.timestamp}</span>
                      </div>
                      <p className="bg-gray-900 rounded-lg p-3 italic">
                        "{selectedDream?.text.substring(0, 120)}{selectedDream?.text.length > 120 && '...'}"
                      </p>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-2">Symbols Detected:</div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.symbols.map((symbol, idx) => (
                          <span key={idx} className="bg-purple-900 px-3 py-1 rounded-full">
                            {symbol}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-2">Emotional Tone:</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${getMoodColor(analysis.emotion)}`}></div>
                        <span className="capitalize">{analysis.emotion}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-2">Interpretation:</div>
                      <p className="bg-gray-900 rounded-lg p-3">{analysis.meaning}</p>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-2">Insights:</div>
                      <ul className="space-y-2">
                        {analysis.insights.map((insight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <FaStar className="text-yellow-400 mt-1 flex-shrink-0" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        onClick={handleGenerateStory}
                        className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 px-4 py-2 rounded-xl w-full flex items-center justify-center gap-2 disabled:opacity-50"
                        disabled={generatingStory}
                      >
                        {generatingStory ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <FaBook /> Create Dream Story
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {!analyzing && !analysis && (
                  <div className="text-center py-10 text-gray-400">
                    <FaMagic className="text-3xl mx-auto mb-3" />
                    <p>Select a dream to analyze it with AI</p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-800 rounded-xl p-5">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaBook /> Dream Story
                </h2>
                
                {dreamStory ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-900 rounded-lg p-4 h-full"
                  >
                    <div className="text-lg italic mb-4">"Once upon a dream..."</div>
                    <p className="whitespace-pre-line leading-relaxed">{dreamStory}</p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-10 text-gray-400">
                    <FaBook className="text-3xl mb-3" />
                    <p className="text-center">
                      {analysis 
                        ? 'Generate a creative story based on your dream analysis' 
                        : 'Analyze a dream first to generate a story'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'stats' && (
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaChartBar /> Dream Statistics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-medium mb-4">Dream Distribution</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Total Dreams</span>
                      <span className="font-bold">{stats.totalDreams}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, stats.totalDreams * 10)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Average Length</span>
                      <span className="font-bold">{stats.avgLength} words</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, stats.avgLength)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-medium mb-4">Symbol Frequency</h3>
                
                {stats.commonSymbols.length > 0 ? (
                  <div className="space-y-3">
                    {stats.commonSymbols.map((symbol, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="capitalize">{symbol}</span>
                          <span className="font-bold">
                            {dreams.filter(d => d.symbols?.includes(symbol)).length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-pink-600 h-2.5 rounded-full" 
                            style={{ 
                              width: `${Math.min(100, 
                                (dreams.filter(d => d.symbols?.includes(symbol)).length / dreams.length) * 100
                              )}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 h-full flex items-center justify-center py-6">
                    No symbols analyzed yet
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </section>

      <motion.section 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <GiStaryu className="text-purple-400" /> Dream World 3D Map
        </h2>
        <DreamMap />
      </motion.section>
      
      <footer className="mt-10 text-center text-gray-400 text-sm">
        <p>DreamWeave &copy; {new Date().getFullYear()} - Unlock the secrets of your subconscious</p>
      </footer>
      
      <AnimatePresence>
        {showDetail && selectedDream && (
          <DreamDetail dream={selectedDream} onClose={() => setShowDetail(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DreamWeave;