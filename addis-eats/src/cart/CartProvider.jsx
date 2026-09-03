import { useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import { cartReducer, initialCartState } from "./cartReducer";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const count = state.items.reduce((sum, item) => sum + item.qty, 0);

  const value = useMemo(
    () => ({ items: state.items, dispatch, total, count }),
    [state.items, total, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
