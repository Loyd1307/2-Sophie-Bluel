
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

/** fontion filtre inachevé **/
const filterAll = document.querySelector(".filterAll");

filterAll.addEventListener("click", function () {
  displayPhotos(data);
  console.log(data)
});

const filterObject = document.querySelector(".filterObject");

filterObject.addEventListener("click", function () {
  const object = data.filter(function (data) {
    return data.name = "Objets"
  });
  console.log(object)
});
