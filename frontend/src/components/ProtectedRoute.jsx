// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check for JWT token in localStorage
  const token = localStorage.getItem("TOKEN");

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the protected route's children
  return <Outlet />;
};

export default ProtectedRoute;
