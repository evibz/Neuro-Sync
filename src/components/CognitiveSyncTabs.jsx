// src/components/CognitiveSyncTabs.jsx import React, { useState } from 'react'; import CognitiveMetrics from './tabs/CognitiveMetrics'; import MemorySync from './tabs/MemorySync'; import EEGUpload from './tabs/EEGUpload';

const tabs = [ { id: 'metrics', label: 'Cognitive Metrics' }, { id: 'memory', label: 'Memory Sync' }, { id: 'eeg', label: 'EEG Upload' }, ];

const CognitiveSyncTabs = () => { const [activeTab, setActiveTab] = useState('metrics');

const renderTab = () => { switch (activeTab) { case 'metrics': return <CognitiveMetrics />; case 'memory': return <MemorySync />; case 'eeg': return <EEGUpload />; default: return null; } };

return ( <div> <div className="flex space-x-4 mb-6"> {tabs.map((tab) => ( <button key={tab.id} className={px-4 py-2 rounded-lg text-sm font-medium transition-colors ${ activeTab === tab.id ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20' }} onClick={() => setActiveTab(tab.id)} > {tab.label} </button> ))} </div> <div>{renderTab()}</div> </div> ); };

export default CognitiveSyncTabs;

