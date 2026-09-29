import { getDishes } from "./data";
import DishCard from "./DishCard";
import CategoryBar from "./CategoryBar";

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main>
      <h1>Addis Eats</h1>

      <CategoryBar />

      <h2>Todays Menu</h2>

      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </main>
  );
}
