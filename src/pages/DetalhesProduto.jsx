import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function DetalhesProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
        console.log("Produto recebido:", response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    }
    fetchProduto();
  }, [id]);

  if (!produto) {
    return <p className="p-4">Carregando produto...</p>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={
              produto.image && produto.image.startsWith("http")
                ? produto.image
                : produto.image
                ? `http://localhost:4000/uploads/produtos/${produto.image}`
                : "https://via.placeholder.com/300"
            }
            alt={produto.nome}
            className="w-full max-w-md rounded shadow"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{produto.nome}</h1>
          <p className="text-lg text-gray-700">
            R$ {(produto.price / 100).toFixed(2).replace(".", ",")} 
          </p>
          <p className="text-sm text-gray-500">
            Categoria: {produto.categoria}
          </p>
          <p className="mt-2 text-base">{produto.descricao}</p>
          <button className="mt-4 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">
            Adicionar ao carrinho
          </button>
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold">
            Frequentemente comprados juntos
          </h2>
          {/* Aqui entrará uma lista de produtos futuros */}
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            Produtos relacionados a este item
          </h2>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">
            Clientes que visualizaram este item também visualizaram
          </h2>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Informações importantes</h2>
          <p className="text-gray-700">
            Informações futuras sobre garantia, uso, etc.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Aviso Legal</h2>
          <p className="text-gray-700">
            Este produto é responsabilidade do fabricante...
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Descrição do Produto</h2>
          <p className="text-gray-700">{produto.descricao}</p>
        </section>

        <section>
          <h1 className="text-xl font-semibold">Informações Sobre o Produto</h1>
          <h2 className="text-lg font-medium">Detalhes técnicos</h2>
          <ul className="list-disc list-inside">
            <li>Marca: ExemploMarca</li>
            <li>Forma: Redonda</li>
            <li>Faixa etária apropriada: Adulto</li>
            {/* Demais detalhes técnicos futuramente dinâmicos */}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default DetalhesProduto;
