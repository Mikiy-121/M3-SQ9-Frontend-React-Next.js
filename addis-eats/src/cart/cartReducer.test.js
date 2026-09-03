import { test } from "node:test";
import assert from "node:assert/strict";
import { cartReducer, initialCartState } from "./cartReducer.js";

const doroWat = { id: 1, name: "Doro Wat", price: 320 };
const shiro = { id: 3, name: "Shiro", price: 190 };

test("add puts a new dish in the cart with qty 1", () => {
  const state = cartReducer(initialCartState, { type: "add", dish: doroWat });
  assert.deepEqual(state.items, [{ ...doroWat, qty: 1 }]);
});

test("add increments qty when the dish is already in the cart", () => {
  let state = cartReducer(initialCartState, { type: "add", dish: doroWat });
  state = cartReducer(state, { type: "add", dish: doroWat });
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].qty, 2);
});

test("remove decrements qty without deleting the item", () => {
  let state = cartReducer(initialCartState, { type: "add", dish: doroWat });
  state = cartReducer(state, { type: "add", dish: doroWat });
  state = cartReducer(state, { type: "remove", id: doroWat.id });
  assert.equal(state.items.length, 1);
  assert.equal(state.items[0].qty, 1);
});

test("remove deletes the item once qty reaches zero", () => {
  let state = cartReducer(initialCartState, { type: "add", dish: doroWat });
  state = cartReducer(state, { type: "remove", id: doroWat.id });
  assert.deepEqual(state.items, []);
});

test("remove on a dish not in the cart is a no-op", () => {
  const state = cartReducer(initialCartState, {
    type: "remove",
    id: 999,
  });
  assert.deepEqual(state, initialCartState);
});

test("clear empties the cart regardless of contents", () => {
  let state = cartReducer(initialCartState, { type: "add", dish: doroWat });
  state = cartReducer(state, { type: "add", dish: shiro });
  state = cartReducer(state, { type: "clear" });
  assert.deepEqual(state, initialCartState);
});

test("an unknown action type returns the state unchanged", () => {
  const state = cartReducer(initialCartState, { type: "noop" });
  assert.equal(state, initialCartState);
});
