// URL del documento de Google Sheets en formato CSV
const baseSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv';

// Función para cargar los productos desde Google Sheets
async function loadProducts() {
    try {
        // Agregar un parámetro único para evitar el caché del navegador
        const sheetUrl = `${baseSheetUrl}&nocache=${new Date().getTime()}`;
        
        const response = await fetch(sheetUrl);
        const data = await response.text();
        
        // Convertir el CSV en un array de objetos
        const rows = data.split('\n').slice(1); // Ignorar la primera fila (encabezados)
        const products = rows.map(row => {
            const [name, price, image, description] = row.split(',');
            return { 
                name: name.trim(), 
                price: price.trim(), 
                image: image.trim(), 
                description: description.trim() 
            };
        });

        // Generar tarjetas de productos en el DOM
        const productosGrid = document.getElementById('productos-grid');
        productosGrid.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('producto');

            productCard.innerHTML = `
                <div class="tarjeta">
                    <div class="cara frontal">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="info">
                            <div class="nombre">${product.name}</div>
                            <div class="precio">${product.price} €</div>
                        </div>
                    </div>
                    <div class="cara trasera">
                        <div class="descripcion">
                            ${product.description}
                        </div>
                    </div>
                </div>
            `;

            productosGrid.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para iniciar el carousel
function initCarousel() {
    const carouselImages = document.querySelectorAll('.carousel img');
    let currentIndex = 0;

    setInterval(() => {
        carouselImages[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % carouselImages.length;
        carouselImages[currentIndex].style.display = 'block';
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initCarousel();

    // Manejo de scroll suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Actualizar productos cada 5 minutos
    setInterval(loadProducts, 300000);
});
