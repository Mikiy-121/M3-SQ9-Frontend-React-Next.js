import { test } from "node:test";
import assert from "node:assert/strict";
import { validate } from "./validate.js";

const validForm = {
  name: "Abebe Kebede",
  phone: "0912345678",
  area: "Bole",
  notes: "",
};

test("a fully valid form has no errors", () => {
  assert.deepEqual(validate(validForm), {});
});

test("missing name is flagged", () => {
  const errors = validate({ ...validForm, name: "  " });
  assert.equal(typeof errors.name, "string");
});

test("missing phone is flagged", () => {
  const errors = validate({ ...validForm, phone: "" });
  assert.equal(typeof errors.phone, "string");
});

test("malformed phone is flagged", () => {
  const errors = validate({ ...validForm, phone: "12345" });
  assert.equal(typeof errors.phone, "string");
});

test("a +251 phone is accepted", () => {
  const errors = validate({ ...validForm, phone: "+251912345678" });
  assert.equal(errors.phone, undefined);
});

test("missing area is flagged", () => {
  const errors = validate({ ...validForm, area: "" });
  assert.equal(typeof errors.area, "string");
});

test("a random word is not accepted as an area", () => {
  const errors = validate({ ...validForm, area: "Narnia" });
  assert.equal(typeof errors.area, "string");
});

test("a real sub-city is accepted as an area", () => {
  const errors = validate({ ...validForm, area: "Yeka" });
  assert.equal(errors.area, undefined);
});

test("notes is never required", () => {
  const errors = validate({ ...validForm, notes: "" });
  assert.equal(errors.notes, undefined);
});

test("errors come back in field order: name, phone, area", () => {
  const errors = validate({ name: "", phone: "", area: "", notes: "" });
  assert.deepEqual(Object.keys(errors), ["name", "phone", "area"]);
});
