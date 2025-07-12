import React, { useState, useRef, useEffect } from "react";

const NeuroChatPanel = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are NeuroBot, an intelligent assistant developed for the Neuro Sync platform.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const updatedMessages = [...messages, { role: "user", content: trimmed }];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();
      console.log("GPT response:", data);

      if (data.choices && data.choices.length > 0) {
        const botReply = data.choices[0].message.content;
        setMessages([...updatedMessages, { role: "assistant", content: botReply }]);
      } else {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: "Sorry, no response." },
        ]);
      }
    } catch (error) {
      console.error("GPT API error:", error);
      const botReply = generateBotReply(trimmed); // Fallback logic
      setMessages([...updatedMessages, { role: "assistant", content: botReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBotReply = (message) => {
    const lower = message.toLowerCase();

    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hello! I'm NeuroBot. How can I assist you today?";
    }

    if (lower.includes("your name")) {
      return "I'm NeuroBot, your AI-powered assistant developed for the Neuro Sync platform.";
    }

    if (lower.includes("help") || lower.includes("what can you do")) {
      return "I can assist you with Neuro Sync features like Cognitive Sync, Genome Visualization, and more.";
    }

    if (lower.includes("genome")) {
      return "The Genome Module helps visualize your AI-augmented genetic identity. You can explore it via the dashboard.";
    }

    if (lower.includes("bye")) {
      return "Goodbye! Feel free to return whenever you need assistance.";
    }

    return "I'm still learning. Try asking something about Neuro Sync or its features!";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 text-white">
      {/* Message Panel */}
      <div className="flex-1 overflow-y-auto mb-4 px-2">
        {messages
          .filter((msg) => msg.role !== "system")
          .map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-3 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-purple-700 self-end text-right"
                  : "bg-indigo-700 self-start text-left"
              }`}
              style={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start" }}
            >
              {msg.content}
            </div>
          ))}
        {isLoading && (
          <div className="self-start text-sm text-gray-400">NeuroBot is typing...</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Panel */}
      <div className="flex space-x-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          disabled={isLoading}
          className="flex-1 resize-none rounded-lg bg-black/50 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || input.trim() === ""}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg px-5 py-3"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default NeuroChatPanel;