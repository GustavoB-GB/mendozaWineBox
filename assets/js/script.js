document.addEventListener("DOMContentLoaded", function() {
    // URL de la hoja de Google Sheets en formato CSV
    const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRXUiOpycPuiFCX0kRlsEwoT_GIM2aJA3Duk1m_NSqvM0paVMVQF26Cfjz1WnuSs-WHD95WRao0lZ2l/pub?gid=0&single=true&output=csv";
                     

    // Elementos de la ventana modal
    const productModal = document.getElementById("product-modal");
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
                    <div class="product-details">
                        <span class="product-name">${name}</span>
                        <span class="product-price">${price}</span>
                    </div>
                `;

                // Al hacer click en la tarjeta, mostrar la ventana modal con los detalles del producto
                productCard.addEventListener("click", () => {
                    modalImage.src = image;
                    modalName.textContent = name;
                    modalDescription.textContent = description;
                    modalPrice.textContent = `Precio: ${price}`;
                    contactButton.href = `https://wa.me/5492615707910?text=Hola,%20me%20interesa%20el%20${name}`;
                    productModal.style.display = "block";
                    whatsappButton.style.display = 'none'; // Ocultar el botón de WhatsApp al abrir la ventana modal
                });

                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error al cargar los datos:", error));

    // Cerrar la ventana modal cuando se hace clic en la "x"
    closeModal.onclick = function() {
        productModal.style.display = "none";
        whatsappButton.style.display = 'flex'; // Mostrar el botón de WhatsApp al cerrar la ventana modal
        checkButtonVisibility(); // Rechequear visibilidad por si está en el footer
    }

    // Cerrar la ventana modal cuando se hace clic fuera del contenido de la modal
    window.onclick = function(event) {
        if (event.target == productModal) {
            productModal.style.display = "none";
            whatsappButton.style.display = 'flex'; // Mostrar el botón de WhatsApp al cerrar la ventana modal
            checkButtonVisibility(); // Rechequear visibilidad por si está en el footer
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

        // Mostrar/ocultar el botón dependiendo de la visibilidad del footer
        if (footerVisible) {
            whatsappButton.style.display = 'none';
        } else {
            whatsappButton.style.display = 'flex';
        }
    }

    // Ocultar el botón de WhatsApp al abrir la ventana modal
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            whatsappButton.style.display = 'none';
        });
    });

    // Ocultar el botón de WhatsApp al hacer scroll hasta el footer
    window.addEventListener('scroll', checkButtonVisibility);

    // Asegurar que el botón de WhatsApp se verifique cuando se carga la página
    checkButtonVisibility();

    // Para manejar la ventana modal (esto es solo un ejemplo básico)
    productCards.forEach(product => {
        product.addEventListener('click', function() {
            productModal.style.display = 'block';
            whatsappButton.style.display = 'none'; // Ocultar el botón de WhatsApp al abrir la ventana modal
        });
    });

    closeModal.addEventListener('click', function() {
        productModal.style.display = 'none';
        whatsappButton.style.display = 'flex';
        checkButtonVisibility(); // Rechequear visibilidad por si está en el footer
    });

    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            productModal.style.display = 'none';
            whatsappButton.style.display = 'flex';
            checkButtonVisibility(); // Rechequear visibilidad por si está en el footer
        }
    });
});
