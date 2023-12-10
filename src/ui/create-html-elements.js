import { createTask } from "../logic/task";

const createTaskElement = (title, priority, dueDate) => {
  const task = createTask();
  task.setTitle(title);
  task.setPriority(priority);
  task.taskDates.setDueDate(dueDate);

  const element = createTaskBodyElement(task);
  return element;
};

const createTaskBodyElement = (task) => {
  const body = document.createElement("div");
  const btnDone = document.createElement("button");
  const btnDelete = document.createElement("button");
  const title = document.createElement("h3");
  const description = document.createElement("input");
  const dueDateContainer = document.createElement("div");
  const dueDateInfo = document.createElement("p");

  dueDateInfo.textContent = task.taskDates.getDueDate();
  dueDateContainer.appendChild(dueDateInfo);

  title.textContent = task.getTitle();
  description.textContent = task.getDescription();
  btnDelete.textContent = "Delete";
  btnDone.textContent = "Done";
  body.appendChild(title);
  body.appendChild(description);
  body.appendChild(btnDone);
  body.appendChild(btnDelete);
  body.appendChild(dueDateContainer);

  return body;
};

const createMainLayoutElements = () => {
  const body = document.createElement("div");
  const main = createMainElement();
  const sideBar = createSideBarElement();
  const header = createHeaderElement();

  body.appendChild(main);
  body.appendChild(sideBar);
  body.appendChild(header);
  document.appendChild(body);

  return { main, sideBar, header };
};

const createHeaderElement = () => {
  const header = document.createElement("header");
  const appName = document.createElement("h2");
  appName.textContent = "ToBeDone";
  header.appendChild(appName);
  return header;
};

const createSideBarElement = (projects) => {
  const sideBar = document.createElement("side");
  const btnCreateProject = document.createElement("button");
  const projectsContainer = document.createElement("div");

  btnCreateProject.textContent = "New Project";
  projects.forEach((project) => projectsContainer.appendChild(project));
  sideBar.appendChild(btnCreateProject);
  sideBar.appendChild(projectsContainer);

  return sideBar;
};

const createMainElement = (tasks) => {
  const main = document.createElement("main");
  const tasksContainer = document.createElement("div");

  main.appendChild(tasksContainer);
  return main;
};

export { createTaskElement };
