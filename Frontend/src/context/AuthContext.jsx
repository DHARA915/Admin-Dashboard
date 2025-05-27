// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Initialize user from localStorage when app loads
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = () => {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/routes/adminRoute/login', {
        email,
        password,
      });
      
      setUser(response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Add token getter for convenience
  const token = user?.token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,  // Add token to the context value
      login, 
      logout, 
      initializeUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};