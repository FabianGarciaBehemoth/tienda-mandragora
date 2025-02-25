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
}

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
