document.addEventListener("DOMContentLoaded", () => {
  const navbarContainer = document.getElementById("navbar-container");

  if (navbarContainer) {
    fetch("/shared/navbar.html")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al cargar navbar: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        navbarContainer.innerHTML = data;

        // Si necesitas activar el menú hamburguesa después de insertarlo
        activarMenuHamburguesa();
      })
      .catch(error => {
        console.error("Error al cargar el navbar:", error);
      });
  }
});

// Función para que el botón hamburguesa funcione después de insertar el HTML
function activarMenuHamburguesa() {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");
  const iconMenu = document.querySelector(".icon-menu");
  const iconClose = document.querySelector(".icon-close");

  if (btn && nav && iconMenu && iconClose) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("open");
      iconMenu.classList.toggle("hidden");
      iconClose.classList.toggle("hidden");
    });
  }
}
