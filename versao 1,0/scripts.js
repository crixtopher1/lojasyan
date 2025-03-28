// Seleccionar elementos del DOM
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const productCards = document.querySelectorAll('.product-card');

let currentIndex = 0;
let autoPlay;

// Función para mover el carrusel
function moveCarousel(index) {
  currentIndex = index;
  const offset = -currentIndex * 100;
  carouselInner.style.transform = `translateX(${offset}%)`;

  // Actualizar indicadores
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === currentIndex);
  });
}

// Crear indicadores de posición
carouselItems.forEach((_, index) => {
  const indicator = document.createElement('span');
  indicator.addEventListener('click', () => moveCarousel(index));
  indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.carousel-indicators span');

// Evento para el botón "Anterior"
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
  moveCarousel(currentIndex);
});

// Evento para el botón "Siguiente"
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
  moveCarousel(currentIndex);
});

// Autoplay del carrusel
function startAutoPlay() {
  autoPlay = setInterval(() => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    moveCarousel(currentIndex);
  }, 2000);
}

// Detener el autoplay al pasar el mouse sobre el carrusel
carouselInner.addEventListener('mouseenter', () => clearInterval(autoPlay));
carouselInner.addEventListener('mouseleave', startAutoPlay);

// Mostrar/ocultar menú en dispositivos móviles
menuIcon.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Inicializar el primer indicador como activo
indicators[0].classList.add('active');

// Función para filtrar productos en tiempo real
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const products = document.querySelectorAll('.product-card');
  let hasResults = false;

  products.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = 'block';
      hasResults = true;
    } else {
      product.style.display = 'none';
    }
  });

  if (!hasResults) {
    alert("No se encontraron productos que coincidan con la búsqueda.");
  }
}

// Búsqueda en tiempo real (filtrado en el frontend)
searchInput.addEventListener('input', filterProducts);

// Búsqueda avanzada (enviar al backend)
searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  if (searchTerm.trim() !== "") {
    window.location.href = `/buscar?q=${encodeURIComponent(searchTerm)}`;
  }
});

// Búsqueda al presionar "Enter"
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const searchTerm = searchInput.value;
    if (searchTerm.trim() !== "") {
      window.location.href = `/buscar?q=${encodeURIComponent(searchTerm)}`;
    }
  }
});

// Animación al cargar las tarjetas de productos
window.addEventListener('load', () => {
  productCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 100);
  });
});

// Iniciar autoplay al cargar la página
startAutoPlay();