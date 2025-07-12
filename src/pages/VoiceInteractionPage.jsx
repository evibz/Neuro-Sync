import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaStop, FaBrain, FaMoon, FaWaveSquare, FaBed } from 'react-icons/fa';

const VoiceInteractionPage = () => {
  // Existing states
  const [isListening, setIsListening] = useState(false);
  const [isSubvocalMode, setIsSubvocalMode] = useState(false);
  const [isDreamMode, setIsDreamMode] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [subvocalCommand, setSubvocalCommand] = useState('');
  const [error, setError] = useState(null);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [sleepStage, setSleepStage] = useState('awake');
  const [subliminalMessage, setSubliminalMessage] = useState('');
  const [dreamProgress, setDreamProgress] = useState(0);
  
  // New states for Neuro Echo Synthesis
  const [isNeuroEchoActive, setIsNeuroEchoActive] = useState(false);
  const [entrainmentFrequency, setEntrainmentFrequency] = useState(null);
  const [modulationIntensity, setModulationIntensity] = useState(0);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const modulationInterval = useRef(null);
  const recognitionRef = useRef(null);
  const subvocalTimeoutRef = useRef(null);
  const sleepStageTimeout = useRef(null);
  const subliminalInterval = useRef(null);

  // Simulated subvocal commands mapping
  const subvocalCommands = {
    'KeyS': 'Start meditation',
    'KeyP': 'Pause session',
    'KeyR': 'Reset session',
    'KeyN': 'Next track',
    'KeyH': 'Help menu'
  };

  // Subliminal messages for each sleep stage
  const subliminalMessages = {
    light: ["You are safe and protected", "Your mind is at peace", "Release all tension"],
    deep: ["Healing is happening", "Your body is renewing", "Deep restoration"],
    rem: ["You remember your dreams", "Creativity flows freely", "Solutions come easily"]
  };

  // Brainwave frequency bands
  const frequencyBands = {
    delta: { min: 0.5, max: 4, color: 'bg-purple-600', label: 'Delta (Deep Sleep)' },
    theta: { min: 4, max: 8, color: 'bg-indigo-600', label: 'Theta (Meditation)' },
    alpha: { min: 8, max: 12, color: 'bg-blue-600', label: 'Alpha (Relaxed)' },
    beta: { min: 12, max: 30, color: 'bg-green-600', label: 'Beta (Focused)' },
    gamma: { min: 30, max: 100, color: 'bg-cyan-600', label: 'Gamma (Peak)' }
  };

  useEffect(() => {
    // Speech Recognition Setup
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Speech Recognition API not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) final += result[0].transcript;
        else interim += result[0].transcript;
      }
      setTranscript(final + interim);
      
      // Neuro Echo: Analyze speech for modulation
      if (isNeuroEchoActive && (final || interim)) {
        analyzeSpeechForModulation(final + interim);
      }
    };

    recognition.onerror = (event) => {
      setError(event.error);
    };

    recognitionRef.current = recognition;

    // Subvocal calibration simulation
    if (isSubvocalMode && calibrationProgress < 100) {
      const interval = setInterval(() => {
        setCalibrationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isSubvocalMode, calibrationProgress, isNeuroEchoActive]);

  // Handle keyboard events for subvocal simulation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSubvocalMode || calibrationProgress < 100) return;
      
      if (subvocalCommands[e.code]) {
        const command = subvocalCommands[e.code];
        setSubvocalCommand(command);
        
        // Add to transcript
        setTranscript(prev => prev + `\n[Subvocal Command: ${command}]`);
        
        // Clear command after delay
        if (subvocalTimeoutRef.current) {
          clearTimeout(subvocalTimeoutRef.current);
        }
        subvocalTimeoutRef.current = setTimeout(() => {
          setSubvocalCommand('');
        }, 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (subvocalTimeoutRef.current) {
        clearTimeout(subvocalTimeoutRef.current);
      }
    };
  }, [isSubvocalMode, calibrationProgress]);

  // Dream-State sleep stage simulation
  useEffect(() => {
    if (!isDreamMode) {
      setSleepStage('awake');
      setSubliminalMessage('');
      setDreamProgress(0);
      if (sleepStageTimeout.current) clearTimeout(sleepStageTimeout.current);
      if (subliminalInterval.current) clearInterval(subliminalInterval.current);
      return;
    }

    // Start sleep cycle simulation
    setSleepStage('light');
    setDreamProgress(0);
    
    // Cycle through sleep stages
    const stages = ['light', 'deep', 'rem'];
    let currentStageIndex = 0;
    
    const progressSleepStage = () => {
      currentStageIndex = (currentStageIndex + 1) % stages.length;
      setSleepStage(stages[currentStageIndex]);
      setDreamProgress(0);
      
      // Schedule next stage transition
      sleepStageTimeout.current = setTimeout(progressSleepStage, 30000); // 30s per stage
    };
    
    sleepStageTimeout.current = setTimeout(progressSleepStage, 30000);

    // Deliver subliminal messages
    subliminalInterval.current = setInterval(() => {
      const messages = subliminalMessages[sleepStage];
      if (messages && messages.length > 0) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        setSubliminalMessage(messages[randomIndex]);
        
        // Add to transcript
        setTranscript(prev => prev + `\n[🌙 Subliminal: ${messages[randomIndex]}]`);
        
        // Clear after short display
        setTimeout(() => setSubliminalMessage(''), 3000);
      }
      
      // Update progress bar
      setDreamProgress(prev => (prev >= 100 ? 0 : prev + 5));
    }, 1500);

    return () => {
      if (sleepStageTimeout.current) clearTimeout(sleepStageTimeout.current);
      if (subliminalInterval.current) clearInterval(subliminalInterval.current);
    };
  }, [isDreamMode, sleepStage]);

  // Initialize Web Audio for Neuro Echo Synthesis
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
    }
  };

  // Simulate Neuro Echo modulation
  const analyzeSpeechForModulation = (speech) => {
    if (!isNeuroEchoActive) return;
    
    // Calculate speech characteristics for modulation
    const wordCount = speech.trim().split(/\s+/).length;
    const speechDuration = speech.length / 10; // Simulated duration factor
    
    // Determine target frequency band based on speech patterns
    let targetBand = 'beta'; // Default to focused state
    
    if (wordCount > 20 && speechDuration < 5) {
      targetBand = 'gamma'; // Rapid speech = peak cognition
    } else if (wordCount < 5 && speechDuration > 3) {
      targetBand = 'theta'; // Slow speech = meditative state
    } else if (wordCount < 10) {
      targetBand = 'alpha'; // Moderate speech = relaxed state
    }
    
    setEntrainmentFrequency(targetBand);
    
    // Simulate modulation intensity
    const intensity = Math.min(100, Math.floor(Math.random() * 20) + modulationIntensity);
    setModulationIntensity(intensity);
    
    // Add neuro feedback to transcript
    if (intensity > 30 && intensity % 20 === 0) {
      setTranscript(prev => prev + `\n[🧠 Neuro Echo: ${frequencyBands[targetBand].label}]`);
    }
  };

  // Start/stop Neuro Echo Synthesis
  const toggleNeuroEcho = () => {
    if (!isNeuroEchoActive) {
      initAudioContext();
      setIsNeuroEchoActive(true);
      setModulationIntensity(0);
      
      // Simulate modulation process
      modulationInterval.current = setInterval(() => {
        setModulationIntensity(prev => {
          if (prev >= 100) return 100;
          return prev + 5;
        });
      }, 500);
    } else {
      setIsNeuroEchoActive(false);
      setEntrainmentFrequency(null);
      if (modulationInterval.current) clearInterval(modulationInterval.current);
    }
    
    // Disable other modes when activating Neuro Echo
    if (isListening) toggleListening();
    if (isSubvocalMode) setIsSubvocalMode(false);
    if (isDreamMode) setIsDreamMode(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
    
    // Disable Neuro Echo when activating voice
    if (isNeuroEchoActive) setIsNeuroEchoActive(false);
  };

  const toggleSubvocalMode = () => {
    if (!isSubvocalMode) {
      setCalibrationProgress(0);
      setSubvocalCommand('');
    }
    setIsSubvocalMode(!isSubvocalMode);
    
    // Disable other modes
    if (isDreamMode) setIsDreamMode(false);
    if (isListening) toggleListening();
    if (isNeuroEchoActive) setIsNeuroEchoActive(false);
  };

  const toggleDreamMode = () => {
    setIsDreamMode(!isDreamMode);
    
    // Disable other modes
    if (isSubvocalMode) setIsSubvocalMode(false);
    if (isListening) toggleListening();
    if (isNeuroEchoActive) setIsNeuroEchoActive(false);
  };

  // Get sleep stage display info
  const getSleepStageInfo = () => {
    switch(sleepStage) {
      case 'light':
        return { name: 'Light Sleep', color: 'bg-blue-500', icon: '🌙' };
      case 'deep':
        return { name: 'Deep Sleep', color: 'bg-indigo-600', icon: '😴' };
      case 'rem':
        return { name: 'REM Sleep', color: 'bg-purple-600', icon: '💭' };
      default:
        return { name: 'Awake', color: 'bg-gray-600', icon: '👁️' };
    }
  };

  const sleepStageInfo = getSleepStageInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-400 text-center mb-6">🧠 Neuro Sync Voice</h1>

      <div className="flex flex-col items-center space-y-6">
        {/* Main Controls */}
        <div className="flex space-x-4 flex-wrap justify-center gap-3">
          <motion.button
            onClick={toggleListening}
            className={`rounded-full p-5 text-2xl shadow-xl transition transform duration-200 flex flex-col items-center ${
              isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {isListening ? <FaStop /> : <FaMicrophone />}
            <span className="text-xs mt-1">Voice</span>
          </motion.button>

          <motion.button
            onClick={toggleSubvocalMode}
            className={`rounded-full p-5 text-2xl shadow-xl transition transform duration-200 flex flex-col items-center ${
              isSubvocalMode 
                ? 'bg-cyan-600 hover:bg-cyan-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <FaBrain />
            <span className="text-xs mt-1">Subvocal</span>
          </motion.button>

          <motion.button
            onClick={toggleDreamMode}
            className={`rounded-full p-5 text-2xl shadow-xl transition transform duration-200 flex flex-col items-center ${
              isDreamMode 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <FaMoon />
            <span className="text-xs mt-1">Dream</span>
          </motion.button>
          
          <motion.button
            onClick={toggleNeuroEcho}
            className={`rounded-full p-5 text-2xl shadow-xl transition transform duration-200 flex flex-col items-center ${
              isNeuroEchoActive 
                ? 'bg-gradient-to-br from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700' 
                : 'bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <FaWaveSquare />
            <span className="text-xs mt-1">Neuro Echo</span>
          </motion.button>
        </div>

        {/* Subvocal Mode UI */}
        {isSubvocalMode && (
          <div className="w-full max-w-md p-4 bg-gray-800/50 rounded-xl border border-cyan-500/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-cyan-400 font-semibold">
                Subvocal Mode {calibrationProgress < 100 ? '(Calibrating)' : '(Ready)'}
              </span>
              <span className="text-xs bg-cyan-900 px-2 py-1 rounded">
                {calibrationProgress}%
              </span>
            </div>
            
            <div className="h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
              <motion.div 
                className="h-full bg-cyan-500"
                initial={{ width: '0%' }}
                animate={{ width: `${calibrationProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {calibrationProgress < 100 ? (
              <p className="text-center text-sm text-cyan-300">
                Calibrating neural sensors... Focus on the interface
              </p>
            ) : (
              <>
                {subvocalCommand ? (
                  <motion.div 
                    className="text-center py-3 bg-cyan-900/40 rounded-lg border border-cyan-500"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                  >
                    <p className="text-lg font-bold text-cyan-300">Command Detected:</p>
                    <p className="text-xl mt-1">{subvocalCommand}</p>
                  </motion.div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-cyan-300 mb-3">Think commands silently:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(subvocalCommands).map(([key, cmd]) => (
                        <div key={key} className="bg-gray-700/50 p-2 rounded">
                          <kbd className="bg-cyan-900 px-1.5 py-0.5 rounded mr-2">
                            {key.replace('Key', '')}
                          </kbd>
                          {cmd}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Dream State UI */}
        {isDreamMode && (
          <div className="w-full max-w-md p-4 bg-gray-800/50 rounded-xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className={`${sleepStageInfo.color} w-3 h-3 rounded-full`}></span>
                <span className="text-purple-300 font-semibold">
                  {sleepStageInfo.icon} {sleepStageInfo.name}
                </span>
              </div>
              <div className="flex items-center">
                <FaBed className="text-purple-400 mr-2" />
                <span className="text-xs bg-purple-900 px-2 py-1 rounded">
                  {dreamProgress}%
                </span>
              </div>
            </div>
            
            <div className="h-2 bg-gray-700 rounded-full mb-4 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: '0%' }}
                animate={{ width: `${dreamProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {subliminalMessage ? (
              <motion.div 
                className="text-center py-3 bg-purple-900/30 rounded-lg border border-purple-500/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xs text-purple-400 mb-1">Subliminal Message Delivered</p>
                <p className="text-lg italic text-purple-200">{subliminalMessage}</p>
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-4"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              >
                <p className="text-purple-300 mb-2">Monitoring sleep stages...</p>
                <p className="text-xs text-purple-400">
                  Delivering ultra-low frequency voice cues at optimal moments
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Neuro Echo Synthesis UI */}
        {isNeuroEchoActive && (
          <div className="w-full max-w-2xl p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-green-500/30">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-400">
                🧠 Neuro Echo Synthesis
              </h2>
              <div className="flex items-center">
                <span className="text-xs bg-green-900 px-2 py-1 rounded mr-2">
                  Modulation: {modulationIntensity}%
                </span>
                {entrainmentFrequency && (
                  <span className={`text-xs ${frequencyBands[entrainmentFrequency].color} px-2 py-1 rounded`}>
                    {entrainmentFrequency.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Frequency Visualization */}
            <div className="relative h-32 mb-4 rounded-lg bg-gray-900/50 border border-green-500/20 overflow-hidden">
              {/* Base waveform */}
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 w-px bg-green-400/30"
                  style={{ left: `${i}%` }}
                  animate={{ 
                    height: [
                      `${5 + Math.sin(i/3) * 10}%`, 
                      `${15 + Math.sin(i/2) * 30}%`,
                      `${5 + Math.sin(i/4) * 15}%`
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.01
                  }}
                />
              ))}

              {/* Modulated frequency layer */}
              {entrainmentFrequency && (
                <div className="absolute inset-0">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-0 w-1 bg-cyan-400 rounded-full"
                      style={{ left: `${i*2}%` }}
                      animate={{ 
                        height: [
                          `${Math.random() * 20}%`,
                          `${30 + Math.random() * 50}%`,
                          `${10 + Math.random() * 30}%`
                        ],
                        opacity: [0.2, 0.7, 0.2]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Center frequency indicator */}
              {entrainmentFrequency && (
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-4xl text-cyan-300 mb-1">
                    {entrainmentFrequency === 'delta' && 'Δ'}
                    {entrainmentFrequency === 'theta' && 'θ'}
                    {entrainmentFrequency === 'alpha' && 'α'}
                    {entrainmentFrequency === 'beta' && 'β'}
                    {entrainmentFrequency === 'gamma' && 'γ'}
                  </div>
                  <p className="text-green-300 font-mono">
                    {Math.round(frequencyBands[entrainmentFrequency].min)}-
                    {Math.round(frequencyBands[entrainmentFrequency].max)} Hz
                  </p>
                </motion.div>
              )}
            </div>

            {/* Frequency Band Indicators */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {Object.entries(frequencyBands).map(([band, info]) => (
                <div 
                  key={band}
                  className={`p-2 rounded text-center cursor-pointer transition-all ${
                    entrainmentFrequency === band 
                      ? 'ring-2 ring-white scale-105' 
                      : 'opacity-70 hover:opacity-100'
                  } ${info.color}`}
                  onClick={() => setEntrainmentFrequency(band)}
                >
                  <div className="font-bold">{band.toUpperCase()}</div>
                  <div className="text-xs">{info.label.split(' ')[0]}</div>
                </div>
              ))}
            </div>

            <p className="text-green-300 text-center text-sm">
              Real-time voice modulation embedding {entrainmentFrequency || 'brainwave'} frequencies
            </p>
          </div>
        )}

        {/* Waveform animation */}
        {isListening && !isSubvocalMode && !isDreamMode && !isNeuroEchoActive && (
          <div className="flex space-x-1 items-end h-16">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-cyan-400 rounded"
                animate={{ height: ['0.5rem', '2rem', '1rem', '2.5rem', '0.5rem'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: i * 0.1 }}
              />
            ))}
          </div>
        )}

        {/* Neural waves for subvocal mode */}
        {isSubvocalMode && calibrationProgress >= 100 && !isDreamMode && !isNeuroEchoActive && (
          <div className="flex space-x-1 items-end h-16">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-t-full"
                animate={{ height: ['0.5rem', '2.5rem', '1.5rem', '3rem', '0.5rem'] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: 'easeInOut', 
                  delay: i * 0.3,
                  repeatType: 'reverse'
                }}
              />
            ))}
          </div>
        )}

        {/* Dream-state visualization */}
        {isDreamMode && !isNeuroEchoActive && (
          <motion.div 
            className="relative w-full max-w-md h-32 rounded-xl overflow-hidden border border-purple-500/30"
            animate={{ 
              background: [
                'linear-gradient(45deg, #0f172a, #1e293b, #0f172a)',
                'linear-gradient(45deg, #0f172a, #1e293b, #0f172a, #2e1065)',
                'linear-gradient(45deg, #0f172a, #1e293b, #0f172a)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            {/* Floating dream elements */}
            <motion.div 
              className="absolute text-4xl"
              initial={{ top: '30%', left: '-10%' }}
              animate={{ left: '110%' }}
              transition={{ duration: 15, repeat: Infinity, delay: 0 }}
            >
                💭
            </motion.div>
            <motion.div 
              className="absolute text-3xl"
              initial={{ top: '50%', left: '-10%' }}
              animate={{ left: '110%' }}
              transition={{ duration: 18, repeat: Infinity, delay: 3 }}
            >
                🌙
            </motion.div>
            <motion.div 
              className="absolute text-2xl"
              initial={{ top: '70%', left: '-10%' }}
              animate={{ left: '110%' }}
              transition={{ duration: 12, repeat: Infinity, delay: 6 }}
            >
                ✨
            </motion.div>
            
            {/* Pulsing center orb */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity 
              }}
            />
            
            {/* Low-frequency waves */}
            <motion.div 
              className="absolute bottom-0 w-full h-8 bg-purple-400"
              animate={{ height: ['0.5rem', '1.5rem', '0.5rem'] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ opacity: 0.3 }}
            />
          </motion.div>
        )}

        {/* Transcription */}
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-xl max-w-2xl w-full text-left">
          <p className="text-sm text-gray-400 mb-1">
            {isDreamMode ? 'Dream Journal' : 
             isSubvocalMode ? 'Neural Interface' : 
             isNeuroEchoActive ? 'Neuro Feedback' :
             'Real-Time Transcription'}:
          </p>
          <div className="text-lg font-mono text-purple-200 min-h-[4rem] max-h-40 overflow-y-auto whitespace-pre-wrap">
            {transcript || (
              isDreamMode ? 'Sleep monitoring in progress...' : 
              isSubvocalMode ? 'Calibrating neural sensors...' : 
              isNeuroEchoActive ? 'Speak to activate neural modulation...' :
              'Start speaking...'
            )}
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-400 mt-4">Error: {error}</p>}
      </div>
    </div>
  );
};

export default VoiceInteractionPage;