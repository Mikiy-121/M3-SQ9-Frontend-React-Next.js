import { useState } from "react";
import PropTypes from "prop-types";

export default function Dish({
  name,
  price,
  spicy = false,
  currency = "ETB",
  onAdd,
}) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((c) => c + 1);
    onAdd?.(price);
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
      <button
        type="button"
        className="dish__add"
        onClick={handleAdd}
        aria-label={`Add ${name} to order`}
      >
        Add{count > 0 ? ` (${count})` : ""}
      </button>
    </li>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func,
};
