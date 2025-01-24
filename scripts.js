// Carrito de compras
let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
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

function actualizarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <p>${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}</p>
            <button onclick="restarCantidad(${item.id})">-</button>
            <button onclick="sumarCantidad(${item.id})">+</button>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(itemElement);
    });

    cartTotal.textContent = `Total: $${total}`;
    cartCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function toggleCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.classList.toggle("show");
}

// Carrusel de imágenes
function moveCarousel(direction, id) {
    const carousel = document.querySelector(`#${id} .carousel-images`);
    const scrollAmount = carousel.offsetWidth;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// Lightbox
let currentImageIndex = 0;
let lightboxImages = [];

function openLightbox(images, index) {
    lightboxImages = images;
    currentImageIndex = index;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = lightboxImages[currentImageIndex];
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

function moveLightbox(direction) {
    currentImageIndex = (currentImageIndex + direction + lightboxImages.length) % lightboxImages.length;
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = lightboxImages[currentImageIndex];
}
