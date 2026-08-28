import { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import { menu } from "./data";
import "./App.css";

export default function App() {
  const [total, setTotal] = useState(0);

  function handleAddDish(price) {
    setTotal((t) => t + price);
  }

  return (
    <div className="page">
      <Header />
      <main className="page__content">
        <div className="page__stack">
          <Menu dishes={menu} onAddDish={handleAddDish} />
          <OrderForm total={total} />
        </div>
      </main>
    </div>
  );
}
