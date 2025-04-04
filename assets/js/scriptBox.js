document.addEventListener("DOMContentLoaded", function() {
    // URL de la hoja de Google Sheets en formato CSV
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv";

    // Elementos de la ventana modal
    const productModal = document.getElementById("product-modal");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const contactButton = document.getElementById("contact-button");
    const closeModal = document.querySelector(".close");

    // Función para cargar datos desde Google Sheets
    function loadProducts(sheetUrl, callback) {
        fetch(sheetUrl)
            .then(response => response.text())
            .then(data => {
                const rows = data.split("\n").slice(1);
                const products = rows.map(row => {
                    const columns = row.split(",");
                    return {
                        name: columns[0],
                        price: columns[1],
                        image: columns[2],
                        description: columns[3]
                    };
                });
                callback(products);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
    }

    // Función para mostrar los productos en el DOM
    function displayProducts(products) {
        const productList = document.getElementById("product-list");
        productList.innerHTML = ""; // Limpiar lista de productos

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-details">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                </div>
            `;


            productCard.addEventListener("click", () => {
                modalImage.src = product.image;
                modalName.textContent = product.name;
                modalDescription.textContent = product.description;
                modalPrice.textContent = `Precio: ${product.price}`;
                contactButton.href = `https://wa.me/5492615707910?text=Hola,%20me%20interesa%20el%20${product.name}`;
                productModal.style.display = "block";
            });

            productList.appendChild(productCard);
        });
    }

    // Cargar y mostrar los productos de la hoja "box"
    loadProducts(sheetUrl, products => {
        displayProducts(products);
    });

    // Cerrar la ventana modal cuando se hace clic en la "x"
    closeModal.onclick = function() {
        productModal.style.display = "none";
    };

    // Cerrar la ventana modal cuando se hace clic fuera del contenido de la modal
    window.onclick = function(event) {
        if (event.target == productModal) {
            productModal.style.display = "none";
        }
    };
});
