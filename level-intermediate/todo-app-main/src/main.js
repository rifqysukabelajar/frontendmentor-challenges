import { initThemeToggle } from "./ui/theme.js";
import { initTodo } from "./todo/todo.js";

export const ASSET_PATH = './assets';

const switchModeBtn = document.querySelector(".btn__switch-mode");
initThemeToggle(switchModeBtn);

initTodo()
