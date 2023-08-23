import React, { useState, useEffect } from "react";
import "./ChatWindow.css";
import io from "socket.io-client";

const ChatWindow = ({ userName, userId, loggedUser, onClose }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [socket, setSocket] = useState(null);
  const loggedUserId = loggedUser._id;

  useEffect(() => {
    // Connect to the socket.io server when the component mounts
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    // Fetch chat history when the chat window is opened
    fetch(`http://localhost:3001/chat-history/${loggedUserId}/${userId}`)
      .then((response) => response.json())
      .then((history) => setChatHistory(history))
      .catch((error) => console.error("Error fetching chat history:", error));

    // Clean up the socket connection when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        setSocket(null);
      }
    };
  }, [loggedUserId, userId]);

  useEffect(() => {
    if (socket) {
      // Listen for 'chat message' event from the server
      socket.on("chat message", (data) => {
        // Update chat history with the received message
        setChatHistory((prevHistory) => [...prevHistory, data]);
      });
    }
  }, [socket]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (socket) {
      // Emit a 'chat message' event to the server
      socket.emit("chat message", {
        sender: loggedUserId,
        receiver: userId,
        message: message,
      });
    }
    setMessage("");
  };

  const handleCloseChat = () => {
    if (socket) {
      socket.disconnect(); // Disconnect the socket when closing the chat
    }
    onClose();
  };
 
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{userName}</h3>
        <button className="close-button" onClick={handleCloseChat}>
          Close
        </button>
      </div>
      <div className="chat-messages">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === loggedUserId ? "right" : "left"
            }`}
          >
            {message.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
