// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import AdminDashboard from '../Pages/Admin_Dashboard';

const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AdminDashboard /> : <Navigate to="/error" />;
};

export default ProtectedRoute;
