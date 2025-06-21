// DOM Elements
const productGrid = document.getElementById('productGrid');

// Enhanced Color Simulator Variables
let selectedColor = '#FFD700';
let selectedColorName = 'Amarillo';
let currentSlide = 0;
const totalSlides = 6;

// Mostrar/ocultar secciones con lógica mejorada de aislamiento
function showSection(sectionId, event) {
    if (event) event.preventDefault();

    // Primero: Oculta completamente todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
        section.style.visibility = 'hidden';
        section.style.opacity = '0';
        section.style.zIndex = '-1';
    });

    // Segundo: Encuentra y muestra solo la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        // Restaura la visibilidad de la sección objetivo
        targetSection.style.display = 'block';
        targetSection.style.visibility = 'visible';
        targetSection.style.opacity = '1';
        targetSection.style.zIndex = '1';
        targetSection.classList.add('active');
        
        // Asegura que la sección esté al frente
        targetSection.style.position = 'relative';
    }

    // Hace scroll hacia arriba suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Actualiza el estado de navegación visual
    updateNavigationState(sectionId);

    // Inicializa contenido específico de cada sección
    initializeSectionContent(sectionId);
}

// Función auxiliar para actualizar el estado visual de la navegación
function updateNavigationState(activeSectionId) {
    // Remueve clase activa de todos los enlaces de navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Añade clase activa al enlace correspondiente
    const activeNavLink = document.querySelector(`[onclick*="showSection('${activeSectionId}')"]`);
    if (activeNavLink) {
        activeNavLink.classList.add('active');
    }
}

// Función auxiliar para inicializar contenido específico de cada sección
function initializeSectionContent(sectionId) {
    switch(sectionId) {
        case 'products':
            renderProducts();
            break;
        case 'simulator':
            initializeSimulator();
            break;
        case 'projects':
            resetCarousel();
            break;
        case 'home':
            // Reinicia cualquier animación del hero si es necesario
            initializeHeroAnimations();
            break;
        case 'calculator':
            // Limpia el formulario de calculadora
            clearCalculatorForm();
            break;
        case 'contact':
            // Limpia el formulario de contacto
            clearContactForm();
            break;
    }
}

// Función para limpiar el formulario de calculadora
function clearCalculatorForm() {
    const calculatorForm = document.querySelector('.calculator-container');
    if (calculatorForm) {
        // Oculta resultados anteriores si existen
        const resultDiv = document.getElementById('result');
        if (resultDiv) {
            resultDiv.style.display = 'none';
        }
    }
}

// Función para limpiar el formulario de contacto
function clearContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm && typeof contactForm.reset === 'function') {
        // No limpiamos automáticamente, solo nos aseguramos de que esté disponible
    }
}

// Función para inicializar animaciones del hero
function initializeHeroAnimations() {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        // Reinicia cualquier animación CSS si es necesario
        heroSection.style.animation = 'none';
        heroSection.offsetHeight; // Trigger reflow
        heroSection.style.animation = null;
    }
}

// Función para inicializar la navegación de página asegurando aislamiento completo
function initializePageNavigation() {
    // Oculta completamente todas las secciones primero
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
        section.style.visibility = 'hidden';
        section.style.opacity = '0';
        section.style.zIndex = '-1';
    });
    
    // Muestra solo la sección home
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.display = 'block';
        homeSection.style.visibility = 'visible';
        homeSection.style.opacity = '1';
        homeSection.style.zIndex = '1';
        homeSection.classList.add('active');
        homeSection.style.position = 'relative';
    }
    
    // Actualiza el estado de navegación
    updateNavigationState('home');
    
    // Previene cualquier conflicto de z-index con elementos globales
    ensureProperLayering();
}

// Función para asegurar el layering apropiado de elementos
function ensureProperLayering() {
    // Asegura que el header esté siempre al frente
    const header = document.querySelector('header');
    if (header) {
        header.style.zIndex = '1000';
    }
    
    // Asegura que el botón de WhatsApp esté visible
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.style.zIndex = '999';
    }
    
    // Asegura que el footer esté en la capa correcta
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.zIndex = '10';
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

// =============================================
// NUEVO SIMULADOR DE PINTURAS - FUNCIONES
// =============================================

// Variables globales del simulador
let currentSelectedColor = '#8B4513';
let currentSelectedColorName = 'Chocolate';
let currentSelectedColorCode = '#8B4513';
let currentRoom = 'living';

// Datos de las habitaciones
const roomData = {
    living: {
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Sala moderna',
        walls: [
            { id: 'wall-accent', label: 'Pared de Acento', style: 'top: 10%; right: 0%; width: 45%; height: 80%;' },
            { id: 'wall-main', label: 'Pared Principal', style: 'top: 15%; left: 0%; width: 40%; height: 70%;' },
            { id: 'wall-side', label: 'Rodapié', style: 'bottom: 0%; left: 20%; width: 60%; height: 15%;' }
        ]
    },
    bedroom: {
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Dormitorio moderno',
        walls: [
            { id: 'wall-accent', label: 'Cabecera', style: 'top: 8%; right: 5%; width: 50%; height: 85%;' },
            { id: 'wall-main', label: 'Pared Lateral', style: 'top: 20%; left: 0%; width: 35%; height: 60%;' },
            { id: 'wall-side', label: 'Moldura', style: 'bottom: 5%; left: 15%; width: 70%; height: 10%;' }
        ]
    },
    kitchen: {
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        alt: 'Cocina moderna',
        walls: [
            { id: 'wall-accent', label: 'Isla Central', style: 'bottom: 10%; left: 25%; width: 50%; height: 30%;' },
            { id: 'wall-main', label: 'Pared Posterior', style: 'top: 5%; left: 5%; width: 90%; height: 40%;' },
            { id: 'wall-side', label: 'Barra', style: 'top: 45%; right: 0%; width: 40%; height: 45%;' }
        ]
    }
};

function initializeSimulator() {
    setupColorPalette();
    setupWallClickHandlers();
    setupRoomTabs();
    updateSelectedColorDisplay();
    renderRoom(currentRoom);
}

function setupColorPalette() {
    const colorItems = document.querySelectorAll('.color-item');
    colorItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            colorItems.forEach(c => c.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update selected color variables
            currentSelectedColor = this.getAttribute('data-color');
            currentSelectedColorName = this.getAttribute('data-name');
            currentSelectedColorCode = this.getAttribute('data-code');
            
            updateSelectedColorDisplay();
        });
    });
}

function setupWallClickHandlers() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('wall-overlay')) {
            const wallElement = e.target;
            
            // Apply selected color with transparency for overlay effect
            const colorWithOpacity = hexToRgba(currentSelectedColor, 0.7);
            wallElement.style.background = colorWithOpacity;
            
            // Add visual feedback
            wallElement.style.transform = 'scale(1.02)';
            wallElement.style.borderColor = currentSelectedColor;
            
            setTimeout(() => {
                wallElement.style.transform = 'scale(1)';
            }, 200);
            
            // Update wall label with color name
            const label = wallElement.querySelector('.wall-label');
            if (label) {
                label.textContent = `${label.textContent.split(' - ')[0]} - ${currentSelectedColorName}`;
            }
        }
    });
}

function setupRoomTabs() {
    const roomTabs = document.querySelectorAll('.room-tab');
    roomTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const roomType = this.getAttribute('data-room');
            changeRoom(roomType);
        });
    });
}

function changeRoom(roomType) {
    if (!roomData[roomType]) return;
    
    currentRoom = roomType;
    
    // Update active tab
    document.querySelectorAll('.room-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-room="${roomType}"]`).classList.add('active');
    
    // Render new room
    renderRoom(roomType);
}

function renderRoom(roomType) {
    const room = roomData[roomType];
    const container = document.querySelector('.room-image-container');
    
    // Update room image
    const roomImage = container.querySelector('.room-background');
    if (roomImage) {
        roomImage.src = room.image;
        roomImage.alt = room.alt;
    }
    
    // Remove existing overlays
    const existingOverlays = container.querySelectorAll('.wall-overlay');
    existingOverlays.forEach(overlay => overlay.remove());
    
    // Create new wall overlays based on room data
    room.walls.forEach((wall, index) => {
        const overlay = document.createElement('div');
        overlay.className = 'wall-overlay';
        overlay.id = wall.id;
        overlay.setAttribute('data-wall', wall.id);
        overlay.setAttribute('style', `position: absolute; ${wall.style} background: rgba(245, 245, 220, 0.4); border-radius: 8px; cursor: pointer; transition: all 0.3s;`);
        
        const label = document.createElement('div');
        label.className = 'wall-label';
        label.textContent = wall.label;
        
        overlay.appendChild(label);
        container.appendChild(overlay);
    });
}

function updateSelectedColorDisplay() {
    const colorPreview = document.getElementById('selectedColorPreview');
    const colorName = document.getElementById('selectedColorName');
    const colorCode = document.getElementById('selectedColorCode');
    
    if (colorPreview) colorPreview.style.backgroundColor = currentSelectedColor;
    if (colorName) colorName.textContent = currentSelectedColorName;
    if (colorCode) colorCode.textContent = currentSelectedColorCode;
}

// Utility function to convert hex to rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function requestColorAdvice() {
    const whatsappMessage = `Hola, necesito asesoría sobre el color ${currentSelectedColorName} (${currentSelectedColorCode}) para mi proyecto. ¿Podrían ayudarme con recomendaciones de aplicación y acabados?`;
    const whatsappUrl = `https://wa.me/573134312484?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
}

function requestColorQuote() {
    const whatsappMessage = `Hola, estoy interesado en una cotización para el color ${currentSelectedColorName} (${currentSelectedColorCode}). ¿Podrían ayudarme?`;
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
    // Asegurar que la página inicie en home
    showSection('home');
    renderProducts();
    startCarousel();
    initializeScrollAnimations();
    initializeAccessibility();
    
    // Agregar listeners adicionales para navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('onclick').match(/showSection\('(\w+)'/);
            if (section && section[1]) {
                showSection(section[1]);
            }
        });
    });
    
    // Initialize simulator if on simulator section
    if (window.location.hash === '#simulator') {
        showSection('simulator');
    }
    
    // Inicializa la navegación mostrando solo la sección home
    initializePageNavigation();
    
    // Añade listeners de debugging para verificar navegación
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        addNavigationDebugging();
    }
});

// Función de debugging para desarrollo (solo en localhost)
function addNavigationDebugging() {
    console.log('🎨 Panton Color SPA - Navigation debugging enabled');
    
    // Log de cambios de sección
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const element = mutation.target;
                if (element.classList.contains('section')) {
                    const sectionId = element.id;
                    const isActive = element.classList.contains('active');
                    console.log(`📱 Section ${sectionId}: ${isActive ? 'ACTIVE' : 'INACTIVE'}`);
                }
            }
        });
    });
    
    // Observa cambios en todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section, { attributes: true, attributeFilter: ['class'] });
    });
}
