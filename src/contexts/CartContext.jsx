import React, { createContext, useContext, useState } from 'react';

// 1. Cria o contexto
export const CartContext = createContext();

// 2. Cria o provider
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Adiciona um produto ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove um produto
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  // Limpa o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Hook customizado para acessar o contexto
export function useCart() {
  return useContext(CartContext);
}
