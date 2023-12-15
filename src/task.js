import { dateManager } from "./dates";
import { createTaskElement, editTaskForm } from "./create-html-elements";
import { openModal, closeModal } from "./util";

const createTask = () => {
  let title = "";
  let priority = "";
  let description = "";
  let done = false;
  const taskDates = dateManager();

  const getTaskStatus = () => {
    return done;
  };

  const switchTaskStatus = () => {
    done = !done;
  };

  const setTitle = (projTitle) => {
    title = projTitle;
  };

  const getTitle = () => {
    return title;
  };

  const getDescription = () => {
    return description;
  };

  const setDescription = (desc) => {
    description = desc;
  };

  const setPriority = (projPriority) => {
    priority = projPriority;
  };

  const getPriority = () => {
    return priority;
  };

  return {
    setTitle,
    getPriority,
    setPriority,
    setDescription,
    getDescription,
    getTitle,
    getPriority,
    getTaskStatus,
    switchTaskStatus,
    taskDates,
  };
};

const getTaskIndex = (task, container) => {
  let taskContainer = container;
  let currentTask = task;
  let index = Array.prototype.indexOf.call(taskContainer.children, currentTask);

  return index;
};

const getTaskObject = (project, index) => {
  return project.getTasks()[index - 1];
};

const removeTask = (event, project) => {
  let taskContainer = event.target.parentNode.parentNode;
  let currentTask = event.target.parentNode;
  let index = getTaskIndex(currentTask, taskContainer);
  let task = getTaskObject(project, index);
  project.removeTask(task);
};

function renderTasks(project) {
  const taskContainer = document.getElementById("task-container");
  let [...nodes] = taskContainer.childNodes;

  for (let i = 0; i < nodes.length; ++i) {
    if (i == 0) continue;
    taskContainer.removeChild(nodes[i]);
  }

  for (let task of project.getTasks()) {
    console.log(task.getTitle());
    console.log(project.getTasks().length);
    let newTask = createTaskElement(task);
    addEventListenerToTasks(newTask, project);
    taskContainer.appendChild(newTask);
  }
}

function addEventListenerToTasks(taskElement, project) {
  const newTask = taskElement;
  const deleteBtn = newTask.children.item(5);

  deleteBtn.addEventListener("click", function (event) {
    removeTask(event, project);
    renderTasks(project);
  });
  newTask.addEventListener("dblclick", function (event) {
    editTaskInfo(event, project);
  });
}

function editTaskInfo(event, project) {
  let taskContainer = event.target.parentNode.parentNode;
  let currentTask = event.target.parentNode;
  let index = getTaskIndex(currentTask, taskContainer);
  let task = getTaskObject(project, index);
  const form = editTaskForm(task);

  openModal(form);
  const cancelBtn = document.querySelector("#btn-cancel-editTaskForm");
  const updateBtn = document.querySelector("#btn-update-editTaskForm");

  cancelBtn.addEventListener("click", closeModal);
  updateBtn.addEventListener("click", function () {
    project.removeTask(task);
    applyTaskFormInfo(form, task, project);
    closeModal();
    renderTasks(project);
  });
}

function applyTaskFormInfo(form, task, currentProject) {
  const taskTitle = form.children.item(0).value;
  const taskPriority = form.children.item(2).value;
  const taskDesc = form.children.item(3).value;
  const taskDueDate = form.children.item(5).value;
  const noTitle = "Untitled";
  const noDesc = "No description";

  taskTitle == "" ? task.setTitle(noTitle) : task.setTitle(taskTitle);
  taskDesc == "" ? task.setDescription(noDesc) : task.setDescription(taskDesc);

  if (taskDueDate != "") task.taskDates.setDueDate(taskDueDate);
  task.setPriority(taskPriority);
  currentProject.addTask(task);
}

export {
  createTask,
  removeTask,
  getTaskIndex,
  getTaskObject,
  renderTasks,
  addEventListenerToTasks,
  applyTaskFormInfo,
};
