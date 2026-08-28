import { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import { menu } from "./data";
import "./App.css";

export default function App() {
  const [total, setTotal] = useState(0);

  function handleQtyChange(delta) {
    setTotal((t) => t + delta);
  }

  return (
    <div className="page">
      <Header />
      <main className="page__content">
        <div className="page__stack">
          <Menu dishes={menu} onQtyChange={handleQtyChange} />
          <OrderForm total={total} />
        </div>
      </main>
    </div>
  );
}
