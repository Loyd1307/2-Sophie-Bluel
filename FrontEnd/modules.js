/* OUVERTURE DES MODALES */

export function openModal(modal) {
    if (!modal) return;

    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
}

/* FERMETURE DES MODALES */

export function closeModal(modal) {
    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
}


export function stopPropagation(event) {
    event.stopPropagation();
}
