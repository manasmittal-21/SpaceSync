import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USER } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('spacesync_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Failed to parse saved user from localStorage', e);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('spacesync_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('spacesync_auth_user');
    }
  }, [user]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    // Simulate realistic network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Basic validation
    if (!email || !password) {
      setLoading(false);
      throw new Error('Please fill in both email and password.');
    }

    if (password.length < 6) {
      setLoading(false);
      throw new Error('Password must be at least 6 characters long.');
    }

    // Authenticate with sample user info
    const authenticatedUser = {
      ...INITIAL_USER,
      email: email,
      name: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) || 'Student User'
    };

    setUser(authenticatedUser);
    setLoading(false);
    return authenticatedUser;
  };

  // Demo Login (Instant access with realistic campus profile)
  const loginAsDemo = () => {
    setUser(INITIAL_USER);
    return INITIAL_USER;
  };

  // Student Registration handler
  const register = async (userData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 750));

    const newUser = {
      id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
      name: userData.fullName,
      email: userData.email,
      studentId: userData.studentId || `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      faculty: userData.faculty || 'Computer Science & Engineering',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      role: 'Student',
      semester: 'Year 1 • Fall 2026',
      campusPoints: 500, // Welcome bonus
      tier: 'Bronze Member',
      verified: true
    };

    setUser(newUser);
    setLoading(false);
    return newUser;
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem('spacesync_auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
