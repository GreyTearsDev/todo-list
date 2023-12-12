import {
  createMainLayoutElements,
  createProjectElement,
  createTaskElement,
  newProjectForm,
  newTaskForm,
} from "./create-html-elements";
import "./style.css";
import { createProject } from "./project";
import { createTask } from "./task";
import { createList } from "./storage";

(function () {
  const mainBody = createMainLayoutElements();
  const projContainer = document.querySelector("#project-container");
  const taskBtn = document.querySelector("#btn-new-task");
  const projBtn = document.querySelector("#btn-create-project");
  const modal = document.getElementById("general-modal");
  const projects = createList();
  let currentProject;

  window.addEventListener("click", function () {
    if (this.event.target == modal) {
      closeModal();
    }
  });

  projBtn.addEventListener("click", function () {
    const form = newProjectForm();
    modal.appendChild(form);
    modal.style.display = "block";

    const delProjBtn = document.querySelector("#delete-project");
    const cancelBtnProj = document.querySelector("#btn-cancel-proj");
    const submitProj = document.querySelector("#submit-form");

    submitProj.addEventListener("click", function () {
      projContainer.innerHTML = "";
      const projName = form.firstChild.value;
      const projDescription = form.children.item(1).value;
      const project = createProject();

      project.setName(projName);
      project.setDescription(projDescription);
      projects.append(project);
      currentProject = project;

      closeModal();
      renderProjects();
    });

    cancelBtnProj.addEventListener("click", closeModal);
  });

  taskBtn.addEventListener("click", function () {
    const form = newTaskForm();
    modal.appendChild(form);

    const delTaskBtn = document.querySelector("#delete-task");
    const submitTask = document.querySelector("#submit-task");
    const cancelBtnTask = document.querySelector("#btn-cancel-task");

    modal.style.display = "block";

    submitTask.addEventListener("click", function () {
      const taskName = form.firstChild.value;
      const taskDescription = form.children.item(1).value;
      const task = createTask();

      task.setTitle(taskName);
      task.setDescription(taskDescription);
      console.log(form);
      // task.taskDates.setDueDate(task.taskDates.getDueDate())
      currentProject.addTask(task);
      renderTasks(currentProject);

      closeModal();
    });
    cancelBtnTask.addEventListener("click", closeModal);
  });

  function closeModal() {
    const modalContainer = document.querySelector("#general-modal");

    modal.style.display = "none";
    modalContainer.removeChild(modalContainer.firstChild);
  }

  function addEventListenerToProjects(projectObj, projectElement) {
    projectElement.addEventListener("click", function () {
      currentProject = projectObj;
      console.log(currentProject);
      renderTasks(projectObj);
    });
  }

  function renderTasks(projectObj) {
    const taskContainer = document.getElementById("task-container");
    let [...nodes] = taskContainer.childNodes;

    for (let i = 0; i < nodes.length; ++i) {
      console.log(nodes[i]);

      // taskContainer.removeChild(nodes.splice(1));
      if (i !== 0) {
        taskContainer.removeChild(nodes[i]);
      }
    }

    for (let task of projectObj.getTasks()) {
      let newTask = createTaskElement(task);
      taskContainer.appendChild(newTask);
    }
  }

  function findTaskObj(taskElement) {}

  function saveProject(form) {}
  function renderProjects() {
    for (
      projects.front();
      projects.currPos() < projects.length();
      projects.next()
    ) {
      let projObject = projects.getElement();
      let projElement = createProjectElement(projObject);
      addEventListenerToProjects(projObject, projElement);
      projContainer.appendChild(projElement);
    }
  }
})();

//todo
/* 

add tasks to projects
render the appropriate tasks depending on the project


*/
