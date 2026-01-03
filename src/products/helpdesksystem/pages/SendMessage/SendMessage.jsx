import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SendMessage.css';

const SendMessage = () => {
  const { agentId } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', content: 'Hello, I need assistance with a ticket.', timestamp: 'January 27, 2025 at 03:45 PM' },
    { id: 2, sender: `Agent ${agentId}`, content: 'Sure, I can help you with that. What is the ticket number?', timestamp: 'January 27, 2025 at 03:46 PM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      content: newMessage.trim(),
      timestamp: new Date().toLocaleString(),
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="send-message-page">
      <div className="page-container">
        <div className="send-message-header">
          <h1>Message Agent {agentId}</h1>
          <p>Send a direct message to this agent.</p>
        </div>
        <div className="message-history">
          <h2>Messages</h2>
          <div className="message-list">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-item ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                <div className="message-header">
                  <span className="message-sender">{msg.sender}</span>
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="message-form-container">
          <h2>Add Message</h2>
          <textarea
            className="message-input"
            placeholder="Type your message here..."
            rows="5"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></textarea>
          <button className="btn btn-primary send-button" onClick={handleSendMessage}>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;