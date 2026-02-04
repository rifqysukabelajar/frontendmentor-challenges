import { todoStore } from "../todo/todo.js";

const STORAGE_KEY = "todoStore";

export function saveTodoStore() {
  // STORAGE_KEY ==> nama / alamat / label data
  // todoStore ==> isi data yang mau disimpan

  // Simpan todoStore ke localStorage, dan kasih nama STORAGE_KEY
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoStore));
}

export function loadTodoStore() {
  // localStorage.getItem() ==> ambil data, berdasarkan namanya, bukan isinya.
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!saved) return;

  todoStore.todos = saved.todos || [];
  todoStore.currentId = saved.currentId || 1;
  todoStore.currentFilter = saved.currentFilter || "all";
}
