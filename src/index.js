// Importing necessary functions and styles from other files

import {
  createMainLayoutElements,
  newProjectForm,
  newTaskForm,
} from "./html-elements";
import "./style.css";
import {
  createProject,
  renderProjects,
  applyProjectFormInfo,
  manageCurrentProject,
  projects,
  loadDefaultProjects,
} from "./project";
import { createTask, renderTasks, applyTaskFormInfo } from "./task";
import { openModal, closeModal, displayModalMessage } from "./util";

(function () {
  createMainLayoutElements();
  loadDefaultProjects();

  const taskBtn = document.querySelector("#btn-new-task");
  const projBtn = document.querySelector("#btn-create-project");
  const modal = document.getElementById("general-modal");

  // Adding a click event listener to the window to close the modal when clicked outside
  window.addEventListener("click", function () {
    if (this.event.target == modal) {
      closeModal();
    }
  });

  projBtn.addEventListener("click", function () {
    const form = newProjectForm();
    openModal(form);
    const submitBtn = document.querySelector("#btn-submit-form");
    const cancelBtn = document.querySelector("#btn-cancel-form");

    submitBtn.addEventListener("click", function () {
      const project = createProject();

      // Setting the current project to the newly created project
      manageCurrentProject.setProject(project);

      // Applying form information to the project
      applyProjectFormInfo(form, project);
      projects.append(project);
      closeModal();

      // Rendering the updated list of projects and the tasks for the current project
      renderProjects(projects);
      renderTasks(manageCurrentProject.getProject());
    });

    cancelBtn.addEventListener("click", closeModal);
  });

  taskBtn.addEventListener("click", function () {
    // Checking if a project has been created before creating a task
    if (manageCurrentProject.getProject() == undefined) {
      let message = displayModalMessage("Empty list!", "Create project first!");
      openModal(message);
      return;
    }

    const form = newTaskForm();
    openModal(form);
    const submitBtn = document.querySelector("#btn-submit-task");
    const cancelBtn = document.querySelector("#btn-cancel-task");

    submitBtn.addEventListener("click", function () {
      const task = createTask();

      // Applying form information to the task and associating it with the current project
      applyTaskFormInfo(form, task, manageCurrentProject.getProject());
      renderTasks(manageCurrentProject.getProject());
      closeModal();
    });

    cancelBtn.addEventListener("click", closeModal);
  });
})();
