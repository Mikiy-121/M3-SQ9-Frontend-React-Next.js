import { dishes } from "@/lib/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q")?.trim().toLowerCase() || "";

  const filteredDishes = query
    ? dishes.filter((dish) =>
        dish.name.toLowerCase().includes(query)
      )
    : dishes;

  if (!searchParams.has("page")) {
    return Response.json(filteredDishes);
  }

  const page = Number(searchParams.get("page") || 1);

  const limit = 3;

  const start = (page - 1) * limit;
  const end = start + limit;

  const results = filteredDishes.slice(start, end);

  return Response.json({
    data: results,
    page,
    limit,
    total: filteredDishes.length,
    totalPages: Math.ceil(
      filteredDishes.length / limit
    ),
  });
}
