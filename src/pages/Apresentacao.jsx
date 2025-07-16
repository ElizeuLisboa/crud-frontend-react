import React from "react";
import { useNavigate } from "react-router-dom";

export default function Apresentacao() {
  const navigate = useNavigate();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <img
       src="/apresentacao.png"
       alt="Bem-vindo à loja"
       className="w-full max-w-5xl max-h-[240px] object-cover rounded shadow-md"
      />
      <h1 className="text-3xl font-bold mt-6 text-gray-800">
        Seja bem-vindo à nossa loja!
      </h1>
      <p className="text-gray-600 mt-2 text-center max-w-xl">
        Aqui você encontra os melhores produtos com os melhores preços. 
        Você será redirecionado em instantes...
      </p>
      <button
        onClick={() => navigate("/produtos")}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Ir agora para os Produtos
      </button>
    </div>
  );
}
