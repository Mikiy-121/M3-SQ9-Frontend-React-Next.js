import { BrowserRouter, Routes, Route, lazy, Suspense } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import ErrorBoundary from "./ErrorBoundary";
import Skeleton from "./Skeleton";
import "./App.css";

const Checkout = lazy(() => import("./routes/Checkout"));
const Receipt = lazy(() => import("./routes/Receipt"));

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="page">
            <Header />
            <main className="page__content">
              <Suspense fallback={<Skeleton />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <div className="page__stack">
                        <ErrorBoundary
                          fallback={
                            <p style={{ color: "red", padding: "1rem" }}>
                              Menu failed to load.
                            </p>
                          }
                        >
                          <Menu />
                        </ErrorBoundary>
                        <ErrorBoundary
                          fallback={
                            <p style={{ color: "red", padding: "1rem" }}>
                              Cart failed to load.
                            </p>
                          }
                        >
                          <OrderForm />
                        </ErrorBoundary>
                      </div>
                    }
                  />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/receipt" element={<Receipt />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
