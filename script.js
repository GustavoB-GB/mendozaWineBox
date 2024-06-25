// Iniciamos Google Charts
google.charts.load('current', { 'packages': ['corechart', 'table'] });
google.charts.setOnLoadCallback(loadProducts);

function loadProducts() {
    const query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv');
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        console.error('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }

    const data = response.getDataTable();
    const container = document.getElementById('productos');
    
    for (let i = 0; i < data.getNumberOfRows(); i++) {
        const name = data.getValue(i, 0);
        const price = data.getValue(i, 1);
        const imageUrl = data.getValue(i, 2);
        const description = data.getValue(i, 3);

        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const productCardInner = document.createElement('div');
        productCardInner.className = 'product-card-inner';

        const productCardFront = document.createElement('div');
        productCardFront.className = 'product-card-front';
        productCardFront.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <div class="product-details">
                <span>${name}</span>
                <span>${price}</span>
            </div>
        `;

        const productCardBack = document.createElement('div');
        productCardBack.className = 'product-card-back';
        productCardBack.innerHTML = `<p>${description}</p>`;

        productCardInner.appendChild(productCardFront);
        productCardInner.appendChild(productCardBack);
        productCard.appendChild(productCardInner);
        container.appendChild(productCard);
    }
}

// Carousel rotation cada 5 segundos
let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');

function rotateCarousel() {
    images[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = 'block';
}

setInterval(rotateCarousel, 5000);
