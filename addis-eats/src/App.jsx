import Header from "./Header";
import Menu from "./Menu";
import { menu } from "./data";
import "./App.css";

const category = "Vegetarian";

export default function App() {
  return (
    <div className="page">
      <Header />
      <main className="page__content">
        <Menu dishes={menu} category={category} />
      </main>
    </div>
  );
}
