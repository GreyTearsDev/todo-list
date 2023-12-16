import { createList, manageCurrentProject } from "./storage";
import { dateManager } from "./dates";
import { openModal, closeModal } from "./util";
import { createProjectElement, editProjectForm } from "./create-html-elements";
import { setCurrentProject } from "./index";

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
  const projContainer = document.querySelector("#project-container");
  projContainer.innerHTML = "";

  for (
    projects.front();
    projects.currPos() < projects.length();
    projects.next()
  ) {
    let projObject = projects.getElement();
    let projElement = createProjectElement(projObject);
    let deleteBtn = projElement.children.item(3);

    deleteBtn.addEventListener("click", function (event) {
      removeProject(event, projects);
    });
    addEventListenerToProjects(projObject, projElement);
    projContainer.appendChild(projElement);
  }
}

function addEventListenerToProjects(projectObj, projectElement) {
  projectElement.addEventListener("click", function () {
    manageCurrentProject.set(projectObj);
    renderTasks(projectObj);
    projectElement.addEventListener("dblclick", editProjectInfo);
  });
}

export { createProject, renderProjects };
