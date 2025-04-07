document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro de categoría de la URL
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat");

    // Definir la URL del CSV según la categoría
    const sheetUrls = {
        1: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=45675148&single=true&output=csv",
        2: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=2024649839&single=true&output=csv",
        3: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=621484147&single=true&output=csv",
        4: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=2115867844&single=true&output=csv",
        5: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=1061760595&single=true&output=csv",
        6: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=1631909415&single=true&output=csv",
        7: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=1465484676&single=true&output=csv",
        8: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=1297030853&single=true&output=csv"
    };

    const sheetUrl = sheetUrls[categoria] || "";
    if (!sheetUrl) {
        console.error("Categoría no válida");
        return;
    }

    // Actualizar el texto del elemento .promo
    const promoElement = document.querySelector(".promo");
    if (promoElement) {
        promoElement.textContent = `OPCION BOX ${categoria}`;
    }

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
                    const [name, price, image, description, etiqueta] = row.split(",");
                    return { name, price, image, description, etiqueta };
                });
                callback(products);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
    }

    // Función para obtener la imagen de la etiqueta
    function getEtiquetaImage(etiqueta) {
        if (etiqueta === "oferta") {
            return `<img src="assets/images/oferta.png" class="product-label" alt="Oferta">`;
        } else if (etiqueta === "sin stock") {
            return `<img src="assets/images/stock.png" class="product-label" alt="Sin Stock">`;
        }
        return "";
    }

    // Función para mostrar los productos en el DOM
    function displayProducts(products) {
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            
            console.log("Etiqueta:", product.etiqueta);
            console.log("Imagen generada:", getEtiquetaImage(product.etiqueta));


            productCard.innerHTML = `
                <div class="image-wrapper">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.etiqueta ? getEtiquetaImage(product.etiqueta) : ""}
                </div>
                <div class="product-details">
                    <div class="product-description">
                        <span class="product-name">${product.name}</span>
                        <p class="product-text">${product.description}</p>
                    </div>
                    <span class="product-price">${product.price}</span>
                </div>
            `;

            productCard.addEventListener("click", () => openModal(product));
            productList.appendChild(productCard);
        });
    }

    // Función para abrir la ventana modal
    function openModal(product) {
        modalImage.src = product.image;
        modalName.textContent = product.name;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `Precio: ${product.price}`;
        contactButton.href = `https://wa.me/5492615707910?text=Hola,%20me%20interesa%20el%20${product.name}`;
        productModal.style.display = "block";
        whatsappButton.style.display = "none";
    }

    // Función para cerrar la ventana modal
    function closeModalHandler() {
        productModal.style.display = "none";
        whatsappButton.style.display = "flex";
        checkButtonVisibility();
    }

    // Cerrar la ventana modal
    closeModal.onclick = closeModalHandler;
    window.onclick = event => {
        if (event.target === productModal) closeModalHandler();
    };

    // Botón de WhatsApp flotante
    const whatsappButton = document.getElementById("whatsapp-float");
    const footer = document.querySelector("footer");

    // Función para verificar si el botón debe mostrarse o no
    function checkButtonVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const footerVisible = footerRect.top < window.innerHeight && footerRect.bottom >= 0;
        whatsappButton.style.display = footerVisible ? "none" : "flex";
    }

    window.addEventListener("scroll", checkButtonVisibility);
    checkButtonVisibility();

    // Cargar y mostrar los productos
    loadProducts(sheetUrl, displayProducts);
});
