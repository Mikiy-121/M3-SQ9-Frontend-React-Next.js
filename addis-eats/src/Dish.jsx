import PropTypes from "prop-types";
import { useCart, selectQty } from "./cart/cartStore";

export default function Dish({
  id,
  name,
  price,
  spicy = false,
  currency = "ETB",
}) {
  const qty = useCart(selectQty(id));
  const addItem = useCart((state) => state.addItem);
  const remove = useCart((state) => state.remove);

  function handleIncrement() {
    addItem({ id, name, price, spicy });
  }

  function handleDecrement() {
    if (qty === 0) return;
    remove(id);
  }

  return (
    <li className="dish">
      <span className="dish__name">
        {name}
        {Boolean(spicy) && <span className="dish__badge">Spicy</span>}
      </span>
      <span className="dish__leader" aria-hidden="true"></span>
      <span className="dish__price">
        {price} {currency}
      </span>
      <div className="dish__stepper">
        <button
          type="button"
          className="dish__stepper-btn"
          onClick={handleDecrement}
          disabled={qty === 0}
          aria-label={`Remove one ${name}`}
        >
          −
        </button>
        <span className="dish__stepper-count" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          className="dish__stepper-btn"
          onClick={handleIncrement}
          aria-label={`Add one ${name}`}
        >
          +
        </button>
      </div>
    </li>
  );
}

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};
