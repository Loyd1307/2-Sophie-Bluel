const addPhotoButton = document.getElementById("addPhoto");

addPhotoButton.addEventListener("click", function () {
    const modal2 = document.getElementById("modal2");

    modal2.style.display = "flex";
    modal2.removeAttribute("aria-hidden");
    modal2.setAttribute("aria-modal", "true");
});

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

/* test de la fonction d'ajout de photo */

const photoForm = document.querySelector("#addPhotoForm");

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

        console.log("Projet ajouté :", work);

        alert("Photo ajoutée avec succès !");

    } catch (error) {
        console.error(error);
        alert("Une erreur est survenue.");
    }
});