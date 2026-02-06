import { todoStore } from "../todo/todo.js";
import { createElement } from "../utils/helper.js";
import { showNotifications } from "../utils/notifications.js";
import { commit } from "../todo/commit.js";

let footerEl = null;
let countEl = null;
let filterButtons = null;

function clearCompletedTodo() {
  const hasCompleted = todoStore.todos.some((todo) => todo.completed);
  if (!hasCompleted) {
    showNotifications({
      message: "Belum ada todo yang bisa diclear",
      type: "warning",
    });
    return;
  }

  for (let i = todoStore.todos.length - 1; i >= 0; i--) {
    if (todoStore.todos[i].completed) {
      todoStore.todos.splice(i, 1);
    }
  }

  commit();
}

function setFilter(filter) {
  todoStore.currentFilter = filter;
  commit();
  updateActiveFilter();
}

export function getFilteredTodos() {
  switch (todoStore.currentFilter) {
    case "active":
      return todoStore.todos.filter((todo) => !todo.completed);
    case "completed":
      return todoStore.todos.filter((todo) => todo.completed);
    default:
      return todoStore.todos;
  }
}

function updateActiveFilter() {
  if (!filterButtons) return;

  filterButtons.forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.dataset.filter === todoStore.currentFilter,
    );
  });
}

export function updateTodoCount() {
  if (!countEl) return;

  const filteredTodos = getFilteredTodos();
  let label;

  switch (todoStore.currentFilter) {
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

function createFooter() {
  countEl = createTodoCount();
  const btnClearCompleted = createBtnClearCompleted();

  const todoFooterActions = createElement({
    tag: "div",
    classNames: ["todo-footer__actions", "surface"],
  });
  todoFooterActions.append(countEl, btnClearCompleted);

  const { element: todoFilters, buttons } = createFilters();
  filterButtons = buttons;

  footerEl = createElement({
    tag: "footer",
    classNames: "todo-footer",
  });

  footerEl.append(todoFooterActions, todoFilters);
  btnClearCompleted.addEventListener("click", clearCompletedTodo);
}

function createTodoCount() {
  const todoCount = createElement({
    tag: "span",
    classNames: "todo-count",
    content: "0 items left",
  });

  return todoCount;
}

function createBtnClearCompleted() {
  const btnClearCompleted = createElement({
    tag: "button",
    classNames: "btn__clear-completed",
    content: "Clear Completed",
    attribute: { "aria-label": "Clear all completed todo items" },
  });

  return btnClearCompleted;
}

function createFilters() {
  const todoFilters = createElement({
    tag: "ul",
    classNames: ["todo-filters", "surface"],
  });

  const buttons = [];

  const filters = [
    { name: "All", value: "all" },
    { name: "Active", value: "active" },
    { name: "Completed", value: "completed" },
  ];

  filters.forEach(({ name, value }) => {
    const li = document.createElement("li");

    const btn = createElement({
      tag: "button",
      classNames: "surface",
      content: name,
    });

    btn.dataset.filter = value;
    btn.addEventListener("click", () => setFilter(value));

    buttons.push(btn);
    li.appendChild(btn);
    todoFilters.appendChild(li);
  });

  return { element: todoFilters, buttons };
}

function removeFooter() {
  if (todoStore.todos.length === 0 && footerEl) {
    footerEl.remove();
    footerEl = null;
    countEl = null;
    filterButtons = null;
  }
}

export function renderFooter() {
  if (todoStore.todos.length !== 0 && !footerEl) {
    createFooter();
    document.querySelector(".todo-list").after(footerEl);
  }

  updateActiveFilter();
  removeFooter();
}
