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

    cartItems.innerHTML = ''; // Limpiar carrito visual
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <p>${item.nombre} x${item.cantidad}</p>
            <p>$${(item.precio * item.cantidad).toLocaleString()}</p>
            <button onclick="restarCantidad(${item.id})">-</button>
            <button onclick="sumarCantidad(${item.id})">+</button>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        cartItems.appendChild(itemDiv);
    });

    cartTotal.textContent = `Total: $${total.toLocaleString()}`;
    cartCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
}


function toggleCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.classList.toggle("show");
}

// Carrusel de imágenes
let currentIndex = 0; // Índice de la imagen actual
const moveCarousel = (direction, carouselId) => {
    const carousel = document.querySelector(`#${carouselId} .carousel-images`);
    const images = carousel.querySelectorAll('.image-container');
    const totalImages = images.length;

    // Ocultar la imagen actual
    images[currentIndex].style.display = 'none';

    // Actualizar el índice
    currentIndex = (currentIndex + direction + totalImages) % totalImages;

    // Mostrar la nueva imagen
    images[currentIndex].style.display = 'block';
};

// Inicializar el carrusel (mostrar solo la primera imagen de cada carrusel al cargar la página)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-images').forEach(carousel => {
        const images = carousel.querySelectorAll('.image-container');
        images.forEach((img, index) => {
            img.style.display = index === 0 ? 'block' : 'none';
        });
    });
});


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
