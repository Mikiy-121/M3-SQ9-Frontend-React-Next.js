import { useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";
import CategoryBar from "./CategoryBar";

export default function Menu({ dishes, onQtyChange }) {
  const [category, setCategory] = useState("");

  const categories = [...new Set(dishes.map((dish) => dish.category))];

  const shown = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;

  return (
    <Card>
      <p className="menu__label">
        {category ? `${category} dishes` : "Today's menu"}
      </p>
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />
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
              onQtyChange={onQtyChange}
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
  onQtyChange: PropTypes.func,
};
