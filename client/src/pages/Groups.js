import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectName: ''
  });
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await api.get('/api/groups/my-groups');
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/users/all');
      setUsers(res.data.filter(u => u._id !== user.id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGroupMessages = async (groupId) => {
    try {
      const res = await api.get(`/api/groups/${groupId}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const selectGroup = (group) => {
    setSelectedGroup(group);
    fetchGroupMessages(group._id);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMember = (userId) => {
    setSelectedMembers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const createGroup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/groups/create', {
        ...formData,
        memberIds: selectedMembers
      });
      setGroups([...groups, res.data]);
      setShowCreateForm(false);
      setFormData({ name: '', description: '', projectName: '' });
      setSelectedMembers([]);
    } catch (err) {
      console.error(err);
    }
  };

  const sendGroupMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedGroup) return;

    try {
      const res = await api.post(`/api/groups/${selectedGroup._id}/message`, {
        content: newMessage
      });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="groups-container">
      <div className="groups-sidebar">
        <div className="groups-header">
          <h2>Groups</h2>
          <button 
            onClick={() => setShowCreateForm(true)} 
            className="btn btn-primary"
          >
            Create Group
          </button>
        </div>
        <div className="groups-list">
          {groups.map(group => (
            <div
              key={group._id}
              className={`group-item ${selectedGroup?._id === group._id ? 'active' : ''}`}
              onClick={() => selectGroup(group)}
            >
              <h4>{group.name}</h4>
              <p>{group.members.length} members</p>
              {group.projectName && <span className="project-tag">{group.projectName}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="groups-main">
        {selectedGroup ? (
          <>
            <div className="group-header">
              <h3>{selectedGroup.name}</h3>
              {selectedGroup.projectName && <p>Project: {selectedGroup.projectName}</p>}
              <div className="group-members">
                {selectedGroup.members.map(member => (
                  <span key={member._id} className="member-tag">
                    {member.firstName} {member.lastName}
                  </span>
                ))}
              </div>
            </div>
            <div className="group-messages">
              {messages.map((msg, index) => (
                <div key={index} className="group-message">
                  <div className="message-author">
                    {msg.sender.firstName} {msg.sender.lastName}
                  </div>
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendGroupMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message to the group..."
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-group-selected">
            <p>Select a group to view messages</p>
          </div>
        )}
      </div>

      {showCreateForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Group</h2>
            <form onSubmit={createGroup}>
              <div className="form-group">
                <label>Group Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Project Name (optional)</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Select Members</label>
                <div className="members-selection">
                  {users.map(u => (
                    <label key={u._id} className="member-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(u._id)}
                        onChange={() => toggleMember(u._id)}
                      />
                      {u.firstName} {u.lastName}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Create Group</button>
                <button 
                  type="button" 
                  onClick={() => setShowCreateForm(false)} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;