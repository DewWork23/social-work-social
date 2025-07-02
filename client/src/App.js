import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Groups from './pages/Groups';
import Jobs from './pages/Jobs';
import Network from './pages/Network';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  // Demo mode - bypass authentication
  const isDemoMode = true;

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* In demo mode, allow direct access to all pages */}
            <Route path="/" element={isDemoMode ? <Dashboard /> : <PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/network" element={isDemoMode ? <Network /> : <PrivateRoute><Network /></PrivateRoute>} />
            <Route path="/profile/:id" element={isDemoMode ? <Profile /> : <PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/messages" element={isDemoMode ? <Messages /> : <PrivateRoute><Messages /></PrivateRoute>} />
            <Route path="/groups" element={isDemoMode ? <Groups /> : <PrivateRoute><Groups /></PrivateRoute>} />
            <Route path="/jobs" element={isDemoMode ? <Jobs /> : <PrivateRoute><Jobs /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
