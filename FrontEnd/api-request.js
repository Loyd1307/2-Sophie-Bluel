
const gallery = document.querySelector(".gallery");

let data = [];

async function getPhotos() {

     const response = await fetch("http://localhost:5678/api/works");
     const data = await response.json();
     
      data.forEach(photo => {

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
  const dataFilter = data.filter(function (photo) {
    console.log(data);
  });
  console.log(dataFilter)
});
