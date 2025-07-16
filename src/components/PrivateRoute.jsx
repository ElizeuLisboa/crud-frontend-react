import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}