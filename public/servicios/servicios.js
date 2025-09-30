// document.addEventListener("DOMContentLoaded", async() => {
//     const timeButtons = document.querySelectorAll(".time-btn");
//     const form = document.getElementById("appointmentForm");
//     const serviceSelect = document.getElementById("service");
//     const dateInput = document.getElementById("date")
//     const serviceDescription = document.querySelector(".service-description");
//     let selectedTime = "";
//     let selectedService = null; //Se guarda toda la data del servicio
    
//     // Cargar servicios desde API
//     try{
//         const responseServices = await fetch('/api/servicios', {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         const services = await responseServices.json();
//         if(responseServices.ok){
//             // Se rellena el select
//             services.forEach(service => {
//                 const option = document.createElement("option");
//                 option.value = service._id;
//                 console.log(service._id);
//                 option.textContent = service.nombre;
//                 option.dataset.service = JSON.stringify(service); //Se guarda todo en data
//                 serviceSelect.appendChild(option);
//             });
//         } else {
//             console.log("Error al hacer fetch")
//         }
//     } catch(error){
//         console.error('Error al cargar los servicios:', error);
//     }

//     // Cuando se seleccione un servicio, desbloquear fecha y horarios
//     serviceSelect.addEventListener("change", () => {
//         const option = serviceSelect.options[serviceSelect.selectedIndex];
//         if (option.dataset.service) {
//             selectedService = JSON.parse(option.dataset.service);
//             console.log("Servicio seleccionado:", selectedService);
//             // Mostrar info extra en el <p>
//             serviceDescription.innerHTML = `
//                 <strong>Descripción:</strong> ${selectedService.descripcion} <br>
//                 <strong>Tipo:</strong> ${selectedService.tipo} <br>
//                 <strong>Precio:</strong> $${selectedService.precio} MXN
//             `;
//         } else {
//             selectedService = null;
//             serviceDescription.textContent = "";
//         }
//     });

//     // Seleccion de horario
//     timeButtons.forEach(timebtn => {
//         timebtn.addEventListener("click", () => {
//             if(timebtn.disabled) return; //Si esta bloqueado no hace nada
//             timeButtons.forEach(b => b.classList.remove("active"));
//             timebtn.classList.add("active");
//             selectedTime = timebtn.textContent;
//         });
//     });

//     // Manejo del envio del form
//     form.addEventListener("submit", (e) => {
//         e.preventDefault();

//         const date = dateInput.value;
//         const email = document.getElementById("email").value;

//         if (!selectedService) {
//             alert("Por favor selecciona un servicio.");
//             return;
//         }
//         if(!date){
//             alert("Por favor selecciona una fecha");
//             return;
//         }
//         if(!selectedTime){
//             alert("Por favor selecciona un horario");
//             return;
//         }
//         alert(`✅ Cita registrada:
//                 📌 Servicio: ${selectedService.nombre}
//                 📄 Descripción: ${selectedService.descripcion}
//                 💲 Precio: $${selectedService.precio}
//                 📅 Fecha: ${date}
//                 🕒 Hora: ${selectedTime}
//                 📧 Email: ${email}`
//         );
//         // Aquí podrías enviar con fetch a tu API:
//         /*
//         fetch('/api/citas', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({ date, time: selectedTime, email })
//         });
//         */
//     });

// });
document.addEventListener("DOMContentLoaded", async () => {
    const timeButtons = document.querySelectorAll(".time-btn");
    const form = document.getElementById("appointmentForm");
    const serviceSelect = document.getElementById("service");
    const dateInput = document.getElementById("date");
    const serviceDescription = document.querySelector(".service-description");
    const ownerSelect = document.getElementById("owner");
    const petSelect = document.getElementById("pet");
    let selectedTime = "";
    let selectedService = null;

    // Cargar servicios desde API
    try {
        const responseServices = await fetch('/api/servicios', {
            headers: { 'Content-Type': 'application/json' }
        });
        const services = await responseServices.json();
        if (responseServices.ok) {
            services.forEach(service => {
                const option = document.createElement("option");
                option.value = service._id;
                option.textContent = service.nombre;
                option.dataset.service = JSON.stringify(service);
                serviceSelect.appendChild(option);
            });
        } else {
            console.error("Error al obtener servicios");
        }
    } catch (error) {
        console.error("Error al cargar servicios:", error);
    }

    // Cargar dueños
    async function cargarDuenios() {
        try {
            const res = await fetch('/api/clientes');
            const clientes = await res.json();
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente._id;
                option.textContent = cliente.nombre;
                ownerSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar dueños:', error);
        }
    }

    // Cargar mascotas
    async function cargarMascotas() {
        try {
            const res = await fetch('/api/mascotas');
            const mascotas = await res.json();
            mascotas.forEach(mascota => {
                const option = document.createElement('option');
                option.value = mascota._id;
                option.textContent = mascota.nombre;
                petSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        }
    }

    // Ejecutar cargas
    await cargarDuenios();
    await cargarMascotas();

    // Cuando se selecciona un servicio, mostrar descripción
    serviceSelect.addEventListener("change", () => {
        const option = serviceSelect.options[serviceSelect.selectedIndex];
        if (option && option.dataset.service) {
            selectedService = JSON.parse(option.dataset.service);
            serviceDescription.innerHTML = `
                <strong>Descripción:</strong> ${selectedService.descripcion} <br>
                <strong>Tipo:</strong> ${selectedService.tipo} <br>
                <strong>Precio:</strong> $${selectedService.precio} MXN
            `;
        } else {
            selectedService = null;
            serviceDescription.textContent = "";
        }
    });

    // Selección de horario
    timeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.disabled) return;
            timeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedTime = btn.textContent;
        });
    });

    // Manejar submit
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const date = dateInput.value;
        const ownerId = ownerSelect.value;
        const petId = petSelect.value;

        // Validaciones
        if (!selectedService) {
            alert("Por favor selecciona un servicio.");
            return;
        }
        if (!date) {
            alert("Por favor selecciona una fecha.");
            return;
        }
        if (!selectedTime) {
            alert("Por favor selecciona un horario.");
            return;
        }
        if (!ownerId) {
            alert("Por favor selecciona un dueño.");
            return;
        }
        if (!petId) {
            alert("Por favor selecciona una mascota.");
            return;
        }

        // Convertir hora am/pm a formato 24h
        const hourParts = selectedTime.match(/(\d+):(\d+)\s?(am|pm)/i);
        let hours = parseInt(hourParts[1], 10);
        const minutes = parseInt(hourParts[2], 10);
        const period = hourParts[3].toLowerCase();

        if (period === 'pm' && hours < 12) hours += 12;
        if (period === 'am' && hours === 12) hours = 0;

        // Crear objeto fecha con hora local
        const localDateTime = new Date(`${date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);

        // Convertir a UTC ISO string
        const fechaUTC = new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();

        // Datos para enviar
        const datos = {
            nombre: selectedService.nombre,
            descripcion: selectedService.descripcion,
            tipo: selectedService.tipo,
            precio: selectedService.precio,
            duenio: ownerId,
            mascota: petId,
            fechaProgramada: fechaUTC,
        };

        try {
            const res = await fetch('/api/servicios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.mensaje || "Error al agendar el servicio");
            }

            const result = await res.json();
            alert(`✅ Cita guardada correctamente para ${result.nombre}`);

            // Resetear formulario y estados
            form.reset();
            timeButtons.forEach(btn => btn.classList.remove("active"));
            serviceDescription.textContent = "";
            selectedTime = "";
            selectedService = null;

        } catch (error) {
            console.error("Error al guardar servicio:", error);
            alert("❌ Ocurrió un error al guardar la cita.");
        }
    });

});
