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

  return {
    name,
    description,
    tasks,
  };
};
