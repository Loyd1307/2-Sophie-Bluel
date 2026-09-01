/* script redirection login/logout */

const token = localStorage.getItem("token");

const login = document.getElementById("login");
const logout = document.getElementById("logout");
const edition = document.getElementById("edition");

if (token) {
    login.style.display = "none";
    logout.style.display = "inline";
    edition.style.display = "flex";
} else {
    login.style.display = "inline";
    logout.style.display = "none";
    edition.style.display = "none";
}

logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});


/* script affichage des projets */

const gallery = document.querySelector(".gallery");

let data = [];

async function getPhotos() {

     const response = await fetch("http://localhost:5678/api/works");
     data = await response.json();

     displayPhotos(data);
}

function displayPhotos(photos) {
    gallery.innerHTML = "";

    
    photos.forEach(photo => {
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      image.src = photo.imageUrl;
      image.alt = photo.title;

      const title = document.createElement("p");
      title.textContent = photo.title;

      card.appendChild(image);
      card.appendChild(title);

      gallery.appendChild(card);
    });
}

getPhotos();

/** fonction filtre **/

const filterAll = document.querySelector(".filterAll");

filterAll.addEventListener("click", function () {
  displayPhotos(data);
});

const filterObject = document.querySelector(".filterObject");

filterObject.addEventListener("click", function () {
  const objects = data.filter(function (data) {
    return data.categoryId === 1
  });
  displayPhotos(objects)
});

const filterAppartement = document.querySelector(".filterAppartement");

filterAppartement.addEventListener("click", function () {
  const appartements = data.filter(function (data) {
    return data.categoryId === 2
  });
  displayPhotos(appartements)
});

const filterHotel = document.querySelector(".filterHotel");

filterHotel.addEventListener("click", function () {
  const hotels = data.filter(function (data) {
    return data.categoryId === 3
  });
  displayPhotos(hotels)
});

/* Gestion propriété CSS filtres */

const filtersButton = document.querySelectorAll(".filterButton");

filtersButton.forEach(button => {
  button.addEventListener("click", function () {

    filtersButton.forEach (button => {
    button.classList.remove("active");
  });

  this.classList.add("active");
  });
});

