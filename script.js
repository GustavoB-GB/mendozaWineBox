document.addEventListener("DOMContentLoaded", function() {
    // URL de la hoja de Google Sheets en formato CSV
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv";

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

                const productCardInner = document.createElement("div");
                productCardInner.classList.add("product-card-inner");

                const productCardFront = document.createElement("div");
                productCardFront.classList.add("product-card-front");

                const productCardBack = document.createElement("div");
                productCardBack.classList.add("product-card-back");

                productCardFront.innerHTML = `
                    <img src="${image}" alt="${name}">
                    <div class="product-details">
                        <span class="product-name">${name}</span>
                        <span class="product-price">${price}</span>
                    </div>
                `;

                productCardBack.innerHTML = `
                    <div class="product-description">${description}</div>
                    <div class="product-details">
                        <span class="product-name">${name}</span>
                        <span class="product-price">${price}</span>
                    </div>
                `;

                productCardInner.appendChild(productCardFront);
                productCardInner.appendChild(productCardBack);
                productCard.appendChild(productCardInner);
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});
