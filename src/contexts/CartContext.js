import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export function CartProvider({ children }) {
  
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

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

  toast.success(`${product.title} adicionado ao carrinho!`);
};

const removeFromCart = (productId) => {
  setCartItems((prevItems) => {
    const itemRemovido = prevItems.find(item => item.id === productId);
    if (itemRemovido) {
      toast.info(`${itemRemovido.title} removido do carrinho.`);
    }
    return prevItems.filter(item => item.id !== productId);
  });
};

const clearCart = () => {
  setCartItems([]);
  toast.warn('Carrinho esvaziado.');
};

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
