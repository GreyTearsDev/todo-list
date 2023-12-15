import {
  createMainLayoutElements,
  createProjectElement,
  createTaskElement,
  newProjectForm,
  newTaskForm,
  createMessageElement,
  editProjectForm,
  editTaskForm,
} from "./create-html-elements";
import "./style.css";
import { createProject, getTaskIndex, getTaskObject } from "./project";
import { createTask } from "./task";
import { createList } from "./storage";

(function () {
  createMainLayoutElements();
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

    submitBtn.addEventListener("click", function () {
      renderProjects();
      const project = createProject();

      applyProjectFormInfo(form, project);
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
    const submitBtn = document.querySelector("#btn-submit-task");
    const cancelBtn = document.querySelector("#btn-cancel-task");

    submitBtn.addEventListener("click", function () {
      const task = createTask();
      applyTaskFormInfo(form, task);
      renderTasks(currentProject);
      closeModal();
    });

    cancelBtn.addEventListener("click", closeModal);
  });

  function addEventListenerToProjects(projectObj, projectElement) {
    projectElement.addEventListener("click", function () {
      currentProject = projectObj;
      renderTasks(projectObj);
      projectElement.addEventListener("dblclick", editProjectInfo);
    });
  }

  function addEventListenerToTasks(taskElement) {
    const newTask = taskElement;
    const deleteBtn = newTask.children.item(5);
    deleteBtn.addEventListener("click", removeTask);
    newTask.addEventListener("dblclick", editTaskInfo);
  }

  function renderTasks(projectObj) {
    const taskContainer = document.getElementById("task-container");
    let [...nodes] = taskContainer.childNodes;

    for (let i = 0; i < nodes.length; ++i) {
      if (i == 0) continue;
      taskContainer.removeChild(nodes[i]);
    }

    for (let task of projectObj.getTasks()) {
      console.log(task.getTitle());
      console.log(projectObj.getTasks().length);
      let newTask = createTaskElement(task);
      addEventListenerToTasks(newTask);
      taskContainer.appendChild(newTask);
    }
  }

  function removeTask(event) {
    let taskContainer = event.target.parentNode.parentNode;
    let currentTask = event.target.parentNode;
    let index = getTaskIndex(currentTask, taskContainer);
    let task = getTaskObject(currentProject, index);

    currentProject.removeTask(task);
    renderTasks(currentProject);
  }

  function removeProject(event) {
    const projContainer = document.querySelector("#project-container");
    const currProjElement = event.target.parentNode;
    let index = Array.prototype.indexOf.call(
      projContainer.children,
      currProjElement
    );
    projects.moveTo(index);
    projects.remove(projects.getElement());

    projContainer.removeChild(currProjElement);
    renderProjects();
  }

  function openModal(...content) {
    const modal = document.getElementById("general-modal");
    content.forEach((element) => modal.appendChild(element));
    modal.style.display = "block";
  }

  function closeModal() {
    const modalContainer = document.querySelector("#general-modal");
    modal.style.display = "none";
    modalContainer.removeChild(modalContainer.firstChild);
  }

  function renderProjects() {
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

      deleteBtn.addEventListener("click", removeProject);
      addEventListenerToProjects(projObject, projElement);
      projContainer.appendChild(projElement);
    }
  }

  function displayModalMessage(title, msg) {
    const message = createMessageElement(title, msg);
    return message;
  }

  function editProjectInfo() {
    const form = editProjectForm(currentProject);
    openModal(form);

    const cancelBtn = document.querySelector("#btn-cancel-editProjForm");
    const submitBtn = document.querySelector("#btn-submit-editProjForm");

    cancelBtn.addEventListener("click", closeModal);
    submitBtn.addEventListener("click", function () {
      applyProjectFormInfo(form, currentProject);
      closeModal();
      renderProjects();
    });
  }

  function editTaskInfo(event) {
    let taskContainer = event.target.parentNode.parentNode;
    let currentTask = event.target.parentNode;
    let index = getTaskIndex(currentTask, taskContainer);
    let task = getTaskObject(currentProject, index);
    const form = editTaskForm(task);

    openModal(form);
    const cancelBtn = document.querySelector("#btn-cancel-editTaskForm");
    const updateBtn = document.querySelector("#btn-update-editTaskForm");

    cancelBtn.addEventListener("click", closeModal);
    updateBtn.addEventListener("click", function () {
      currentProject.removeTask(currentProject.removeTask(task));
      applyTaskFormInfo(form, task);
      closeModal();
      renderTasks(currentProject);
    });
  }

  function applyProjectFormInfo(form, project) {
    const projName = form.children.item(0).value;
    const projDesc = form.children.item(1).value;
    const noName = "Unnamed";
    const noDesc = "No description";

    projName == "" ? project.setName(noName) : project.setName(projName);
    projDesc == ""
      ? project.setDescription(noDesc)
      : project.setDescription(projDesc);
  }

  function applyTaskFormInfo(form, task) {
    const taskTitle = form.children.item(0).value;
    const taskPriority = form.children.item(2).value;
    const taskDesc = form.children.item(3).value;
    const taskDueDate = form.children.item(5).value;
    const noTitle = "Untitled";
    const noDesc = "No description";

    taskTitle == "" ? task.setTitle(noTitle) : task.setTitle(taskTitle);
    taskDesc == ""
      ? task.setDescription(noDesc)
      : task.setDescription(taskDesc);

    if (taskDueDate != "") task.taskDates.setDueDate(taskDueDate);
    task.setPriority(taskPriority);
    currentProject.addTask(task);
  }
})();

//todo
/* 

display the appropriate date when editing tasks
fix bug duplicating tasks when submit button in forum is clicked


*/
