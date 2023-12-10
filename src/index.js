import {
  createMainLayoutElements,
  createProjectElement,
  createTaskElement,
} from "./create-html-elements";
import "./style.css";

(function () {
  const mainBody = createMainLayoutElements();
})();

(function () {
  const taskBtn = document.querySelector("#btn-new-task");
  const projBtn = document.querySelector("#btn-create-project");
  const submitBtn = document.querySelector("#submit");
  const delProjBtn = document.querySelector("#delete-project");
  const deltaskBtn = document.querySelector("#delete-task");
})();
