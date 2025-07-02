import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Demo mode - provide fake user data
  const demoUser = {
    id: 'demo-user',
    name: 'Demo User',
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@uncp.edu',
    profilePicture: 'https://i.pravatar.cc/300?img=5',
    graduationYear: 2024,
    interests: ['Community Development', 'Mental Health', 'Child Welfare'],
    specializations: ['Criteria C - Clinical Practice', 'School Social Work'],
    fieldPlacement: {
      organization: 'Robeson County Department of Social Services',
      location: 'Lumberton, NC',
      supervisor: 'Jane Smith, LCSW',
      startDate: '2023-08-01',
      endDate: '2024-05-01',
      description: 'Working with families in the child welfare system, conducting assessments, and developing service plans.'
    },
    bio: 'Passionate about making a difference in the lives of children and families in Robeson County. Currently in my final year of the BSW program at UNCP.',
    isAlumni: false,
    openToWork: true,
    createdAt: new Date().toISOString()
  };

  const [user, setUser] = useState(demoUser); // Set demo user by default
  const [loading, setLoading] = useState(false); // No loading in demo mode
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Skip API calls in demo mode
    if (false && token) {
      // Token is now handled by api interceptor
      const userId = localStorage.getItem('userId');
      if (userId) {
        loadUser();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const res = await api.get('/api/users/profile/' + localStorage.getItem('userId'));
      setUser(res.data);
    } catch (err) {
      console.error(err);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      setToken(res.data.token);
      // Token is now handled by api interceptor
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.msg || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      setToken(res.data.token);
      // Token is now handled by api interceptor
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.msg || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Token removal is now handled by api interceptor
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};