
import { closeModal, stopPropagation } from "./modules.js";

const openModal = function (e) {
    e.preventDefault();

    const target = document.querySelector(
        e.currentTarget.getAttribute("href")
    );

    if (!target) return;

    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");

    target
        .querySelector(".js-modal-close")
        .addEventListener("click", closeModal);

    target.addEventListener("click", closeModal);

    target
        .querySelector(".modal-wrapper")
        .addEventListener("click", stopPropagation);
};

document.querySelectorAll(".js-modal-open").forEach(button => {
    button.addEventListener("click", openModal);
});


/* Gestion de la galerie modale */

const miniGallery = document.getElementById("modalGallery");

async function getModalPhotos() {

     const response = await fetch("http://localhost:5678/api/works");
     data = await response.json();

     displayModalPhotos(data);
}

function displayModalPhotos(photos) {
    miniGallery.innerHTML = "";

    photos.forEach(photo => {

        const card = document.createElement("div");
        card.classList.add("card-modal");

        const container = document.createElement("div");
        container.className = "image-container";

    
        const image = document.createElement("img");
        image.src = photo.imageUrl;

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can", "trash-icon", "fa-lg");
        trashIcon.setAttribute("data-id", photo.id);

        container.appendChild(image);
        container.appendChild(trashIcon);
        card.appendChild(container);

        miniGallery.appendChild(card);
      
    });
}

getModalPhotos();
