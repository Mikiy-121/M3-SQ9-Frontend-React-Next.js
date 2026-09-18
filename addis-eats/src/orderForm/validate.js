import { DELIVERY_AREAS } from "./areas.js";

const PHONE_PATTERN = /^(?:\+251|251|0)9\d{8}$/;

export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Enter your TeleBirr phone number.";
  } else if (!PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = "Enter a valid Ethiopian phone, e.g. 0912345678.";
  }

  if (!form.area.trim()) {
    errors.area = "Choose a delivery area.";
  } else if (!DELIVERY_AREAS.includes(form.area.trim())) {
    errors.area = "Choose a valid Addis Ababa sub-city.";
  }

  return errors;
}
