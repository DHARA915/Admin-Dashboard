// src/components/ProtectedRoute.js
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { token } = useAuth();  // Use the useAuth hook instead of useContext directly
  console.log(token)
  if (!token) {
    // User not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;