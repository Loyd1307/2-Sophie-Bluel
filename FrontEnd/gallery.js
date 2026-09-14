import { getWorks } from "./api.js";


/* ================================
   GALERIE
================================ */

const gallery = document.getElementById("projectGallery");

let works = [];


/**
 * Récupère les projets et affiche la galerie
 */
export async function getPhotos() {
    try {
        works = await getWorks();
        displayPhotos(works);
    } catch (error) {
        console.error(
            "Erreur lors du chargement des projets :",
            error
        );
    }
}


/**
 * Affiche les projets
 */
function displayPhotos(photos) {
    gallery.innerHTML = "";

    photos.forEach((photo) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = photo.imageUrl;
        image.alt = photo.title;

        const title = document.createElement("p");
        title.textContent = photo.title;

        card.append(image, title);
        gallery.appendChild(card);
    });
}


/* ================================
   FILTRES
================================ */

const filterButtons = document.querySelectorAll(".filterButton");


/**
 * Filtre les projets par catégorie
 */
function filterProjects(categoryId) {
    if (categoryId === null) {
        displayPhotos(works);
        return;
    }

    const filteredWorks = works.filter(
        (work) => work.categoryId === categoryId
    );

    displayPhotos(filteredWorks);
}


/**
 * Gestion des boutons de filtre
 */
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const categoryId = button.dataset.category;

        filterProjects(
            categoryId ? Number(categoryId) : null
        );

        filterButtons.forEach((button) => {
            button.classList.remove("active");
        });

        button.classList.add("active");
    });
});


/* ================================
   INITIALISATION
================================ */

getPhotos();
