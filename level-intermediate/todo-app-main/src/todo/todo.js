import { renderTodo } from "../ui/renderTodo.js";

const todos = [];
let currentId = 1;
let footerEl = null;

export const initTodo = function () {
  const form = document.querySelector(".todo-form");
  const inputTodo = document.querySelector("#todo-input");
  const todoList = document.querySelector(".todo-list");

  completedTodo(todoList);
  deleteTodo(todoList);

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
    completed: false,
  };

  todos.push(todo);

  if (todos.length === 1) {
    createFooter();
  }

  updateTodoCount(todos);
}

function deleteTodo(todoList) {
  todoList.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn || !btn.classList.contains("btn__delete")) return;

    const li = btn.closest("li");
    if (!li) return;

    const span = li.querySelector("span[data-id]");
    if (!span) return;

    const id = Number(span.dataset.id);

    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }

    li.remove();
    updateTodoCount(todos);

    if (todos.length === 0 && footerEl) {
      footerEl.remove();
      footerEl = null;
    }
  });
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

  footerEl.addEventListener("click", clearCompletedTodo);
}

function updateTodoCount(todos) {
  const countEl = document.querySelector(".todo-count");
  if (!countEl) return;

  countEl.textContent = `${todos.length} items left`;
}

function completedTodo(todoList) {
  todoList.addEventListener("change", (e) => {
    const checkbox = e.target;
    if (!checkbox.classList.contains("todo-checkbox")) return;

    const li = checkbox.closest("li");
    if (!li) return;

    const span = li.querySelector("span[data-id]");
    if (!span) return;

    const id = Number(span.dataset.id);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    todo.completed = checkbox.checked;

    li.classList.toggle("completed", todo.completed);
  });
}

function clearCompletedTodo(e) {
  const btn = e.target.closest(".btn__clear-completed");
  if (!btn) return;

  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      todos.splice(i, 1);
      console.log(todos[i]);
    }
  }

  updateTodoCount(todos);

  if (todos.length === 0 && footerEl) {
    footerEl.remove();
    footerEl = null;
  }

  renderTodo(todos);
}
