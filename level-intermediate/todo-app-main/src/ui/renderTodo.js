import { ASSET_PATH } from "../main.js";
import { createElement } from "../utils/helper.js";
import { getFilteredTodos } from "./renderFooter.js";

function createTodoItem(todo) {
  const { id, completed } = todo;

  const inputCheckbox = createInputCheckbox(todo);
  const deleteButton = createDeleteButton(id);

  const li = createElement({
    tag: "li",
    classNames: "surface",
    attribute: { "data-id": id },
  });

  li.classList.toggle("completed", completed);
  li.append(inputCheckbox, deleteButton);

  return li;
}

function createInputCheckbox(todo) {
  const { text, completed } = todo;

  const checkbox = createElement({
    tag: "input",
    classNames: "todo-checkbox",
    attribute: { type: "checkbox" },
  });
  checkbox.checked = completed;

  const wrapperIcon = createElement({
    tag: "span",
    classNames: "todo-icon-box",
  });

  const iconCheck = createElement({
    tag: "img",
    attribute: {
      src: `${ASSET_PATH}/icons/icon-check.svg`,
      alt: "Checklist todo",
      width: 11,
      height: 11,
      "aria-hidden": "true",
    },
  });

  wrapperIcon.appendChild(iconCheck);

  const todoText = createElement({
    tag: "span",
    classNames: "todo-text",
    content: text,
  });

  const todoMainContainer = createElement({
    tag: "label",
    classNames: "todo-main",
  });
  todoMainContainer.append(checkbox, wrapperIcon, todoText);

  return todoMainContainer;
}

function createDeleteButton(todoId) {
  const iconDelete = createElement({
    tag: "img",
    classNames: ["icon", "icon-delete"],
    attribute: {
      src: `${ASSET_PATH}/icons/icon-cross.svg`,
      alt: "Delete todo",
      width: 13.5,
      height: 13.5,
      "aria-hidden": "true",
    },
  });

  const deleteButton = createElement({
    tag: "button",
    classNames: ["btn", "btn__delete"],
    attribute: { "aria-label": "Delete todo item" },
  });
  deleteButton.appendChild(iconDelete);

  return deleteButton;
}

export function renderTodo() {
  const list = document.querySelector(".todo-list");
  if (!list) return;
  list.innerHTML = "";

  const todos = getFilteredTodos();

  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo);
    list.appendChild(todoItem);
  });
}
