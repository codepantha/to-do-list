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