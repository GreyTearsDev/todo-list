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
  const proj1 = createProject();
  const proj1Task1 = createTask();

  proj1.setName("Learn Programming");
  proj1.setDescription("Follow The Odin Project to become a full-stack Dev");
  proj1Task1.setTitle("Finish javascript course");
  proj1Task1.setDescription(
    "Complete all projects and learn as much as possible"
  );
  proj1Task1.setPriority("Mid");
  proj1Task1.taskDates.setDueDate("2024, 01, 31");
  proj1.addTask(proj1Task1);
  projects.append(proj1);

  manageCurrentProject.setProject(proj1);

  renderProjects(projects);
  renderTasks(proj1);
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

function renderProjects(projects) {
  const projectContainer = document.querySelector("#project-container");
  projectContainer.innerHTML = "";

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
    manageCurrentProject.setProject(projectObject);

    deleteBtn.addEventListener("click", function (event) {
      removeProject(event, projects);
      renderTasks(projects.getElement());
    });
  }
}

function addEventListenerToProjects(projectObject, projectElement) {
  projectElement.addEventListener("click", function () {
    console.log(manageCurrentProject.getProject());
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
  let activeProjectsIndex = Array.prototype.indexOf.call(
    projectsContainer.children,
    activeProjectElement
  );

  projects.moveTo(activeProjectsIndex);
  projects.remove(projects.getElement());
  projectsContainer.removeChild(activeProjectElement);
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
