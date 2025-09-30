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
                            if (header === "duenioMascota" || header === "duenio" || header === "mascota" && valor && typeof valor === "object") {
                                valor = valor.nombre || "[Sin nombre]";
                            }
                            // Mostrar imagen si el campo es 'img' y el valor parece una URL
                            if (header === "img" && typeof valor === "string" && valor.startsWith("http")) {
                                valor = `<img src="${valor}" alt="imagen" style="max-width: 100px; max-height: 100px;" />`;
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
    if (entidad === "servicios") {
        cargarSelectServicios(data);
        const duenos = await fetchJSON(`/api/clientes`);
        cargarSelectDuenosParaServicios(duenos);
        const mascotas = await fetchJSON(`/api/mascotas`);
        cargarSelectMascotasParaServicios(mascotas);
    };
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
    if (entidad === "servicios") {
        // Espera que se hayan cargado clientes, mascotas y servicios en los selects
        const [clientes, mascotas, servicios] = await Promise.all([
            fetchJSON('/api/clientes'),
            fetchJSON('/api/mascotas'),
            fetchJSON('/api/servicios')
        ]);

        cargarSelectDuenosParaServicios(clientes);
        cargarSelectMascotasParaServicios(mascotas);
        cargarSelectServicios(servicios);

        // ⚠️ Espera a que los selects se hayan actualizado en el DOM (esperar un "tick")
        setTimeout(() => {
            document.getElementById("idServicio").value = item._id;

            // Selecciona la opción del servicio por tipo
            const tipoSelect = document.getElementById("tipoServicio");
            const option = Array.from(tipoSelect.options).find(opt => opt.dataset.tipo === item.tipo);
            if (option) {
                tipoSelect.value = option.value;
                document.getElementById("nombreServicio").value = option.dataset.nombre || '';
                document.getElementById("descripcionServicio").value = option.dataset.descripcion || '';
                document.getElementById("precioServicio").value = option.dataset.precio || '';
            }

            // ✅ Asignar dueño y mascota
            document.getElementById("duenoServicio").value = item.duenio?._id || item.duenio || '';
            document.getElementById("mascotaServicio").value = item.mascota?._id || item.mascota || '';

            // ✅ Fecha programada
            if (item.fechaProgramada) {
                const fecha = new Date(item.fechaProgramada);
                const offset = fecha.getTimezoneOffset();
                const localDate = new Date(fecha.getTime() - offset * 60000);
                document.getElementById("fechaServicio").value = localDate.toISOString().slice(0, 16);
            }

        }, 100); // Delay para asegurar que los <select> ya están listos
    }
    if (entidad === "accesorios"){
        document.getElementById("idAccesorio").value = item._id;
        document.getElementById("nombreAccesorio").value = item.nombre;
        document.getElementById("descripcionAccesorio").value = item.descripcion;
        document.getElementById("precioAccesorio").value = item.precio;
        document.getElementById("imagenAccesorio").value = item.img;
        document.getElementById("selectAccesorio").value = item.categoria;

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

function cargarSelectServicios(servicios) {
    const select = document.getElementById("tipoServicio");
    select.innerHTML = `<option value="">-- Selecciona el servicio --</option>`;
    select.innerHTML += servicios.map(s => 
        `<option value="${s._id}" 
            data-id="${s._id}"
            data-nombre="${s.nombre}"
            data-descripcion="${s.descripcion}"
            data-precio="${s.precio}"
            data-tipo="${s.tipo}"
        >
            ${s.nombre}
        </option>`
    ).join('');

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
document.getElementById("tipoServicio").addEventListener("change", function () {
    const selected = this.options[this.selectedIndex];
    console.log("Selected",selected);
    console.log("Dataset", selected.dataset);
    // Llenar los inputs
    document.getElementById("nombreServicio").value = selected.dataset.nombre || '';
    document.getElementById("descripcionServicio").value = selected.dataset.descripcion || '';
    document.getElementById("precioServicio").value = selected.dataset.precio || '';
});


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

document.getElementById("formServicio").addEventListener("submit", async e => {
    e.preventDefault();

    const tipoSelect = document.getElementById("tipoServicio");
    const selectedOption = tipoSelect.options[tipoSelect.selectedIndex];
    // Fecha local del input
    const fechaLocal = document.getElementById("fechaServicio").value;
    const fecha = new Date(fechaLocal);

    // Convertir a fecha UTC compensando la zona horaria
    const fechaUTC = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000).toISOString();

    
    
    const datos = {
        tipo: selectedOption.dataset.tipo,
        nombre: document.getElementById("nombreServicio").value,
        descripcion: document.getElementById("descripcionServicio").value,
        precio: document.getElementById("precioServicio").value,
        duenio: document.getElementById("duenoServicio").value,
        mascota: document.getElementById("mascotaServicio").value,
        fechaProgramada: fechaUTC
    };

    const id = document.getElementById("idServicio").value || null;
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