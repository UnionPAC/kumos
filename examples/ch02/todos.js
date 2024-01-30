// define app state

const todos = [
  { description: "Walk the dog", done: false },
  { description: "Get groceries", done: false },
  { description: "Go for a run", done: false },
];

// HTML element references
const todoInput = document.getElementById("todo-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todos-list");

// Initialze View
for (const todo of todos) {
  todoList.append(renderTodoInReadMode(todo));
}

// Event Listeners

todoInput.addEventListener("input", () => {
  addTodoBtn.disabled = todoInput.value.length < 3;
});

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && todoInput.value.length >= 3) {
    addTodo();
  }
});

addTodoBtn.addEventListener("click", () => {
  addTodo();
});

// Functions

function renderTodoInReadMode(todo) {
  const li = document.createElement("li");

  const span = document.createElement("span");

  span.textContent = todo.description;

  if (todo.done) {
    span.classList.add("done");
  }

  if (!todo.done) {
    span.addEventListener("dblclick", () => {
      const index = todos.indexOf(todo);

      todoList.replaceChild(
        renderTodoInEditMode(todo),
        todoList.childNodes[index]
      );
    });
  }

  li.append(span);

  if (!todo.done) {
    const button = document.createElement("button");
    button.textContent = "Done";
    button.addEventListener("click", () => {
      const index = todos.indexOf(todo);
      removeTodo(index);
    });
    li.append(button);
  }

  return li;
}

function renderTodoInEditMode(todo) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.description;
  li.append(input);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  saveButton.addEventListener("click", () => {
    const index = todos.indexOf(todo);
    updateTodo(index, input.value);
  });
  li.append(saveButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";

  cancelButton.addEventListener("click", () => {
    const index = todos.indexOf(todo);
    todoList.replaceChild(
      renderTodoInReadMode(todo),
      todoList.childNodes[index]
    );
  });
  li.append(cancelButton);

  return li;
}

function addTodo() {
  const description = todoInput.value;

  if (todoExists(description)) {
    alert("Task already exists");
    return;
  }

  const obj = { description: description, done: false };
  todos.push(obj);

  const todo = renderTodoInReadMode(obj);
  todoList.append(todo);

  todoInput.value = "";
  addTodoBtn.disabled = true;

  readTodo(description);
}

function removeTodo(index) {
  let todoToRemove = todos[index];
  todoToRemove.done = true;
  const todo = renderTodoInReadMode(todoToRemove);
  todoList.replaceChild(todo, todoList.childNodes[index]);
}

function updateTodo(index, description) {
  const obj = (todos[index] = { description, done: false });
  const todo = renderTodoInReadMode(obj);
  todoList.replaceChild(todo, todoList.childNodes[index]);
}

function todoExists(description) {
  const cleanTodos = todos.map(({ description }) =>
    description.trim().toLowerCase()
  );
  return cleanTodos.includes(description.trim().toLowerCase());
}

function readTodo(description) {
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = description;
  speechSynthesis.speak(utterance);
}
