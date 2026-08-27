import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";

export default function Menu({ dishes, category = "" }) {
  const shown = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;

  return (
    <Card>
      <p className="menu__label">
        {category ? `${category} dishes` : "Today's menu"}
      </p>
      {shown.length === 0 ? (
        <p className="menu__empty">No dishes in this category yet.</p>
      ) : (
        <ul className="menu__list">
          {shown.map((dish) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    }),
  ).isRequired,
  category: PropTypes.string,
};
