import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('velora_cart')) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('velora_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size, color, qty = 1) => {
    setCart(prev => {
      const key = `${product._id}-${size}-${color}`;
      const existing = prev.find(i => `${i._id}-${i.size}-${i.color}` === key);
      if (existing) return prev.map(i =>
        `${i._id}-${i.size}-${i.color}` === key ? { ...i, qty: i.qty + qty } : i
      );
      return [...prev, { ...product, size, color, qty }];
    });
  };

  const removeFromCart = (id, size, color) => {
    setCart(prev => prev.filter(i => !(i._id === id && i.size === size && i.color === color)));
  };

  const updateQty = (id, size, color, qty) => {
    if (qty < 1) return removeFromCart(id, size, color);
    setCart(prev => prev.map(i =>
      i._id === id && i.size === size && i.color === color ? { ...i, qty } : i
    ));
  };

  const clearCart = () => setCart([]);

  const total     = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
