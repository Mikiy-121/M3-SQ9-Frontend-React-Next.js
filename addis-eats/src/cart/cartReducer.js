export const initialCartState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const { dish } = action;
      const existing = state.items.find((item) => item.id === dish.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === dish.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        };
      }

      return {
        items: [...state.items, { ...dish, qty: 1 }],
      };
    }

    case "remove": {
      const existing = state.items.find((item) => item.id === action.id);
      if (!existing) return state;

      if (existing.qty <= 1) {
        return {
          items: state.items.filter((item) => item.id !== action.id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, qty: item.qty - 1 } : item,
        ),
      };
    }

    case "clear":
      return initialCartState;

    default:
      return state;
  }
}