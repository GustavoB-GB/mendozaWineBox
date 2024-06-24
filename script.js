const baseSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv';

async function loadPrices() {
    try {
        // Agregar un parámetro único para evitar el caché del navegador
        const sheetUrl = `${baseSheetUrl}&nocache=${new Date().getTime()}`;
        
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
;
