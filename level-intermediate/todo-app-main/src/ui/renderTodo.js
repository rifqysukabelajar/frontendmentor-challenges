import { ASSET_PATH } from '../main.js';

export function renderTodo(todos) {
  const list = document.querySelector(".todo-list");
  list.innerHTML = "";

  todos.forEach(({ id, valueTodo, completed }) => {
    const li = document.createElement("li");
    li.classList.add("surface");

    const div = document.createElement("div");
    div.classList.add("todo-main");

    const span = document.createElement("span");
    span.dataset.id = id;
    span.textContent = valueTodo;
    span.classList.add("todo-text");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = completed

    const imgDelete = document.createElement("img");
    imgDelete.classList.add("icon", "icon-delete");
    imgDelete.src = `${ASSET_PATH}/icons/icon-cross.svg`;
    imgDelete.alt = "Delete todo";
    imgDelete.width = 13.5;
    imgDelete.height = 13.5;
    imgDelete.setAttribute("aria-hidden", "true");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn__delete");
    deleteButton.setAttribute("aria-label", "Delete todo item");
    deleteButton.appendChild(imgDelete);


    div.append(checkbox, span);
    li.append(div, deleteButton);

    li.classList.toggle("completed", completed);
    list.appendChild(li);
  });
}
