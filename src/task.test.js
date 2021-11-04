import { test } from '@jest/globals';
import { deleteTodo } from './task.js';
jest.mock('./task');

test('Testing', () => {
  
expect(deleteTodo({ name: 'thing', index: 3 }, [{ name: 'thing', index: 3 }, { name: 'other thing', index: 2 }]))
  .toEqual(expect.objectContaining({ length: 1, local: [{ name: 'other thing', index: 0 }] }));
  
  // console.log("hello");
  // const storage = [
  //   {
  //     id: 1,
  //     description: 'New task', 
  //     completed: false,
  //   },
  //   {
  //       id: 2,
  //       description: 'New task2', 
  //       completed: false,
  //   },
  //   {
  //       id: 3,
  //       description: 'New task3', 
  //       completed: false,
  //   },
  // ];
  // const numberOfItems = storage.length;
  // deleteTodo(1);
  // console.log(storage.length)
  // expect(storage.length).toBe(numberOfItems - 1);
});