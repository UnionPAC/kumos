import {
  createApp,
  h,
  hFragment,
} from "https://unpkg.com/kumos@1.0.12/dist/kumos.js";

const state = {
  todos: ["Walk the dog", "Water the plants"],
  currentTodo: "",
  edit: {
    original: null,
    edited: null,
    index: null,
  },
};

const reducers = {
  // user types a new character in the input field
  "update-current-todo": (state, currentTodo) => ({
    ...state,
    currentTodo,
  }),
  // user clicks the add button to add a new todo to the list
  "add-todo": (state) => ({
    ...state,
    todos: [...state.todos, state.currentTodo],
    currentTodo: "",
  }),
  // user double clicks a todo item to start editing it
  "start-editing-todo": (state, index) => ({
    ...state,
    edit: {
      index,
      original: state.todos[index],
      edited: state.todos[index],
    },
  }),
  // the user types a new character in the input field while editing a todo
  "edit-todo": (state, edited) => ({
    ...state,
    edit: {
      ...state.edit,
      edited,
    },
  }),
  // user finishes editing a todo and save the changes
  "save-edited-todo": (state) => {
    const todos = [...state.todos];
    todos[state.edit.index] = state.edit.edited;

    return {
      ...state,
      edit: {
        index: null,
        original: null,
        edited: null,
      },
      todos,
    };
  },
  // the user cancels editing a todo and discards the changes
  "cancel-editing-todo": (state) => ({
    ...state,
    edit: {
      index: null,
      original: null,
      edited: null,
    },
  }),
  // user marks a todo as complete, so it can be removed from the todo list
  "remove-todo": (state, index) => ({
    ...state,
    todos: state.todos.filter((_todo, idx) => idx !== index),
  }),
};

function CreateTodo(state, emit) {
  return h("div", { class: "add-todo-container" }, [
    h("label", { for: "todo-input" }, ["New TODO"]),
    h("div", { class: "input-btn-container" }, [
      h(
        "input",
        {
          id: "todo-input",
          value: state.currentTodo,
          on: {
            input: (e) => emit("update-current-todo", e.target.value),
            keydown: (e) => {
              if (e.key === "Enter" && state.currentTodo.length >= 3) {
                emit("add-todo");
              }
            },
          },
        },
        []
      ),
      h(
        "button",
        {
          disabled: state.currentTodo.length < 3,
          on: { click: () => emit("add-todo") },
        },
        ["Add"]
      ),
    ]),
  ]);
}

// a single todo component
function TodoItem({ todo, index, edit }, emit) {
  const isEditing = edit.index === index;

  return isEditing
    ? h("li", {}, [
        h(
          "input",
          {
            type: "text",
            value: edit.edited,
            on: { input: (e) => emit("edit-todo", e.target.value) },
          },
          []
        ),
        h("button", { on: { click: () => emit("save-edited-todo") } }, [
          "Save",
        ]),
        h("button", { on: { click: () => emit("cancel-editing-todo") } }, [
          "Cancel",
        ]),
      ])
    : h("li", {}, [
        h(
          "span",
          { on: { dblclick: () => emit("start-editing-todo", index) } },
          [todo]
        ),
        h("button", { on: { click: () => emit("remove-todo", index) } }, [
          "Done",
        ]),
      ]);
}

// todo list component which renders TodoItems
function TodoList({ todos, edit }, emit) {
  return h(
    "ul",
    {},
    todos.map((todo, index) => TodoItem({ todo, index, edit }, emit))
  );
}

function App(state, emit) {
  return hFragment([
    h("h1", {}, ["My TODOs"]),
    CreateTodo(state, emit),
    TodoList(state, emit),
  ]);
}

createApp({ state, reducers, view: App }).mount(document.body);
