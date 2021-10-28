import { getTodoList, saveTodoList, displayTodoList } from ".";

export const addTodo = () => {
  const todo = {
    description: document.querySelector('.todo-form-input').value,
    completed: false,
    index: getTodoList().length + 1
  };
  const savedTodoList = getTodoList();
  savedTodoList.push(todo);
  saveTodoList(savedTodoList);
  displayTodoList([savedTodoList[savedTodoList.length - 1]]);
  location.reload();
}

export const editTodo = (todoId, todoItemInput) => {
  const editedTodoList = getTodoList().map(todoItem => {
    if (todoItem.index === Number(todoId)) {
      todoItem.description = todoItemInput.innerText;
      console.log(todoItem.description)
    }
    return todoItem;
  });
  saveTodoList(editedTodoList);
}

export const deleteTodo = (id) => {
  const filteredTodo = getTodoList().filter(todo => {
    return todo.index !== Number(id);
  });
  saveTodoList(filteredTodo);
  location.reload();
}

export const clearFinishedTasks = () => {
  let unfinishedTodo = getTodoList().filter(todo => todo.completed !== true);
  console.log(unfinishedTodo)
  unfinishedTodo = unfinishedTodo.map((todo, index) => {
    todo.index = index + 1;
    return todo;
  })
  saveTodoList(unfinishedTodo);
}