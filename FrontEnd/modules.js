
/* fermeture modale*/

export function closeModal() {
    const modals = document.querySelectorAll(".js-modal");

    modals.forEach(modal => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
    });
}

export function stopPropagation(e) {
    e.stopPropagation();
}

