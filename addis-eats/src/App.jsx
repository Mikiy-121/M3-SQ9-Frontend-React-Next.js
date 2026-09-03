import Header from "./Header";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import { CartProvider } from "./cart/CartProvider";
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <div className="page">
        <Header />
        <main className="page__content">
          <div className="page__stack">
            <Menu />
            <OrderForm />
          </div>
        </main>
      </div>
    </CartProvider>
  );
}
