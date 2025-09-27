
// Muestra los accesorio obteniendolos de la api, se hace desde que carga la pagina principal
document.addEventListener('DOMContentLoaded', async() => {
  const gridAccesoriesContainer = document.querySelector(".accesories-grid");
  try{
    const res = await fetch('/api/accesorios', {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const accesories = await res.json();

    if(res.ok){
      gridAccesoriesContainer.innerHTML = ''; //Se limpia antes de agregar
      accesories.forEach(accesory => {
        const accesoryDiv = document.createElement('div');
        accesoryDiv.className = 'accesory-card';
        accesoryDiv.innerHTML = `
          <span class="badge">Hot</span>
          <img src="${accesory.img}" alt="Juguetes para perro">
          <h3>${accesory.nombre}</h3>
          <p class="price">$${accesory.precio}</p>`;
          gridAccesoriesContainer.appendChild(accesoryDiv);
      })
    } else {
      gridAccesoriesContainer.innerHTML = `<p>Error al cargar accesorios: ${accesories.error}</p>`;
    }
  } catch(error){
    console.error('Error al cargar accesorios:', error);
    gridAccesoriesContainer.innerHTML = `<p>No se pudieron cargar los accesorios.</p>`;
  }
})