import {
  createMainLayoutElements,
  createProjectElement,
  createTaskElement,
  newProjectForm,
  newTaskForm,
} from "./create-html-elements";
import "./style.css";
import { createProject } from "./project";
import { projects } from "./storage";

(function () {
  const mainBody = createMainLayoutElements();
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

    const delProjBtn = document.querySelector("#delete-project");
    const cancelBtnProj = document.querySelector("#btn-cancel-proj");
    const submitProj = document.querySelector("#submit-form");

    modal.style.display = "block";

    submitProj.addEventListener("click", function () {
      const projName = form.firstChild.value;
      const projDescription = form.lastChild.value;
      const project = createProject();

      project.setName = projName;
      project.setDescription = projDescription;

      projects.append(project);
      console.log(projects.toString());
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

    cancelBtnTask.addEventListener("click", closeModal);
  });

  function closeModal() {
    const modalContainer = document.querySelector("#general-modal");

    modal.style.display = "none";
    modalContainer.removeChild(modalContainer.firstChild);
  }

  function saveProject(form) {}
})();
