// Función para mover el carrusel de un producto específico
function moveCarousel(direction, carouselId) {
    const carousel = document.querySelector(`#${carouselId} .carousel-images`);
    const totalImages = carousel.children.length;
    const imageWidth = carousel.children[0].offsetWidth;

    // Obtener el índice actual
    let currentTransform = carousel.style.transform || 'translateX(0px)';
    let currentIndex = Math.abs(parseInt(currentTransform.replace('translateX(', '').replace('px)', '')) / imageWidth);

    // Calcular el nuevo índice
    currentIndex = (currentIndex + direction + totalImages) % totalImages;

    // Mover el carrusel
    carousel.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
}

// Función para abrir el lightbox con imágenes específicas del producto
function openLightbox(img, carouselId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const carousel = document.querySelector(`#${carouselId} .carousel-images`);

    // Mostrar el lightbox
    lightbox.style.display = 'flex';

    // Configurar la imagen inicial y el índice
    lightboxImg.src = img.src;
    lightboxImg.dataset.index = Array.from(carousel.querySelectorAll('.carousel-image')).indexOf(img);
    lightboxImg.dataset.carouselId = carouselId;
}

// Función para mover las imágenes dentro del lightbox
function moveLightbox(direction) {
    const lightboxImg = document.getElementById('lightbox-img');
    const carouselId = lightboxImg.dataset.carouselId;
    const carousel = document.querySelector(`#${carouselId} .carousel-images`);
    const totalImages = carousel.children.length;

    // Obtener el índice actual
    let currentIndex = parseInt(lightboxImg.dataset.index);
    currentIndex = (currentIndex + direction + totalImages) % totalImages;

    // Actualizar la imagen del lightbox
    const newImage = carousel.children[currentIndex].querySelector('img');
    lightboxImg.src = newImage.src;
    lightboxImg.dataset.index = currentIndex;
}

// Función para cerrar el lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Añadir funcionalidad de apertura al hacer clic en la imagen de cada carrusel
document.querySelectorAll('.carousel-images img').forEach((img) => {
    const carouselId = img.closest('.product').id;
    img.addEventListener('click', () => openLightbox(img, carouselId));
});

// Añadir eventos de navegación para el carrusel
document.querySelectorAll('.product').forEach((product) => {
    const productId = product.id;

    product.querySelector('.prev').addEventListener('click', () => moveCarousel(-1, productId));
    product.querySelector('.next').addEventListener('click', () => moveCarousel(1, productId));
});

// Añadir eventos de navegación en el lightbox
document.getElementById('lightbox-prev').addEventListener('click', () => moveLightbox(-1)); // Flecha izquierda
document.getElementById('lightbox-next').addEventListener('click', () => moveLightbox(1));  // Flecha derecha
document.getElementById('lightbox-close').addEventListener('click', closeLightbox); // Cerrar lightbox

// Habilitar navegación automática en los carruseles
document.querySelectorAll('.product').forEach((product) => {
    const productId = product.id;

    // Navegar automáticamente cada 5 segundos
    setInterval(() => moveCarousel(1, productId), 5000);
});
