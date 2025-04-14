// script.js
document.addEventListener("DOMContentLoaded", function() {
    // URLs de las hojas de Google Sheets en formato CSV v2
    const sheetUrls = {
        box: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv",
        galeria: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=333970054&single=true&output=csv"
    };

    // Variables para almacenar los datos de los productos
    let boxProducts = [];
    let galeriaImages = [];

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

    // Función para cargar imágenes de la galería desde Google Sheets
    function loadGaleria(sheetUrl, callback) {
        fetch(sheetUrl)
            .then(response => response.text())
            .then(data => {
                const rows = data.split("\n").slice(1);
                const images = rows.map(row => row.trim()); // Solo se necesita el enlace de la imagen
                callback(images);
            })
            .catch(error => console.error("Error al cargar la galería:", error));
    }

    // Marcar el primer botón por defecto
    document.getElementById("filter-box").classList.add("selected");

    // Función para mostrar los productos en el DOM
    function displayProducts(products) {
        const productList = document.getElementById("product-list");
        productList.innerHTML = ""; // Limpiar lista de productos
        const galeriaContainer = document.getElementById("galeria-container");
        if (galeriaContainer) galeriaContainer.innerHTML = ""; // Limpiar el contenedor de imágenes si existe
        let contador = 0;
    
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
    
            contador++;
            const link = `box.html?cat=${contador}`;
    
            const a = document.createElement("a");
            a.href = link;
            a.target = "_blank";
    
            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;
            img.loading = "lazy";
    
            const details = document.createElement("div");
            details.className = "product-details";
    
            const namePrice = document.createElement("div");
            namePrice.className = "product-name-price";
    
            const nameSpan = document.createElement("span");
            nameSpan.className = "product-name";
            nameSpan.textContent = product.name;
    
            const priceSpan = document.createElement("span");
            priceSpan.className = "product-price";
            priceSpan.textContent = `Desde ${product.price}`;
    
            const moreSpan = document.createElement("span");
            moreSpan.className = "product-more";
            moreSpan.textContent = "Ver más";
    
            namePrice.appendChild(nameSpan);
            namePrice.appendChild(priceSpan);
            details.appendChild(namePrice);
            details.appendChild(moreSpan);
    
            a.appendChild(img);
            a.appendChild(details);
            productCard.appendChild(a);
    
            productList.appendChild(productCard);
        });
    }

    // Función para mostrar las imágenes de la galería en el DOM
    function displayGaleria(images) {
        const galeriaContainer = document.getElementById("galeria-container");
        if (!galeriaContainer) return console.warn("No se encontró el contenedor de galería");
        galeriaContainer.innerHTML = ""; // Limpiar el contenedor de imágenes

        const productList = document.getElementById("product-list");
        productList.innerHTML = ""; // Limpiar lista de productos

        images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = "Imagen de la galería";
            imgElement.loading = "lazy";
            imgElement.classList.add("galeria-image");

            galeriaContainer.appendChild(imgElement);
        });
    }

    // Cargar productos de la hoja de cálculo "box"
    loadProducts(sheetUrls.box, products => {
        boxProducts = products;
        displayProducts(boxProducts);
    });

    // Cargar las imágenes de la galería
    loadGaleria(sheetUrls.galeria, images => {
        galeriaImages = images;
    });

    // Manejar cambio de categoría
    document.getElementById("filter-box").addEventListener("click", () => displayProducts(boxProducts));
    document.getElementById("filter-all").addEventListener("click", () => displayGaleria(galeriaImages));

    // Carrusel automático
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000);
    showSlide(currentSlide);

    // Botón flotante de WhatsApp
    const whatsappButton = document.getElementById('whatsapp-float');
    const footer = document.querySelector('footer');

    function checkButtonVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const footerVisible = (footerRect.top < window.innerHeight) && (footerRect.bottom >= 0);
        whatsappButton.style.display = footerVisible ? 'none' : 'flex';
    }

    window.addEventListener('scroll', checkButtonVisibility);
    checkButtonVisibility();
});
