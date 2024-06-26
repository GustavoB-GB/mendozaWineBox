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
                    <div class="producto">
                        <div class="producto-inner">
                            <div class="producto-front">
                                <img src="${imagenURL.trim()}" alt="${nombre.trim()}">
                                <div class="info">
                                    <span>${nombre.trim()}</span>
                                    <span>${precio.trim()}</span>
                                </div>
                            </div>
                            <div class="producto-back">
                                <p>${descripcion.trim()}</p>
                                <div class="info">
                                    <span>${nombre.trim()}</span>
                                    <span>${precio.trim()}</span>
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
    let currentImageIndex = 0;
    const images = $('.carousel img');
    setInterval(() => {
        images.eq(currentImageIndex).fadeOut();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images.eq(currentImageIndex).fadeIn();
    }, 5000);
});
