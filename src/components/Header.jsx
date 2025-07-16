import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


function Header() {
  const { usuario, logout } = useContext(AuthContext);
  const isAdmin = usuario?.role === "admin";

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 bg-amber-600 text-white shadow">
      <h1 className="text-2xl font-bold mb-2 md:mb-0">
        <Link to="/" className="hover:underline">
          Minha Loja
        </Link>
      </h1>

      <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
        <Link to="/produtos" className="hover:underline">
                
          Produtos
        </Link>
        <Link to="/carrinho" className="hover:underline">
         <img src="/shopping-cart.png" alt="Carrinho de compras" />       
       
        </Link>
          {isAdmin && (
            <Link to="/clientes/novo" className="underline">
              Cadastrar Cliente
            </Link>
          )}
        {isAdmin && (
          <Link
            to="/produtos/novo"
            className="hover:underline text-white font-semibold"
          >
            Cadastrar Produto
          </Link>
        )}
        {isAdmin && (
          <Link to="/clientes" className="hover:underline">
            Ver Clientes
          </Link>
        )}:

        {usuario ? (
          <>
            <span className="hidden md:inline">
              Olá, {usuario.nome.split(" ")[0]}
            </span>
            <button
              onClick={() => {
                logout();
                window.location.href = "/login"; 
              }}
              className="hover:underline"
            >
              Sair
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Entrar
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
