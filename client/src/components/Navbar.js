import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>UNCP Social Work Network</h2>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
      <div className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className="navbar-item" onClick={closeMobileMenu}>Home</Link>
        <Link to="/network" className="navbar-item" onClick={closeMobileMenu}>Network</Link>
        <Link to={`/profile/${user.id}`} className="navbar-item" onClick={closeMobileMenu}>My Profile</Link>
        <Link to="/messages" className="navbar-item" onClick={closeMobileMenu}>Messages</Link>
        <Link to="/groups" className="navbar-item" onClick={closeMobileMenu}>Groups</Link>
        <Link to="/jobs" className="navbar-item" onClick={closeMobileMenu}>Jobs</Link>
        <button onClick={handleLogout} className="navbar-item logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;