document.addEventListener("DOMContentLoaded", async() => {
    const timeButtons = document.querySelectorAll(".time-btn");
    const form = document.getElementById("appointmentForm");
    const serviceSelect = document.getElementById("service");
    const dateInput = document.getElementById("date")
    const serviceDescription = document.querySelector(".service-description");
    let selectedTime = "";
    let selectedService = null; //Se guarda toda la data del servicio
    
    // Cargar servicios desde API
    try{
        const responseServices = await fetch('/api/servicios', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const services = await responseServices.json();
        if(responseServices.ok){
            // Se rellena el select
            services.forEach(service => {
                const option = document.createElement("option");
                option.value = service._id;
                console.log(service._id);
                option.textContent = service.nombre;
                option.dataset.service = JSON.stringify(service); //Se guarda todo en data
                serviceSelect.appendChild(option);
            });
        } else {
            console.log("Error al hacer fetch")
        }
    } catch(error){
        console.error('Error al cargar los servicios:', error);
    }

    // Cuando se seleccione un servicio, desbloquear fecha y horarios
    serviceSelect.addEventListener("change", () => {
        const option = serviceSelect.options[serviceSelect.selectedIndex];
        if (option.dataset.service) {
            selectedService = JSON.parse(option.dataset.service);
            console.log("Servicio seleccionado:", selectedService);
            // Mostrar info extra en el <p>
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

    // Seleccion de horario
    timeButtons.forEach(timebtn => {
        timebtn.addEventListener("click", () => {
            if(timebtn.disabled) return; //Si esta bloqueado no hace nada
            timeButtons.forEach(b => b.classList.remove("active"));
            timebtn.classList.add("active");
            selectedTime = timebtn.textContent;
        });
    });

    // Manejo del envio del form
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const date = dateInput.value;
        const email = document.getElementById("email").value;

        if (!selectedService) {
            alert("Por favor selecciona un servicio.");
            return;
        }
        if(!date){
            alert("Por favor selecciona una fecha");
            return;
        }
        if(!selectedTime){
            alert("Por favor selecciona un horario");
            return;
        }
        alert(`✅ Cita registrada:
                📌 Servicio: ${selectedService.nombre}
                📄 Descripción: ${selectedService.descripcion}
                💲 Precio: $${selectedService.precio}
                📅 Fecha: ${date}
                🕒 Hora: ${selectedTime}
                📧 Email: ${email}`
        );
        // Aquí podrías enviar con fetch a tu API:
        /*
        fetch('/api/citas', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ date, time: selectedTime, email })
        });
        */
    });

});
