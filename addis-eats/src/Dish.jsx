export default function Dish({ name, price }) {
  return (
    <li className="dish">
      <span className="dish__name">{name}</span>
      <span className="dish__leader" aria-hidden="true"></span>
      <span className="dish__price">{price} ETB</span>
    </li>
  );
}
