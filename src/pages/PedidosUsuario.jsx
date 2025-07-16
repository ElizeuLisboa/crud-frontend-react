import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PedidosUsuario() {
  const [pedidos, setPedidos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/pedidos/meus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPedidos(response.data);
      } catch (err) {
        console.error(err);
        setErro('Erro ao buscar os pedidos.');
      }
    };

    fetchPedidos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Meus Pedidos</h2>
      {erro && <p className="text-red-500">{erro}</p>}
      {pedidos.length === 0 ? (
        <p className="text-gray-600">Você ainda não realizou nenhum pedido.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="border rounded p-4 mb-4">
            <h3 className="font-bold mb-2">Pedido #{pedido.id}</h3>
            <ul>
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  {item.produto.title} — x{item.quantidade}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
