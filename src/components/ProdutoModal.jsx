// src/components/ProdutoModal.jsx
import React from "react";

export default function ProdutoModal({ produto, onClose, onAddToCart }) {
  if (!produto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={
            produto.image?.startsWith("http")
              ? produto.image
              : produto.image
              ? `http://localhost:4000/uploads/produtos/${produto.image}`
              : "https://via.placeholder.com/150"
          }
          alt={produto.title}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-xl font-bold mb-2">{produto.title}</h3>
        <p className="text-gray-700 mb-2">{produto.description}</p>
        <p className="text-blue-600 font-bold text-lg mb-4">
          R$ {produto.price.toFixed(2)}
        </p>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => {
            onAddToCart(produto);
            onClose();
          }}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
