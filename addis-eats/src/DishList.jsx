import PropTypes from "prop-types";
import Dish from "./Dish";

export default function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p className="menu__empty">No dishes in this category yet.</p>;
  }

  return (
    <ul className="menu__list">
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          id={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
        />
      ))}
    </ul>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    }),
  ).isRequired,
};
