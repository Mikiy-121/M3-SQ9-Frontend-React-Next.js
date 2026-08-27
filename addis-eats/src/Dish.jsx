import PropTypes from "prop-types";

export default function Dish({ name, price, spicy = false, currency = "ETB" }) {
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
    </li>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};
