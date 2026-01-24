export function renderTodo(todos) {
  const list = document.querySelector(".todo-list");
  list.innerHTML = "";

  todos.forEach(({ id, valueTodo }) => {
    const li = document.createElement("li");

    const div = document.createElement("div");
    div.classList.add("todo-main");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    const span = document.createElement("span");
    span.textContent = valueTodo;
    span.dataset.id = id;
    span.classList.add("todo-text");

    div.append(checkbox, span);
    li.appendChild(div);
    list.appendChild(li);
  });
}
