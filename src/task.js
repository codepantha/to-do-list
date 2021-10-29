/* eslint-disable no-multiple-empty-lines */
const saveTodoList = (todo) => localStorage.setItem('todo-list', JSON.stringify(todo));

const getTodoList = () => JSON.parse(localStorage.getItem('todo-list'));

export const addTodo = () => {
  const todo = {
    description: document.querySelector('.todo-form-input').value,
    completed: false,
    index: getTodoList().length + 1,
  };
  const savedTodoList = getTodoList();
  savedTodoList.push(todo);
  saveTodoList(savedTodoList);
  window.location.reload();
};

export const editTodo = (todoId, todoItemInput) => {
  const editedTodoList = getTodoList().map((todoItem) => {
    if (todoItem.index === Number(todoId)) {
      todoItem.description = todoItemInput.innerText;
    }
    return todoItem;
  });
  saveTodoList(editedTodoList);
};

export const deleteTodo = (id) => {
  const filteredTodo = getTodoList().filter((todo) => todo.index !== Number(id));
  saveTodoList(filteredTodo);
  window.location.reload();
};

export const clearFinishedTasks = () => {
  let unfinishedTodo = getTodoList().filter((todo) => todo.completed !== true);
  unfinishedTodo = unfinishedTodo.map((todo, index) => {
    todo.index = index + 1;
    return todo;
  });
  saveTodoList(unfinishedTodo);
};