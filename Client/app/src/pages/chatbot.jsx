import { useState, useRef, useEffect } from "react";
import logo from "../pages/img/JuCC_dark.png"

function JuccChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMessage = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "student123", message: trimmed }),
      });
      const data = await response.json();
      const botMessage = { sender: "bot", text: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Bot error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-16 right-16 bg-blue-600 text-white rounded-full w-16 h-16 text-2xl shadow-lg animate-pulse z-50"
      >
        💬
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-36 right-16 w-[400px] max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-300">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
            <img
              src={logo}
              alt="JuCC Logo"
              className="h-10 w-14 rounded-md border"
            />
            <span className="text-blue-600 font-bold text-lg">AskJuCC</span>
          </div>

          {/* Chat Log */}
          <div className="flex-1 overflow-y-auto bg-[#f0f4f8] px-4 py-3 space-y-3 text-[15px] leading-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-200 text-blue-900 rounded-br-none"
                      : "bg-blue-50 text-blue-800 rounded-bl-none"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.text.includes("https://")
                      ? msg.text
                          .split(" ")
                          .map((part) =>
                            part.startsWith("https://")
                              ? `<img src="${part}" class="rounded-xl mt-1 mb-1 max-w-full"/>`
                              : part
                          )
                          .join(" ")
                      : msg.text,
                  }}
                ></div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center text-gray-600 italic text-sm">
                🤖 JuCCBot is typing
                <span className="ml-2 flex gap-[2px]">
                  <span className="animate-ping">.</span>
                  <span className="animate-ping delay-200">.</span>
                  <span className="animate-ping delay-400">.</span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex p-3 bg-white border-t border-gray-200 gap-2">
            <input
              type="text"
              className="flex-1 p-2 rounded-xl bg-gray-100 border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ask me anything about cybersecurity..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default JuccChatbot;
