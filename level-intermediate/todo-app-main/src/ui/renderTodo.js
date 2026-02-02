import { ASSET_PATH } from "../main.js";
import { createElement } from "../utils/helper.js";

function createTodoItem(todo) {
  const { id, valueTodo, completed } = todo;

  const todoText = createElement({
    tag: "span",
    classNames: "todo-text",
    content: valueTodo,
  });

  const checkbox = createElement({
    tag: "input",
    classNames: "todo-checkbox",
    attribute: { type: "checkbox" },
  });
  checkbox.checked = completed;

  const todoMainContainer = createElement({
    tag: "div",
    classNames: "todo-main",
  });
  todoMainContainer.append(checkbox, todoText);

  const deleteButton = createDeleteButton(id);

  const li = createElement({
    tag: "li",
    classNames: "surface",
    attribute: { "data-id": id },
  });

  li.classList.toggle("completed", completed);
  li.append(todoMainContainer, deleteButton);

  return li;
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
      "aria-hidden": true,
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

export function renderTodo(todos) {
  const list = document.querySelector(".todo-list");
  list.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo);
    list.appendChild(todoItem);
  });
}
