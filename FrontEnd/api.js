export async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des projets");
    }

    return await response.json();
}
