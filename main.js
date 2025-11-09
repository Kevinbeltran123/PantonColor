const productGrid = document.getElementById('productGrid');

function initLandingPage() {
    renderProducts();
    bindCategoryFilters();
    setupMobileMenu();
    setupSmoothScroll();
    setupContactForm();
    setCurrentYear();
    initializeComparisonSlider();
}

document.addEventListener('DOMContentLoaded', initLandingPage);

function renderProducts(category = 'all') {
    if (!productGrid || typeof products === 'undefined') return;

    productGrid.innerHTML = '';
    const data = category === 'all'
        ? products
        : products.filter(product => product.category === category);

    data.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-media">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-body">
                <div class="product-meta">
                    <span class="product-badge">${mapCategory(product.category)}</span>
                    <span class="product-price">${product.price}</span>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <a class="product-btn" href="https://wa.me/573134312484?text=${encodeURIComponent(`Hola, estoy interesado en ${product.name}`)}" target="_blank" rel="noreferrer">
                    <i class="fab fa-whatsapp"></i> Consultar
                </a>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

function bindCategoryFilters() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category || 'all';
            renderProducts(category);
        });
    });
}

function mapCategory(category) {
    switch (category) {
        case 'interior':
            return 'Interior';
        case 'exterior':
            return 'Exterior';
        case 'special':
            return 'Especializado';
        default:
            return 'Producto';
    }
}

function setupMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const element = document.querySelector(targetId);
            if (!element) return;
            event.preventDefault();
            const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const projectType = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Por favor completa todos los campos.');
            return;
        }

        alert(`Gracias ${name}. Nuestro equipo contactará al correo ${email} para hablar sobre tu proyecto ${projectType}.`);
        form.reset();
    });
}

function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function initializeComparisonSlider() {
    const slider = document.getElementById('comparisonSlider');
    const afterImg = document.getElementById('comparisonAfter');
    const divider = document.getElementById('comparisonDivider');
    if (!slider || !afterImg || !divider) return;

    const updateSlider = value => {
        afterImg.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
        divider.style.left = `${value}%`;
    };

    slider.addEventListener('input', event => {
        updateSlider(event.target.value);
    });

    updateSlider(slider.value || 50);
}
