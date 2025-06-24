import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import config from '../config';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const newSocket = io(config.SOCKET_URL);
    setSocket(newSocket);

    newSocket.emit('join', user.id);

    newSocket.on('newMessage', (message) => {
      if (selectedUser && (message.sender === selectedUser._id || message.recipient === selectedUser._id)) {
        setMessages(prev => [...prev, message]);
      }
      fetchRecentConversations();
    });

    fetchUsers();
    fetchRecentConversations();

    return () => newSocket.close();
  }, [user.id]);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/users/all');
      setUsers(res.data.filter(u => u._id !== user.id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecentConversations = async () => {
    try {
      const res = await api.get('/api/messages/recent');
      setConversations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await api.get(`/api/messages/conversation/${userId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    fetchMessages(user._id);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const res = await api.post('/api/messages/send', {
        recipientId: selectedUser._id,
        content: newMessage
      });

      setMessages([...messages, res.data]);
      setNewMessage('');

      socket.emit('sendMessage', {
        ...res.data,
        recipientId: selectedUser._id
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="messages-container">
      <div className="conversations-sidebar">
        <h2>Messages</h2>
        <div className="user-search">
          <input 
            type="text" 
            placeholder="Search students..." 
            onChange={(e) => {
              const search = e.target.value.toLowerCase();
              const filtered = users.filter(u => 
                u.firstName.toLowerCase().includes(search) || 
                u.lastName.toLowerCase().includes(search)
              );
              setUsers(filtered.length ? filtered : users);
            }}
          />
        </div>
        <div className="conversations-list">
          {users.map(u => (
            <div
              key={u._id}
              className={`conversation-item ${selectedUser?._id === u._id ? 'active' : ''}`}
              onClick={() => selectUser(u)}
            >
              <div className="conversation-avatar">
                {u.profilePicture ? (
                  <img src={`${config.API_URL}/uploads/${u.profilePicture}`} alt={u.firstName} />
                ) : (
                  <div className="avatar-placeholder">
                    {u.firstName[0]}{u.lastName[0]}
                  </div>
                )}
              </div>
              <div className="conversation-info">
                <h4>{u.firstName} {u.lastName}</h4>
                <p>Class of {u.graduationYear}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="messages-main">
        {selectedUser ? (
          <>
            <div className="messages-header">
              <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
            </div>
            <div className="messages-list">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender._id === user.id ? 'sent' : 'received'}`}
                >
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-conversation">
            <p>Select a student to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;