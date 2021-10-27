export const updateTaskState = (taskList, taskId) => {
  return taskList.map((task) => {
    if (task.index == taskId) {
      task.completed = !task.completed;
    }
    return task;
  })
}