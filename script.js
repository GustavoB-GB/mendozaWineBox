// scripts.js

$(document).ready(function() {
    function fetchSheetData() {
        const sheetID = 'TUSHEETID';
        const apiKey = 'TUTOKEN';
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1?key=${apiKey}`;

        $.get(url, function(data) {
            const rows = data.values.slice(1); // Ignorar la primera fila (encabezados)

            rows.forEach(row => {
                const [nombre, precio, imagenURL, descripcion] = row;

                const productoHTML = `
                    <div class="producto">
                        <div class="producto-inner">
                            <div class="producto-front">
                                <img src="${imagenURL}" alt="${nombre}">
                                <div class="info">
                                    <span>${nombre}</span>
                                    <span>${precio}</span>
                                </div>
                            </div>
                            <div class="producto-back">
                                <p>${descripcion}</p>
                                <div class="info">
                                    <span>${nombre}</span>
                                    <span>${precio}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

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
