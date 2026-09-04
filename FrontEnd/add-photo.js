
const addPhotoButton = document.getElementById("addPhoto");

addPhotoButton.addEventListener("click", function () {
    const modal2 = document.getElementById("modal2");
    modal2.style.display = "flex";
    modal2.removeAttribute("aria-hidden");
    modal2.setAttribute("aria-modal", "true");
});

 async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");

    const categories = await response.json();

    console.log(categories);
}

getCategories();

const categorySelect = document.querySelector("#category");

categories.forEach(category => {
    const option = document.createElement("option");

    option.value = category.id;
    option.textContent = category.name;

    categorySelect.appendChild(option);
});
