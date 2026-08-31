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

    if (!response.ok) {
      throw new Error(data.message || "Identifiants incorrects");
    }

    localStorage.setItem("token", data.token);

    window.location.href = "index.html";

  } catch (error) {
    errorElement.textContent = error.message;
  }
});