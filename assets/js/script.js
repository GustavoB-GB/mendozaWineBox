// script.js
document.addEventListener("DOMContentLoaded", function() {
    // URLs de las hojas de Google Sheets en formato CSV v2
    const sheetUrls = {
        box: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv",
        galeria: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=333970054&single=true&output=csv"
    };

    // Elementos de la ventana modal
    const productModal = document.getElementById("product-modal");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const contactButton = document.getElementById("contact-button");
    const closeModal = document.querySelector(".close");
    const filterButtons = document.querySelectorAll(".filter-button");
    
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
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("selected")); // Desmarcar todos los botones
            button.classList.add("selected"); // Marcar el botón seleccionado
        });
    });

    // Marcar el primer botón por defecto
    document.getElementById("filter-box").classList.add("selected");

    // Función para mostrar los productos en el DOM
    function displayProducts(products) {
        const productList = document.getElementById("product-list");
        productList.innerHTML = ""; // Limpiar lista de productos
        const galeriaContainer = document.getElementById("galeria-container"); // Asegúrate de tener este contenedor en tu HTML
        galeriaContainer.innerHTML = ""; // Limpiar el contenedor de imágenes
        let contador = 0; // Contador para limitar la cantidad de productos mostrados

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            contador++;
            const link = `box.html?cat=${contador}`;

            // Crear un enlace que dirija a Google
            productCard.innerHTML = `
                <a href="${link}" target="_blank">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-details">
                        <div class="product-name-price">
                            <span class="product-name">${product.name}</span>
                            <span class="product-price">${product.price}</span>
                        </div>
                        <span class="product-more">Ver más</span>
                    </div>
                </a>
            `;

            productList.appendChild(productCard);
        });
    }

    // Función para mostrar las imágenes de la galería en el DOM
    function displayGaleria(images) {
        const galeriaContainer = document.getElementById("galeria-container"); // Asegúrate de tener este contenedor en tu HTML
        galeriaContainer.innerHTML = ""; // Limpiar el contenedor de imágenes
        const productList = document.getElementById("product-list");
        productList.innerHTML = ""; // Limpiar lista de productos

        images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = "Imagen de la galería";
            imgElement.loading = "lazy"; // Mejora el rendimiento al cargar las imágenes
            imgElement.classList.add("galeria-image"); // Clase para estilizar las imágenes

            galeriaContainer.appendChild(imgElement);
        });
    }

    // Cargar productos de la hoja de cálculo "box"
    loadProducts(sheetUrls.box, products => {
        boxProducts = products;
        displayProducts(boxProducts); // Mostrar productos de "box" por defecto
    });

    // Cargar las imágenes de la galería
    loadGaleria(sheetUrls.galeria, images => {
        galeriaImages = images;
    });    

    // Manejar cambio de categoría
    document.getElementById("filter-box").addEventListener("click", () => displayProducts(boxProducts));
    document.getElementById("filter-all").addEventListener("click", () => displayGaleria(galeriaImages));

    // Cerrar la ventana modal cuando se hace clic en la "x"
    closeModal.onclick = function() {
        productModal.style.display = "none";
        whatsappButton.style.display = 'flex';
        checkButtonVisibility();
    }

    // Cerrar la ventana modal cuando se hace clic fuera del contenido de la modal
    window.onclick = function(event) {
        if (event.target == productModal) {
            productModal.style.display = "none";
            whatsappButton.style.display = 'flex';
            checkButtonVisibility();
        }
    }

    // Funcionalidad del carrusel automático con transición suave
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000); // Cambia de imagen cada 5 segundos

    showSlide(currentSlide); // Muestra la primera imagen inicialmente

    // Botón de WhatsApp flotante
    const whatsappButton = document.getElementById('whatsapp-float');
    const footer = document.querySelector('footer');

    // Función para verificar si el botón debe mostrarse o no
    function checkButtonVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const footerVisible = (footerRect.top < window.innerHeight) && (footerRect.bottom >= 0);

        if (footerVisible) {
            whatsappButton.style.display = 'none';
        } else {
            whatsappButton.style.display = 'flex';
        }
    }

    window.addEventListener('scroll', checkButtonVisibility);

    checkButtonVisibility();
});