import { useEffect, useState } from "react";
import api from "../services/api";
import CardProduto from "./CardProduto";

const ProdutosPorCategoria = () => {
  const [produtosPorCategoria, setProdutosPorCategoria] = useState({});

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const { data } = await api.get("/produtos");
        const agrupados = agruparPorCategoria(data);
        setProdutosPorCategoria(agrupados);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchProdutos();
  }, []);

  const agruparPorCategoria = (produtos) => {
    return produtos.reduce((acc, produto) => {
      const categoria = produto.categoria || "Outros";
      if (!acc[categoria]) acc[categoria] = [];
      acc[categoria].push(produto);
      return acc;
    }, {});
  };

  return (
    <div className="p-4">
      {Object.entries(produtosPorCategoria).map(([categoria, produtos]) => (
        <div key={categoria} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 capitalize">{categoria}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {produtos.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProdutosPorCategoria;
