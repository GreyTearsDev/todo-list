import { createMessageElement } from "./html-elements";

function openModal(...content) {
  const modal = document.getElementById("general-modal");
  content.forEach((element) => modal.appendChild(element));
  modal.style.display = "block";
}

const closeModal = () => {
  const modalContainer = document.querySelector("#general-modal");
  const modal = document.getElementById("general-modal");

  modal.style.display = "none";
  modalContainer.removeChild(modalContainer.firstChild);
};

const displayModalMessage = (title, msg) => {
  const message = createMessageElement(title, msg);
  return message;
};

export { openModal, closeModal, displayModalMessage };
