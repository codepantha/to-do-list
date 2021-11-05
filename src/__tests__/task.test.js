/**
 * @jest-environment jsdom
 */

import { editTodo, deleteTodo, clearFinishedTasks } from '../task';
import { getTodoList, saveTodoList } from '../functions';
import updateTaskState from '../taskState';

jest.mock('../functions');
jest.mock('../task');

describe('add, delete, update, set status of tasks, and clear all completed tasks', () => {
  let todo = [];
  test('adds a single to-do item to the list', () => {
    saveTodoList(todo); // save the empty array of to-do list items
    const numberOfItemsBeforeSave = getTodoList().length;
    // save an actual to-do item
    todo.push({
      index: 1,
      description: 'task 1',
      completed: false,
    });
    saveTodoList(todo);
    const numberOfItemsAfterSave = getTodoList().length;
    expect(numberOfItemsAfterSave).toBe(numberOfItemsBeforeSave + 1);
  });

  test('update a single to-do item in the list', () => {
    todo = getTodoList();

    const taskBeforeEdit = todo[0].description;
    const todoItemInput = document.createElement('span');
    todoItemInput.innerText = 'modified task';

    editTodo(1, todoItemInput);
    todo = getTodoList();
    const taskAfterEdit = todo[0].description;

    expect(taskAfterEdit).toEqual(expect.not.stringMatching(taskBeforeEdit));
  });

  test('updates an items completed status', () => {
    todo = getTodoList();
    const completedStateBeforeUpdate = todo[0].completed;
    const updatedTaskState = updateTaskState(todo, todo[0].index);
    saveTodoList(updatedTaskState);
    todo = getTodoList();
    const completedStatedAfterUpdate = todo[0].completed;
    expect(completedStateBeforeUpdate).toBe(!completedStatedAfterUpdate);
  });

  test('deletes a single to-do item from the list', () => {
    const numberOfItemsBeforeDelete = getTodoList().length;
    deleteTodo(1);
    const numberOfItemsAfterDelete = getTodoList().length;
    expect(numberOfItemsAfterDelete).toBe(numberOfItemsBeforeDelete - 1);
  });

  test('clear all completed tasks', () => {
    todo = [
      {
        index: 1,
        description: 'task 1',
        completed: false,
      },
      {
        index: 2,
        description: 'task 1',
        completed: true,
      },
      {
        index: 3,
        description: 'task 1',
        completed: false,
      },
      {
        index: 4,
        description: 'task 1',
        completed: true,
      },
    ];
    saveTodoList(todo);

    clearFinishedTasks();
    const totalNumberOfTasksAfterClear = getTodoList().length;

    expect(totalNumberOfTasksAfterClear).toBe(2);
  });
});