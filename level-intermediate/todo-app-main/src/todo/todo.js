import { showNotifications } from "../utils/notifications.js";
import { renderUI } from "../ui/renderUI.js";
import { commit } from "./commit.js";

export const todoStore = {
  todos: [],
  currentId: 1,
  currentFilter: "all",
};

export const initTodo = function () {
  const { form, input, list } = getTodoElements();

  renderUI();

  completedTodo(list);
  deleteTodo(list);

  form.addEventListener("submit", (e) => handleSubmit(e, input));
};

function getTodoElements() {
  return {
    form: document.querySelector(".todo-form"),
    input: document.querySelector("#todo-input"),
    list: document.querySelector(".todo-list"),
  };
}

function handleSubmit(e, input) {
  e.preventDefault();
  handleAddTodo(input);
}

function completedTodo(todoList) {
  todoList.addEventListener("change", (e) => {
    const checkbox = e.target;
    if (!checkbox.classList.contains("todo-checkbox")) return;

    const li = checkbox.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);
    const todo = todoStore.todos.find((todo) => todo.id === id);
    if (!todo) return;

    todo.completed = checkbox.checked;
    commit()
  });
}

function deleteTodo(todoList) {
  todoList.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn || !btn.classList.contains("btn__delete")) return;

    const li = btn.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);
    const index = todoStore.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todoStore.todos.splice(index, 1);
    }

    commit()
  });
}

function handleAddTodo(input) {
  const value = input.value.trim();
  if (!value) {
    input.focus();
    showNotifications({
      message: "Input tidak boleh kosong!",
      type: "error",
    });
    return;
  }

  addTodo(value);
  input.value = "";
}

function addTodo(text) {
  const todo = {
    id: todoStore.currentId++,
    text,
    completed: false,
  };

  todoStore.todos.push(todo);

  commit()
}
