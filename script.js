// URL de tu hoja de cálculo publicada en formato CSV
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?output=csv';

// Función para cargar los datos de Google Sheets
async function loadPrices() {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.text();
        
        // Convertir el CSV en un array de objetos
        const rows = data.split('\n').slice(1); // Ignorar la primera fila (encabezados)
        const products = rows.map(row => {
            const [product, price] = row.split(',');
            return { product, price };
        });

        // Actualizar los precios en el DOM
        products.forEach((product, index) => {
            const priceElement = document.getElementById(`precio-${index + 1}`);
            if (priceElement) {
                priceElement.textContent = product.price;
            }
        });
    } catch (error) {
        console.error('Error al cargar los precios:', error);
    }
}

// Llamar a la función para cargar los precios cuando la página se cargue
document.addEventListener('DOMContentLoaded', loadPrices);
