/**
 * La Belle Cuisine - Main JavaScript
 * Handles navigation, scroll effects, animations, and UI interactions
 */

// ===================================
// LOADING SCREEN
// ===================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// ===================================
// SPECIAL BANNER
// ===================================
const specialBanner = document.getElementById('special-banner');
const bannerClose = document.querySelector('.banner-close');

if (bannerClose) {
    bannerClose.addEventListener('click', () => {
        specialBanner.style.display = 'none';
    });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Shrink header on scroll
    if (currentScroll > 200) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// MOBILE MENU
// ===================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// SCROLL ANIMATIONS (Intersection Observer)
// ===================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .value-card, .offer-card, .info-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// TESTIMONIALS CAROUSEL
// ===================================
class TestimonialsCarousel {
    constructor() {
        this.carousel = document.getElementById('testimonials-carousel');
        if (!this.carousel) return;
        
        this.track = this.carousel.querySelector('.testimonials-track');
        this.cards = this.carousel.querySelectorAll('.testimonial-card');
        this.prevBtn = this.carousel.querySelector('.carousel-prev');
        this.nextBtn = this.carousel.querySelector('.carousel-next');
        this.dotsContainer = this.carousel.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.cards.length === 0) return;
        
        // Create dots
        this.createDots();
        
        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    createDots() {
        this.cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        const offset = -index * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.goToSlide(this.currentIndex);
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.goToSlide(this.currentIndex);
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.next(), 6000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize testimonials carousel
new TestimonialsCarousel();

// ===================================
// CHEF'S SPECIALS CAROUSEL
// ===================================
class SpecialsSlider {
    constructor() {
        this.slider = document.getElementById('specials-slider');
        if (!this.slider) return;
        
        this.track = this.slider.querySelector('.slider-track');
        this.prevBtn = this.slider.querySelector('.slider-prev');
        this.nextBtn = this.slider.querySelector('.slider-next');
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        
        this.currentIndex = 0;
        this.slides = [];
        this.autoplayInterval = null;
        
        this.init();
    }
    
    async init() {
        await this.loadSpecials();
        this.createDots();
        this.setupEventListeners();
        this.startAutoplay();
    }
    
    async loadSpecials() {
        try {
            const response = await fetch('data/menu-items.json');
            const data = await response.json();
            
            // Get chef's specials from all categories
            const allItems = [
                ...data.appetizers,
                ...data.mains,
                ...data.desserts,
                ...data.beverages
            ];
            
            const specials = allItems.filter(item => item.chefSpecial);
            
            specials.forEach(special => {
                this.createSlide(special);
            });
            
            this.slides = this.track.querySelectorAll('.special-slide');
        } catch (error) {
            console.error('Error loading chef specials:', error);
        }
    }
    
    createSlide(item) {
        const slide = document.createElement('div');
        slide.classList.add('special-slide');
        slide.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="special-slide-bg">
            <div class="special-slide-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="special-slide-price">€${item.price}</div>
                <a href="#reservations" class="btn btn-primary btn-lg">Reserve Now</a>
            </div>
        `;
        this.track.appendChild(slide);
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('.slider-dot');
    }
    
    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
        this.slider.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        const offset = -index * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(this.currentIndex);
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(this.currentIndex);
    }
    
    startAutoplay() {
        this.stopAutoplay();
        if (this.slides.length > 1) {
            this.autoplayInterval = setInterval(() => this.next(), 5000);
        }
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize specials slider
new SpecialsSlider();

// ===================================
// NEWSLETTER FORM
// ===================================
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show success message (replace with actual newsletter service integration)
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        newsletterForm.reset();
    });
}

// ===================================
// PARALLAX EFFECT FOR HERO
// ===================================
const heroBg = document.querySelector('.hero-bg');

if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ===================================
// IMAGE LAZY LOADING (Fallback for older browsers)
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    console.log('Native lazy loading supported');
} else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll-intensive functions
window.addEventListener('scroll', debounce(updateActiveNavLink, 50));

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Keyboard navigation for carousels
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Focus trap for mobile menu
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusable = focusableContent[0];
    const lastFocusable = focusableContent[focusableContent.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===================================
// CONSOLE LOG (Remove in production)
// ===================================
console.log('%cLa Belle Cuisine', 'color: #8B0000; font-size: 24px; font-weight: bold;');
console.log('%cWebsite by Hadi Hannawi', 'color: #D4AF37; font-size: 14px;');
console.log('%cAll systems operational ✓', 'color: #2C5530; font-size: 12px;');
