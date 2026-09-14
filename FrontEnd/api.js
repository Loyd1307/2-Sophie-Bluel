const API_URL = "http://localhost:5678/api";


/**
 * Récupérer tous les projets
 */
export async function getWorks() {
    const response = await fetch(`${API_URL}/works`);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets");
    }

    return response.json();
}


/**
 * Récupérer toutes les catégories
 */
export async function getCategories() {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
    }

    return response.json();
}


/**
 * Supprimer un projet
 */
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


/**
 * Ajouter un projet
 */
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
