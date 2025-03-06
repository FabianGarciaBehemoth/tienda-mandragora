// Carrito de compras
let carrito = [];

function agregarAlCarrito(id, nombre, precio, imagen) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }
    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function restarCantidad(id) {
    const producto = carrito.find(item => item.id === id);
    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        eliminarDelCarrito(id);
    }
    actualizarCarrito();
}

function sumarCantidad(id) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad++;
    }
    actualizarCarrito();
}

function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
}
// **NUEVA FUNCIÓN**: Guarda el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// **NUEVA FUNCIÓN**: Carga el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = ''; // Limpiar carrito visual
    let total = 0;


    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        const imgElement = document.createElement("img");
        imgElement.src = item.imagen;
        imgElement.alt = item.nombre;
        imgElement.classList.add("cart-item-img");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("cart-item-info");
        infoDiv.innerHTML = `
            <p>${item.nombre} x${item.cantidad}</p>
            <p>$${(item.precio * item.cantidad).toLocaleString()}</p>
            <button onclick="restarCantidad(${item.id})">-</button>
            <button onclick="sumarCantidad(${item.id})">+</button>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;

        itemDiv.appendChild(imgElement);
        itemDiv.appendChild(infoDiv);
        cartItems.appendChild(itemDiv);
    });


    cartTotal.textContent = `Total: $${total.toLocaleString()}`;
    cartCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    // **Guardar el carrito después de actualizarlo**
    guardarCarrito();
}

// Cargar el carrito cuando la página se cargue
document.addEventListener("DOMContentLoaded", cargarCarrito);

function toggleCart() {
    document.getElementById("cart-dropdown").classList.toggle("show");
}


// Lightbox
document.addEventListener("DOMContentLoaded", function () {
    const productos = document.querySelectorAll(".product"); // Selecciona cada producto
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;
    let imageList = [];

    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <button class="prev">&#10094;</button>
        <img class="lightbox-image" src="">
        <button class="next">&#10095;</button>
    `;

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const closeButton = lightbox.querySelector(".close");
    const prevButton = lightbox.querySelector(".prev");
    const nextButton = lightbox.querySelector(".next");

    productos.forEach(producto => {
        const images = producto.querySelectorAll("img"); // Solo imágenes del producto
        images.forEach((img, index) => {
            img.addEventListener("click", () => {
                imageList = Array.from(images).map(image => image.src); // Captura solo las imágenes de este producto
                currentImageIndex = index; // Asegura que inicie en la imagen seleccionada
                showImage();
            });
        });
    });

    function showImage() {
        lightbox.style.display = "flex";
        lightboxImage.src = imageList[currentImageIndex];
    }

    closeButton.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    prevButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
        showImage();
    });

    nextButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % imageList.length;
        showImage();
    });

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});


/* integracion pay pal */

document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    let cartSummary = document.getElementById("cart-summary");
    let cartTotal = document.getElementById("cart-total");

    if (cartItems.length === 0) {
        cartSummary.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let total = 0;
    cartSummary.innerHTML = "";
    cartItems.forEach(item => {
        let itemElement = document.createElement("p");
        itemElement.textContent = `${item.nombre} - ${item.cantidad} x $${item.precio}`;
        cartSummary.appendChild(itemElement);
        total += item.cantidad * item.precio;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Integrar PayPal
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: total.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("Pago exitoso, gracias " + details.payer.name.given_name);
                localStorage.removeItem("checkoutCart");
                window.location.href = "index.html"; // Redirigir a la página principal
            });
        }
    }).render("#paypal-button-container");
});

/* Funcion para el boton proceder a pago, para que vaya de index.html a checkout.html */
function irAlCheckout() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de continuar.");
        return;
    }

    // Guardar el carrito en localStorage para pasarlo a la página de pago
    localStorage.setItem("checkoutCart", JSON.stringify(carrito));

    // Redirigir a la página de checkout
    window.location.href = "checkout.html";
}


/* Validación del formulario) */

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("#checkout-form input");

    // Función para verificar si el formulario está completo
    function formularioCompleto() {
        for (let input of inputs) {
            if (input.value.trim() === "") {
                return false;
            }
        }
        return true;
    }

    // Mostrar alerta si faltan datos
    function validarAntesDePagar(event) {
        if (!formularioCompleto()) {
            event.preventDefault(); // Evita el clic en PayPal
            alert("Por favor, completa todos los campos del formulario antes de pagar.");
        }
    }

    // Exportamos la función para usarla en paypal.js
    window.formularioCompleto = formularioCompleto;
});


