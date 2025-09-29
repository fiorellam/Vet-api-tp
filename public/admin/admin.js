
// const baseUrl = "http://localhost:3000/api";

// async function request(endpoint, method = "GET", body = null) {
//     try {
//     const options = { method, headers: { "Content-Type": "application/json" } };
//     if (body) options.body = JSON.stringify(body);
//     const res = await fetch(endpoint, options);
//     const data = await res.json();
//     document.getElementById("output").textContent = JSON.stringify(data, null, 2);
//     } catch (err) {
//     document.getElementById("output").textContent = "❌ Error: " + err.message;
//     }
// }

// function getEntity() {
//     return document.getElementById("entity").value;
// }

// function getId() {
//     return document.getElementById("id").value.trim();
// }

// function getData() {
//     try {
//     return JSON.parse(document.getElementById("data").value || "{}");
//     } catch {
//     alert("JSON inválido en el campo Data");
//     return null;
//     }
// }

// function getAll() {
//     request(`${baseUrl}/${getEntity()}`);
// }

// function getById() {
//     const id = getId();
//     if (!id) return alert("Escribe un ID");
//     request(`${baseUrl}/${getEntity()}/${id}`);
// }

// function create() {
//     const data = getData();
//     if (!data) return;
//     request(`${baseUrl}/${getEntity()}`, "POST", data);
// }

// function update() {
//     const id = getId();
//     const data = getData();
//     if (!id || !data) return alert("Escribe ID y JSON válido");
//     request(`${baseUrl}/${getEntity()}/${id}`, "PUT", data);
// }

// function remove() {
//     const id = getId();
//     if (!id) return alert("Escribe un ID");
//     request(`${baseUrl}/${getEntity()}/${id}`, "DELETE");
// }
