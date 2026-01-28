import { renderTodo } from "../ui/renderTodo.js";

const todos = [];
let currentId = 1;
let footerEl = null;
let currentFilter = "all";

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
    console.log(document.body);

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

  updateTodoCount();
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
    updateTodoCount();

    if (todos.length === 0 && footerEl) {
      footerEl.remove();
      footerEl = null;
    }
  });
}

function createFooter() {
  footerEl = document.createElement("footer");
  footerEl.classList.add("todo-footer");

  const todoFooterActions = document.createElement("div");
  todoFooterActions.classList.add("todo-footer__actions", "surface");

  const todoCount = document.createElement("span");
  todoCount.classList.add("todo-count");
  todoCount.textContent = "0 items left";

  const btnClearCompleted = document.createElement("button");
  btnClearCompleted.classList.add("btn__clear-completed");
  btnClearCompleted.setAttribute(
    "aria-label",
    "Clear all completed todo items",
  );
  btnClearCompleted.textContent = "Clear Completed";

  const todoFilters = document.createElement("ul");
  todoFilters.classList.add("todo-filters", "surface");

  const filters = [
    { name: "All", value: "all" },
    { name: "Active", value: "active" },
    { name: "Completed", value: "completed" },
  ];

  filters.forEach(({ name, value }) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add(`filter-${value}`, "surface");
    btn.textContent = name;

    btn.addEventListener("click", () => setFilter(value));

    li.appendChild(btn);
    todoFilters.appendChild(li);
  });

  todoFooterActions.append(todoCount, btnClearCompleted);
  footerEl.append(todoFooterActions, todoFilters);

  document.querySelector(".todo-list").after(footerEl);
  btnClearCompleted.addEventListener("click", clearCompletedTodo);
}

function setFilter(filter) {
  currentFilter = filter;
  renderTodo(getFilteredTodos());
  updateTodoCount();
}

function getFilteredTodos() {
  switch (currentFilter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
}

function updateTodoCount() {
  const countEl = document.querySelector(".todo-count");
  if (!countEl) return;

  const filteredTodos = getFilteredTodos();
  let label;

  switch (currentFilter) {
    case "active":
      label = "items active";
      break;
    case "completed":
      label = "items completed";
      break;
    default:
      label = "total items";
      break;
  }

  countEl.textContent = `${filteredTodos.length} ${label}`;
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
    updateTodoCount();
  });
}

function clearCompletedTodo(e) {
  const btn = e.target.closest(".btn__clear-completed");
  if (!btn) return;

  const hasCompleted = todos.some((todo) => todo.completed);
  if (!hasCompleted) {
    alert("Belum ada todo yang statusnya completed");
    return;
  }

  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      todos.splice(i, 1);
    }
  }

  updateTodoCount();

  if (todos.length === 0 && footerEl) {
    footerEl.remove();
    footerEl = null;
  }

  renderTodo(todos);
}
