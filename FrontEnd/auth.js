/* ================================
   CONNEXION
================================ */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const errorElement = document.getElementById("error");

        errorElement.textContent = "";

        try {
            const response = await fetch(
                "http://localhost:5678/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Erreur dans l'identifiant ou le mot de passe"
                );
            }

            localStorage.setItem("token", data.token);

            window.location.href = "index.html";

        } catch (error) {
            errorElement.textContent =
                "Erreur dans l’identifiant ou le mot de passe";
        }
    });
}


/* ================================
   INTERFACE UTILISATEUR
================================ */

const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");
const edition = document.getElementById("edition");
const filter = document.getElementById("filter");
const editionProjet = document.getElementById("editionProjet");

const token = localStorage.getItem("token");

if (loginButton && logoutButton) {
    loginButton.style.display = token ? "none" : "inline";
    logoutButton.style.display = token ? "inline" : "none";
}

if (edition && filter && editionProjet) {
    const isLoggedIn = Boolean(token);

    edition.style.display = isLoggedIn ? "flex" : "none";
    filter.style.display = isLoggedIn ? "none" : "flex";
    editionProjet.style.display = isLoggedIn ? "flex" : "none";
}


/* ================================
   DECONNEXION
================================ */

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
}
