import { isValidEmail, saveEmail } from "../utils/helper.js";

export const initNewsLetter = function () {
  const form = document.querySelector(".newsletter__form");
  if (!form) return;

  const groupForm = form.querySelector(".group-form");
  const inputEmail = groupForm.querySelector("#email");
  const notif = groupForm.querySelector(".notif");

  form.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    const email = inputEmail.value.trim();

    if (!isValidEmail(email)) {
      showNotification("Valid email required", "error");
      return;
    }

    const isSaved = saveEmail(email);

    if (!isSaved) {
      showNotification("Email already subscribed", "error");
      return;
    }

    inputEmail.value = "";
    window.location.href = "succeed.html";
  }

  function showNotification(message, type) {
    if (!notif) return;

    notif.textContent = message;
    notif.classList.remove("notif--error", "notif--success");
    notif.classList.add(`notif--${type}`, "notif--show");
    groupForm.classList.add(type);

    setTimeout(() => {
      notif.classList.remove("notif--show", `notif--${type}`);
      groupForm.classList.remove(type);
    }, 3000);
  }
};
