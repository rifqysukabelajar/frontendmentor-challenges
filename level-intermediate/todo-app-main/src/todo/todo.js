import { renderTodo } from "../ui/renderTodo.js";
import { createElement } from "../utils/helper.js";
import { showNotifications } from "../utils/notifications.js";

export const todoStore = {
  todos: [],
  currentId: 1,
  currentFilter: "all",
};

let footerEl = null;

function render() {
  renderTodo();
  updateTodoCount();
}

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
  handleAddTodo(input, () => render());
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
    render();
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

    render();
    removeFooterElement();
  });
}

function clearCompletedTodo(e) {
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

  removeFooterElement();
  render();
}

function handleAddTodo(input, onSuccess) {
  const value = input.value.trim();
  if (!value) {
    input.focus();
    showNotifications({
      message: "Input tidak boleh kosong!",
      type: "warning",
    });
    return;
  }

  addTodo(value);
  input.value = "";

  if (onSuccess) onSuccess();
}

function addTodo(text) {
  const todo = {
    id: todoStore.currentId++,
    text,
    completed: false,
  };

  todoStore.todos.push(todo);

  if (todoStore.todos.length === 1) {
    createFooter();
  }

  render();
}

function setFilter(filter) {
  todoStore.currentFilter = filter;
  render();
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

function removeFooterElement() {
  if (todoStore.todos.length === 0 && footerEl) {
    footerEl.remove();
    footerEl = null;
  }
}

function updateTodoCount() {
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
