// scripts.js
$(document).ready(function() {
    function fetchSheetData() {
        const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv';

        $.get(csvUrl, function(data) {
            // Convertir el CSV a JSON
            const rows = data.split('\n').slice(1);
            rows.forEach(row => {
                const [nombre, precio, imagenURL, descripcion] = row.split(',');

                // Crear la estructura de la tarjeta de producto
                const productoHTML = `
                    <div class="product-card">
                        <div class="product-card-inner">
                            <div class="product-card-front">
                                <img src="link_a_la_imagen" alt="Imagen del Producto">
                                <div class="product-details">
                                    <div class="product-name">Nombre del Producto</div>
                                    <div class="product-price">$XX.XX</div>
                                </div>
                            </div>
                            <div class="product-card-back">
                                <div class="product-description">
                                    <!-- Aquí va la descripción del producto -->
                                    Descripción detallada del producto.
                                </div>
                                <div class="product-details">
                                    <div class="product-name">Nombre del Producto</div>
                                    <div class="product-price">$XX.XX</div>
                                </div>
                            </div>
                        </div>
                    </div>

                `;

                // Añadir la tarjeta al contenedor de productos
                $('#productos').append(productoHTML);
            });
        });
    }

    fetchSheetData();

    // Carousel Auto-Rotate
    /*
    let currentImageIndex = 0;
    const images = $('.carousel img');
    setInterval(() => {
        images.eq(currentImageIndex).fadeOut();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images.eq(currentImageIndex).fadeIn();
    }, 5000);
    */
});
