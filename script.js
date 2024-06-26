document.addEventListener("DOMContentLoaded", function() {
    // URL de la hoja de Google Sheets en formato CSV
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv";

    // Elementos de la ventana modal
    const modal = document.getElementById("product-modal");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const contactButton = document.getElementById("contact-button");
    const closeModal = document.querySelector(".close");

    // Función para cargar datos desde Google Sheets
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const productList = document.getElementById("product-list");
            const rows = data.split("\n").slice(1);
            rows.forEach(row => {
                const columns = row.split(",");
                const name = columns[0];
                const price = columns[1];
                const image = columns[2];
                const description = columns[3];

                // Crear la tarjeta de producto
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="${image}" alt="${name}">
                    <div
