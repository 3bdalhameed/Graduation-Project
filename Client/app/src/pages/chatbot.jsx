import { useState, useEffect, useRef } from "react";

function JuccChatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "student123",
          message: userInput,
        }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.response };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with the bot:", error);
    }

    setUserInput("");
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-900 text-white flex items-center justify-center">
      <div className="p-6 bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl mb-5 font-bold text-center text-blue-400">
          💬 JuCC Awareness Assistant
        </h2>
        <div className="h-72 overflow-y-auto bg-gray-700 rounded-lg p-4 mb-4 border border-gray-600">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-xl text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-600 text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              ></span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about cybersecurity..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 px-5 py-2 rounded-xl text-white font-semibold hover:from-blue-200 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default JuccChatbot;
