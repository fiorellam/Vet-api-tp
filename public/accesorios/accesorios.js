document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('accesoriesContainer');

  try {
    const res = await fetch('/api/accesorios', {
      headers: { 'Content-Type': 'application/json' }
    });

    const accesories = await res.json();

    if (res.ok) {
      if (accesories.length === 0) {
        container.innerHTML = "<p>No hay accesorios disponibles por el momento.</p>";
        return;
      }

      accesories.forEach(accesory => {
        const card = document.createElement('div');
        card.className = 'accesory-card';
        card.innerHTML = `
          <span class="badge">Hot</span>
          <img src="${accesory.img}" alt="${accesory.nombre}">
          <h3>${accesory.nombre}</h3>
          <p class="price">$${accesory.precio}</p>
        `;
        container.appendChild(card);
      });

    } else {
      container.innerHTML = `<p>Error al cargar accesorios: ${accesories.error || "Error desconocido"}</p>`;
    }
  } catch (error) {
    console.error('Error al cargar accesorios:', error);
    container.innerHTML = `<p>No se pudieron cargar los accesorios. Intenta más tarde.</p>`;
  }
});
