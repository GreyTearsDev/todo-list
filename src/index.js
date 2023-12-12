import {
  createMainLayoutElements,
  createProjectElement,
  createTaskElement,
  newProjectForm,
  newTaskForm,
  createMessageElement,
  createAddTaskButton,
  createAddProjectButton,
  createModal,
} from "./create-html-elements";
import "./style.css";
import { createProject } from "./project";
import { createTask } from "./task";
import { createList } from "./storage";

(function () {
  createMainLayoutElements();
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
    openModal(form);

    const submitBtn = document.querySelector("#btn-submit-form");
    const cancelBtn = document.querySelector("#btn-cancel-form");
    const deleteBtn = document.querySelector("#delete-project");

    submitBtn.addEventListener("click", function () {
      projContainer.innerHTML = "";
      const projName = form.firstChild.value;
      const projDesc = form.children.item(1).value;
      const project = createProject();
      const noName = "Unnamed";
      const noDesc = "No description";

      projName == "" ? project.setName(noName) : project.setName(projName);
      projDesc == ""
        ? project.setDescription(noDesc)
        : project.setDescription(projDesc);

      projects.append(project);
      currentProject = project;

      closeModal();
      renderProjects();
    });

    cancelBtn.addEventListener("click", closeModal);
  });

  taskBtn.addEventListener("click", function () {
    if (currentProject == undefined) {
      let message = displayModalMessage("Empty list!", "Create project first!");
      openModal(message);
      return;
    }
    const form = newTaskForm();
    openModal(form);

    const delTaskBtn = document.querySelector("#delete-task");
    const submitTask = document.querySelector("#submit-task");
    const cancelBtnTask = document.querySelector("#btn-cancel-task");

    submitTask.addEventListener("click", function () {
      const taskTitle = form.firstChild.value;
      const taskPriority = form.children.item(1).value;
      const taskDesc = form.children.item(2).value;
      const taskDueDate = form.children.item(4).value;
      const task = createTask();
      const noTitle = "Untitled";
      const noDesc = "No description";

      taskTitle == "" ? task.setTitle(noTitle) : task.setTitle(taskTitle);
      taskDesc == ""
        ? task.setDescription(noDesc)
        : task.setDescription(taskDesc);

      if (taskDueDate != "") task.taskDates.setDueDate(taskDueDate);
      task.setPriority(taskPriority);
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
      if (i == 0) continue;
      taskContainer.removeChild(nodes[i]);
    }

    for (let task of projectObj.getTasks()) {
      let newTask = createTaskElement(task);
      taskContainer.appendChild(newTask);
    }
  }

  function openModal(...content) {
    const modal = document.getElementById("general-modal");
    content.forEach((element) => modal.appendChild(element));
    modal.style.display = "block";
  }

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

  function displayModalMessage(title, msg) {
    const message = createMessageElement(title, msg);
    return message;
  }
})();

//todo
/* 

add tasks to projects
render the appropriate tasks depending on the project


*/
