// DOM Elements
const productGrid = document.getElementById('productGrid');

// Enhanced Color Simulator Variables
let selectedColor = '#FFD700';
let selectedColorName = 'Amarillo';
let currentSlide = 0;
const totalSlides = 6;

// Gallery Slider Variables
let isDragging = false;
let sliderPosition = 50;

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
            initializeGallerySlider();
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
// GALERÍA ANTES Y DESPUÉS - FUNCIONES
// =============================================

// Variables globales de la galería
let currentComparison = null;

// Inicializar galería Antes y Después
function initializeBeforeAfterGallery() {
    initializeSliders();
    initializeUploadForm();
}

// Inicializar sliders de comparación
function initializeSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        let isDragging = false;
        
        slider.addEventListener('mousedown', startDrag);
        slider.addEventListener('touchstart', startDrag);
        
        function startDrag(e) {
            isDragging = true;
            const container = slider.closest('.comparison-container');
            const rect = container.getBoundingClientRect();
            
            function onDrag(e) {
                if (!isDragging) return;
                
                const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
                const percentage = Math.min(Math.max((clientX - rect.left) / rect.width * 100, 0), 100);
                
                updateComparison(container, percentage);
            }
            
            function stopDrag() {
                isDragging = false;
                document.removeEventListener('mousemove', onDrag);
                document.removeEventListener('mouseup', stopDrag);
                document.removeEventListener('touchmove', onDrag);
                document.removeEventListener('touchend', stopDrag);
            }
            
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onDrag);
            document.addEventListener('touchend', stopDrag);
            
            e.preventDefault();
        }
    });
}

// Actualizar posición del slider de comparación
function updateComparison(container, percentage) {
    const slider = container.querySelector('.comparison-slider');
    const afterImage = container.querySelector('.after-image');
    
    slider.style.left = percentage + '%';
    afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
}

// Inicializar formulario de subida
function initializeUploadForm() {
    const uploadForm = document.getElementById('uploadForm');
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    // Manejar cambios en inputs de archivos
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const label = this.nextElementSibling;
            const fileName = this.files[0] ? this.files[0].name : 'Seleccionar archivo';
            label.textContent = fileName;
        });
    });
    
    // Manejar envío del formulario
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleUploadSubmit);
    }
}

// Manejar envío del formulario de subida
function handleUploadSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const clientName = formData.get('clientName');
    const projectType = formData.get('projectType');
    const beforeImage = formData.get('beforeImage');
    const afterImage = formData.get('afterImage');
    const description = formData.get('description');
    
    if (!clientName || !beforeImage || !afterImage) {
        showNotification('Por favor completa los campos obligatorios', 'error');
        return;
    }
    
    // Crear mensaje para WhatsApp
    const whatsappMessage = `Nuevo proyecto para galería:\n\nCliente: ${clientName}\nTipo: ${projectType}\nDescripción: ${description}\n\n¡He adjuntado las fotos antes y después!`;
    const whatsappUrl = `https://wa.me/573134312484?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    showNotification('¡Gracias! Tu proyecto ha sido enviado. Nos pondremos en contacto contigo pronto.', 'success');
    e.target.reset();
    
    // Resetear labels de archivos
    const fileLabels = document.querySelectorAll('.file-input-label');
    fileLabels.forEach(label => {
        if (label.textContent !== 'Seleccionar archivo') {
            label.textContent = 'Seleccionar archivo';
        }
    });
}

// Funciones para galería de proyectos
function requestProjectQuote(projectTitle, colors) {
    const colorList = colors.map(color => color.name).join(', ');
    const whatsappMessage = `Hola, me interesa un proyecto similar a "${projectTitle}" con los colores: ${colorList}. ¿Podrían enviarme una cotización?`;
    const whatsappUrl = `https://wa.me/573134312484?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
}

function requestProjectAdvice(projectTitle) {
    const whatsappMessage = `Hola, me gustaría recibir asesoría sobre un proyecto similar a "${projectTitle}". ¿Podrían ayudarme con recomendaciones?`;
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
    
    // Initialize gallery if on simulator section
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

// =============================================
// GALLERY SLIDER FUNCTIONALITY
// =============================================

// Initialize gallery slider functionality
function initializeGallerySlider() {
    const sliderButtons = document.querySelectorAll('.slider-button');
    const imageContainers = document.querySelectorAll('.image-container');
    
    sliderButtons.forEach((button, index) => {
        const container = imageContainers[index];
        if (!container) return;
        
        const afterImage = container.querySelector('.after-image');
        const sliderControl = container.querySelector('.slider-control');
        
        // Mouse events
        button.addEventListener('mousedown', (e) => startDragging(e, container, afterImage, sliderControl));
        
        // Touch events for mobile
        button.addEventListener('touchstart', (e) => startDragging(e, container, afterImage, sliderControl));
        
        // Container click for direct positioning
        container.addEventListener('click', (e) => handleContainerClick(e, container, afterImage, sliderControl));
    });
    
    // Global mouse and touch events
    document.addEventListener('mousemove', handleDragging);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchmove', handleDragging);
    document.addEventListener('touchend', stopDragging);
}

function startDragging(e, container, afterImage, sliderControl) {
    e.preventDefault();
    isDragging = true;
    
    // Store references for the dragging session
    window.currentContainer = container;
    window.currentAfterImage = afterImage;
    window.currentSliderControl = sliderControl;
    
    // Add dragging class for visual feedback
    container.classList.add('dragging');
}

function handleDragging(e) {
    if (!isDragging || !window.currentContainer) return;
    
    e.preventDefault();
    
    const container = window.currentContainer;
    const afterImage = window.currentAfterImage;
    const sliderControl = window.currentSliderControl;
    
    const rect = container.getBoundingClientRect();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    updateSliderPosition(percentage, afterImage, sliderControl);
}

function stopDragging() {
    if (!isDragging) return;
    
    isDragging = false;
    
    if (window.currentContainer) {
        window.currentContainer.classList.remove('dragging');
    }
    
    // Clear references
    window.currentContainer = null;
    window.currentAfterImage = null;
    window.currentSliderControl = null;
}

function handleContainerClick(e, container, afterImage, sliderControl) {
    if (isDragging) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    updateSliderPosition(percentage, afterImage, sliderControl);
}

function updateSliderPosition(percentage, afterImage, sliderControl) {
    // Update slider control position
    sliderControl.style.left = `${percentage}%`;
    
    // Update after image clip path
    afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
    
    // Store current position
    sliderPosition = percentage;
}

// Share project functionality
function shareProject(projectName) {
    if (navigator.share) {
        navigator.share({
            title: `${projectName} - Panton Color`,
            text: `Mira esta increíble transformación con productos Panton Color`,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('¡Enlace copiado al portapapeles!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('¡Enlace copiado al portapapeles!');
        });
    }
}
