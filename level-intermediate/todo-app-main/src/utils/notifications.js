import { createElement } from "../utils/helper.js";

export function showNotifications({ message, type = "info" }) {
  let error = document.querySelector(".error");

  if (!error) {
    error = createElement({
      tag: "small",
      classNames: "error",
    });
    document.body.appendChild(error);
  }

  error.className = `error error__${type}`;
  error.textContent = message;

  setTimeout(() => error.classList.add("error__show"), 10);

  setTimeout(() => {
    error.classList.remove("error__show");
    setTimeout(() => error.remove(), 300);
  }, 3000);
}
