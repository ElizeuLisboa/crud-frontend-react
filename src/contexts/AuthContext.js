import { createContext, useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsuario(decoded);
      } catch {
        setUsuario(null);
      }
    }
  }, []);

  const login = (dadosUsuario, token) => {
    localStorage.setItem("token", token);
    setUsuario(dadosUsuario);
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
    // NÃO navegamos aqui! Deixe o componente decidir
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
