import { useContext } from "react";
import { CartContext } from "./cart/CartContext";

export default function Header() {
  const { count } = useContext(CartContext);

  return (
    <header className="site-header">
      <div className="site-header__row">
        <div>
          <p className="site-header__eyebrow">Addis Ababa · Est. today</p>
          <h1 className="site-header__title">Addis Eats</h1>
        </div>
        <span
          className="site-header__cart-badge"
          aria-label={`${count} item${count === 1 ? "" : "s"} in cart`}
        >
          Cart · {count}
        </span>
      </div>
      <p className="site-header__subtitle">
        Traditional Ethiopian dishes, served the way they should be.
      </p>
    </header>
  );
}
