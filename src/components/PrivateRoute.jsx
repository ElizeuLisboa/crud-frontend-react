import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AcessoNegado from '../pages/AcessoNegado';

export default function PrivateRoute({ children, rolesPermitidos = [] }) {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.role)) {
    return <AcessoNegado />;
  }  


  return children;
}