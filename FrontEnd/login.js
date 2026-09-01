/* Script de la page login */

const form = document.getElementById("loginForm");
const errorElement = document.getElementById("error");

form.addEventListener("submit", async (event) => {
  
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  errorElement.textContent = "";

  try {

    const response = await fetch("http://localhost:5678/api/users/login" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

  const data = await response.json();


localStorage.setItem("token", data.token);

    if (!response.ok) {
      throw new Error(data.message || "Erreur dans l’identifiant ou le mot de passe");
    }

    localStorage.setItem("token", data.token);

    window.location.href = "index.html";

  } catch (error) {
    errorElement.textContent = "Erreur dans l’identifiant ou le mot de passe";
  }
});

console.log("index.js chargé");

const token = localStorage.getItem("token");

console.log("Token récupéré dans index :", token);

const loginButton = document.getElementById("login")
const logoutButton = document.getElementById("logout")

if (token) {

  loginButton.style.display = "none";
  logoutButton.style.display = "inline";

} else {

  loginButton.style.display = "inline";
  logoutButton.style.display = "none";
}

logoutButton.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";
});