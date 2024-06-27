document.addEventListener('DOMContentLoaded', async () => {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVPHcjwMlbwdC81Mgza3MODzaci907Ee79HUYbdaD7UVeHvHADi4RFpV-dVHkWNaAxgLbQX2suIAdR/pub?gid=0&single=true&output=csv";

    const response = await fetch(sheetURL);
    const data = await response.text();

    const products = Papa.parse(data, {
        header: true,
        skipEmptyLines: true
    }).data;

    const productContainer = document.getElementById("product-container");

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${product.Image}" alt="${product.Name}">
            <div class="card-content">
                <h2>${product.Name}</h2>
                <p class="card-price">${product.Price}</p>
                <p class="card-description">${product.Description}</p>
            </div>
        `;
        card.addEventListener('click', function() {
            const modal = document.getElementById("myModal");
            const modalImage = document.getElementById("modalImage");
            const modalProductName = document.getElementById("modalProductName");
            const modalProductDescription = document.getElementById("modalProductDescription");
            const modalProductPrice = document.getElementById("modalProductPrice");
            const modalWhatsAppButton = document.getElementById("modalWhatsAppButton");

            modalImage.src = product.Image;
            modalProductName.textContent = product.Name;
            modalProductDescription.textContent = product.Description;
            modalProductPrice.textContent = product.Price;
            modalWhatsAppButton.href = `https://api.whatsapp.com/send?phone=XXXXXXXXXXX&text=Me%20interesa%20${encodeURIComponent(product.Name)}`;

            modal.style.display = "block";
        });
        productContainer.appendChild(card);
    });

    //2 Cerrar la ventana modal al hacer clic en el botón de cierre (X)
    const span = document.getElementsByClassName("close")[0];
    span.addEventListener('click', function() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    });

    // Cerrar la ventana modal al hacer clic fuera de la modal
    window.addEventListener('click', function(event) {
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
