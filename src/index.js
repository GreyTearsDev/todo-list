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
import { projects } from "./storage";

(function () {
  const mainBody = createMainLayoutElements();
  const main = document.body.querySelector("main");
  const projContainer = document.querySelector("#project-container");
  const taskBtn = document.querySelector("#btn-new-task");
  const projBtn = document.querySelector("#btn-create-project");
  const modal = document.getElementById("general-modal");

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

      closeModal();
      renderProjects(project);

      addEventListenerToProjects();
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
      closeModal();
    });
    cancelBtnTask.addEventListener("click", closeModal);
  });

  function closeModal() {
    const modalContainer = document.querySelector("#general-modal");

    modal.style.display = "none";
    modalContainer.removeChild(modalContainer.firstChild);
  }

  function addEventListenerToProjects() {
    let [...children] = document.querySelectorAll(".project");
    children.forEach((child) =>
      child.addEventListener("click", function () {
        renderTasks(children, child);
      })
    );
  }

  function renderTasks(children, child) {
    for (const [index] of children.entries()) {
      console.log(index);
    }
  }

  function saveProject(form) {}
  function renderProjects() {
    for (
      projects.front();
      projects.currPos() < projects.length();
      projects.next()
    ) {
      const project = projects.getElement();
      const proj = createProjectElement(project);
      projContainer.appendChild(proj);
    }
  }
})();

//todo
/* 

add tasks to projects
render the appropriate tasks depending on the project


*/
