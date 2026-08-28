import { useState } from "react";
import PropTypes from "prop-types";

export default function Dish({
  name,
  price,
  spicy = false,
  currency = "ETB",
  onQtyChange,
}) {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount((c) => c + 1);
    onQtyChange?.(price);
  }

  function handleDecrement() {
    if (count === 0) return;
    setCount((c) => c - 1);
    onQtyChange?.(-price);
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
          disabled={count === 0}
          aria-label={`Remove one ${name}`}
        >
          −
        </button>
        <span className="dish__stepper-count" aria-live="polite">
          {count}
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
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onQtyChange: PropTypes.func,
};
