import { updateTaskState } from './taskState';
import './style.css';

let todo = [
  {
    description: 'code for 2 hours',
    completed: false,
    index: 1,
  },
  {
    description: 'workout for 30 mins',
    completed: false,
    index: 2,
  },
  {
    description: 'eat breakfast',
    completed: true,
    index: 3,
  },
];

const todoListContainer = document.querySelector('.todo-list');

// get todoList
const getTodoList = () => {
  return JSON.parse(localStorage.getItem('todo-list'));
}

// save todList
const saveTodoList = (todo) => {
  localStorage.setItem('todo-list', JSON.stringify(todo));
}

const displayTodoList = (todo) => {
  todo.forEach((todoItem) => {
    todoListContainer.innerHTML += `<li class='todo-item' data-id=${todoItem.index}>
      <form class='flex'>
        <input type='checkbox' class='todo-item-checkbox' ${todoItem.completed === true ? 'checked' : ''} name='todo' value='${todoItem.index}'>
        <span type='text' contentEditable=true class='todo-item-input' data-content=${todoItem.description}>
        ${todoItem.description}
        </span>
        <ion-icon class='icon' name="ellipsis-vertical-outline"></ion-icon>
      </form>
    </li>`;
  });
};

// if tasks exist in localStorage, fetch and display them, else save some tasks.
if (!getTodoList()) {
  saveTodoList(todo)
}

let savedTodoList = getTodoList();
displayTodoList(savedTodoList)

const checkboxes = document.querySelectorAll('input[name="todo"]');
 
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    savedTodoList = updateTaskState(savedTodoList, checkbox.value);
    /* wait 3 seconds before saving to localstorage so that if 
    the user has more changes, everything gets saved at once */
    setTimeout(() => {
      saveTodoList(savedTodoList);
    }, 3000);
  })
})
