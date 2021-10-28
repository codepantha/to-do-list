import updateTaskState from './taskState';
import { addTodo } from './task';
import './style.css';

const todo = [];

const todoListContainer = document.querySelector('.todo-list');

// get todoList
export const getTodoList = () => JSON.parse(localStorage.getItem('todo-list'));

// save todList
export const saveTodoList = (todo) => {
  localStorage.setItem('todo-list', JSON.stringify(todo));
};

export const displayTodoList = (todo) => {
  todo.forEach((todoItem) => {
    todoListContainer.innerHTML += `<li class='todo-item' data-id=${todoItem.index}>
      <form class='flex'>
        <input type='checkbox' class='todo-item-checkbox' ${todoItem.completed === true ? 'checked' : ''} name='todo' value='${todoItem.index}'>
        <span type='text' contentEditable=true class='todo-item-input' data-content=${todoItem.description}>
        ${todoItem.description}
        </span>
        <ion-icon class='icon' name="ellipsis-vertical-outline"></ion-icon>
        <ion-icon class='icon delete hidden' name="trash-outline"></ion-icon>
      </form>
    </li>`;
  });
};

const enterButton = document.querySelector('.enter');
const todoFormInput = document.querySelector('.todo-form-input');

todoFormInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) addTodo();
})

enterButton.addEventListener('click', () => {
  addTodo();
})

// if tasks exist in localStorage, fetch and display them, else save some tasks.
if (!getTodoList()) {
  saveTodoList(todo);
}

let savedTodoList = getTodoList();
displayTodoList(savedTodoList);

const checkboxes = document.querySelectorAll('input[name="todo"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    savedTodoList = updateTaskState(savedTodoList, checkbox.value);
    /* wait 3 seconds before saving to localstorage so that if
    the user has more changes, everything gets saved at once */
    setTimeout(() => {
      saveTodoList(savedTodoList);
    }, 3000);
  });
});

// show delete icon when editing

