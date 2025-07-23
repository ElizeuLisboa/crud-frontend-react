import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import CardProduto from "../components/CardProduto";

export default function Produtos() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    fetchProdutos();
  }, [busca, categoria]);

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produtos', {
        params: { nome: busca, categoria: categoria !== 'todas' ? categoria : undefined },
      });
      setProdutos(response.data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  };

  const podeEditar = ['ADMIN', 'SUPERUSER'].includes(usuario?.role);

  const handleEditar = (produto) => {
    navigate(`/produtos/${produto.id}/editar`);
  };

  const handleExcluir = (produto) => {
    // implementar exclusão
    alert(`Excluir produto ${produto.title}`);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <div className="flex gap-2">
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="todas">Todas as categorias</option>
            {/* demais opções */}
          </select>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border p-2 rounded"
          />
          {podeEditar && (
            <Link
              to="/produtos/novo"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Novo Produto
            </Link>
          )}
        </div>
      </div>

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              podeEditar={podeEditar}
              onEditar={handleEditar}
              onExcluir={handleExcluir}
            />
          ))}
        </div>
      )}
    </div>
  );
}