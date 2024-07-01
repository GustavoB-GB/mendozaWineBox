document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsapp-float');
    const modal = document.getElementById('product-modal');
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const footer = document.querySelector('footer');
    const productCards = document.querySelectorAll('.product-card');

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

    // Ocultar el botón de WhatsApp al abrir la ventana modal
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            whatsappButton.style.display = 'none';
        });
    });

    // Mostrar el botón de WhatsApp al cerrar la ventana modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            whatsappButton.style.display = 'flex';
            checkButtonVisibility(); // Verifica si el botón de WhatsApp debe mostrarse después de cerrar la modal
        });
    }

    // Ocultar el botón de WhatsApp al hacer scroll hasta el footer
    window.addEventListener('scroll', checkButtonVisibility);

    checkButtonVisibility();

    // Variables para la navegación de modales
    let currentProductIndex = 0;

    // Función para encontrar el siguiente o anterior producto
    function findNextProduct(currentIndex, direction) {
        const products = document.querySelectorAll('.product-card');
        let newIndex = (currentIndex + direction + products.length) % products.length;
        return products[newIndex];
    }

    // Función para abrir el producto en la modal
    function openProductModal(product) {
        if (!modal) return;

        const modalImage = document.getElementById('modal-image');
        const modalName = document.getElementById('modal-name');
        const modalDescription = document.getElementById('modal-description');
        const modalPrice = document.getElementById('modal-price');
        const contactButton = document.getElementById('contact-button');
        
        const imgSrc = product.querySelector('img').src;
        const name = product.querySelector('.product-name').innerText;
        const description = product.getAttribute('data-description');
        const price = product.querySelector('.product-price').innerText;

        modalImage.src = imgSrc;
        modalName.innerText = name;
        modalDescription.innerText = description;
        modalPrice.innerText = price;
        contactButton.href = `https://wa.me/5492615707910?text=Hola,%20me%20interesa%20saber%20más%20sobre%20${encodeURIComponent(name)}.`;

        modal.style.display = 'block';
        currentProductIndex = Array.from(product.parentNode.children).indexOf(product);
    }

    // Añadir evento de teclado para cambiar entre productos
    document.addEventListener('keydown', (event) => {
        if (modal && modal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                // Moverse al producto anterior
                const prevProduct = findNextProduct(currentProductIndex, -1);
                openProductModal(prevProduct);
            } else if (event.key === 'ArrowRight') {
                // Moverse al siguiente producto
                const nextProduct = findNextProduct(currentProductIndex, 1);
                openProductModal(nextProduct);
            }
        }
    });

    // Lógica para el carrusel
    let carouselIndex = 0;
    const carouselImages = document.querySelectorAll('.carousel img');
    
    function showNextCarouselImage() {
        if (carouselImages.length === 0) return;

        carouselImages[carouselIndex].classList.remove('active');
        carouselIndex = (carouselIndex + 1) % carouselImages.length;
        carouselImages[carouselIndex].classList.add('active');
    }
    
    // Cambiar imagen cada 5 segundos
    setInterval(showNextCarouselImage, 5000);

    // Añadir transición suave para el carrusel
    carouselImages.forEach(image => {
        image.style.transition = 'opacity 1s ease-in-out';
    });
});
