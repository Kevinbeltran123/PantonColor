// DOM Elements
const productGrid = document.getElementById('productGrid');

// Color Simulator Variables
let currentColor = '#2C3E50';
let currentColorName = 'Gris Oscuro';
let currentSlide = 0;
const totalSlides = 6;

// Mostrar/ocultar secciones
function showSection(sectionId, event) {
    if (event) event.preventDefault();

    // Oculta todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    // Muestra la sección seleccionada
    document.getElementById(sectionId).classList.add('active');

    // Hace scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Si entras a productos, vuelve a renderizar
    if (sectionId === 'products') {
        renderProducts();
    }
    
    // Si entras al simulador, inicializa
    if (sectionId === 'simulator') {
        initializeSimulator();
    }
    
    // Si entras a proyectos, reinicia el carousel
    if (sectionId === 'projects') {
        resetCarousel();
    }
}

// Renderizar productos (y filtro de categoría)
function renderProducts(category = 'all') {
    productGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-badge">${product.category === 'interior' ? 'Interior' : product.category === 'exterior' ? 'Exterior' : 'Especial'}</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price">${product.price}</div>
                <a href="https://wa.me/57311603066?text=Estoy%20interesado%20en%20${encodeURIComponent(product.name)}%20(%24${encodeURIComponent(product.price)})" class="product-btn">
                    <i class="fab fa-whatsapp"></i> Consultar
                </a>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filtrar productos por categoría
function filterProducts(category) {
    // Actualiza el botón activo
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Renderiza los productos filtrados
    renderProducts(category);
}

// Calculadora de pintura
function calculatePaint() {
    // Obtén los valores del formulario
    const area = parseFloat(document.getElementById('area').value);
    const coats = parseInt(document.getElementById('coats').value);
    const paintType = parseFloat(document.getElementById('paint-type').value);
    const bucketSize = parseFloat(document.getElementById('bucket-size').value);
    
    // Valida la entrada
    if (isNaN(area) || area <= 0) {
        alert('Por favor ingresa un área válida en metros cuadrados');
        return;
    }
    
    // Calcula los litros necesarios
    const litersNeeded = (area * coats) / paintType;
    
    // Calcula los baldes necesarios según el tamaño
    let bucketVolume;
    switch(bucketSize) {
        case 1: bucketVolume = 3.785; break;  // 1 galón = 3.785 litros
        case 4: bucketVolume = 15.14; break; // 4 galones = 15.14 litros
        case 5: bucketVolume = 18.93; break; // 5 galones = 18.93 litros
        default: bucketVolume = 3.785;
    }
    
    const bucketsNeeded = Math.ceil(litersNeeded / bucketVolume);
    
    // Muestra el resultado
    document.getElementById('buckets-needed').textContent = bucketsNeeded;
    document.getElementById('total-liters').textContent = litersNeeded.toFixed(2);
    document.getElementById('result').style.display = 'block';
    
    // Scroll al resultado
    document.getElementById('result').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

// Envío del formulario de contacto
function submitContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Validación básica de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor ingresa un correo electrónico válido');
        return;
    }
    
    // Aquí normalmente enviarías los datos al servidor
    alert(`Gracias por tu mensaje, ${name}! Nos pondremos en contacto contigo pronto al correo ${email}.`);
    
    // Reinicia el formulario
    document.querySelector('.contact-form').reset();
}

// New Simplified Color Simulator Functions
function initializeSimulator() {
    updateColorPreview(currentColor, currentColorName);
    setupNewColorSwatchListeners();
    updateWallColor(currentColor);
}

function setupNewColorSwatchListeners() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Remove active class from all swatches
            colorSwatches.forEach(s => s.classList.remove('active'));
            // Add active class to clicked swatch
            this.classList.add('active');
            
            currentColor = this.getAttribute('data-color');
            currentColorName = this.getAttribute('data-name');
            updateColorPreview(currentColor, currentColorName);
            updateWallColor(currentColor);
        });
    });
}

function updateColorPreview(color, name) {
    const colorCircle = document.getElementById('selectedColorCircle');
    const colorNameEl = document.getElementById('selectedColorName');
    const colorCodeEl = document.getElementById('selectedColorCode');
    
    if (colorCircle) colorCircle.style.backgroundColor = color;
    if (colorNameEl) colorNameEl.textContent = name;
    if (colorCodeEl) colorCodeEl.textContent = color;
}

function updateWallColor(color) {
    const wall = document.getElementById('mainWall');
    if (wall) {
        wall.style.backgroundColor = color;
        // Add a subtle gradient effect
        wall.style.background = `linear-gradient(180deg, ${color} 0%, ${color}CC 100%)`;
    }
}

function requestColorAdvice() {
    const whatsappMessage = `Hola, necesito asesoría sobre el color ${currentColorName} (${currentColor}) para mi proyecto. ¿Podrían ayudarme con recomendaciones de aplicación y acabados?`;
    const whatsappUrl = `https://wa.me/573134312484?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
}

function requestColorQuote() {
    const colorName = document.getElementById('selectedColorName').textContent;
    const colorCode = document.getElementById('selectedColorCode').textContent;
    const whatsappMessage = `Hola, estoy interesado en una cotización para el color ${colorName} (${colorCode}). ¿Podrían ayudarme?`;
    const whatsappUrl = `https://wa.me/573134312484?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
}

// Carousel Functions
function moveCarousel(direction) {
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('projectsTrack');
    const translateX = -currentSlide * (100 / 3); // Show 3 slides at a time
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function resetCarousel() {
    currentSlide = 0;
    updateCarousel();
}

// Auto-advance carousel
function startCarousel() {
    setInterval(() => {
        if (document.getElementById('projects').classList.contains('active')) {
            moveCarousel(1);
        }
    }, 5000);
}

// Enhanced form validation
function submitContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    // Validación básica de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification('Por favor ingresa un correo electrónico válido', 'error');
        return;
    }
    
    // Create WhatsApp message with form data
    const whatsappMessage = `Nuevo mensaje de contacto:
    
Nombre: ${name}
Email: ${email}
Asunto: ${subject}
Mensaje: ${message}`;
    
    const whatsappUrl = `https://wa.me/573134312484?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    showNotification(`Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto.`, 'success');
    
    // Reset form
    document.querySelector('.contact-form').reset();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Smooth scrolling for internal links
function smoothScrollTo(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add scroll animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .testimonial-card, .project-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// Accessibility improvements
function initializeAccessibility() {
    // Add keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('projects').classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                moveCarousel(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                moveCarousel(1);
            }
        }
    });
    
    // Add focus indicators
    document.querySelectorAll('button, a, input, select, textarea').forEach(el => {
        el.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        el.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

// Inicializa la web al cargar
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    renderProducts();
    startCarousel();
    initializeScrollAnimations();
    initializeAccessibility();
    
    // Initialize simulator if on simulator section
    if (window.location.hash === '#simulator') {
        showSection('simulator');
    }
});
