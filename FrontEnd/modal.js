
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

const miniGallery = document.getElementById("modalGallery");

async function getModalPhotos() {

     const response = await fetch("http://localhost:5678/api/works");
     data = await response.json();

     displayModalPhotos(data);
}

function displayModalPhotos(photos) {
    miniGallery.innerHTML = "";

    photos.forEach(photo => {

        const card = document.createElement("div");
        card.classList.add("card");
    
        const image = document.createElement("img");
        image.src = photo.imageUrl;

        card.appendChild(image);

        miniGallery.appendChild(card);
      
    });
}

getModalPhotos();
