export function renderTodo(todos) {
  const list = document.querySelector(".todo-list");
  list.innerHTML = "";

  todos.forEach(({ id, valueTodo }) => {
    const li = document.createElement("li");
    li.classList.add("surface");

    const div = document.createElement("div");
    div.classList.add("todo-main");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    const imgDelete = document.createElement("img");
    imgDelete.classList.add("icon", "icon-delete");
    imgDelete.src = "./assets/icons/icon-cross.svg";
    imgDelete.alt = "Delete todo";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn__delete");
    deleteButton.setAttribute("aria-label", "Delete todo item");
    deleteButton.appendChild(imgDelete);

    const span = document.createElement("span");
    span.dataset.id = id;
    span.textContent = valueTodo;
    span.classList.add("todo-text");

    div.append(checkbox, span);
    li.append(div, deleteButton);
    list.appendChild(li);
  });
}
