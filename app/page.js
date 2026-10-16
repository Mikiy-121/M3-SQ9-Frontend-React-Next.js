import MenuList from "./menu/MenuList";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-4xl font-bold">
        Addis Eats
      </h1>

      <p className="mb-8 text-gray-600">
        Ethiopian food delivered to your door.
      </p>

      <MenuList />
    </main>
  );
}
