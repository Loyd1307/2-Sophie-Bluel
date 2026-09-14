import { openModal, closeModal, stopPropagation } from "./modules.js";
import { getModalPhotos } from "./modal.js";
import { getCategories, addWork } from "./api.js";
import { getPhotos } from "./gallery.js";

/* ELEMENTS DU DOM */

const openAddPhotoButton = document.getElementById("addPhoto");
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const previousButton = document.getElementById("previousModal");
const photoInput = document.getElementById("addPhotoButton");
const preview = document.getElementById("preview");
const photoPreview = document.querySelector(".photoPreview");
const photoForm = document.getElementById("addPhotoForm");

let previewUrl = null;

/* OUVERTURE MODALE */

if (openAddPhotoButton && modal2) {
    openAddPhotoButton.addEventListener("click", () => {
        modal1.style.display = "none";
        modal1.setAttribute("aria-hidden", "true");
        modal1.removeAttribute("aria-modal");

        openModal(modal2);
    });
}

/* FERMETURE MODALE */

function initModal(modal) {
    if (!modal) return;

    const closeButton = modal.querySelector(".js-modal-close");
    const modalWrapper = modal.querySelector(".modal-wrapper");

    closeButton.addEventListener("click", () => {
        resetPhotoForm();
        closeModal(modal);
    });

    modal.addEventListener("click", () => {
        resetPhotoForm();
        closeModal(modal);
    });

    modalWrapper.addEventListener("click", stopPropagation);
}

initModal(modal1);
initModal(modal2);

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

if (photoInput) {
    photoInput.addEventListener("change", () => {
        const file = photoInput.files[0];

        if (!file) return;

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        previewUrl = URL.createObjectURL(file);
        preview.src = previewUrl;
        preview.style.display = "block";

        Array.from(photoPreview.children).forEach((child) => {
            if (child !== preview) {
                child.style.display = "none";
            }
        });
    });
}

/* RESET DU FORMULAIRE */

function resetPhotoForm() {
    photoForm.reset();

    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = null;
    }

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

if (photoForm) {
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
}
