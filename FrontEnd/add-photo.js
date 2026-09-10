import { closeModal, stopPropagation } from "./modules.js";
import { getModalPhotos } from "./modal.js";

const addPhotoButton = document.getElementById("addPhoto");
const modal2 = document.getElementById("modal2");

if (addPhotoButton && modal2) {

    addPhotoButton.addEventListener("click", function () {
        modal2.style.display = "flex";
        modal2.removeAttribute("aria-hidden");
        modal2.setAttribute("aria-modal", "true");
    });

    modal2
        .querySelector(".js-modal-close")
        .addEventListener("click", () => {
        resetPhotoForm();
        closeModal();
    });

    modal2.addEventListener("click", () => {
    resetPhotoForm();
    closeModal();
});

modal2
    .querySelector(".modal-wrapper")
    .addEventListener("click", stopPropagation);
}

const previousButton = document.getElementById("previousModal");
const modal1 = document.getElementById("modal1");

previousButton.addEventListener("click", function () {
    // Fermer la modale 2
    modal2.style.display = "none";
    modal2.setAttribute("aria-hidden", "true");
    modal2.removeAttribute("aria-modal");

    // Réouvrir la modale 1
    modal1.style.display = "flex";
    modal1.removeAttribute("aria-hidden");
    modal1.setAttribute("aria-modal", "true");
});

/* Preview de la photo */

const photoInput = document.getElementById("addPhotoButton");
const preview = document.getElementById("preview");
const photoPreview = document.querySelector(".photoPreview");
const photoForm = document.querySelector("#addPhotoForm");

photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);

        // On affiche la preview
        preview.style.display = "block";

        // On cache uniquement les autres éléments
        Array.from(photoPreview.children).forEach((child) => {
            if (child !== preview) {
                child.style.display = "none";
            }
        });
     }
});


function resetPhotoForm() {
    // Reset des champs du formulaire
    photoForm.reset();

    // Reset de la preview
    preview.src = "";
    preview.style.display = "none";

    // Réafficher les éléments de sélection
    Array.from(photoPreview.children).forEach((child) => {
        if (child !== preview) {
            child.style.display = "";
        }
    });
}



async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const categorySelect = document.querySelector("#category");

    categories.forEach(category => {
        const option = document.createElement("option");

        option.value = category.id;
        option.textContent = category.name;

        categorySelect.appendChild(option);
    });
}

getCategories();

/* Ajout de photo */

photoForm.addEventListener("submit", async function (v) {
    v.preventDefault();

    const image = document.querySelector("#addPhotoButton").files[0];
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;

    // Vérification
    if (!image || !title || !category) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Création des données à envoyer
    const formData = new FormData();

    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi du formulaire");
        }

        const work = await response.json();

        await getModalPhotos();
        await window.refreshProjectGallery();


        alert("Photo ajoutée avec succès !");

    } catch (error) {
        console.error(error);
        alert("Une erreur est survenue.");
    }
});