import { cart, increase, decrease } from "../store/cart.js";

const quantityValue = document.querySelector(".quantity-value");

function renderCartCount() {
  quantityValue.textContent = cart.quantity;
}

export function initCartControls() {
  document.querySelector(".btn-plus-quantity").addEventListener("click", () => {
    increase();
    renderCartCount();
  });

  document.querySelector(".btn-minus-quantity").addEventListener("click", () => {
    decrease();
    renderCartCount();
  });
}
