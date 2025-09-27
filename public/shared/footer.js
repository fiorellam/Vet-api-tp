document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer-container");

  if(footerContainer){
    fetch("/shared/footer.html")
        .then(response => {
            if (!response.ok) {
            throw new Error(`Error al cargar navbar: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            footerContainer.innerHTML = data;
        })
        .catch(error => {
            console.error("Error al cargar el navbar:", error);
        });
    }
});