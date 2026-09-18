import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === dish.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id ? { ...item, qty: item.qty + 1 } : item,
              ),
            };
          }

          return { items: [...state.items, { ...dish, qty: 1 }] };
        }),
      remove: (id) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === id);
          if (!existing) return state;

          if (existing.qty <= 1) {
            return { items: state.items.filter((item) => item.id !== id) };
          }

          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, qty: item.qty - 1 } : item,
            ),
          };
        }),
      clear: () => set({ items: [] }),
    }),
    { name: "addis-eats-cart" },
  ),
);

export const selectItems = (state) => state.items;

export const selectCount = (state) =>
  state.items.reduce((sum, item) => sum + item.qty, 0);

export const selectTotal = (state) =>
  state.items.reduce((sum, item) => sum + item.price * item.qty, 0);

export const selectQty = (id) => (state) =>
  state.items.find((item) => item.id === id)?.qty ?? 0;
