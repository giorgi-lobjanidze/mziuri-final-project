import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cartItems');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, variant, quantity = 1) => {
    const name = product.title ?? product.name ?? '';
    const image = product.images?.[0]?.src ?? product.image ?? '';
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.variant.title === variant.title
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.variant.title === variant.title
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name,
          image,
          price: parseFloat(variant.price),
          oldPrice: variant.compare_at_price ? parseFloat(variant.compare_at_price) : null,
          variant,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (id, variantTitle) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.variant.title === variantTitle))
    );
  };

  const updateQuantity = (id, variantTitle, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.variant.title === variantTitle ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.oldPrice) return sum + (item.oldPrice - item.price) * item.quantity;
    return sum;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
