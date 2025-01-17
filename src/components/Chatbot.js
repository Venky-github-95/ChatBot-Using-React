import React, { useState } from "react";
import axios from "axios";
//import "./Chatbot.css"; // Import specific CSS for Chatbot

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { role: "user", content: message }]);

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/chat", { message });
      const botReply = response.data.reply || "No response from bot.";

      setChat((prev) => [...prev, { role: "bot", content: botReply }]);
    } catch (error) {
      console.error("Error connecting to server:", error.message);
      setChat((prev) => [
        ...prev,
        { role: "bot", content: "Error connecting to the server. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }

    setMessage("");
  };

  return (
    <div className="chatbot-page">
      <h2>Chat with our AI</h2>
      <div className="chat-box">
        {chat.map((entry, index) => (
          <div key={index} className={`chat-entry ${entry.role}`}>
            <strong>{entry.role === "user" ? "You: " : "Bot: "}</strong>
            {entry.content}
          </div>
        ))}
        {isLoading && <div className="loading">Bot is typing...</div>}
      </div>
      <div className="input-section">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
