import { orders } from "./orders";

export async function getOrder(id) {
  const order = orders[id];

  if (!order) {
    return null;
  }

  return order;
}
