import { useCart, selectItems, selectTotal } from "../cart/cartStore";
import { Link } from "react-router-dom";

export default function Checkout() {
  const items = useCart(selectItems);
  const total = useCart(selectTotal);

  if (items.length === 0) {
    return (
      <div className="checkout" style={{ padding: "2rem" }}>
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <Link to="/">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="checkout" style={{ padding: "2rem" }}>
      <h2>Checkout</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
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
      <hr />
      <h3 style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Total:</span>
        <span>{total} ETB</span>
      </h3>
      <Link
        to="/receipt"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.8rem 1.5rem",
          backgroundColor: "#28a745",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Proceed to Receipt
      </Link>
    </div>
  );
}
