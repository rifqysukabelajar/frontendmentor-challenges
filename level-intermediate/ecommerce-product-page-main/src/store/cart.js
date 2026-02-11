export const cart = {
  quantity: 0,
};

export function increase() {
  cart.quantity++;
}

export function decrease() {
  if (cart.quantity === 0) return;
  cart.quantity--;
}
