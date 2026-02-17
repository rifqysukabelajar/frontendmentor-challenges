document.addEventListener("DOMContentLoaded", () => {
  const emailStore = {
    users: [],
    currentId: 1,
  };

  const form = document.querySelector(".newsletter__form");
  const inputEmail = document.querySelector("#email");
  const groupForm = document.querySelector(".group-form");
  const notif = groupForm.querySelector(".notif");

  form.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    const value = inputEmail.value.trim();

    if (!isValidEmail(value)) {
      showNotification("Valid email required", "error");
      return;
    }

    addEmail(value);
    inputEmail.value = "";
  }

  function isValidEmail(value) {
    return value.includes("@");
  }

  function addEmail(email) {
    emailStore.users.push({
      id: emailStore.currentId++,
      email,
    });
  }

  function showNotification(message, type) {
    notif.textContent = message;
    notif.className = `notif notif--${type} notif--show`;
    groupForm.classList.add(type);

    setTimeout(() => {
      notif.className = "notif";
      groupForm.classList.remove(type);
    }, 3000);
  }
});