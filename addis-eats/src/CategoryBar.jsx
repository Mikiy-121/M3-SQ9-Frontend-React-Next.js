import PropTypes from "prop-types";

export default function CategoryBar({ categories, selected, onSelect }) {
  return (
    <div
      className="category-bar"
      role="tablist"
      aria-label="Filter by category"
    >
      <button
        type="button"
        className={`category-bar__chip${selected === "" ? " category-bar__chip--active" : ""}`}
        aria-pressed={selected === ""}
        onClick={() => onSelect("")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-bar__chip${
            selected === category ? " category-bar__chip--active" : ""
          }`}
          aria-pressed={selected === category}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
