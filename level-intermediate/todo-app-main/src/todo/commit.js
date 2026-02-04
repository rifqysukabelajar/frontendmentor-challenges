import { saveTodoStore } from "../services/storage.js";
import { renderUI } from "../ui/renderUI.js";

export function commit() {
  saveTodoStore();
  renderUI();
}
