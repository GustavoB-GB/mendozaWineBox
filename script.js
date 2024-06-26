// URL de la hoja de cálculo de Google Sheets en formato CSV
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv';

// Función para cargar datos desde la hoja de cálculo
async function loadProducts() {
    try {
        const response = await fetch(sheetUrl);
        const csvData = await response.text();

        // Convertir CSV a un array de objetos
        const data = csvToJson(csvData);

        // Renderizar los productos en la página
        renderProducts(data);
    } catch (error) {
        console.error('Error al cargar los datos de la hoja de cálculo:', error);
    }
}

// Función para convertir CSV a JSON
function csvToJson(csv) {
    const lines = csv.split('\n');
    const result = [];

    // Obtener los encabezados de las columnas
    const headers = lines[0].split(',');

    // Convertir cada línea en un objeto JSON
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');

        headers.forEach((header, index) => {
            obj[header.trim()] = currentLine[index].trim();
        });

        result.push(obj);
    }

    return result;
}

// Función para renderizar los productos en la página
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-card-inner">
                <div class="product-card-front">
                    <img src="${product.Imagen}" alt="${product.Nombre}">
                    <div class="product-details">
                        <div class="product-name">${product.Nombre}</div>
                        <div class="product-price">$${product.Precio}</div>
                    </div>
                </div>
                <div class="product-card-back">
                    <div class="product-description">${product.Descripcion}</div>
                    <div class="product-details">
                        <div class="product-name">${product.Nombre}</div>
                        <div class="product-price">$${product.Precio}</div>
                    </div>
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });
}

// Iniciar la carga de productos al cargar la página
document.addEventListener('DOMContentLoaded', loadProducts);
