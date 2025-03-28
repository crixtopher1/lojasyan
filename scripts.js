// Seleccionar elementos del DOM
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const productCards = document.querySelectorAll('.product-card');

let currentIndex = 0;
let autoPlay;

// Función para mover el carrusel
function moveCarousel(index) {
  if (carouselInner && carouselItems.length > 0) {
    currentIndex = index;
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;

    // Actualizar indicadores
    if (indicators.length > 0) {
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentIndex);
      });
    }
  }
}

// Crear indicadores de posición si existen elementos de carrusel
if (carouselItems.length > 0 && indicatorsContainer) {
  carouselItems.forEach((_, index) => {
    const indicator = document.createElement('span');
    indicator.addEventListener('click', () => moveCarousel(index));
    indicatorsContainer.appendChild(indicator);
  });
}

const indicators = document.querySelectorAll('.carousel-indicators span');

// Evento para el botón "Anterior" si existe
if (prevButton) {
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    moveCarousel(currentIndex);
  });
}

// Evento para el botón "Siguiente" si existe
if (nextButton) {
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    moveCarousel(currentIndex);
  });
}

// Autoplay del carrusel
function startAutoPlay() {
  if (carouselItems.length > 0) {
    autoPlay = setInterval(() => {
      currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
      moveCarousel(currentIndex);
    }, 3000);
  }
}

// Detener el autoplay al pasar el mouse sobre el carrusel
if (carouselInner) {
  carouselInner.addEventListener('mouseenter', () => clearInterval(autoPlay));
  carouselInner.addEventListener('mouseleave', startAutoPlay);
}

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
  });
}

// Manejar dropdowns en móviles
document.querySelectorAll('.menu-link').forEach(link => {
  const dropdownIcon = link.querySelector('.dropdown-icon');
  if (dropdownIcon) {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = this.nextElementSibling;
        if (dropdown) {
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
          dropdownIcon.style.transform = dropdown.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0)';
        }
      }
    });
  }
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && !link.querySelector('.dropdown-icon')) {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
});

// Inicializar el primer indicador como activo si existe
if (indicators.length > 0) {
  indicators[0].classList.add('active');
}

// Función para filtrar productos en tiempo real
function filterProducts() {
  if (!searchInput) return;

  const searchTerm = searchInput.value.trim().toLowerCase();
  const products = document.querySelectorAll('.product-card');
  let hasResults = false;
  const noResults = document.createElement('div');
  noResults.className = 'no-results';
  noResults.textContent = 'Nenhum produto encontrado.';
  noResults.style.display = 'none';
  
  // Buscar o crear elemento de no-results
  let existingNoResults = document.querySelector('.no-results');
  if (!existingNoResults) {
    document.querySelector('.product-grid').appendChild(noResults);
    existingNoResults = noResults;
  }

  products.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = 'block';
      hasResults = true;
    } else {
      product.style.display = 'none';
    }
  });

  existingNoResults.style.display = hasResults ? 'none' : 'block';
}

// Búsqueda en tiempo real (filtrado en el frontend)
if (searchInput) {
  searchInput.addEventListener('input', filterProducts);
}

// Búsqueda al presionar "Enter"
if (searchInput) {
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      filterProducts();
    }
  });
}

// Animación al cargar las tarjetas de productos
if (productCards.length > 0) {
  window.addEventListener('load', () => {
    productCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 100);
    });
  });
}

// Iniciar autoplay al cargar la página si hay carrusel
if (carouselItems.length > 0) {
  startAutoPlay();
}

// Modal de Contacto
const contactModal = document.getElementById('contactModal');
const closeModal = document.querySelector('.close-modal');
const contactLink = document.getElementById('contactLink');

// Abrir el modal cuando se hace clic en "Contacto"
if (contactLink && contactModal) {
  contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    contactModal.style.display = 'block';
  });
}

// Cerrar el modal cuando se hace clic en la "X"
if (closeModal) {
  closeModal.addEventListener('click', () => {
    if (contactModal) contactModal.style.display = 'none';
  });
}

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (e) => {
  if (e.target === contactModal) {
    contactModal.style.display = 'none';
  }
});

// Modal de Sobre Nosotros
const aboutModal = document.getElementById('aboutModal');
const closeAboutModal = aboutModal ? aboutModal.querySelector('.close-modal') : null;
const aboutLink = document.querySelector('a[href="#about-us"]');

// Abrir el modal cuando se hace clic en "Sobre Nós"
if (aboutLink && aboutModal) {
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    aboutModal.style.display = 'block';
  });
}

// Cerrar el modal cuando se hace clic en la "X"
if (closeAboutModal) {
  closeAboutModal.addEventListener('click', () => {
    aboutModal.style.display = 'none';
  });
}

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (e) => {
  if (e.target === aboutModal) {
    aboutModal.style.display = 'none';
  }
});

// Función para inicializar los mini-carruseles
function initProductGalleries() {
  document.querySelectorAll('.product-gallery').forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-images img');
    const dotsContainer = gallery.querySelector('.gallery-dots');
    
    if (images.length <= 1) {
      if (dotsContainer) dotsContainer.style.display = 'none';
      if (images.length === 1) images[0].classList.add('active');
      return;
    }

    let currentIndex = 0;
    let interval;
    const dots = [];

    // Crear puntos indicadores
    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('gallery-dot');
      dot.addEventListener('click', () => gotoImage(index));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    // Mostrar imagen específica
    function gotoImage(index) {
      clearInterval(interval);
      images[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      
      currentIndex = (index + images.length) % images.length;
      images[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
      
      startAutoPlay();
    }

    // Autoplay mejorado
    function startAutoPlay() {
      clearInterval(interval);
      interval = setInterval(() => {
        gotoImage(currentIndex + 1);
      }, 3000);
    }

    // Inicializar
    images[0].classList.add('active');
    dots[0].classList.add('active');
    startAutoPlay();

    // Eventos
    gallery.addEventListener('mouseenter', () => clearInterval(interval));
    gallery.addEventListener('mouseleave', startAutoPlay);

    // Touch events para móviles
    let touchStartX = 0;
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      clearInterval(interval);
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (diff > 50) { // Deslizamiento a la izquierda
        gotoImage(currentIndex + 1);
      } else if (diff < -50) { // Deslizamiento a la derecha
        gotoImage(currentIndex - 1);
      }
      startAutoPlay();
    }, { passive: true });
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initProductGalleries();
  
  // Inicializar animaciones de productos
  if (productCards.length > 0) {
    productCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
});

// Modal de Revenda Xiaomi
const xiaomiModal = document.getElementById('xiaomiModal');
const closeXiaomiModal = xiaomiModal ? xiaomiModal.querySelector('.close-modal') : null;

// Mostrar modal al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (xiaomiModal) {
      xiaomiModal.style.display = 'block';
    }
  }, 1000); // Mostrar después de 1 segundo
});

// Cerrar el modal cuando se hace clic en la "X"
if (closeXiaomiModal) {
  closeXiaomiModal.addEventListener('click', () => {
    xiaomiModal.style.display = 'none';
  });
}

// Cerrar el modal si se hace clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === xiaomiModal) {
    xiaomiModal.style.display = 'none';
  }
});