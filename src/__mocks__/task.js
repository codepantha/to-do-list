import { getTodoList, saveTodoList } from "../functions";

const reorder = (unfinishedTodo) => unfinishedTodo.map((todo, index) => {
  todo.index = index + 1;
  return todo;
});

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
  saveTodoList(reorder(filteredTodo));
};
