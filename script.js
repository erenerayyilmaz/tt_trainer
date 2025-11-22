// Table Tennis Coach Website - JavaScript
// Smooth animations, scroll effects, and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initContactForm();
    initMobileMenu();
    initSmoothScrolling();
    initParallaxEffects();
    initGalleryModal();
    initLoadingAnimations();
    initGalleryCarousel(); // UPDATED: Initialize gallery carousel
    initHeroArrowScroll(); // UPDATED: Make hero scroll arrow clickable
    initReferencesCarousel(); // UPDATED: Initialize references carousel
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// UPDATED: Enhanced scroll animations with smooth fade-in + upward motion for sections
function initScrollAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // If user prefers reduced motion, just show all elements
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        document.querySelectorAll('section[id]').forEach(section => {
            section.classList.add('revealed');
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                    applyAnimation(element, animationType);
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // UPDATED: Enhanced section reveal animation with fade-in + upward motion
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
}

// Apply specific animations
function applyAnimation(element, animationType) {
    const animations = {
        'fade-up': {
            transform: 'translateY(0)',
            opacity: '1'
        },
        'fade-down': {
            transform: 'translateY(0)',
            opacity: '1'
        },
        'fade-left': {
            transform: 'translateX(0)',
            opacity: '1'
        },
        'fade-right': {
            transform: 'translateX(0)',
            opacity: '1'
        },
        'zoom-in': {
            transform: 'scale(1)',
            opacity: '1'
        },
        'slide-up': {
            transform: 'translateY(0)',
            opacity: '1'
        }
    };
    
    const animation = animations[animationType];
    if (animation) {
        Object.assign(element.style, animation);
    }
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Lütfen tüm gerekli alanları doldurun.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
            form.reset();
            
            // In a real application, you would send the data to a server
            console.log('Form data:', data);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#10b981', // UPDATED: Changed from blue to green
        warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Gallery modal functionality
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openImageModal(img.src, img.alt);
            }
        });
    });
}

function openImageModal(src, alt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${src}" alt="${alt}">
            </div>
        </div>
    `;
    
    // Style the modal
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            transition: opacity 0.3s ease;
        }
        
        .modal-close:hover {
            opacity: 0.7;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    });
    
    // Close with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Loading animations
function initLoadingAnimations() {
    // Add loading class to elements that should animate on load
    const elementsToAnimate = document.querySelectorAll('.hero-text, .hero-image');
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('loading');
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events efficiently
    const scrolled = window.pageYOffset;
    
    // Update navbar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// Add CSS for initial animation states
const animationCSS = `
    [data-aos] {
        opacity: 0;
        transition: all 0.6s ease-out;
    }
    
    [data-aos="fade-up"] {
        transform: translateY(30px);
    }
    
    [data-aos="fade-down"] {
        transform: translateY(-30px);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(30px);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(-30px);
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.8);
    }
    
    [data-aos="slide-up"] {
        transform: translateY(50px);
    }
    
    .aos-animate {
        opacity: 1 !important;
        transform: none !important;
    }
    
    .loading {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject animation CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent animations
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        // Trigger reflow for responsive adjustments
        item.style.transform = 'none';
        setTimeout(() => {
            item.style.transform = '';
        }, 10);
    });
}, 250));

// Add smooth hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.btn, .service-card, .feature-item, .testimonial-card, .gallery-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease-in-out';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease-in-out';
        });
    });
});

// Add click effects for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleCSS = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = rippleCSS;
    document.head.appendChild(rippleStyle);
});

// UPDATED: Gallery Carousel functionality
function initGalleryCarousel() {
    const carouselTrack = document.querySelector('.gallery-carousel-track');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const dots = document.querySelectorAll('.carousel-dot');
    const items = document.querySelectorAll('.gallery-item');
    
    if (!carouselTrack || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let itemsPerView = 3; // Desktop: 3 items
    
    // Calculate items per view based on screen size
    function updateItemsPerView() {
        if (window.innerWidth <= 480) {
            itemsPerView = 1; // Mobile: 1 item
        } else if (window.innerWidth <= 768) {
            itemsPerView = 2; // Tablet: 2 items
        } else {
            itemsPerView = 3; // Desktop: 3 items
        }
    }
    
    // Update dots based on items per view
    function updateDots() {
        const totalSlides = Math.max(1, items.length - itemsPerView + 1);
        dots.forEach((dot, index) => {
            if (index < totalSlides) {
                dot.style.display = 'block';
            } else {
                dot.style.display = 'none';
            }
        });
    }
    
    // Move carousel to specific index
    function moveToIndex(index) {
        updateItemsPerView();
        const maxIndex = Math.max(0, items.length - itemsPerView);
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        // Calculate translateX based on item width and gap
        if (items.length > 0 && items[0].offsetWidth > 0) {
            const itemWidth = items[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(carouselTrack).gap) || 24;
            const translateX = -(currentIndex * (itemWidth + gap));
            
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        }
        
        // Update active dot
        const totalSlides = Math.max(1, items.length - itemsPerView + 1);
        const slideNumber = Math.min(Math.floor(currentIndex / Math.max(1, itemsPerView)), totalSlides - 1);
        dots.forEach((dot, index) => {
            if (index < totalSlides) {
                if (index === slideNumber) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            }
        });
    }
    
    // Next slide
    function nextSlide() {
        updateItemsPerView();
        const maxIndex = Math.max(0, items.length - itemsPerView);
        if (currentIndex < maxIndex) {
            moveToIndex(Math.min(currentIndex + itemsPerView, maxIndex));
        } else {
            moveToIndex(0); // Loop back to start
        }
    }
    
    // Previous slide
    function prevSlide() {
        updateItemsPerView();
        const maxIndex = Math.max(0, items.length - itemsPerView);
        if (currentIndex > 0) {
            moveToIndex(Math.max(0, currentIndex - itemsPerView));
        } else {
            moveToIndex(maxIndex); // Loop to end
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation - each dot represents a "page" of items
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateItemsPerView();
            // Each dot represents moving to a new set of itemsPerView items
            const targetIndex = index * itemsPerView;
            const maxIndex = Math.max(0, items.length - itemsPerView);
            moveToIndex(Math.min(targetIndex, maxIndex));
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateItemsPerView();
            updateDots();
            moveToIndex(currentIndex);
        }, 250);
    });
    
    // Initialize on load
    updateItemsPerView();
    updateDots();
    moveToIndex(0);
    
    // Optional: Auto-play (commented out, can be enabled)
    // let autoPlayInterval = setInterval(nextSlide, 5000);
    // carouselTrack.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    // carouselTrack.addEventListener('mouseleave', () => {
    //     autoPlayInterval = setInterval(nextSlide, 5000);
    // });
}

console.log('Table Tennis Coach Website - JavaScript loaded successfully!');

// UPDATED: Smooth scroll when clicking the hero scroll arrow
function initHeroArrowScroll() {
    const arrow = document.querySelector('.scroll-arrow');
    const target = document.querySelector('#next-section');
    if (!arrow || !target) return;
    arrow.style.cursor = 'pointer';
    arrow.addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
}

// UPDATED: References Carousel functionality with autoplay and swipe support
function initReferencesCarousel() {
    const carouselTrack = document.querySelector('.references-carousel-track');
    const prevBtn = document.querySelector('.references-carousel-btn-prev');
    const nextBtn = document.querySelector('.references-carousel-btn-next');
    const dots = document.querySelectorAll('.references-carousel-dot');
    const cards = document.querySelectorAll('.reference-card');
    
    if (!carouselTrack || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    
    // Move carousel to specific index
    function moveToIndex(index, smooth = true) {
        const maxIndex = cards.length - 1;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        // Get the carousel container width (parent of track)
        const carousel = carouselTrack.parentElement;
        if (carousel && carousel.offsetWidth > 0) {
            const containerWidth = carousel.offsetWidth;
            const translateX = -(currentIndex * containerWidth);
            
            carouselTrack.style.transition = smooth ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        } else if (cards.length > 0 && cards[0].offsetWidth > 0) {
            // Fallback to card width if container width not available
            const cardWidth = cards[0].offsetWidth;
            const translateX = -(currentIndex * cardWidth);
            
            carouselTrack.style.transition = smooth ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        }
        
        // Update active dot
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Next slide
    function nextSlide() {
        const maxIndex = cards.length - 1;
        if (currentIndex < maxIndex) {
            moveToIndex(currentIndex + 1);
        } else {
            moveToIndex(0); // Loop back to start
        }
    }
    
    // Previous slide
    function prevSlide() {
        const maxIndex = cards.length - 1;
        if (currentIndex > 0) {
            moveToIndex(currentIndex - 1);
        } else {
            moveToIndex(maxIndex); // Loop to end
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToIndex(index);
        });
    });
    
    // Touch/swipe support for mobile
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    // Mouse drag support for desktop
    carouselTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carouselTrack.offsetLeft;
        scrollLeft = carouselTrack.scrollLeft;
        carouselTrack.style.cursor = 'grabbing';
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        isDragging = false;
        carouselTrack.style.cursor = 'grab';
    });
    
    carouselTrack.addEventListener('mouseup', () => {
        isDragging = false;
        carouselTrack.style.cursor = 'grab';
    });
    
    carouselTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselTrack.offsetLeft;
        const walk = (x - startX) * 2;
        // Visual feedback only, actual navigation handled by swipe detection
    });
    
    // Handle swipe gesture
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                nextSlide();
            } else {
                // Swipe right - previous
                prevSlide();
            }
        }
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            moveToIndex(currentIndex, false);
        }, 250);
    });
    
    // Initialize on load
    moveToIndex(0);
}
