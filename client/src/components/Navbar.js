import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>UNCP Social Work Network</h2>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Dashboard</Link>
        <Link to={`/profile/${user.id}`} className="navbar-item">My Profile</Link>
        <Link to="/messages" className="navbar-item">Messages</Link>
        <Link to="/groups" className="navbar-item">Groups</Link>
        <button onClick={handleLogout} className="navbar-item logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;