import React, { useState, useRef, useEffect } from "react";

const NeuroChatPanel = () => {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are NeuroBot, a helpful AI assistant." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const botReply = data.choices[0].message.content;
        setMessages([...newMessages, { role: "assistant", content: botReply }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: "Sorry, no response." }]);
      }
    } catch (error) {
      console.error("GPT API error:", error);
      setMessages([...newMessages, { role: "assistant", content: "Error: Unable to get response." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 text-white">
      <div className="flex-1 overflow-y-auto mb-4 px-2">
        {messages
          .filter((m) => m.role !== "system")
          .map((msg, i) => (
            <div
              key={i}
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
        <div ref={bottomRef} />
      </div>

      <div className="flex space-x-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg bg-black/50 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || input.trim() === ""}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-5 py-3"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default NeuroChatPanel;