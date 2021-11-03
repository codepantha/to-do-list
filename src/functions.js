const saveTodoList = (todo) => localStorage.setItem('todo-list', JSON.stringify(todo));

const getTodoList = () => JSON.parse(localStorage.getItem('todo-list'));

export { saveTodoList, getTodoList };