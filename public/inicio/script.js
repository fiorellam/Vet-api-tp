
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
        accesoryDiv.className = 'swiper-slide accesory-card';
        accesoryDiv.innerHTML = `
          <span class="badge">Hot</span>
          <img src="${accesory.img}" alt="${accesory.nombre}">
          <h3>${accesory.nombre}</h3>
          <p class="price">$${accesory.precio}</p>`;
          gridAccesoriesContainer.appendChild(accesoryDiv);
      });

      //Se inicializa el swiper despues de cargar los accesorios
      const swiper = new Swiper(".accesories-swiper",{
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false // Para que no se detenga al hacer clic
        },
        slidesPerView: 3,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }
        }
      });
    } else {
      gridAccesoriesContainer.innerHTML = `<p>Error al cargar accesorios: ${accesories.error}</p>`;
    }
  } catch(error){
    console.error('Error al cargar accesorios:', error);
    gridAccesoriesContainer.innerHTML = `<p>No se pudieron cargar los accesorios.</p>`;
  }
})