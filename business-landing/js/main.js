/*=============== MOBILE MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove menu on link click (mobile)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL HEADER SHADOW ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/*=============== BACK TO TOP BUTTON ===============*/
const backToTop = document.getElementById('back-to-top');

function scrollTop() {
    if (window.scrollY >= 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

window.addEventListener('scroll', scrollTop);

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*=============== SMOOTH SCROLL FOR LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore if href is just "#"
        if (href === '#' || href === '#privacy' || href === '#terms' || href === '#sitemap') {
            e.preventDefault();
            return;
        }
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*=============== ANIMATED COUNTER FOR STATS ===============*/
const statNumbers = document.querySelectorAll('.stat__number');
let countStarted = false;

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16); // 60fps
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

function checkCounterVisibility() {
    if (countStarted) return;
    
    const statsSection = document.querySelector('.about__stats');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible) {
        countStarted = true;
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        });
    }
}

window.addEventListener('scroll', checkCounterVisibility);
window.addEventListener('load', checkCounterVisibility);

/*=============== PORTFOLIO FILTER ===============*/
const filterButtons = document.querySelectorAll('.filter__btn');
const portfolioItems = document.querySelectorAll('.portfolio__item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                // Add fade-in animation
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.classList.add('hide');
            }
        });
    });
});

/*=============== PORTFOLIO MODAL ===============*/
const portfolioButtons = document.querySelectorAll('.portfolio__btn');
const modal = document.getElementById('portfolio-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

const projectDetails = {
    '1': {
        title: 'TechStart E-Commerce Platform',
        category: 'Web Design',
        client: 'TechStart Inc.',
        date: 'September 2024',
        description: 'Complete redesign and development of an e-commerce platform focusing on user experience and conversion optimization.',
        challenge: 'The client had a high bounce rate and low conversion. Users were abandoning carts due to complicated checkout process.',
        solution: 'We simplified the user flow, implemented one-page checkout, added trust badges, and optimized page loading speed.',
        results: [
            '145% increase in conversions',
            '60% reduction in cart abandonment',
            '2.3s average page load time',
            '98/100 Lighthouse performance score'
        ],
        technologies: ['React', 'Node.js', 'Stripe API', 'MongoDB', 'AWS']
    },
    '2': {
        title: 'GrowthCo Marketing Campaign',
        category: 'Marketing',
        client: 'GrowthCo',
        date: 'August 2024',
        description: 'Multi-channel digital marketing campaign targeting B2B SaaS customers across LinkedIn, Google Ads, and email.',
        challenge: 'GrowthCo needed to generate qualified leads for their enterprise software solution in a competitive market.',
        solution: 'We developed targeted campaigns with compelling content, implemented lead scoring, and created automated nurture sequences.',
        results: [
            '500+ qualified leads generated',
            '$1.2M pipeline created',
            '35% email open rate',
            '4.2% LinkedIn ad conversion rate'
        ],
        technologies: ['LinkedIn Ads', 'Google Ads', 'HubSpot', 'Mailchimp', 'Analytics']
    },
    '3': {
        title: 'Luxe Fashion Brand Identity',
        category: 'Branding',
        client: 'Luxe Fashion',
        date: 'July 2024',
        description: 'Complete brand identity redesign for a premium fashion retailer expanding into European markets.',
        challenge: 'The existing brand felt outdated and didn\'t resonate with their target luxury market demographic.',
        solution: 'We created a sophisticated visual identity with elegant typography, refined color palette, and premium photography style.',
        results: [
            '200% increase in brand awareness',
            '85% positive customer feedback',
            'Featured in 3 fashion magazines',
            '40% increase in social media engagement'
        ],
        technologies: ['Adobe Creative Suite', 'Figma', 'Brand Guidelines', 'Photography Direction']
    },
    '4': {
        title: 'FinTech Analytics Dashboard',
        category: 'Web Design',
        client: 'FinTech Solutions',
        date: 'June 2024',
        description: 'Modern SaaS dashboard with real-time analytics, data visualization, and advanced reporting features.',
        challenge: 'Users struggled to find insights in complex financial data. The old interface was cluttered and confusing.',
        solution: 'We designed an intuitive dashboard with clear data visualization, customizable widgets, and smart filtering options.',
        results: [
            '70% reduction in support tickets',
            '4.8/5 user satisfaction score',
            '90% faster report generation',
            '50% increase in daily active users'
        ],
        technologies: ['Vue.js', 'D3.js', 'Chart.js', 'WebSocket', 'PostgreSQL']
    },
    '5': {
        title: 'Bella Cucina Social Media',
        category: 'Marketing',
        client: 'Bella Cucina Restaurant',
        date: 'May 2024',
        description: 'Comprehensive social media strategy to increase restaurant visibility and drive foot traffic.',
        challenge: 'Restaurant had minimal online presence and relied solely on walk-in customers in a competitive area.',
        solution: 'We created engaging content strategy with food photography, behind-the-scenes content, and user-generated content campaigns.',
        results: [
            '200% increase in foot traffic',
            '5,000+ new Instagram followers',
            '15% increase in average check size',
            'Featured on local food blogs'
        ],
        technologies: ['Instagram', 'Facebook', 'TikTok', 'Content Calendar', 'Canva']
    },
    '6': {
        title: 'EcoGreen Foundation Branding',
        category: 'Branding',
        client: 'EcoGreen Foundation',
        date: 'April 2024',
        description: 'Sustainable brand identity for environmental non-profit focused on climate action and education.',
        challenge: 'The foundation needed a professional brand to attract donors and partners while staying authentic to their mission.',
        solution: 'We developed an eco-friendly visual identity using green tones, natural imagery, and sustainability-focused messaging.',
        results: [
            '300% increase in donations',
            'Partnership with 5 major corporations',
            '10,000+ volunteer sign-ups',
            'Media coverage in national outlets'
        ],
        technologies: ['Brand Strategy', 'Adobe Suite', 'Sustainable Printing', 'Web Design']
    }
};

function openModal(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-primary);">${project.title}</h2>
        <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
            <span style="padding: 0.5rem 1rem; background: var(--primary-color); color: white; border-radius: 2rem; font-size: 0.875rem;">${project.category}</span>
            <span style="padding: 0.5rem 1rem; background: var(--bg-secondary); border-radius: 2rem; font-size: 0.875rem;">${project.client}</span>
            <span style="padding: 0.5rem 1rem; background: var(--bg-secondary); border-radius: 2rem; font-size: 0.875rem;">${project.date}</span>
        </div>
        
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Overview</h3>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">${project.description}</p>
        
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Challenge</h3>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">${project.challenge}</p>
        
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Solution</h3>
        <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">${project.solution}</p>
        
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Results</h3>
        <ul style="list-style: none; padding: 0;">
            ${project.results.map(result => `
                <li style="padding: 0.5rem 0; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-check-circle" style="color: var(--secondary-color);"></i>
                    ${result}
                </li>
            `).join('')}
        </ul>
        
        <h3 style="font-size: 1.25rem; margin: 1.5rem 0 0.5rem;">Technologies Used</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${project.technologies.map(tech => `
                <span style="padding: 0.375rem 0.75rem; background: var(--bg-secondary); border-radius: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">${tech}</span>
            `).join('')}
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

portfolioButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = button.getAttribute('data-project');
        openModal(projectId);
    });
});

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

/*=============== TESTIMONIALS SWIPER ===============*/
const testimonialSwiper = new Swiper('.testimonials-swiper', {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 1,
        },
    },
});

/*=============== FAQ ACCORDION ===============*/
const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

/*=============== FORM VALIDATION & SUBMISSION ===============*/
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

// Validation functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    if (!phone) return true; // Phone is optional
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showError(input, message) {
    input.classList.add('error');
    const errorSpan = input.parentElement.querySelector('.form__error');
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }
}

function clearError(input) {
    input.classList.remove('error');
    const errorSpan = input.parentElement.querySelector('.form__error');
    if (errorSpan) {
        errorSpan.style.display = 'none';
    }
}

// Real-time validation on blur
const formInputs = contactForm.querySelectorAll('.form__input, .form__textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            clearError(input);
        }
    });
});

function validateField(input) {
    const value = input.value.trim();
    const name = input.name;
    
    // Clear previous error
    clearError(input);
    
    // Check required fields
    if (input.required && !value) {
        showError(input, 'This field is required');
        return false;
    }
    
    // Specific validations
    if (name === 'email' && value) {
        if (!validateEmail(value)) {
            showError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (name === 'phone' && value) {
        if (!validatePhone(value)) {
            showError(input, 'Please enter a valid phone number');
            return false;
        }
    }
    
    if (name === 'message' && value) {
        if (value.length < 20) {
            showError(input, 'Message must be at least 20 characters');
            return false;
        }
    }
    
    return true;
}

function validateForm() {
    let isValid = true;
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide any previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // IMPORTANT: Replace this URL with your Formspree endpoint
            // Sign up at https://formspree.io and get your form ID
            const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
            
            // If you want to use EmailJS instead, replace with EmailJS code
            // Visit https://www.emailjs.com/ for setup instructions
            
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (response.ok) {
                // Show success message
                successMessage.style.display = 'flex';
                contactForm.reset();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.style.display = 'flex';
            
            // Scroll to error message
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

/*=============== NEWSLETTER FORM ===============*/
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('.newsletter__input');
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would send the email to your newsletter service
        // For demo purposes, we'll just show an alert
        alert('Thank you for subscribing! We\'ll keep you updated.');
        newsletterForm.reset();
        
        // In production, integrate with services like:
        // - Mailchimp
        // - ConvertKit
        // - Sendinblue
        // - Your own backend API
    });
}

/*=============== SCROLL REVEAL ANIMATION (ALTERNATIVE TO AOS) ===============*/
// If you prefer not to use AOS library, uncomment this code for custom scroll animations

/*
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to elements
document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
*/

/*=============== LAZY LOADING IMAGES ===============*/
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

/*=============== PERFORMANCE: DEBOUNCE SCROLL EVENTS ===============*/
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    scrollActive();
    scrollHeader();
    scrollTop();
    checkCounterVisibility();
}, 10));

/*=============== CONSOLE MESSAGE ===============*/
console.log('%c🚀 Digital Growth Studio', 'font-size: 20px; font-weight: bold; color: #3B82F6;');
console.log('%cBuilt with ❤️ by Digital Growth Studio', 'font-size: 14px; color: #6B7280;');
console.log('%cInterested in working with us? Visit: https://digitalgrowthstudio.com', 'font-size: 12px; color: #10B981;');