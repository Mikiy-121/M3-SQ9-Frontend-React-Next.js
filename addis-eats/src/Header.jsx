import { useState } from "react";
import { useCart, selectCount } from "./cart/cartStore";
import { useAuth } from "./auth/useAuth";
import { isValidLocalPhone, COUNTRY_CODE } from "./auth/phone";
import { useTheme } from "./theme/useTheme";

export default function Header() {
  const count = useCart(selectCount);
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [localPhone, setLocalPhone] = useState("");

  const phoneValid = localPhone === "" || isValidLocalPhone(localPhone);

  function handlePhoneChange(event) {
    const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 9);
    setLocalPhone(digitsOnly);
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!isValidLocalPhone(localPhone)) return;
    login(localPhone);
    setLocalPhone("");
  }

  return (
    <header className="site-header">
      <div className="site-header__row">
        <div>
          <p className="site-header__eyebrow">Addis Ababa · Est. today</p>
          <h1 className="site-header__title">Addis Eats</h1>
        </div>
        <div className="site-header__controls">
          <button
            type="button"
            className="site-header__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <span
            className="site-header__cart-badge"
            aria-label={`${count} item${count === 1 ? "" : "s"} in cart`}
          >
            Cart · {count}
          </span>
        </div>
      </div>

      <p className="site-header__subtitle">
        Traditional Ethiopian dishes, served the way they should be.
      </p>

      {user ? (
        <p className="site-header__auth">
          Signed in as {user.phone} ·{" "}
          <button
            type="button"
            className="site-header__auth-link"
            onClick={logout}
          >
            Log out
          </button>
        </p>
      ) : (
        <form className="site-header__auth" onSubmit={handleLogin}>
          <span className="site-header__phone-group">
            <span className="site-header__phone-prefix">{COUNTRY_CODE}</span>
            <input
              type="tel"
              inputMode="numeric"
              value={localPhone}
              onChange={handlePhoneChange}
              placeholder="9XXXXXXXX"
              maxLength={9}
              className="site-header__auth-input site-header__auth-input--local"
              aria-label="Phone number, without the country code"
              aria-invalid={!phoneValid}
            />
          </span>
          <button
            type="submit"
            className="site-header__auth-link"
            disabled={!isValidLocalPhone(localPhone)}
          >
            Log in
          </button>
          {!phoneValid && (
            <span className="site-header__auth-error">
              Start with 9 or 7, then 8 digits — e.g. 912345678.
            </span>
          )}
        </form>
      )}
    </header>
  );
}
