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
        8: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=1297030853&single=true&output=csv",
        9: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=611766352&single=true&output=csv",
        10: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=150951508&single=true&output=csv",
        11: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=1344073102&single=true&output=csv",
        12: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=1344073102&single=true&output=csv",
        13: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=1633395316&single=true&output=csv"
    };

    const sheetUrl = sheetUrls[categoria] || "";
    if (!sheetUrl) {
        console.error("Categoría no válida");
        return;
    }

    // Título dinámico de la pestaña
    document.title = `Box ${categoria} — Mendoza Wine Box`;

    // Elementos de la ventana modal
    const productModal = document.getElementById("product-modal");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const contactButton = document.getElementById("contact-button");
    const closeModal = document.querySelector(".close");
    const modalEtiqueta = document.getElementById("modal-etiqueta");

    // Parser CSV que respeta campos entre comillas (con comas o emojis adentro)
    function parseCSVRow(row) {
        const result = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < row.length; i++) {
            const ch = row[i];
            if (ch === '"') {
                if (inQuotes && row[i + 1] === '"') {
                    current += '"'; i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (ch === ',' && !inQuotes) {
                result.push(current.trim());
                current = "";
            } else {
                current += ch;
            }
        }
        result.push(current.trim());
        return result;
    }

    // Función para cargar datos desde Google Sheets
    function loadProducts(sheetUrl, callback) {
        fetch(sheetUrl)
            .then(response => response.text())
            .then(data => {
                const rows = data.split("\n").slice(1);
                const products = rows
                    .filter(row => row.trim() !== "")
                    .map(row => {
                        const cols = parseCSVRow(row);
                        return {
                            name:        cols[0] || "",
                            price:       cols[1] || "",
                            image:       cols[2] || "",
                            description: cols[3] || "",
                            etiqueta:    cols[4] || ""
                        };
                    });
                callback(products);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
    }

    // Función para obtener la imagen de la etiqueta
    function getEtiquetaImage(etiqueta) {
        etiqueta = etiqueta?.trim().toLowerCase();
        if (etiqueta === "oferta") {
            return `<img src="assets/images/oferta.png" class="product-label" alt="Oferta">`;
        } else if (etiqueta === "sin stock") {
            return `<img src="assets/images/stock.png" class="product-label" alt="Sin Stock">`;
        }else if (etiqueta === "nuevo") {
            return `<img src="assets/images/nuevo.png" class="product-label" alt="nuevo">`;
        }
        return "";
    }

    // Skeleton loader
    function showSkeletons(count = 4) {
        const productList = document.getElementById("product-list");
        productList.innerHTML = Array.from({ length: count }, () => `
            <div class="skeleton-card">
                <div class="skeleton-img"></div>
                <div class="skeleton-body">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line price"></div>
                </div>
            </div>
        `).join('');
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
        contactButton.href = `https://wa.me/5492615707910?text=Hola,%20me%20interesa%20el%20%20box%20${categoria}%20${product.name}`;
        
        // Insertar la etiqueta si existe
        modalEtiqueta.innerHTML = product.etiqueta ? getEtiquetaImage(product.etiqueta) : "";
    
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
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && productModal.style.display === "block") closeModalHandler();
    });

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

    // Título de sección
    const productSection = document.getElementById("productos");
    if (productSection && !document.querySelector(".section-title")) {
        const title = document.createElement("h2");
        title.className = "section-title";
        title.textContent = "Opciones disponibles";
        const subtitle = document.createElement("p");
        subtitle.className = "section-subtitle";
        subtitle.textContent = `Box ${categoria}`;
        const productList = document.getElementById("product-list");
        productSection.insertBefore(subtitle, productList);
        productSection.insertBefore(title, subtitle);
    }

    // Mostrar skeletons mientras carga
    showSkeletons(4);

    // Cargar y mostrar los productos
    loadProducts(sheetUrl, displayProducts);
});
