import { createList } from "./storage";
import { dateManager } from "./dates";
import { openModal, closeModal } from "./util";
import { createProjectElement, editProjectForm } from "./html-elements";
import { renderTasks, createTask } from "./task";

const projects = createList();
const manageCurrentProject = (function () {
  let currentProject;
  function setProject(project) {
    currentProject = project;
  }

  function getProject() {
    return currentProject;
  }

  return { setProject, getProject };
})();

function loadDefaultProjects() {
  const project1 = createProject();
  const task1Proj1 = createTask();
  const task2Proj1 = createTask();
  const task3Proj1 = createTask();
  project1.setName("Daniela's birthday");
  project1.setDescription("Plan the best party she's ever had");

  task1Proj1.setTitle("Order a cake");
  task1Proj1.setDescription("Make sure to order the one with the barries");
  task1Proj1.setPriority("High");
  task1Proj1.taskDates.setDueDate("2023-12-28");

  task2Proj1.setTitle("Invite friends and family");
  task2Proj1.setDescription("Better not call James. Doesn't bring good vibes)");
  task2Proj1.setPriority("Low");

  task3Proj1.setTitle("Buy the present");
  task3Proj1.setDescription("Call Rafaela for help");
  task3Proj1.setPriority("High");
  task3Proj1.taskDates.setDueDate("2023-12-22");
  task3Proj1.switchTaskStatus();

  project1.addTask(task1Proj1);
  project1.addTask(task2Proj1);
  project1.addTask(task3Proj1);

  projects.append(project1);

  const project2 = createProject();
  const task1Proj2 = createTask();

  project2.setName("Finish JS course");
  project2.setDescription(
    "Follow TOP's curriculum to learn as much as possible"
  );

  task1Proj2.setTitle("Finish toDo App");
  task1Proj2.switchTaskStatus();
  project2.addTask(task1Proj2);

  projects.append(project2);

  manageCurrentProject.setProject(project1);
  renderProjects(projects);
}

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

// Function to render projects on the page
function renderProjects(projects) {
  const projectContainer = document.querySelector("#project-container");
  projectContainer.innerHTML = ""; // Clearing the existing content in the project container

  // Iterating through the projects list
  for (
    projects.front();
    projects.currPos() < projects.length();
    projects.next()
  ) {
    let projectObject = projects.getElement();
    let projectElement = createProjectElement(projectObject);
    let deleteBtn = projectElement.children.item(3);

    addEventListenerToProjects(projectObject, projectElement);
    projectContainer.appendChild(projectElement);

    deleteBtn.addEventListener("click", function (event) {
      removeProject(event, projects);
      renderTasks(projects.getElement());
    });
  }
}

function addEventListenerToProjects(projectObject, projectElement) {
  projectElement.addEventListener("click", function () {
    manageCurrentProject.setProject(projectObject);
    renderTasks(projectObject);
  });

  projectElement.addEventListener("dblclick", function () {
    editProjectInfo(projectObject);
  });
}

function editProjectInfo(projectObject) {
  const form = editProjectForm(projectObject);
  openModal(form);

  const cancelBtn = document.querySelector("#btn-cancel-editProjForm");
  const updateBtn = document.querySelector("#btn-update-editProjForm");

  cancelBtn.addEventListener("click", closeModal);
  updateBtn.addEventListener("click", function () {
    applyProjectFormInfo(form, projectObject);
    renderProjects(projects);
    closeModal();
  });
}

function applyProjectFormInfo(form, projectObject) {
  const projectName = form.children.item(0).value;
  const projectDescription = form.children.item(1).value;
  const noName = "Unnamed";
  const noDescription = "No description";

  projectName == ""
    ? projectObject.setName(noName)
    : projectObject.setName(projectName);
  projectDescription == ""
    ? projectObject.setDescription(noDescription)
    : projectObject.setDescription(projectDescription);
}

function removeProject(event, projects) {
  const projectsContainer = document.querySelector("#project-container");
  const activeProjectElement = event.target.parentNode;

  // Finding the index of the clicked project in the projects list
  let activeProjectsIndex = Array.prototype.indexOf.call(
    projectsContainer.children,
    activeProjectElement
  );

  // Moving the projects list to the clicked project index and removing the project
  projects.moveTo(activeProjectsIndex);
  projects.remove(projects.getElement());
  // Moving the projects list to the clicked project index and removing the project
  projectsContainer.removeChild(activeProjectElement);
  // Resetting the current project and rendering projects
  manageCurrentProject.setProject(undefined);
  renderProjects(projects);
}

export {
  createProject,
  renderProjects,
  applyProjectFormInfo,
  manageCurrentProject,
  projects,
  loadDefaultProjects,
};
