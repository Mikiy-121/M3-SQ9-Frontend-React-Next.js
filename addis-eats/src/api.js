export async function loadDishes(signal) {
  const res = await fetch("/dishes.json", { signal });

  if (!res.ok) {
    throw new Error(`Could not load the menu (HTTP ${res.status}).`);
  }

  return res.json();
}
