import { test } from '@jest/globals';
import { deleteTodo } from './task.js';

test('Testing', () => {
  console.log("hello");
  const storage = [
    {
      id: 1,
      description: 'New task', 
      completed: false,
    },
    {
        id: 2,
        description: 'New task2', 
        completed: false,
    },
    {
        id: 3,
        description: 'New task3', 
        completed: false,
    },
  ];
  const numberOfItems = storage.length;
  deleteTodo(1);
  console.log(storage.length)
  expect(storage.length).toBe(numberOfItems - 1);
});