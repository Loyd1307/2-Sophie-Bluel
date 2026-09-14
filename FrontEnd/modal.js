import { closeModal, stopPropagation } from "./modules.js";
import { getWorks, deleteWork } from "./api.js";
import { getPhotos } from "./gallery.js";


/* ================================
   ELEMENTS DOM
================================ */

const modal1 = document.getElementById("modal1");
const miniGallery = document.getElementById("modalGallery");


/* ================================
   OUVERTURE DE LA MODALE
================================ */

function openModal(event) {
    event.preventDefault();

    const modalId = event.currentTarget.getAttribute("href");
    const modal = document.querySelector(modalId);

    if (!modal) return;

    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
}


/* ================================
   INITIALISATION DE LA MODALE
================================ */

function initModal(modal) {
    if (!modal) return;

    const closeButton = modal.querySelector(".js-modal-close");
    const modalWrapper = modal.querySelector(".modal-wrapper");

    closeButton.addEventListener("click", () => {
        closeModal(modal);
    });

    modal.addEventListener("click", () => {
        closeModal(modal);
    });

    modalWrapper.addEventListener("click", stopPropagation);
}

document
    .querySelectorAll(".js-modal-open")
    .forEach((button) => {
        button.addEventListener("click", openModal);
    });

initModal(modal1);


/* ================================
   GALERIE DE LA MODALE
================================ */

export async function getModalPhotos() {
    try {
        const works = await getWorks();

        displayModalPhotos(works);

    } catch (error) {
        console.error(
            "Erreur lors du chargement de la galerie :",
            error
        );
    }
}


/* ================================
   AFFICHAGE DES PROJETS
================================ */

function displayModalPhotos(photos) {
    miniGallery.innerHTML = "";

    photos.forEach((photo) => {
        const card = document.createElement("div");
        card.classList.add("card-modal");

        const container = document.createElement("div");
        container.classList.add("image-container");

        const image = document.createElement("img");
        image.src = photo.imageUrl;
        image.alt = photo.title;

        const trashIcon = document.createElement("i");

        trashIcon.classList.add(
            "fa-solid",
            "fa-trash-can",
            "trash-icon",
            "fa-lg"
        );

        trashIcon.dataset.id = photo.id;

        container.append(image, trashIcon);
        card.appendChild(container);
        miniGallery.appendChild(card);
    });
}


/* ================================
   SUPPRESSION D'UN PROJET
================================ */

async function handleDelete(event) {
    const button = event.target.closest(".trash-icon");

    if (!button) return;

    const imageId = button.dataset.id;

    try {
        await deleteWork(imageId);

        // Actualise la galerie de la modale
        await getModalPhotos();

        // Actualise la galerie principale
        await getPhotos();

    } catch (error) {
        console.error(
            "Erreur lors de la suppression du projet :",
            error
        );
    }
}

miniGallery.addEventListener("click", handleDelete);


/* ================================
   INITIALISATION
================================ */

getModalPhotos();

