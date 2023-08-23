import React, { useState, useEffect } from 'react';
import ChatLabel from './ChatLabel'; // Adjust the path
import ChatWindow from './ChatWindow'; // Adjust the path
import './Chatter.css';

export const Chatter = (props) => {
  const loggedUser=props.user;
  const [users, setUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState(null); 
  const [selectedUserId, setSelectedUserId] = useState(null)
  useEffect(() => {
    // Fetch user data from the server
    fetch('http://localhost:3001/users') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleUserClick = (userName, id) => {  
    setSelectedUserName(userName);
    setSelectedUserId(id);
  };

  const handleCloseChat = () => {
    setSelectedUserName(null);
    setSelectedUserId(null);
  };

  return (
    <div className='container'>
  <div className="main-component">
    {selectedUserName ? (
      <ChatWindow
        userName={selectedUserName}
        userId={selectedUserId}
        loggedUser={loggedUser}
        onClose={() => {
          handleCloseChat();
          setSelectedUserName(null);
        }}
      />
    ) : (
      <>
        <h2>Chat with Users</h2>
        {users.map(user => (
          <div key={user._id} className="chat-label-container">
            <ChatLabel
              userName={user.userName}
              onClick={() => handleUserClick(user.userName, user._id)}
            />
          </div>
        ))}
      </>
    )}
  </div>
</div>
  )
};
