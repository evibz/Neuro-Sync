import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaVolumeUp, FaLightbulb, FaMapMarkerAlt, FaHeadphones, FaSun, FaMoon } from 'react-icons/fa';

const NeuroAugmentationPage = () => {
  const navigate = useNavigate();
  
  // Environment states
  const [noiseLevel, setNoiseLevel] = useState('moderate');
  const [lighting, setLighting] = useState('bright');
  const [location, setLocation] = useState('office');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [adaptiveSuggestions, setAdaptiveSuggestions] = useState([]);
  
  // Simulate environment sensing
  useEffect(() => {
    // Simulate real-time environment detection
    const environmentInterval = setInterval(() => {
      // Randomly change environment conditions
      const noiseLevels = ['low', 'moderate', 'high'];
      const lightingLevels = ['dark', 'dim', 'bright'];
      const locations = ['home', 'office', 'public', 'commute'];
      
      setNoiseLevel(noiseLevels[Math.floor(Math.random() * noiseLevels.length)]);
      setLighting(lightingLevels[Math.floor(Math.random() * lightingLevels.length)]);
      setLocation(locations[Math.floor(Math.random() * locations.length)]);
    }, 10000); // Change every 10 seconds
    
    return () => clearInterval(environmentInterval);
  }, []);
  
  // Generate adaptive suggestions based on environment
  useEffect(() => {
    const suggestions = [];
    
    // Noise-based suggestions
    if (noiseLevel === 'high') {
      suggestions.push({
        icon: <FaHeadphones className="text-purple-400" />,
        text: 'Enable noise cancellation for better focus',
        action: () => alert('Noise cancellation activated')
      });
    }
    
    // Lighting-based suggestions
    if (lighting === 'dark') {
      suggestions.push({
        icon: <FaSun className="text-yellow-400" />,
        text: 'Increase screen brightness for better visibility',
        action: () => alert('Screen brightness increased')
      });
    } else if (lighting === 'bright') {
      suggestions.push({
        icon: <FaMoon className="text-blue-400" />,
        text: 'Reduce screen brightness for eye comfort',
        action: () => alert('Screen brightness decreased')
      });
    }
    
    // Location-based suggestions
    if (location === 'public') {
      suggestions.push({
        icon: <FaVolumeUp className="text-green-400" />,
        text: 'Switch to private audio mode for discretion',
        action: () => alert('Private audio mode activated')
      });
    } else if (location === 'commute') {
      suggestions.push({
        icon: <FaMapMarkerAlt className="text-red-400" />,
        text: 'Enable travel-friendly interface',
        action: () => alert('Travel mode activated')
      });
    }
    
    // General suggestions
    suggestions.push({
      icon: <div className="w-4 h-4 rounded-full bg-purple-500"></div>,
      text: 'Adjust neural feedback intensity based on surroundings',
      action: () => alert('Neural feedback optimized')
    });
    
    setAdaptiveSuggestions(suggestions);
  }, [noiseLevel, lighting, location]);
  
  // Toggle focus mode
  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
    alert(`Focus mode ${isFocusMode ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white p-6 transition-all duration-500 ${isFocusMode ? 'brightness-90' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-sm text-purple-300 hover:text-purple-500 mb-6 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-purple-400 mb-2 text-center">🧠 Neuro Augmentation</h1>
        <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-10">
          Context-aware environment sensing adjusts your experience based on ambient conditions
        </p>
        
        {/* Environment Sensing Dashboard */}
        <div className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-indigo-500/30 p-6 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">Environment Sensing</h2>
            <button 
              onClick={toggleFocusMode}
              className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                isFocusMode 
                  ? 'bg-purple-700 hover:bg-purple-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              } transition`}
            >
              <span className="mr-2">Focus Mode</span>
              <div className={`w-3 h-3 rounded-full ${isFocusMode ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Noise Level Card */}
            <div className="bg-gray-900/50 rounded-xl p-5 border border-blue-500/30">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-900/50 rounded-lg mr-3">
                  <FaVolumeUp className="text-xl text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold">Ambient Noise</h3>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      noiseLevel === 'low' ? 'w-1/3 bg-green-500' : 
                      noiseLevel === 'moderate' ? 'w-2/3 bg-yellow-500' : 
                      'w-full bg-red-500'
                    }`}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-300">
                {noiseLevel === 'low' ? 'Quiet environment detected' : 
                 noiseLevel === 'moderate' ? 'Moderate background noise' : 
                 'High noise levels detected'}
              </p>
            </div>
            
            {/* Lighting Card */}
            <div className="bg-gray-900/50 rounded-xl p-5 border border-yellow-500/30">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-yellow-900/50 rounded-lg mr-3">
                  <FaLightbulb className="text-xl text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold">Lighting</h3>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Dark</span>
                    <span>Bright</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        lighting === 'dark' ? 'w-1/3 bg-gray-500' : 
                        lighting === 'dim' ? 'w-2/3 bg-yellow-600' : 
                        'w-full bg-yellow-400'
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-2xl">
                  {lighting === 'dark' ? <FaMoon className="text-blue-400" /> : 
                   lighting === 'dim' ? <FaLightbulb className="text-yellow-500" /> : 
                   <FaSun className="text-yellow-400" />}
                </div>
              </div>
              
              <p className="text-sm text-gray-300">
                {lighting === 'dark' ? 'Low light environment' : 
                 lighting === 'dim' ? 'Moderate lighting' : 
                 'Bright environment detected'}
              </p>
            </div>
            
            {/* Location Card */}
            <div className="bg-gray-900/50 rounded-xl p-5 border border-purple-500/30">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-900/50 rounded-lg mr-3">
                  <FaMapMarkerAlt className="text-xl text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold">Location Context</h3>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="bg-gray-800 p-3 rounded-lg mr-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold bg-gradient-to-br from-purple-600 to-indigo-600">
                    {location === 'home' ? 'H' : 
                     location === 'office' ? 'O' : 
                     location === 'public' ? 'P' : 'C'}
                  </div>
                </div>
                <div>
                  <p className="font-medium">
                    {location === 'home' ? 'At Home' : 
                     location === 'office' ? 'In Office' : 
                     location === 'public' ? 'Public Space' : 'Commuting'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {location === 'home' ? 'Private environment' : 
                     location === 'office' ? 'Work setting detected' : 
                     location === 'public' ? 'Public area' : 'On the move'}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-300">
                Adjusting interface for {location} environment
              </p>
            </div>
          </div>
          
          {/* Adaptive Suggestions */}
          <div className="bg-gray-900/40 rounded-xl p-5 border border-green-500/30">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Adaptive Suggestions</h3>
            
            <div className="space-y-3">
              {adaptiveSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                  onClick={suggestion.action}
                >
                  <div className="text-xl mr-3">{suggestion.icon}</div>
                  <p className="text-gray-200">{suggestion.text}</p>
                  <div className="ml-auto text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                    Apply
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-cyan-500/30 p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Environment Visualization</h3>
            <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-700">
              {/* Background based on lighting */}
              <div className={`absolute inset-0 transition-all duration-1000 ${
                lighting === 'dark' ? 'bg-gray-900' : 
                lighting === 'dim' ? 'bg-gray-800' : 'bg-gray-700'
              }`}></div>
              
              {/* Noise visualization */}
              <div className="absolute bottom-0 left-0 right-0 h-16">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute bottom-0 w-1 bg-blue-400 rounded-t-lg"
                    style={{
                      left: `${(i / 30) * 100}%`,
                      height: `${noiseLevel === 'low' ? 10 + Math.random() * 20 : 
                              noiseLevel === 'moderate' ? 20 + Math.random() * 40 : 
                              30 + Math.random() * 60}%`,
                      opacity: noiseLevel === 'low' ? 0.4 : noiseLevel === 'moderate' ? 0.7 : 1
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Location elements */}
              {location === 'home' && (
                <>
                  <div className="absolute left-1/4 top-1/3 w-12 h-12 bg-yellow-500 rounded-full blur-md opacity-30"></div>
                  <div className="absolute left-1/3 top-1/4 w-16 h-16 bg-gray-800 rounded-lg"></div>
                  <div className="absolute left-1/3 top-1/4 w-12 h-12 bg-gray-700 rounded-lg"></div>
                </>
              )}
              
              {location === 'office' && (
                <>
                  <div className="absolute left-1/4 top-1/3 w-16 h-16 bg-blue-900 rounded-lg"></div>
                  <div className="absolute left-1/2 top-1/4 w-20 h-12 bg-gray-800 rounded-lg"></div>
                  <div className="absolute left-2/3 top-1/3 w-12 h-16 bg-gray-700 rounded-lg"></div>
                </>
              )}
              
              {location === 'public' && (
                <>
                  <div className="absolute left-1/4 top-1/3 w-8 h-8 bg-purple-500 rounded-full blur-sm opacity-20"></div>
                  <div className="absolute left-1/2 top-1/4 w-8 h-8 bg-blue-500 rounded-full blur-sm opacity-20"></div>
                  <div className="absolute left-2/3 top-1/3 w-8 h-8 bg-green-500 rounded-full blur-sm opacity-20"></div>
                </>
              )}
              
              {location === 'commute' && (
                <>
                  <div className="absolute left-1/4 top-1/3 w-12 h-4 bg-yellow-400 rounded-full blur-sm"></div>
                  <div className="absolute left-1/2 top-1/4 w-16 h-6 bg-red-400 rounded-full blur-sm"></div>
                  <div className="absolute left-2/3 top-1/3 w-10 h-5 bg-blue-400 rounded-full blur-sm"></div>
                </>
              )}
              
              {/* Focus mode indicator */}
              {isFocusMode && (
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-green-400 animate-ping absolute"></div>
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-md rounded-xl border border-purple-500/30 p-6">
            <h3 className="text-xl font-bold text-purple-400 mb-4">How It Works</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-900/50 p-2 rounded-lg mr-4">
                  <div className="text-xl">🌐</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Real-Time Sensing</h4>
                  <p className="text-gray-300 text-sm">
                    Continuously monitors your environment using device sensors to detect noise levels, 
                    ambient light, and location context.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cyan-900/50 p-2 rounded-lg mr-4">
                  <div className="text-xl">🧠</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Adaptive Neuro Feedback</h4>
                  <p className="text-gray-300 text-sm">
                    Adjusts neural stimulation patterns based on environmental factors to optimize 
                    cognitive enhancement and minimize distractions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-900/50 p-2 rounded-lg mr-4">
                  <div className="text-xl">✨</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Personalized Experience</h4>
                  <p className="text-gray-300 text-sm">
                    Learns your preferences over time to provide more accurate environmental adaptations 
                    and cognitive enhancement strategies.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-yellow-400 mb-2">Current Environment Profile</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Noise:</span>
                    <span className="font-medium capitalize">{noiseLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lighting:</span>
                    <span className="font-medium capitalize">{lighting}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location:</span>
                    <span className="font-medium capitalize">{location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Focus Mode:</span>
                    <span className="font-medium">{isFocusMode ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroAugmentationPage;