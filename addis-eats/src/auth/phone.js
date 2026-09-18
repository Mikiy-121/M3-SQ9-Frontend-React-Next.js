export const COUNTRY_CODE = "+251";

export const LOCAL_PHONE_PATTERN = /^[79]\d{8}$/;

export function isValidLocalPhone(localNumber) {
  return LOCAL_PHONE_PATTERN.test(localNumber.trim());
}

export function toFullPhone(localNumber) {
  return `${COUNTRY_CODE}${localNumber.trim()}`;
}
