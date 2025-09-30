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

// function renderTable(data, tablaId, entidad) {
//     console.log('Data', data);
//     console.log("TablaID", tablaId);
//     console.log("Entidad", entidad);
//     const tabla = document.getElementById(tablaId);
//     if (data.length === 0) {
//         tabla.innerHTML = "<tr><td colspan='5'>Sin registros</td></tr>";
//         return;
//     }
//     const headers = Object.keys(data[0]);
//     tabla.innerHTML = `
//         <thead>
//         <tr>${headers.map(h => `<th>${h}</th>`).join('')}<th>Acciones</th></tr>
//         </thead>
//         <tbody>
//         ${data.map(item => `
//             <tr>
//             ${headers.map(h => `<td>${item[h]}</td>`).join('')}
//             <td>
//                 <button class="edit" onclick="editar('${entidad}', ${item.id})">✏️</button>
//                 <button class="delete" onclick="eliminar('${entidad}', '${item._id}')">🗑️</button>
//             </td>
//             </tr>
//         `).join('')}
//         </tbody>`;
// }

function renderTable(data, tablaId, entidad) {
    const tabla = document.getElementById(tablaId);

    if (data.length === 0) {
        tabla.innerHTML = "<tr><td colspan='5'>Sin registros</td></tr>";
        return;
    }

    // Obtener las llaves de la primera fila
    const headers = Object.keys(data[0]);
    
    tabla.innerHTML = `
        <thead>
            <tr>
                ${headers.map(header => `<th>${header}</th>`).join('')}
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${data.map(item => {
                return `
                    <tr>
                        ${headers.map(header => {
                            let valor = item[header];
                            // Mostrar nombre del dueño si es un objeto
                            if (header === "duenioMascota" && valor && typeof valor === "object") {
                                valor = valor.nombre || "[Sin nombre]";
                            }
                            return `<td>${valor}</td>`;
                        }).join('')}
                        <td>
                            <button class="edit" onclick="editar('${entidad}', '${item._id}')">✏️</button>
                            <button class="delete" onclick="eliminar('${entidad}', '${item._id}')">🗑️</button>
                        </td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    `;
}


// ------------------ CRUD ------------------
async function cargar(entidad) {
    const data = await fetchJSON(`/api/${entidad}`);
    renderTable(data, `tabla${capitalize(entidad)}`, entidad);
    if (entidad === "clientes") cargarSelectDuenos(data);
    if (entidad === "mascotas") cargarSelectMascotas(data);
    // if (entidad === "accesorios") cargarSelectAccesorios(data);
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
        document.getElementById("idMascota").value = item._id;
        document.getElementById("nombreMascota").value = item.nombre;
        document.getElementById("tipoMascota").value = item.tipo;
        document.getElementById("razaMascota").value = item.raza;
        document.getElementById("edadMascota").value = item.edad;
        document.getElementById("duenoMascota").value = item.duenioMascota?._id || "";
    }
    if (entidad === "clientes") {
        document.getElementById("idDueno").value = item._id;
        document.getElementById("nombreDueno").value = item.nombre;
        document.getElementById("telefonoDueno").value = item.telefono;
        document.getElementById("direccionDueno").value = item.direccion;
    }
    // if (entidad === "servicios") {
    //     document.getElementById("idServicio").value = item.id;
    //     document.getElementById("nombreServicio").value = item.nombre;
    //     document.getElementById("precioServicio").value = item.precio;
    // }
    if (entidad === "accesorios"){
        document.getElementById("idAccesorio").value = item._id;
        document.getElementById("nombreAccesorio").value = item.nombre;
        document.getElementById("descripcionAccesorio").value = item.descripcion;
        document.getElementById("precioAccesorio").value = item.precio;
        document.getElementById("imagenAccesorio").value = item.img;
        document.getElementById("selectAccesorio").value = item.categoria;

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

    clientes.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente._id;
        option.textContent = cliente.nombre;
        option.dataset.telefono = cliente.telefono; // si lo necesitas después
        option.dataset.nombre = cliente.nombre;
        option.dataset.direccion = cliente.direccion;
        select.appendChild(option);
    });
}

function cargarSelectMascotas(mascotas) {
    const select = document.getElementById("mascotaCita");
    select.innerHTML = mascotas.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('');
}

function cargarSelectServicios(servicios) {
    const select = document.getElementById("servicioCita");
    select.innerHTML = servicios.map(s => `<option value="${s.id}">${s.nombre}</option>`);
}
function cargarSelectDuenosParaServicios(clientes) {
    const select = document.getElementById("duenoServicio");
    select.innerHTML = `<option value="">-- Selecciona el dueño --</option>`;
    clientes.forEach(cliente => {
        const option = document.createElement("option");
        option.value = cliente._id;
        option.textContent = cliente.nombre;
        select.appendChild(option);
    });
}

function cargarSelectMascotasParaServicios(mascotas) {
    const select = document.getElementById("mascotaServicio");
    select.innerHTML = `<option value="">-- Selecciona la mascota --</option>`;
    mascotas.forEach(mascota => {
        const option = document.createElement("option");
        option.value = mascota._id;
        option.textContent = mascota.nombre;
        select.appendChild(option);
    });
}


// ------------------ Formularios ------------------
document.getElementById("formMascota").addEventListener("submit", async e => {
    e.preventDefault();
    const duenoSelect = document.getElementById("duenoMascota");
    // const dueno = JSON.parse(duenoSelect.value);  // ⬅️ convierte el string a objeto
    const datos = {
        nombre: document.getElementById("nombreMascota").value,
        tipo: document.getElementById("tipoMascota").value,
        raza: document.getElementById("razaMascota").value,
        edad: document.getElementById("edadMascota").value,
        duenioMascota: duenoSelect.value
    };
    const id = document.getElementById("idMascota").value || null;
    await guardar("mascotas", datos, id);
    e.target.reset();
});

document.getElementById("formDueno").addEventListener("submit", async e => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById("nombreDueno").value,
        telefono: document.getElementById("telefonoDueno").value,
        direccion: document.getElementById("direccionDueno").value
    };
    const id = document.getElementById("idDueno").value || null;
    await guardar("clientes", datos, id);
    e.target.reset();
    });

document.getElementById("formAccesorio").addEventListener("submit", async e => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById("nombreAccesorio").value,
        descripcion: document.getElementById("descripcionAccesorio").value,
        precio: document.getElementById("precioAccesorio").value,
        img: document.getElementById("imagenAccesorio").value,
        categoria: document.getElementById("selectAccesorio").value,
    };
    const id = document.getElementById("idAccesorio").value || null;
    await guardar("accesorios", datos, id);
    e.target.reset();
});

// document.getElementById("formServicio").addEventListener("submit", async e => {
//     e.preventDefault();
//     const datos = {
//         nombre: document.getElementById("nombreServicio").value,
//         precio: document.getElementById("precioServicio").value
//     };
//     const id = document.getElementById("idServicio").value || null;
//     await guardar("servicios", datos, id);
//     e.target.reset();
// });

document.getElementById("formServicio").addEventListener("submit", async e => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById("nombreServicio").value,
        descripcion: document.getElementById("descripcionServicio").value,
        mascotaId: document.getElementById("mascotaCita").value,
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