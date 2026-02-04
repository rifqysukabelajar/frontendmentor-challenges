import { todoStore } from "../todo/todo.js";
import { createElement } from "../utils/helper.js";
import { showNotifications } from "../utils/notifications.js";
import { commit } from "../todo/commit.js";

let footerEl = null;

function clearCompletedTodo() {
  const hasCompleted = todoStore.todos.some((todo) => todo.completed);
  if (!hasCompleted) {
    showNotifications({
      message: "Belum ada todo yang statusnya completed",
      type: "warning",
    });
    return;
  }

  for (let i = todoStore.todos.length - 1; i >= 0; i--) {
    if (todoStore.todos[i].completed) {
      todoStore.todos.splice(i, 1);
    }
  }

  commit()
}

function setFilter(filter) {
  todoStore.currentFilter = filter;
  commit()
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

export function updateTodoCount() {
  const countEl = document.querySelector(".todo-count");
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
  const todoCount = createTodoCount();
  const btnClearCompleted = createBtnClearCompleted();

  const todoFooterActions = createElement({
    tag: "div",
    classNames: ["todo-footer__actions", "surface"],
  });
  todoFooterActions.append(todoCount, btnClearCompleted);

  const todoFilters = createFilters();

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

  const filters = [
    { name: "All", value: "all" },
    { name: "Active", value: "active" },
    { name: "Completed", value: "completed" },
  ];

  filters.forEach(({ name, value }) => {
    const li = document.createElement("li");

    const btn = createElement({
      tag: "button",
      classNames: [`filter-${value}`, "surface"],
      content: name,
    });
    btn.addEventListener("click", () => setFilter(value));

    li.appendChild(btn);
    todoFilters.appendChild(li);
  });

  return todoFilters;
}

function removeFooter() {
  if (todoStore.todos.length === 0 && footerEl) {
    footerEl.remove();
    footerEl = null;
  }
}

export function renderFooter() {
  if (todoStore.todos.length !== 0 && !footerEl) {
    createFooter();
    document.querySelector(".todo-list").after(footerEl);
  }

  removeFooter();
}
