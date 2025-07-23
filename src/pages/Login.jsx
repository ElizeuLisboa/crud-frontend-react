import React, { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      const token = response.data.access_token;
      if (!token) throw new Error("Token não recebido");

      const decoded = jwtDecode(token); // <- agora funciona
      login(decoded, token);

      toast.success("Login realizado com sucesso!");
      navigate(from, { replace: true });

    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Credenciais inválidas");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
        >
          Entrar
        </button>
      </form>

      <div className="text-center mt-6">
        <p>Não tem uma conta?</p>
        <Link to="/cadastro" className="text-blue-600 hover:underline">
          Cadastre-se aqui
        </Link>
      </div>
    </div>
  );
}
