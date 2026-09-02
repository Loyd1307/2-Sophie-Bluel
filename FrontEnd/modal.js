
let modal = null;

const openModal = function (e) {
    e.preventDefault();

    const target = document.querySelector(
        e.currentTarget.getAttribute("href")
    );

    if (!target) return;

    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");

    modal = target;

    modal.querySelector("#js-modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", closeModal);
    modal.querySelector(".modal-wrapper").addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (modal === null) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
});