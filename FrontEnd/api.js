const API_URL = "http://localhost:5678/api";


/* RECUPERATION WORKS */
export async function getWorks() {
    const response = await fetch(`${API_URL}/works`);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets");
    }

    return response.json();
}


/* RECUPERATION DES CATHEGORIES */
export async function getCategories() {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
    }

    return response.json();
}


/* SUPPRESSION IMAGE */
export async function deleteWork(id) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/works/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la suppression du projet");
    }
}


/* AJOUTER UNE IMAGE */
export async function addWork(formData) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/works`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du projet");
    }

    return response.json();
}
