document.addEventListener('DOMContentLoaded', () => {
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- 1. Desktop-Only Effects ---
    if (!isTouchDevice()) {
        const blob = document.getElementById('blob');
        const floatingObjects = document.querySelectorAll('.floating-object');

        window.addEventListener('pointermove', (event) => {
            const { clientX, clientY } = event;
            blob.animate({ left: `${clientX}px`, top: `${clientY}px` }, { duration: 3000, fill: "forwards" });

            const xOffset = (window.innerWidth / 2 - clientX) / 50;
            const yOffset = (window.innerHeight / 2 - clientY) / 50;
            floatingObjects.forEach(obj => {
                const speed = obj.dataset.speed;
                obj.style.transform = `translateX(${xOffset * speed}px) translateY(${yOffset * speed}px)`;
            });
        });
    } else {
        // On mobile, hide the effects for better performance
        const blob = document.getElementById('blob');
        if (blob) blob.style.display = 'none';
    }

    // --- 2. Header Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- 3. Mobile Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    navItems.forEach(item => item.addEventListener('click', closeMenu));

    // --- 4. Active Nav Link on Scroll (Scroll-Spy) ---
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 80) { // Offset for better accuracy
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's ID
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true }); // Use passive listener for better scroll performance

    // --- 5. Scroll Reveal Animation ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // --- 6. Lightbox for Certificates ---
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    if (lightboxOverlay) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxClose = document.querySelector('.lightbox-close');
        const certImageContainers = document.querySelectorAll('.cert-image-container');

        const closeLightbox = () => lightboxOverlay.classList.remove('active');

        certImageContainers.forEach(container => {
            container.addEventListener('click', () => {
                const imgSrc = container.querySelector('img').src;
                lightboxImage.src = imgSrc;
                lightboxOverlay.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });
    }
});