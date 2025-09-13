import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart_items");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === product.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [
        ...prev,
        { id: product.id, title: product.title, price: product.price, image: product.image, qty }
      ];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));

  const updateQty = (id, qty) =>
    setItems(prev =>
      prev.map(p => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );

  const clear = () => setItems([]);

  const totalItems = useMemo(() => items.reduce((s, p) => s + p.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, p) => s + p.price * p.qty, 0), [items]);

  const value = { items, addItem, removeItem, updateQty, clear, totalItems, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
