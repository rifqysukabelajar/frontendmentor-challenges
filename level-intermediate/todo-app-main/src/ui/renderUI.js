import { renderTodo } from "./renderTodo.js";
import { renderFooter, updateTodoCount } from "./renderFooter.js";

export function renderUI() {
  renderTodo();
  renderFooter();
  updateTodoCount();
}