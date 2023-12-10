import {
  createMainLayoutElements,
  createProjectElement,
  createTaskElement,
  newProjectForm,
  newTaskForm,
} from "./create-html-elements";
import "./style.css";

(function () {
  const mainBody = createMainLayoutElements();
  const taskBtn = document.querySelector("#btn-new-task");
  const projBtn = document.querySelector("#btn-create-project");
  const submitProj = document.querySelector("#submit-form");
  const submitTask = document.querySelector("#submit-task");
  const delProjBtn = document.querySelector("#delete-project");
  const delTaskBtn = document.querySelector("#delete-task");
  const modal = document.getElementById("general-modal");
  const cancelBtn = document.querySelector(".btn-cancel");

  projBtn.addEventListener("click", function () {
    const form = newProjectForm();
    modal.appendChild(form);
    modal.style.display = "block";
  });

  taskBtn.addEventListener("click", function () {
    const form = newTaskForm();
    modal.appendChild(form);
    modal.style.display = "block";
  });
})();
