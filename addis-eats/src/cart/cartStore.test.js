import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { useCart, selectCount, selectTotal } from "./cartStore.js";

const doroWat = { id: 1, name: "Doro Wat", price: 320 };
const shiro = { id: 3, name: "Shiro", price: 190 };

beforeEach(() => {
  useCart.setState({ items: [] });
});

test("addItem puts a new dish in the cart with qty 1", () => {
  useCart.getState().addItem(doroWat);
  assert.deepEqual(useCart.getState().items, [{ ...doroWat, qty: 1 }]);
});

test("addItem increments qty when the dish is already in the cart", () => {
  useCart.getState().addItem(doroWat);
  useCart.getState().addItem(doroWat);
  const { items } = useCart.getState();
  assert.equal(items.length, 1);
  assert.equal(items[0].qty, 2);
});

test("remove decrements qty without deleting the item", () => {
  useCart.getState().addItem(doroWat);
  useCart.getState().addItem(doroWat);
  useCart.getState().remove(doroWat.id);
  const { items } = useCart.getState();
  assert.equal(items.length, 1);
  assert.equal(items[0].qty, 1);
});

test("remove deletes the item once qty reaches zero", () => {
  useCart.getState().addItem(doroWat);
  useCart.getState().remove(doroWat.id);
  assert.deepEqual(useCart.getState().items, []);
});

test("clear empties the cart regardless of contents", () => {
  useCart.getState().addItem(doroWat);
  useCart.getState().addItem(shiro);
  useCart.getState().clear();
  assert.deepEqual(useCart.getState().items, []);
});

test("selectCount sums quantities across dishes", () => {
  useCart.getState().addItem(doroWat);
  useCart.getState().addItem(doroWat);
  useCart.getState().addItem(shiro);
  assert.equal(selectCount(useCart.getState()), 3);
});

test("selectTotal sums price times quantity across dishes", () => {
  useCart.getState().addItem(doroWat);
  useCart.getState().addItem(doroWat);
  useCart.getState().addItem(shiro);
  assert.equal(selectTotal(useCart.getState()), 320 * 2 + 190);
});
