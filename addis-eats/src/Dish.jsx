import PropTypes from "prop-types";
import { useCart, selectQty } from "./cart/cartStore";
import { useState, useRef, memo } from "react";
import { createPortal } from "react-dom";
import DishModal from "./DishModal";

function Dish({ id, name, price, spicy = false, currency = "ETB" }) {
  const qty = useCart(selectQty(id));
  const addItem = useCart((state) => state.addItem);
  const remove = useCart((state) => state.remove);
  const [showModal, setShowModal] = useState(false);
  const triggerRef = useRef(null);

  // FORCE RENDER ERROR: Uncomment the line below to test the ErrorBoundary
  // if (id === 999) throw new Error("Deliberate render error in Dish component");

  function handleIncrement() {
    addItem({ id, name, price, spicy });
  }

  function handleDecrement() {
    if (qty === 0) return;
    remove(id);
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    // Return focus to the trigger button on exit
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  }

  return (
    <>
      <li className="dish">
        <span className="dish__name">
          {name}
          {Boolean(spicy) && <span className="dish__badge">Spicy</span>}
        </span>
        <span className="dish__leader" aria-hidden="true"></span>
        <span className="dish__price">
          {price} {currency}
        </span>
        <div className="dish__stepper">
          <button
            type="button"
            className="dish__stepper-btn"
            onClick={handleDecrement}
            disabled={qty === 0}
            aria-label={`Remove one ${name}`}
          >
            −
          </button>
          <span className="dish__stepper-count" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            className="dish__stepper-btn"
            onClick={handleIncrement}
            aria-label={`Add one ${name}`}
          >
            +
          </button>
        </div>
        <button
          ref={triggerRef}
          type="button"
          className="dish__details-btn"
          onClick={handleOpenModal}
          aria-label={`View details for ${name}`}
          style={{ marginLeft: "8px", fontSize: "0.8rem", padding: "4px 8px" }}
        >
          Details
        </button>
      </li>
      {showModal &&
        createPortal(
          <DishModal
            dish={{ id, name, price, spicy, currency }}
            onClose={handleCloseModal}
          />,
          document.body,
        )}
    </>
  );
}

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

// FIX: Wrap in memo to prevent unnecessary re-renders when parent (DishList) updates
export default memo(Dish);
