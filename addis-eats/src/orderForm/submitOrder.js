export function submitOrder(form) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.area.trim() === "Akaky Kaliti") {
        reject({
          field: "area",
          message: "We don't deliver to Akaky Kaliti yet.",
        });
        return;
      }

      if (Math.random() < 0.25) {
        reject({
          field: "phone",
          message: "TeleBirr could not confirm this number. Try again.",
        });
        return;
      }

      resolve({ confirmedAt: new Date().toISOString() });
    }, 700);
  });
}
