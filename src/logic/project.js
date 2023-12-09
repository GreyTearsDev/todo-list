import { createList } from "../storage/storage";

export default createProject = () => {
  const name = "";
  const description = "";
  let tasks = createList();

  const setName = (projectName) => {
    name = projectName;
  };

  const setDescription = (projectDescription) => {
    description = projectDescription;
  };

  const addTask = (task) => {
    tasks.append(task);
  };

  const removeTask = (taskTitle) => {
    for (let task of tasks) {
      if (task.title == taskTitle) {
        //remove task
      }
    }
  };

  return {
    name,
    description,
    tasks,
  };
};
