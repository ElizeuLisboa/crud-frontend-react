import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

export default function Carrinho() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const finalizarCompra = async () => {
  if (cartItems.length === 0) {
    toast.warn("Seu carrinho está vazio.");
    return;
  }

  if (!isAuthenticated) {
    toast.info("Faça login para finalizar a compra.");
    // Espera 500ms para o toast aparecer
    setTimeout(() => {
      navigate("/login", { state: { from: "/carrinho" } });
    }, 500);
    return;
  }  
  
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:4000/pedidos",
      {
        itens: cartItems.map((item) => ({
          produtoId: item.id,
          quantidade: item.quantity,
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ Verifica se a resposta foi um sucesso
    if (response?.status === 201 || response?.status === 200) {
      toast.success("Compra finalizada com sucesso!");
      clearCart();
      navigate('/pedidos/meus');
    } else {
      // ✅ Resposta inesperada do servidor
      toast.error("Erro inesperado. Tente novamente.");
    }

  } catch (err) {
    const erroDetalhado = err?.response?.data?.mensagem || err?.message || "Erro desconhecido";
    console.error("Erro ao finalizar a compra:", erroDetalhado);
    toast.error("Erro ao finalizar a compra.");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="mb-4 space-y-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  {item.title} (x{item.quantity})
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right text-lg font-bold mb-4">
            Total: R$ {total.toFixed(2)}
          </div>

          <button
            onClick={finalizarCompra}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}
