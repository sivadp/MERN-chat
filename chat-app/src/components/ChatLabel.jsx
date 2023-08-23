import React from 'react';
import './ChatLabel.css';

const ChatLabel = ({ userName, onClick }) => {
  const handleLabelClick = () => {
    onClick(userName);
  };

  return (
    <button className="chat-label" onClick={handleLabelClick}>
      <div className="label-info">
        <h3>{userName}</h3>
        {/* Other chat content, such as last message or time */}
      </div>
    </button>
  );
};

export default ChatLabel;
