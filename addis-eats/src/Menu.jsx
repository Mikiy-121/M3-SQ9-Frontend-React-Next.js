import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { loadDishes } from "./api";

export default function Menu({ onQtyChange }) {
  const [category, setCategory] = useState("");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setLoading(true);
      setError("");
      try {
        const data = await loadDishes(controller.signal);
        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    run();

    return () => controller.abort();
  }, [category]);

  if (loading) {
    return (
      <Card>
        <p className="menu__label">Loading menu…</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="menu__label">Couldn't load the menu</p>
        <p className="menu__empty">{error}</p>
      </Card>
    );
  }

  const categories = [...new Set(dishes.map((dish) => dish.category))];
  const byCategory = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;
  const term = search.trim().toLowerCase();
  const shown = term
    ? byCategory.filter((dish) => dish.name.toLowerCase().includes(term))
    : byCategory;

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
      <input
        ref={searchRef}
        type="text"
        className="menu__search"
        placeholder="Search dishes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DishList dishes={shown} onQtyChange={onQtyChange} />
    </Card>
  );
}

Menu.propTypes = {
  onQtyChange: PropTypes.func,
};
