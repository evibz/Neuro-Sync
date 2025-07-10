import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const NeuroChatPanel = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello, I am NeuroBot. How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || 'Something went wrong.';
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: '⚠️ Error fetching response' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg text-white p-4 rounded-xl w-full md:w-[400px] h-[600px] flex flex-col shadow-xl border border-white/20">
      <div className="text-lg font-semibold mb-3">🧠 NeuroBot Panel</div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.sender === 'user' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-2 px-4 max-w-[80%] rounded-xl text-sm ${
              msg.sender === 'user' ? 'bg-purple-500 ml-auto' : 'bg-gray-800'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        {loading && <div className="text-xs text-gray-400">NeuroBot is thinking...</div>}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 rounded-md bg-white/20 text-white outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 p-2 rounded-full hover:bg-purple-500 transition"
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
};

export default NeuroChatPanel;
