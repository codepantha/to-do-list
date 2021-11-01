import updateTaskState from './taskState';
import {
  addTodo, editTodo, deleteTodo, clearFinishedTasks,
} from './task';
import { saveTodoList, getTodoList } from './functions';
import './style.css';

const todo = [];
const todoListContainer = document.querySelector('.todo-list');
const clearButton = document.querySelector('.clear');
const enterButton = document.querySelector('.enter');
const todoFormInput = document.querySelector('.todo-form-input');

const displayTodoList = (todo) => {
  todo.forEach((todoItem) => {
    todoListContainer.innerHTML += `<li class='todo-item' data-id=${todoItem.index}>
      <form class='flex'>
        <input type='checkbox' class='todo-item-checkbox' ${todoItem.completed === true ? 'checked' : ''} name='todo' value='${todoItem.index}'>
        <span type='text' contentEditable=true class='todo-item-input' data-id=${todoItem.index}>
        ${todoItem.description}
        </span>
        <ion-icon class='icon' name="ellipsis-vertical-outline"></ion-icon>
        <ion-icon class='icon delete hidden' name="trash-outline"></ion-icon>
      </form>
    </li>`;
  });
};

todoFormInput.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') addTodo();
});

enterButton.addEventListener('click', () => {
  addTodo();
});

if (!getTodoList()) {
  saveTodoList(todo);
}

let savedTodoList = getTodoList();
displayTodoList(savedTodoList);

const checkboxes = document.querySelectorAll('input[name="todo"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    savedTodoList = updateTaskState(getTodoList(), checkbox.value);
    saveTodoList(savedTodoList);
  });
});

// Input, Edit, Delete todo section
const todoItemInputs = document.querySelectorAll('.todo-item-input');
todoItemInputs.forEach((todoItemInput) => {
  const ellipsis = todoItemInput.nextElementSibling;
  const deleteIcon = todoItemInput.nextElementSibling.nextElementSibling;
  const parentLiElement = todoItemInput.parentElement.parentElement;

  todoItemInput.addEventListener('focus', () => {
    ellipsis.style.display = 'none';
    deleteIcon.style.display = 'block';
    parentLiElement.style.backgroundColor = '#f7f4a8';
  });

  todoItemInput.addEventListener('blur', () => {
    setTimeout(() => {
      ellipsis.style.display = 'block';
      deleteIcon.style.display = 'none';
    }, 300);

    parentLiElement.style.backgroundColor = '#fff';
  });

  todoItemInput.addEventListener('input', () => {
    const todoId = todoItemInput.dataset.id;
    editTodo(todoId, todoItemInput);
  });

  deleteIcon.addEventListener('click', () => {
    const todoId = todoItemInput.dataset.id;
    deleteTodo(todoId);
  });
});

// remove all finished todo items
clearButton.addEventListener('click', () => {
  clearFinishedTasks();
  window.location.reload();
});
