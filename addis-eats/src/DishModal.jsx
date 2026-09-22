import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function DishModal({ dish, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus(); // Trap focus conceptually by focusing modal

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
          color: "black",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>{dish.name}</h2>
        {dish.spicy && (
          <p style={{ color: "#d32f2f" }}>🌶️ This dish is spicy!</p>
        )}
        <p>
          <strong>Price:</strong> {dish.price} {dish.currency}
        </p>
        <p>
          Delicious authentic Ethiopian cuisine prepared with fresh,
          high-quality ingredients.
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

DishModal.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
    currency: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
