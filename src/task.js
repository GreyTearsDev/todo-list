import { dateManager } from "./dates";
import { createTaskElement, editTaskForm } from "./html-elements";
import { manageCurrentProject, projects } from "./project";
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

// Function to get the index of a task within its container
const getTaskIndex = (task, container) => {
  let index = Array.prototype.indexOf.call(container.children, task);
  return index;
};

// Function to get the task object from the project using its index
const getTaskObject = (project, index) => {
  return project.getTasks()[index];
};

// Function to remove a task from the project
const removeTask = (event, project) => {
  let taskContainer = event.target.parentNode.parentNode;
  let currentTask = event.target.parentNode;
  let taskIndex = getTaskIndex(currentTask, taskContainer);
  let taskObject = getTaskObject(project, taskIndex);

  project.removeTask(taskObject);
};

// Function to render tasks for a given project
function renderTasks(project) {
  const taskContainer = document.getElementById("task-container");
  let [...nodes] = taskContainer.childNodes; // Getting a copy of the child nodes in the task container

  // Cleaning the container before rendering
  for (let i = 0; i < nodes.length; ++i) {
    taskContainer.removeChild(nodes[i]);
  }
  if (projects.toString().length == 0) {
    manageCurrentProject.setProject(undefined);
    return;
  } else {
    manageCurrentProject.setProject(project);
  }
  // Creating a task element for each task object stored in the project
  for (let task of project.getTasks()) {
    let newTask = createTaskElement(task);

    addEventListenerToTasks(newTask, project);
    taskContainer.appendChild(newTask);
  }
}

// Function to add event listeners to task elements
function addEventListenerToTasks(task, project) {
  const deleteBtn = task.children.item(5);
  const doneBtn = task.children.item(4);

  doneBtn.addEventListener("click", function (event) {
    const taskIndex = getTaskIndex(task, task.parentNode);
    const taskObject = getTaskObject(project, taskIndex);
    taskObject.switchTaskStatus();
    renderTasks(project);
  });

  deleteBtn.addEventListener("click", function (event) {
    removeTask(event, project);
    renderTasks(project);
  });
  task.addEventListener("dblclick", editTask);
  function editTask(event) {
    editTaskInfo(event, project);
  }
}

// Function to edit task information using a modal form
function editTaskInfo(event, project) {
  let taskContainer = event.target.parentNode;
  let currentTask = event.target;
  let index = getTaskIndex(currentTask, taskContainer);
  let task = getTaskObject(project, index);
  const form = editTaskForm(task);

  openModal(form);
  const cancelBtn = document.querySelector("#btn-cancel-editTaskForm");
  const updateBtn = document.querySelector("#btn-update-editTaskForm");

  cancelBtn.addEventListener("click", closeModal);
  updateBtn.addEventListener("click", updateTask);

  function updateTask() {
    project.removeTask(task);
    applyTaskFormInfo(form, task, project);
    closeModal();
    renderTasks(project);
  }
}

// Function to apply form information to a task
function applyTaskFormInfo(form, task, project) {
  const taskTitle = form.children.item(0).value;
  const taskPriority = form.children.item(2).value;
  const taskDesc = form.children.item(3).value;
  const taskDueDate = form.children.item(5).value;
  const noTitle = "Untitled";
  const noDesc = "No description";

  // Setting default values if inputs are empty
  taskTitle == "" ? task.setTitle(noTitle) : task.setTitle(taskTitle);
  taskDesc == "" ? task.setDescription(noDesc) : task.setDescription(taskDesc);

  // Setting task due date, priority, and adding it back to the project
  if (taskDueDate != "") task.taskDates.setDueDate(taskDueDate);
  task.setPriority(taskPriority);
  project.addTask(task);
}

export { createTask, renderTasks, applyTaskFormInfo };
