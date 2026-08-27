import Header from "./Header";
import Dish from "./Dish";
import "./App.css";

const dishes = [
  { id: 1, name: "Doro Wat", price: 320 },
  { id: 2, name: "Tibs", price: 280 },
  { id: 3, name: "Shiro", price: 190 },
  { id: 4, name: "Kitfo", price: 340 },
  { id: 5, name: "Misir Wat", price: 170 },
  { id: 6, name: "Gomen", price: 160 },
  { id: 7, name: "Beyaynetu", price: 250 },
  { id: 8, name: "Injera Basket", price: 60 },
];

export default function App() {
  return (
    <div className="page">
      <Header />
      <main className="menu">
        <p className="menu__label">Today's menu</p>
        <ul className="menu__list">
          {dishes.map((dish) => (
            <Dish key={dish.id} name={dish.name} price={dish.price} />
          ))}
        </ul>
      </main>
    </div>
  );
}
