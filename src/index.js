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
  const taskBtn = document.querySelector("#btn-new-task");
  const projBtn = document.querySelector("#btn-create-project");
  const modal = document.getElementById("general-modal");
  loadDefaultProjects();

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

      manageCurrentProject.setProject(project);
      applyProjectFormInfo(form, project);
      projects.append(project);
      closeModal();
      renderProjects(projects);
      renderTasks(manageCurrentProject.getProject());
    });

    cancelBtn.addEventListener("click", closeModal);
  });

  taskBtn.addEventListener("click", function () {
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
      applyTaskFormInfo(form, task, manageCurrentProject.getProject());
      renderTasks(manageCurrentProject.getProject());
      closeModal();
    });

    cancelBtn.addEventListener("click", closeModal);
  });
})();

/*to do


remove tasks when the las t project is deleted*/
