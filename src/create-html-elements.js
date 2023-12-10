const createTaskElement = (task) => {
  const body = document.createElement("div");
  const btnDone = document.createElement("button");
  const btnDelete = document.createElement("button");
  const title = document.createElement("h3");
  const description = document.createElement("input");
  const dueDateContainer = document.createElement("div");
  const dueDateInfo = document.createElement("p");

  btnDelete.textContent = "x";
  btnDelete.id = "delete-task";

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

const createProjectElement = (project) => {
  const body = document.createElement("div");
  const title = document.createElement("h4");
  const description = document.createElement("p");
  const dateInfo = document.createElement("p");
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "x";
  deleteBtn.id = "delete-project";
  title.textContent = project.getTitle();
  description.textContent = project.getDescription();
  dateInfo.textContent = `Created on ${project.projectDates.getCreationDate()}`;

  body.appendChild(title);
  body.appendChild(description);
  body.appendChild(dateInfo);

  return body;
};

const createMainLayoutElements = () => {
  const body = document.createElement("div");
  const main = createMainElement();
  const sideBar = createSideBarElement();
  const header = createHeaderElement();
  createModal();

  body.className = "main-div";
  body.appendChild(main);
  body.appendChild(sideBar);
  body.appendChild(header);
  document.body.appendChild(body);

  return body;
};

const createModal = () => {
  const modal = document.createElement("div");
  modal.id = "general-modal";
  modal.classList = "modal";
  document.body.appendChild(modal);
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
  btnCreateProject.id = "btn-create-project";
  // projects.forEach((project) =>
  //   projectsContainer.appendChild(createProjectElement(project))
  // );
  sideBar.appendChild(btnCreateProject);
  sideBar.appendChild(projectsContainer);

  return sideBar;
};

const createMainElement = (tasks) => {
  const main = document.createElement("main");
  const tasksContainer = document.createElement("div");
  const btnNewTask = document.createElement("button");

  // tasks.forEach((task) => tasksContainer.appendChild(task));
  btnNewTask.textContent = "Add New Task";
  btnNewTask.id = "btn-new-task";
  tasksContainer.appendChild(btnNewTask);
  main.appendChild(tasksContainer);
  return main;
};

const newProjectForm = () => {
  const body = document.createElement("div");
  const projName = document.createElement("input");
  const projDescription = document.createElement("input");
  const submit = document.createElement("button");
  const cancelBtn = document.createElement("button");

  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "btn-cancel";

  submit.textContent = "Create";
  submit.id = "submit-form";

  projName.placeholder = "Project name: ";
  projDescription.placeholder = "Description: ";

  projDescription.type = "textarea";
  projDescription.maxLength = 80;

  body.appendChild(projName);
  body.appendChild(projDescription);
  body.appendChild(submit);
  body.appendChild(cancelBtn);

  return body;
};

const newTaskForm = () => {
  const body = document.createElement("div");
  const taskTitle = document.createElement("input");
  const taskDescription = document.createElement("input");
  const dueDate = document.createElement("label");
  const date = document.createElement("input");
  const submit = document.createElement("button");
  const cancelBtn = document.createElement("button");

  cancelBtn.textContent = "Cancel";
  cancelBtn.className = "btn-cancel";

  date.type = "date";

  submit.textContent = "Create";
  submit.id = "submit-task";

  taskTitle.placeholder = "Title: ";
  taskDescription.placeholder = "Description: ";

  taskDescription.type = "textarea";
  taskDescription.maxLength = 40;

  body.appendChild(taskTitle);
  body.appendChild(taskDescription);
  body.appendChild(dueDate);
  body.appendChild(date);
  body.appendChild(submit);
  body.appendChild(cancelBtn);

  return body;
};

export {
  createTaskElement,
  createProjectElement,
  createMainLayoutElements,
  newTaskForm,
  newProjectForm,
};
