// 
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

function Header() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [busca, setBusca] = useState("");

  const isAutenticado = !!usuario;

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const res = await api.get("/produtos");
        const categoriasUnicas = [
          ...new Set(res.data.map((p) => p.categoria).filter(Boolean)),
        ];
        setCategorias(categoriasUnicas);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      }
    }
    carregarCategorias();
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    navigate(`/produtos?categoria=${categoriaSelecionada}&nome=${busca}`);
  };

  return (
    <header className="bg-amber-600 text-white p-4 shadow flex flex-col md:flex-row justify-between items-center gap-4">
      {/* ESQUERDA: Nome do site */}
      <div className="text-2xl font-bold">
        <Link to="/">Minha Loja</Link>
      </div>

      {/* CENTRO: Categoria + Busca */}
      <form
        onSubmit={handleBuscar}
        className="flex gap-2 items-center flex-wrap justify-center"
      >
        <select
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          className="text-black p-1 rounded"
        >
          <option value="">Todas Categorias</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="p-1 rounded text-black"
        />
        <button type="submit" className="bg-white text-amber-600 p-1 rounded">
          🔍
        </button>
      </form>

      {/* DIREITA: Conta / Pedidos / Carrinho */}
      <div className="flex flex-col md:flex-row items-center gap-2 text-sm text-right">
        {isAutenticado ? (
          <>
            <span>Olá, {usuario.nome.split(" ")[0]}</span>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="hover:underline"
            >
              Sair
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Olá, faça seu login
          </Link>
        )}

        <div className="relative group">
          <span className="hover:underline cursor-pointer">
            Contas e Listas ▼
          </span>
          <div className="absolute hidden group-hover:block bg-white text-black right-0 mt-1 p-2 shadow rounded text-sm z-50">
            {!isAutenticado && (
              <Link to="/login" className="block hover:bg-gray-100 px-2 py-1">
                Cliente novo? Comece aqui
              </Link>
            )}
            <Link to="/login" className="block hover:bg-gray-100 px-2 py-1">
              Sua conta
            </Link>
            <Link to="/login" className="block hover:bg-gray-100 px-2 py-1">
              Seus pedidos
            </Link>
            <Link to="/login" className="block hover:bg-gray-100 px-2 py-1">
              Lista de desejos
            </Link>
            <Link to="/login" className="block hover:bg-gray-100 px-2 py-1">
              Recomendado pra você
            </Link>
          </div>
        </div>

        <Link to="/login" className="hover:underline">
          Devoluções e Pedidos
        </Link>

        <Link to={isAutenticado ? "/carrinho" : "/login"}>
          <img
            src="/shopping-cart.png"
            alt="Carrinho"
            className="w-6 h-6 ml-2"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
