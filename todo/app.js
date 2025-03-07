let todoList = {};
const name = localStorage.getItem("name");

try {
  todoList = JSON.parse(localStorage.getItem("todoList")) || {};
} catch (e) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todoInput = "";
let cnt = Object.keys(todoList).length + 1;

const update = () => {
  const todoListElement = document.getElementById("todo-list");
  const todoListDiv = document.createElement("div");
  todoListDiv.className = "todo-list-div";
  todoListElement.innerHTML = ""; // Clear the list before updating

  Object.keys(todoList).forEach((key) => {
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    li.innerText = todoList[key];
    checkBox.type = "checkbox";

    checkBox.addEventListener("change", () => {
      if (checkBox.checked) {
        li.classList.add("checked");
      } else {
        li.classList.remove("checked");
      }
    });

    todoListElement.appendChild(todoListDiv);
    todoListDiv.appendChild(checkBox);
    todoListDiv.appendChild(li);
  });
};

window.onload = () => {
  document.getElementById("title").innerHTML = `Hello, ${name}`;
  update();
};

const onChange = (e) => {
  todoInput = e.target.value;
};

const onSubmit = (e) => {
  e.preventDefault();
  if (todoInput.trim() === "") {
    alert("Please enter a todo item.");
    return;
  }
  todoList[cnt] = todoInput;
  cnt++;

  localStorage.setItem("todoList", JSON.stringify(todoList));
  todoInput = "";
  document.querySelector("input").value = "";
  update();
};
