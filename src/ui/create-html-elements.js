import { createTask } from "../logic/task";

const createTaskElement = (title, priority, dueDate) => {
  const task = createTask();

  task.setTitle(title);
  task.setPriority(priority);
  task.taskDates.setDueDate(dueDate);
};
