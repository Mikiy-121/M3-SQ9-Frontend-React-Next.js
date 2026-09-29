import { getDishes } from "./menu/data";
import DishList from "./menu/DishList";
import FilterShell from "./menu/FilterShell";

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main>
      <h1>Addis Eats</h1>

      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}
