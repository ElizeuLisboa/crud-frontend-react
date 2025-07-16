import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { usuario } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/produtos");
        console.log("Produtos recebidos:", data);
        setProdutos(data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar os produtos");
      }
    })();
  }, []);

  const abrirDetalhes = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setProdutoSelecionado(null);
  };

  return (
    <div className="p-4">
      {usuario ? (
        <h2 className="text-2xl font-bold mb-4">Olá, {usuario.nome}!</h2>
      ) : (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Bem‑vindo à Minha Loja</h2>
          <p className="mt-2">Você já tem uma conta?</p>
          <div className="flex gap-4 mt-2">
            <a href="/login" className="text-blue-600 hover:underline">
              Sim, fazer login
            </a>
            <a href="/cadastro" className="text-blue-600 hover:underline">
              Não, quero me cadastrar
            </a>
          </div>
        </div>
      )}

      {erro && <p className="text-red-500">{erro}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="border p-3 rounded shadow flex flex-col text-sm cursor-pointer"
            onClick={() => abrirDetalhes(produto)}
          >
            <img
              src={
                produto.image.startsWith("http")
                  ? produto.image
                  : `http://localhost:4000${produto.image}`
              }
              alt={produto.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/imagem-padrao.png";
              }}
              className="w-full h-32 object-contain mb-2"
            />

            <h3 className="text-md font-semibold mb-1">{produto.title}</h3>
            <p className="text-gray-600 line-clamp-3 mb-1">
              {produto.description}
            </p>
            <p className="text-blue-500 font-bold">
              R$ {produto.price.toFixed(2)}
            </p>

            <button
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(produto);
              }}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>

      {mostrarModal && produtoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={fecharModal}
            >
              ✕
            </button>
            <img
              src={produtoSelecionado.image}
              alt={produtoSelecionado.title}
              className="w-full h-48 object-contain mb-4"
              onError={(e) => (e.target.src = "/imagem-padrao.png")}
            />
            <h3 className="text-xl font-bold mb-2">
              {produtoSelecionado.title}
            </h3>
            <p className="text-gray-700 mb-2">
              {produtoSelecionado.description}
            </p>
            <p className="text-blue-600 font-bold text-lg mb-4">
              R$ {produtoSelecionado.price.toFixed(2)}
            </p>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => {
                addToCart(produtoSelecionado);
                fecharModal();
              }}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
