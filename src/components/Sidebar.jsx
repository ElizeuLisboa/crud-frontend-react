import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Sidebar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAdmin = usuario?.role === "ADMIN" || usuario?.role === "SUPERUSER";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="h-screen w-64 bg-amber-600 text-white fixed top-0 left-0 shadow-lg flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-amber-500">
        Minha Loja
      </div>

      <nav className="flex-1 px-4 py-6 space-y-4 text-sm">
        <Link to="/produtos" className="block hover:underline">Produtos</Link>
        <Link to="/carrinho" className="block hover:underline">Carrinho</Link>
        <Link to="/pedidos/meus" className="block hover:underline">Meus Pedidos</Link>

        {isAdmin && (
          <>
            <Link to="/clientes" className="block hover:underline">Listar Clientes</Link>
            <Link to="/clientes/novo" className="block hover:underline">Cadastrar Cliente</Link>
            <Link to="/produtos/novo" className="block hover:underline">Cadastrar Produto</Link>
          </>
        )}
        
      </nav>

      <div className="p-4 border-t border-amber-500">
        {usuario ? (
          <>
            <p className="text-sm mb-2">Olá, {usuario.nome.split(" ")[0]}</p>
            <button onClick={handleLogout} className="text-white hover:underline text-sm">
              Sair
            </button>
          </>
         
        ) : (
          <div>
          <Link to="/admin" className="hover:underline text-sm">Acesso Administrativo</Link><br/>
          <Link to="/login" className="hover:underline text-sm">Entrar</Link>
          </div>

        )}
      </div>
    </aside>
  );
}
