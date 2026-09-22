import { useCart } from "../cart/cartStore";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Receipt() {
  const items = useCart((state) => state.items);
  const total = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  );
  const clear = useCart((state) => state.clear);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) navigate("/");
  }, [items, navigate]);

  const handleConfirm = () => {
    clear();
    navigate("/");
  };

  return (
    <div className="receipt" style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Receipt</h2>
      <p>Thank you for your order!</p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <span>
              {item.name} x {item.qty}
            </span>
            <span>{item.price * item.qty} ETB</span>
          </li>
        ))}
      </ul>
      <hr style={{ maxWidth: "400px", margin: "1rem auto" }} />
      <h3
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Total Paid:</span>
        <span>{total} ETB</span>
      </h3>
      <button
        onClick={handleConfirm}
        style={{
          marginTop: "2rem",
          padding: "0.8rem 1.5rem",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Start New Order
      </button>
    </div>
  );
}
