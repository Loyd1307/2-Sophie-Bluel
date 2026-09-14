
/* fermeture modale*/

export function closeModal(modal) {
    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
}


export function stopPropagation(event) {
    event.stopPropagation();
}
