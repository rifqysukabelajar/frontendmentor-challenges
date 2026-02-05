export function showNotifications({
  message,
  type = "warning",
  parent = document.querySelector(".todo-group"),
}) {
  const notif = parent.querySelector(".todo-notif");

  if (!notif) {
    console.warn("Element not found");
    return;
  }

  // reset
  notif.className = "todo-notif";
  parent.classList.remove("warning", "error");

  notif.textContent = message;
  notif.classList.add(`notif--${type}`, "notif--show");
  parent.classList.add(type);

  clearTimeout(showNotifications._timer);
  showNotifications._timer = setTimeout(() => {
    notif.classList.remove("notif--show");
    parent.classList.remove("warning", "error");
    notif.textContent = "";
  }, 3000);
}
