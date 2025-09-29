// ------------------ Tabs ------------------
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// ------------------ Helpers ------------------
async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
}

function renderTable(data, tablaId, entidad) {
    console.log('Data', data);
    console.log("TablaID", tablaId);
    console.log("Entidad", entidad);
    const tabla = document.getElementById(tablaId);
    if (data.length === 0) {
        tabla.innerHTML = "<tr><td colspan='5'>Sin registros</td></tr>";
        return;
    }
    const headers = Object.keys(data[0]);
    tabla.innerHTML = `
        <thead>
        <tr>${headers.map(h => `<th>${h}</th>`).join('')}<th>Acciones</th></tr>
        </thead>
        <tbody>
        ${data.map(item => `
            <tr>
            ${headers.map(h => `<td>${item[h]}</td>`).join('')}
            <td>
                <button class="edit" onclick="editar('${entidad}', ${item.id})">✏️</button>
                <button class="delete" onclick="eliminar('${entidad}', '${item._id}')">🗑️</button>
            </td>
            </tr>
        `).join('')}
        </tbody>`;
}

// ------------------ CRUD ------------------
async function cargar(entidad) {
    const data = await fetchJSON(`/api/${entidad}`);
    renderTable(data, `tabla${capitalize(entidad)}`, entidad);
    if (entidad === "clientes") cargarSelectDuenos(data);
    if (entidad === "mascotas") cargarSelectMascotas(data);
    if (entidad === "servicios") cargarSelectServicios(data);
}

async function guardar(entidad, datos, id = null) {
    console.log("Funcion de Guardar");
    console.log("Entidad", entidad);
    console.log("Datos", datos);
    
    const url = id ? `/api/${entidad}/${id}` : `/api/${entidad}`;
    const method = id ? "PUT" : "POST";
    await fetchJSON(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
    await cargar(entidad);
}

async function editar(entidad, id) {
    const item = await fetchJSON(`/api/${entidad}/${id}`);
    if (entidad === "mascotas") {
        document.getElementById("idMascota").value = item.id;
        document.getElementById("nombreMascota").value = item.nombre;
        document.getElementById("tipoMascota").value = item.tipo;
        document.getElementById("razaMascota").value = item.raza;
        document.getElementById("edadMascota").value = item.edad;
        document.getElementById("duenoMascota").value = item.duenoId;
    }
    if (entidad === "clientes") {
        document.getElementById("idDueno").value = item.id;
        document.getElementById("nombreDueno").value = item.nombre;
        document.getElementById("emailDueno").value = item.email;
    }
    if (entidad === "servicios") {
        document.getElementById("idServicio").value = item.id;
        document.getElementById("nombreServicio").value = item.nombre;
        document.getElementById("precioServicio").value = item.precio;
    }
    if (entidad === "citas") {
        document.getElementById("idCita").value = item.id;
        document.getElementById("mascotaCita").value = item.mascotaId;
        document.getElementById("servicioCita").value = item.servicioId;
        document.getElementById("fechaCita").value = item.fecha;
        document.getElementById("horaCita").value = item.hora;
    }
}

async function eliminar(entidad, id) {
    console.log("Eliminando", entidad, id);
    if (!confirm("¿Seguro que deseas eliminar?")) return;
    await fetchJSON(`/api/${entidad}/${id}`, { method: "DELETE" });
    await cargar(entidad);
}

// ------------------ Selects ------------------
function cargarSelectDuenos(clientes) {
    const select = document.getElementById("duenoMascota");
    // Opcion por defecto
    select.innerHTML = `<option value="">-- Selecciona un dueño --</option>`;

    select.innerHTML += clientes.map(d => `<option value="${JSON.stringify(d)}">${d.nombre}</option>`).join('');
}

function cargarSelectMascotas(mascotas) {
    const select = document.getElementById("mascotaCita");
    select.innerHTML = mascotas.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('');
}

function cargarSelectServicios(servicios) {
    const select = document.getElementById("servicioCita");
    select.innerHTML = servicios.map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
}

// ------------------ Formularios ------------------
document.getElementById("formMascota").addEventListener("submit", async e => {
    e.preventDefault();
    const duenoSelect = document.getElementById("duenoMascota");
    const dueno = JSON.parse(duenoSelect.value);  // ⬅️ convierte el string a objeto
    const datos = {
        nombre: document.getElementById("nombreMascota").value,
        tipo: document.getElementById("tipoMascota").value,
        raza: document.getElementById("razaMascota").value,
        edad: document.getElementById("edadMascota").value,
        duenoId: dueno.id
    };
    const id = document.getElementById("idMascota").value || null;
    await guardar("mascotas", datos, id);
    e.target.reset();
});

document.getElementById("formDueno").addEventListener("submit", async e => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById("nombreDueno").value,
        email: document.getElementById("emailDueno").value
    };
    const id = document.getElementById("idDueno").value || null;
    await guardar("clientes", datos, id);
    e.target.reset();
    });

document.getElementById("formServicio").addEventListener("submit", async e => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById("nombreServicio").value,
        precio: document.getElementById("precioServicio").value
    };
    const id = document.getElementById("idServicio").value || null;
    await guardar("servicios", datos, id);
    e.target.reset();
});

document.getElementById("formCita").addEventListener("submit", async e => {
    e.preventDefault();
    const datos = {
        mascotaId: document.getElementById("mascotaCita").value,
        servicioId: document.getElementById("servicioCita").value,
        fecha: document.getElementById("fechaCita").value,
        hora: document.getElementById("horaCita").value
    };
    const id = document.getElementById("idCita").value || null;
    await guardar("servicios", datos, id);
    e.target.reset();
});

// ------------------ Utils ------------------
function capitalize(str) {
    console.log(str.charAt(0).toUpperCase() + str.slice(1))
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ------------------ Init ------------------
["clientes", "mascotas", "servicios", "accesorios"].forEach(entidad => cargar(entidad));