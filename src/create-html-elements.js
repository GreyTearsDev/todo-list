const createTaskElement = (task) => {
  const body = document.createElement("div");
  const btnDone = document.createElement("button");
  const btnDelete = document.createElement("button");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const dueDateContainer = document.createElement("div");
  const dueDateInfo = document.createElement("p");
  const priority = document.createElement("h5");

  dueDateInfo.textContent = task.taskDates.getDueDate();
  dueDateContainer.appendChild(dueDateInfo);

  title.textContent = task.getTitle();
  priority.textContent = `${task.getPriority()}-level priority`;
  description.textContent = task.getDescription();

  btnDelete.textContent = "x";
  btnDelete.className = "btn-delete-task";

  btnDone.textContent = "Completed";
  btnDone.id = "btn-completed";

  body.className = "body-task";
  body.appendChild(title);
  body.appendChild(priority);
  body.appendChild(description);
  body.appendChild(btnDone);
  body.appendChild(dueDateContainer);
  body.appendChild(btnDelete);

  return body;
};

const createSelectPriorityElement = () => {
  const select = document.createElement("select");
  const opt1 = document.createElement("option");
  const opt2 = document.createElement("option");
  const opt3 = document.createElement("option");

  opt1.textContent = "High";
  opt2.textContent = "Mid";
  opt3.textContent = "Low";

  select.appendChild(opt1);
  select.appendChild(opt2);
  select.appendChild(opt3);

  return select;
};

const createMessageElement = (title, message) => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");

  h3.textContent = title;
  p.textContent = message;
  div.appendChild(h3);
  div.appendChild(p);
  return div;
};

const createAddTaskButton = () => {
  const btn = document.createElement("button");
  btn.textContent = "Add New Task";
  btn.id = "btn-new-task";
  return btn;
};

const createAddProjectButton = () => {
  const btn = document.createElement("button");

  btn.textContent = "New Project";
  btn.id = "btn-create-project";

  return btn;
};

const createProjectElement = (project) => {
  const body = document.createElement("div");
  const title = document.createElement("h4");
  const description = document.createElement("p");
  const dateInfo = document.createElement("p");
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "x";
  deleteBtn.id = "btn-delete-project";
  title.textContent = project.getName();
  description.textContent = project.getDescription();
  dateInfo.textContent = `Created on ${project.projectDates.getCreationDate()}`;

  body.className = "project";
  body.appendChild(title);
  body.appendChild(description);
  body.appendChild(dateInfo);
  body.appendChild(deleteBtn);

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
  const btnCreateProject = createAddProjectButton();
  const projectsContainer = document.createElement("div");

  projectsContainer.id = "project-container";

  sideBar.appendChild(btnCreateProject);
  sideBar.appendChild(projectsContainer);

  return sideBar;
};

const createMainElement = () => {
  const main = document.createElement("main");
  const taskContainer = document.createElement("div");
  const btnNewTask = createAddTaskButton();

  taskContainer.id = "task-container";
  taskContainer.appendChild(btnNewTask);
  main.appendChild(taskContainer);
  return main;
};

const newProjectForm = () => {
  const body = document.createElement("div");
  const projName = document.createElement("input");
  const projDescription = document.createElement("textarea");
  const submit = document.createElement("button");
  const cancelBtn = document.createElement("button");

  cancelBtn.textContent = "Cancel";
  cancelBtn.id = "btn-cancel-form";

  submit.textContent = "Create";
  submit.id = "btn-submit-form";

  projName.placeholder = "Project name: ";
  projDescription.placeholder = "Description: ";

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
  const taskDescription = document.createElement("textarea");
  const dueDate = document.createElement("label");
  const date = document.createElement("input");
  const submitBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  const prioritySelector = createSelectPriorityElement();

  cancelBtn.textContent = "Cancel";
  cancelBtn.id = "btn-cancel-task";

  dueDate.textContent = "Select a due date";
  date.type = "date";
  date.id = "date-field";

  submitBtn.textContent = "Create";
  submitBtn.id = "btn-submit-task";

  taskTitle.placeholder = "Title: ";
  taskDescription.placeholder = "Description: ";

  taskDescription.maxLength = 40;

  body.appendChild(taskTitle);
  body.appendChild(prioritySelector);
  body.appendChild(taskDescription);
  body.appendChild(dueDate);
  body.appendChild(date);
  body.appendChild(submitBtn);
  body.appendChild(cancelBtn);

  return body;
};

export {
  createTaskElement,
  createProjectElement,
  createMainLayoutElements,
  newTaskForm,
  newProjectForm,
  createMessageElement,
  createModal,
  createAddTaskButton,
  createAddProjectButton,
};
