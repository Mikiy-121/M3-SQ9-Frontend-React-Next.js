import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

const orders = [
  {
    id: "ord-1",
    userId: "demo-user-1",
    item: "Doro Wot",
    status: "Preparing",
  },
  {
    id: "ord-2",
    userId: "demo-user-2",
    item: "Tibs",
    status: "Delivered",
  },
];

function getOrdersFor(userId) {
  return orders.filter(
    (order) => order.userId === userId
  );
}

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const userOrders =
    getOrdersFor(session.userId);

  return (
    <main>
      <h1>My Orders</h1>

      {userOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        userOrders.map((order) => (
          <article key={order.id}>
            <h2>{order.item}</h2>

            <p>
              Status: {order.status}
            </p>
          </article>
        ))
      )}
    </main>
  );
}
