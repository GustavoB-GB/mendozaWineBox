document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro de categoría de la URL
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat");

    // Definir la URL del CSV según la categoría
    let sheetUrl = "";

    switch (categoria) {
        case "1":
            sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ9Qy5NWimWZtk1DN2Vsi4ZtZ9DXRQV5VDu4HW15_GXFJoaR25G6FSMJtwUDM1J8LH4oHlS7TkRsjj/pub?gid=2079387910&single=true&output=csv"; // CSV de categoría 1
            break;
        case "2":
            sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ9Qy5NWimWZtk1DN2Vsi4ZtZ9DXRQV5VDu4HW15_GXFJoaR25G6FSMJtwUDM1J8LH4oHlS7TkRsjj/pub?gid=1185988817&single=true&output=csv"; // CSV de categoría 2
            break;
        case "3":
            sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ9Qy5NWimWZtk1DN2Vsi4ZtZ9DXRQV5VDu4HW15_GXFJoaR25G6FSMJtwUDM1J8LH4oHlS7TkRsjj/pub?gid=1582548365&single=true&output=csv"; // CSV de categoría 3
            break;
        case "4":
            sheetUrl = ""; // CSV de categoría 4
            break;
        case "5":
            sheetUrl = ""; // CSV de categoría 5
            break;
        case "6":
            sheetUrl = ""; // CSV de categoría 6
            break;
        case "7":
            sheetUrl = ""; // CSV de categoría 7
            break;
        default:
            console.error("Categoría no válida");
            return;
    }

    const promoElement = document.querySelector(".promo");
    if (promoElement && categoria) {
        promoElement.textContent = `OPCION BOX ${categoria}`;
    }

    // Elementos de la ventana modal
    const productModal = document.getElementById("product-modal");
    const modalImage = document.getElementById("modal-image");
    const modalName = document.getElementById("modal-name");
    const modalDescription = document.getElementById("modal-description");
    const modalPrice = document.getElementById("modal-price");
    const contactButton = document.getElementById("contact-button");
    const closeModal = document.querySelector(".close");

    // Función para cargar datos desde Google Sheets
    function loadProducts(sheetUrl, callback) {
        fetch(sheetUrl)
            .then(response => response.text())
            .then(data => {
                const rows = data.split("\n").slice(1);
                const products = rows.map(row => {
                    const columns = row.split(",");
                    return {
                        name: columns[0],
                        price: columns[1],
                        image: columns[2],
                        description: columns[3]
                    };
                });
                callback(products);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
    }

    // Función para mostrar los productos en el DOM
    function displayProducts(products) {
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-details">
                    <div class="product-description">
                        <span class="product-name">${product.name}</span>
                        <p class="product-text">${product.description}</p>
                    </div>
                    <span class="product-price">${product.price}</span>
                </div>
            `;

            productCard.addEventListener("click", () => {
                modalImage.src = product.image;
                modalName.textContent = product.name;
                modalDescription.textContent = product.description;
                modalPrice.textContent = `Precio: ${product.price}`;
                contactButton.href = `https://wa.me/5492615707910?text=Hola,%20me%20interesa%20el%20${product.name}`;
                productModal.style.display = "block";
            });

            productList.appendChild(productCard);
        });
    }

    // Cargar y mostrar los productos
    loadProducts(sheetUrl, displayProducts);

    // Cerrar la ventana modal cuando se hace clic en la "x"
    closeModal.onclick = function() {
        productModal.style.display = "none";
        whatsappButton.style.display = 'flex';
        checkButtonVisibility();
    }

    // Cerrar la ventana modal cuando se hace clic fuera del contenido de la modal
    window.onclick = function(event) {
        if (event.target == productModal) {
            productModal.style.display = "none";
            whatsappButton.style.display = 'flex';
            checkButtonVisibility();
        }
    }    

    // Botón de WhatsApp flotante
    const whatsappButton = document.getElementById('whatsapp-float');
    const footer = document.querySelector('footer');

    // Función para verificar si el botón debe mostrarse o no
    function checkButtonVisibility() {
        const footerRect = footer.getBoundingClientRect();
        const footerVisible = (footerRect.top < window.innerHeight) && (footerRect.bottom >= 0);

        if (footerVisible) {
            whatsappButton.style.display = 'none';
        } else {
            whatsappButton.style.display = 'flex';
        }
    }
    window.addEventListener("scroll", checkButtonVisibility);
    checkButtonVisibility();
});
