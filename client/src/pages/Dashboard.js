import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import config from '../config';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/users/all');
      setUsers(res.data.filter(u => u._id !== user.id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGroups = async () => {
    try {
      const res = await api.get('/api/groups/my-groups');
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome, {user?.firstName}!</h1>
        <p>Connect with fellow Social Work students at UNCP</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Active Students</h2>
          <div className="user-grid">
            {users.map(student => (
              <Link to={`/profile/${student._id}`} key={student._id} className="user-card">
                <div className="user-avatar">
                  {student.profilePicture ? (
                    <img src={`${config.API_URL}/uploads/${student.profilePicture}`} alt={student.firstName} />
                  ) : (
                    <div className="avatar-placeholder">
                      {student.firstName[0]}{student.lastName[0]}
                    </div>
                  )}
                </div>
                <h3>{student.firstName} {student.lastName}</h3>
                <p>Class of {student.graduationYear}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Your Groups</h2>
          {groups.length > 0 ? (
            <div className="groups-list">
              {groups.map(group => (
                <Link to="/groups" key={group._id} className="group-card">
                  <h3>{group.name}</h3>
                  <p>{group.members.length} members</p>
                  {group.projectName && <span className="project-tag">{group.projectName}</span>}
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You're not in any groups yet.</p>
              <Link to="/groups" className="btn btn-primary">Create or Join a Group</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;