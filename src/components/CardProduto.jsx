import React from "react";
import { Link } from "react-router-dom";

export default function CardProduto({
  produto,
  podeEditar,
  onEditar,
  onExcluir,
}) {
  return (
    <div className="border p-4 rounded shadow bg-white flex flex-col">
      {produto.image && produto.image.trim() !== "" ? (
        <Link to={`/produtos/${produto.id}`}>
          <img
            src={
              produto.image?.startsWith("http")
                ? produto.image
                : `http://localhost:4000/uploads/produtos/${produto.image}`
            }
            alt={produto.nome}
            className="w-full h-48 object-contain"
          />
          <div className="mt-2">
            <h2 className="text-md font-bold">{produto.nome}</h2>
            <p className="text-amber-800 font-semibold">R$ {produto.preco}</p>
          </div>
        </Link>
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400 text-sm mb-2">
          Sem imagem
        </div>
      )}
      <h2 className="text-lg font-semibold">{produto.title}</h2>
      <p className="text-gray-600 text-sm mb-1">
        {produto.categoria || "Sem categoria"}
      </p>
      <p className="text-green-600 font-bold text-base">
        R$ {produto.price?.toFixed(2).replace(".", ",")}
      </p>

      {podeEditar && (
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => onEditar(produto)}
            className="text-blue-600 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => onExcluir(produto)}
            className="text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
