export default function updateTaskState(taskList, taskId) {
  return taskList.map((task) => {
    if (task.index === Number(taskId)) {
      task.completed = !task.completed;
    }
    return task;
  });
}