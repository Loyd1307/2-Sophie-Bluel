import { closeModal, stopPropagation } from "./modules.js";
import { getModalPhotos } from "./modal.js";
import { getCategories, addWork } from "./api.js";
import { getPhotos } from "./gallery.js";


/* ELEMENTS DU DOM */

const addPhotoButton = document.getElementById("addPhoto");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");

const previousButton = document.getElementById("previousModal");

const photoInput = document.getElementById("addPhotoButton");
const preview = document.getElementById("preview");
const photoPreview = document.querySelector(".photoPreview");
const photoForm = document.getElementById("addPhotoForm");


/* OUVERTURE MODALE */

if (addPhotoButton && modal2) {
    addPhotoButton.addEventListener("click", () => {
        modal1.style.display = "none";
        modal1.setAttribute("aria-hidden", "true");
        modal1.removeAttribute("aria-modal");

        modal2.style.display = "flex";
        modal2.removeAttribute("aria-hidden");
        modal2.setAttribute("aria-modal", "true");
    });
}


/* FERMETURE MODALE */

if (modal1) {
    modal1
        .querySelector(".js-modal-close")
        .addEventListener("click", () => {
            resetPhotoForm();
            closeModal(modal1);
        });

    modal1.addEventListener("click", () => {
        resetPhotoForm();
        closeModal(modal1);
    });

    modal1
        .querySelector(".modal-wrapper")
        .addEventListener("click", stopPropagation);
}

if (modal2) {
    modal2
        .querySelector(".js-modal-close")
        .addEventListener("click", () => {
            resetPhotoForm();
            closeModal(modal2);
        });

    modal2.addEventListener("click", () => {
        resetPhotoForm();
        closeModal(modal2);
    });

    modal2
        .querySelector(".modal-wrapper")
        .addEventListener("click", stopPropagation);
}


/* BOUTON RETOUR */

if (previousButton) {
    previousButton.addEventListener("click", () => {
        modal2.style.display = "none";
        modal2.setAttribute("aria-hidden", "true");
        modal2.removeAttribute("aria-modal");

        modal1.style.display = "flex";
        modal1.removeAttribute("aria-hidden");
        modal1.setAttribute("aria-modal", "true");
    });
}


/* PREVIEW PHOTO */

photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    Array.from(photoPreview.children).forEach((child) => {
        if (child !== preview) {
            child.style.display = "none";
        }
    });
});


/* RESET DU FORMULAIRE */

function resetPhotoForm() {
    photoForm.reset();

    preview.src = "";
    preview.style.display = "none";

    Array.from(photoPreview.children).forEach((child) => {
        if (child !== preview) {
            child.style.display = "";
        }
    });
}


/* CATEGORIES */

async function loadCategories() {
    try {
        const categories = await getCategories();

        const categorySelect = document.getElementById("category");

        categories.forEach((category) => {
            const option = document.createElement("option");

            option.value = category.id;
            option.textContent = category.name;

            categorySelect.appendChild(option);
        });

    } catch (error) {
        console.error(
            "Erreur lors du chargement des catégories :",
            error
        );
    }
}

loadCategories();


/* AJOUT D'UN PROJET */

photoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const image = photoInput.files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;

    if (!image || !title || !category) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    try {
        await addWork(formData);

        // Actualisation des deux galeries
        await getModalPhotos();
        await getPhotos();

        resetPhotoForm();

        alert("Photo ajoutée avec succès !");

    } catch (error) {
        console.error(error);
        alert("Une erreur est survenue.");
    }
});
