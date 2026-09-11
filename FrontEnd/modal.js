import { closeModal, stopPropagation } from "./modules.js";
import { getWorks } from "./api.js";
import { getPhotos } from "./api-request.js";


/* Fermeture modale + arret de la propagation */

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


/* Recupération des données API */

const miniGallery = document.getElementById("modalGallery");

export async function getModalPhotos() {

    try {
        const data = await getWorks();

        displayModalPhotos(data);

    } catch (error) {
        console.error(error);
    }
}

/* Suppression photo */

miniGallery.addEventListener("click", async (event) => {

    const button = event.target.closest(".trash-icon");

    if (!button) return;

    const imageId = button.dataset.id;

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5678/api/works/${imageId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erreur lors de la suppression");
        }

        // Recharge la galerie de la modale
        await getModalPhotos();
        
        if (window.refreshProjectGallery) {
        await getPhotos();
}

    } catch (error) {
        console.error(error);
    }
});


/* Affichage de la galerie modale*/

function displayModalPhotos(photos) {

    miniGallery.innerHTML = "";

    photos.forEach(photo => {

        const card = document.createElement("div");
        card.classList.add("card-modal");

        const container = document.createElement("div");
        container.classList.add("image-container");

        const image = document.createElement("img");
        image.src = photo.imageUrl;

        const trashIcon = document.createElement("i");

        trashIcon.classList.add(
            "fa-solid",
            "fa-trash-can",
            "trash-icon",
            "fa-lg"
        );

        trashIcon.dataset.id = photo.id;

        container.appendChild(image);
        container.appendChild(trashIcon);

        card.appendChild(container);

        miniGallery.appendChild(card);
    });
}


getModalPhotos();
