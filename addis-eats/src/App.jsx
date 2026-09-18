import Header from "./Header";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="page">
          <Header />
          <main className="page__content">
            <div className="page__stack">
              <Menu />
              <OrderForm />
            </div>
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
