import { renderTodo } from "../ui/renderTodo.js";

const todos = [];
let currentId = 1;
let footerEl = null;

export const initTodo = function () {
  const form = document.querySelector(".todo-form");
  const inputTodo = document.querySelector("#todo-input");
  
  completedTodo();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valueTodo = inputTodo.value.trim();
    if (!valueTodo) {
      inputTodo.focus();
      return alert("Input tidak boleh kosong!");
    }

    addTodo(valueTodo);
    renderTodo(todos);

    inputTodo.value = "";
  });
};

function addTodo(valueTodo) {
  if (!valueTodo.trim()) return;

  const todo = {
    id: currentId++,
    valueTodo,
  };

  todos.push(todo);

  if (todos.length === 1) {
    createFooter();
  }

  updateTodoCount(todos);
}

function createFooter() {
  footerEl = document.createElement("div");
  footerEl.classList.add("todo-footer");

  const span = document.createElement("span");
  span.classList.add("todo-count");
  span.textContent = "0 items left";

  const button = document.createElement("button");
  button.classList.add("btn__clear-completed");
  button.textContent = "Clear Completed";

  footerEl.append(span, button);
  document.querySelector(".todo-list").after(footerEl);
}

function updateTodoCount(todos) {
  const countEl = document.querySelector(".todo-count");
  if (!countEl) return;

  countEl.textContent = `${todos.length} items left`;
}

function completedTodo() {
  document.querySelector(".todo-list").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const checkbox = e.target.closest(".todo-checkbox");
    if (!checkbox) return;

    li.classList.toggle("completed", checkbox.checked);
  });
}
