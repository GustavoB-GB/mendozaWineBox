// script.js

// Identificar el índice del producto actual que se muestra en la modal
let currentProductIndex = -1;
let products = []; // Almacenar la lista de productos para la navegación

// Cargar productos desde la API de Google Sheets
async function loadProducts() {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    products = rows.map(row => {
        const [name, price, description, imageUrl] = row.split(',');
        return { name, price, description, imageUrl };
    });
    renderProducts(products);
}

// Función para renderizar productos en la página
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
            </div>
        `;
        productCard.addEventListener('click', () => showModal(index));
        productsContainer.appendChild(productCard);
    });
}

// Función para mostrar la ventana modal de un producto específico
function showModal(index) {
    if (index < 0 || index >= products.length) return;
    currentProductIndex = index;
    const product = products[index];
    document.getElementById('modal-image').src = product.imageUrl;
    document.getElementById('modal-name').innerText = product.name;
    document.getElementById('modal-description').innerText = product.description;
    document.getElementById('modal-price').innerText = `Precio: $${product.price}`;
    document.getElementById('contact-button').href = `https://wa.me/5492615707910?text=Estoy interesado en el producto ${product.name}`;
    document.getElementById('product-modal').style.display = 'block';
    document.querySelector('.whatsapp-float').style.display = 'none'; // Oculta el botón de WhatsApp flotante
}

// Función para cerrar la ventana modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
    document.querySelector('.whatsapp-float').style.display = 'block'; // Muestra el botón de WhatsApp flotante
}

// Navegar al siguiente producto
function nextProduct() {
    if (currentProductIndex + 1 < products.length) {
        showModal(currentProductIndex + 1);
    }
}

// Navegar al producto anterior
function previousProduct() {
    if (currentProductIndex - 1 >= 0) {
        showModal(currentProductIndex - 1);
    }
}

// Evento de teclas para las flechas izquierda y derecha
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        nextProduct();
    } else if (event.key === 'ArrowLeft') {
        previousProduct();
    } else if (event.key === 'Escape') {
        closeModal();
    }
});

// Cerrar modal al hacer clic en el botón de cierre
document.querySelector('.close').addEventListener('click', closeModal);

// Cerrar modal al hacer clic fuera de ella
window.onclick = function(event) {
    if (event.target == document.getElementById('product-modal')) {
        closeModal();
    }
}




// Ocultar el botón de WhatsApp flotante al hacer scroll hasta el footer
window.addEventListener('scroll', function() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    const footer = document.querySelector('footer');
    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    if (footerRect.top <= viewportHeight) {
        whatsappButton.style.display = 'none';
    } else {
        whatsappButton.style.display = 'block';
    }
});

// Cargar los productos al cargar la página
loadProducts();
