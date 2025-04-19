import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hey! I'm your finance bro 🤝 Ask me anything!", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMsg = { text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5006/chat", { // Updated port to 5006
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await res.json();
      const newBotMsg = { text: data.reply, sender: "bot" };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry bro 😔 Something went wrong.", sender: "bot" },
      ]);
    }

    setIsTyping(false);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 rounded-xl bg-[#000000] text-white border border-[#355E3B] border-[1px] shadow-[0_0_80px_10px_rgba(52,199,89,0.25)] flex flex-col h-[90vh]">
      <h2 className="text-2xl font-bold mb-6 text-[#34C759]">💬 Chatbot</h2>

      <div className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-md px-4 py-2 rounded-2xl shadow ${
              msg.sender === "user"
                ? "bg-[#1A1D23] text-white self-end ml-auto"
                : "bg-gray-800 text-white self-start mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="self-start text-sm text-[#34C759] animate-pulse px-4">
            Typing...
          </div>
        )}

        {loading && (
          <div className="p-4 rounded-md bg-gray-600/30 animate-pulse w-1/2 h-6 my-2"></div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 rounded-full border border-gray-600 px-4 py-2 bg-[#1A1D23] text-white shadow-sm outline-none focus:ring-2 focus:ring-[#34C759]"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-[#34C759] text-white px-4 py-2 rounded-full shadow hover:bg-green-700 transition"
          onClick={handleSend}
          disabled={loading} // Disable button while loading
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
