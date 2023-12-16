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

export { openModal, closeModal };
