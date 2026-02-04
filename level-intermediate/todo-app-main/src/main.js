import { initThemeToggle } from "./ui/theme.js";
import { initTodo } from "./todo/todo.js";
import { loadTodoStore } from "./services/storage.js";

export const ASSET_PATH = "./assets";

document.addEventListener("DOMContentLoaded", () => {
  loadTodoStore();

  const switchModeBtn = document.querySelector(".btn__switch-mode");
  initThemeToggle(switchModeBtn);

  initTodo();
});
