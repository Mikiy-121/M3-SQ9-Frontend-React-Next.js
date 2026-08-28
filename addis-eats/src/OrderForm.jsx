import { useState } from "react";
import PropTypes from "prop-types";

const TELEBIRR_PATTERN = /^(?:\+251|251|0)9\d{8}$/;

function isValidPhone(phone) {
  return TELEBIRR_PATTERN.test(phone.trim());
}

export default function OrderForm({ total, currency = "ETB", onSubmit }) {
  const [fields, setFields] = useState({ name: "", phone: "", area: "" });
  const [submitted, setSubmitted] = useState(false);

  const phoneValid = fields.phone === "" || isValidPhone(fields.phone);
  const canSubmit =
    fields.name.trim() !== "" &&
    fields.area.trim() !== "" &&
    isValidPhone(fields.phone);

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit?.(fields);
    setSubmitted(true);
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <p className="order-form__label">Delivery details</p>

      <label className="order-form__field">
        <span className="order-form__field-label">Name</span>
        <input
          type="text"
          name="name"
          value={fields.name}
          onChange={handleChange}
          placeholder="Your full name"
          autoComplete="name"
        />
      </label>

      <label className="order-form__field">
        <span className="order-form__field-label">TeleBirr phone</span>
        <input
          type="tel"
          name="phone"
          value={fields.phone}
          onChange={handleChange}
          placeholder="09XXXXXXXX"
          autoComplete="tel"
          aria-invalid={!phoneValid}
        />
        {!phoneValid && (
          <span className="order-form__error">
            Enter a valid TeleBirr number, e.g. 0912345678.
          </span>
        )}
      </label>

      <label className="order-form__field">
        <span className="order-form__field-label">Delivery area</span>
        <input
          type="text"
          name="area"
          value={fields.area}
          onChange={handleChange}
          placeholder="e.g. Bole, Addis Ababa"
          autoComplete="address-level2"
        />
      </label>

      <div className="order-form__total">
        <span>Order total</span>
        <span>
          {total} {currency}
        </span>
      </div>

      <button
        type="submit"
        className="order-form__submit"
        disabled={!canSubmit}
      >
        Pay with TeleBirr
      </button>

      {submitted && (
        <p className="order-form__confirmation">
          Order placed! We&apos;ll confirm with you at {fields.phone}.
        </p>
      )}
    </form>
  );
}

OrderForm.propTypes = {
  total: PropTypes.number.isRequired,
  currency: PropTypes.string,
  onSubmit: PropTypes.func,
};
