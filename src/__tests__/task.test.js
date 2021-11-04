/**
 * @jest-environment jsdom
 */

import { deleteTodo } from '../task';
import { getTodoList, saveTodoList } from '../functions';

describe('add and delete tasks', () => {
  test('deletes a single to-do item from the list', () => {
    const todo = [
      {
        index: 1,
        description: 'task 1',
        completed: false,
      },
      {
        index: 2,
        description: 'task 2',
        completed: false,
      },
    ];

    saveTodoList(todo);
    const numberOfItemsBeforeDelete = getTodoList().length;
    deleteTodo(1);
    const numberOfItemsAfterDelete = getTodoList().length;

    expect(numberOfItemsAfterDelete).toBe(numberOfItemsBeforeDelete - 1);
  });
});