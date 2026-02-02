import { renderTodo } from "../ui/renderTodo.js";
import { createElement } from "../utils/helper.js";

const todos = [];
let currentId = 1;
let footerEl = null;
let currentFilter = "all";

export const initTodo = function () {
  const { form, input, list } = getTodoElements();

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
  handleAddTodo(input, () => renderTodo(todos));
}

function handleAddTodo(input, onSuccess) {
  const value = input.value.trim();
  if (!value) {
    input.focus();
    alert("Input tidak boleh kosong!");
    return;
  }

  addTodo(value);
  input.value = "";

  if (onSuccess) onSuccess();
}

function addTodo(valueTodo) {
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

    const id = Number(li.dataset.id);
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
  const todoCount = createElement({
    tag: "span",
    classNames: "todo-count",
    content: "0 items left",
  });

  const btnClearCompleted = createElement({
    tag: "button",
    classNames: "btn__clear-completed",
    content: "Clear Completed",
    attribute: { "aria-label": "Clear all completed todo items" },
  });

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

  document.querySelector(".todo-list").after(footerEl);
  btnClearCompleted.addEventListener("click", clearCompletedTodo);
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

    const id = Number(li.dataset.id);
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
