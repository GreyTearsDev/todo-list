import { createList } from "./storage";
import { dateManager } from "./dates";

const createProject = () => {
  let name = "";
  let description = "";
  const projectDates = dateManager();
  let tasks = createList();

  const setName = (projectName) => {
    name = projectName;
  };

  const getName = () => {
    return name;
  };

  const setDescription = (projectDescription) => {
    description = projectDescription;
  };

  const getDescription = () => {
    return description;
  };

  const addTask = (task) => {
    tasks.append(task);
  };

  const removeTask = (task) => {
    tasks.remove(task);
  };

  const getTasks = () => {
    return tasks.toString();
  };

  return {
    setName,
    setDescription,
    getName,
    getDescription,
    addTask,
    removeTask,
    getTasks,
    projectDates,
  };
};

const getTaskIndex = (project, task, container) => {
  let taskContainer = container;
  let currentTask = task;
  let index = Array.prototype.indexOf.call(taskContainer.children, currentTask);

  return project.getTasks()[index - 1];
};

export { createProject, getTaskIndex };
