import { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { loadDishes } from "./api";
import { useFetch } from "./hooks/useFetch";

export default function Menu() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  const { data, loading, error } = useFetch(loadDishes, [category]);
  const dishes = data ?? [];

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const categories = useMemo(
    () => [...new Set(dishes.map((dish) => dish.category))],
    [dishes],
  );

  const shown = useMemo(() => {
    const byCategory = category
      ? dishes.filter((dish) => dish.category === category)
      : dishes;
    const term = search.trim().toLowerCase();
    const filtered = term
      ? byCategory.filter((dish) => dish.name.toLowerCase().includes(term))
      : byCategory;
    return [...filtered].sort((a, b) => a.price - b.price);
  }, [dishes, category, search]);

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
      <DishList dishes={shown} />
    </Card>
  );
}
