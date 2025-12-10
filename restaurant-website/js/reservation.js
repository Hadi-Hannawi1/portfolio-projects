/**
 * La Belle Cuisine - Reservation System
 * Handles form validation, date restrictions, and submission
 */

class ReservationSystem {
    constructor() {
        this.form = document.getElementById('reservation-form');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.guestsInput = document.getElementById('guests');
        this.dateInput = document.getElementById('date');
        this.timeInput = document.getElementById('time');
        this.occasionInput = document.getElementById('occasion');
        this.requestsInput = document.getElementById('requests');
        this.formStatus = document.getElementById('form-status');
        this.charCount = document.querySelector('.char-count');
        
        // Formspree endpoint - REPLACE WITH YOUR ACTUAL ENDPOINT
        this.formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.setupDateRestrictions();
        this.setupEventListeners();
        this.updateCharCount();
    }
    
    setupDateRestrictions() {
        if (!this.dateInput) return;
        
        // Set minimum date to today
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];
        this.dateInput.min = minDate;
        
        // Set maximum date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        this.dateInput.max = maxDate.toISOString().split('T')[0];
        
        // Block Mondays (restaurant is closed)
        this.dateInput.addEventListener('change', () => {
            const selectedDate = new Date(this.dateInput.value);
            const dayOfWeek = selectedDate.getDay();
            
            // 1 = Monday
            if (dayOfWeek === 1) {
                this.showError(this.dateInput, 'Sorry, we are closed on Mondays. Please choose another date.');
                this.dateInput.value = '';
            } else {
                this.clearError(this.dateInput);
            }
        });
    }
    
    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        if (this.nameInput) {
            this.nameInput.addEventListener('blur', () => this.validateName());
        }
        
        if (this.emailInput) {
            this.emailInput.addEventListener('blur', () => this.validateEmail());
        }
        
        if (this.phoneInput) {
            this.phoneInput.addEventListener('blur', () => this.validatePhone());
        }
        
        // Character counter for special requests
        if (this.requestsInput && this.charCount) {
            this.requestsInput.addEventListener('input', () => this.updateCharCount());
        }
        
        // Add special occasion icon
        if (this.occasionInput) {
            this.occasionInput.addEventListener('change', () => {
                const value = this.occasionInput.value;
                if (value === 'birthday' || value === 'anniversary') {
                    this.showOccasionNote(value);
                }
            });
        }
    }
    
    updateCharCount() {
        if (!this.requestsInput || !this.charCount) return;
        
        const currentLength = this.requestsInput.value.length;
        const maxLength = this.requestsInput.maxLength;
        this.charCount.textContent = `${currentLength} / ${maxLength}`;
        
        // Change color when approaching limit
        if (currentLength > maxLength * 0.9) {
            this.charCount.style.color = '#DC3545';
        } else {
            this.charCount.style.color = '#666666';
        }
    }
    
    validateName() {
        const name = this.nameInput.value.trim();
        
        if (name.length < 2) {
            this.showError(this.nameInput, 'Please enter your full name');
            return false;
        }
        
        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            this.showError(this.nameInput, 'Please enter a valid name');
            return false;
        }
        
        this.clearError(this.nameInput);
        return true;
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            this.showError(this.emailInput, 'Please enter a valid email address');
            return false;
        }
        
        this.clearError(this.emailInput);
        return true;
    }
    
    validatePhone() {
        const phone = this.phoneInput.value.trim();
        
        // Remove spaces and special characters for validation
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        
        if (cleanPhone.length < 10) {
            this.showError(this.phoneInput, 'Please enter a valid phone number');
            return false;
        }
        
        this.clearError(this.phoneInput);
        return true;
    }
    
    validateGuests() {
        if (!this.guestsInput.value) {
            this.showError(this.guestsInput, 'Please select number of guests');
            return false;
        }
        
        this.clearError(this.guestsInput);
        return true;
    }
    
    validateDate() {
        if (!this.dateInput.value) {
            this.showError(this.dateInput, 'Please select a date');
            return false;
        }
        
        const selectedDate = new Date(this.dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            this.showError(this.dateInput, 'Please select a future date');
            return false;
        }
        
        this.clearError(this.dateInput);
        return true;
    }
    
    validateTime() {
        if (!this.timeInput.value) {
            this.showError(this.timeInput, 'Please select a time');
            return false;
        }
        
        this.clearError(this.timeInput);
        return true;
    }
    
    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        input.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        input.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    showOccasionNote(occasion) {
        const occasionText = occasion === 'birthday' ? 'Birthday' : 'Anniversary';
        const message = `We'll prepare something special for your ${occasionText.toLowerCase()}! 🎉`;
        
        // Show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'occasion-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #8B0000, #6B0000);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isPhoneValid = this.validatePhone();
        const isGuestsValid = this.validateGuests();
        const isDateValid = this.validateDate();
        const isTimeValid = this.validateTime();
        
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isGuestsValid || !isDateValid || !isTimeValid) {
            this.showFormStatus('error', 'Please fill in all required fields correctly.');
            return;
        }
        
        // Collect form data
        const formData = {
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            phone: this.phoneInput.value.trim(),
            guests: this.guestsInput.value,
            date: this.dateInput.value,
            time: this.timeInput.value,
            occasion: this.occasionInput.value,
            requests: this.requestsInput.value.trim()
        };
        
        // Submit form
        try {
            await this.submitReservation(formData);
        } catch (error) {
            console.error('Submission error:', error);
            this.showFormStatus('error', 'An error occurred. Please try again or call us directly.');
        }
    }
    
    async submitReservation(data) {
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        try {
            // OPTION 1: Formspree Integration (recommended)
            const response = await fetch(this.formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Submission failed');
            }
            
            // Success
            this.showFormStatus('success', `
                🎉 Reservation confirmed! <br>
                We've sent a confirmation email to ${data.email}. <br>
                See you on ${this.formatDate(data.date)} at ${data.time}!
            `);
            
            // Reset form
            this.form.reset();
            this.updateCharCount();
            
        } catch (error) {
            // OPTION 2: Fallback - Email link (if Formspree fails)
            this.showFormStatus('error', `
                Unable to submit online. <br>
                Please <a href="mailto:reservations@labellecuisine.com?subject=Reservation Request&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0AGuests: ${data.guests}%0D%0ADate: ${data.date}%0D%0ATime: ${data.time}%0D%0AOccasion: ${data.occasion}%0D%0ASpecial Requests: ${data.requests}">email us directly</a> 
                or call <a href="tel:+33668839197">+33 6 68 83 91 97</a>
            `);
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
    
    showFormStatus(type, message) {
        this.formStatus.className = `form-status ${type}`;
        this.formStatus.innerHTML = message;
        this.formStatus.style.display = 'block';
        
        // Scroll to status message
        this.formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 10 seconds
        if (type === 'success') {
            setTimeout(() => {
                this.formStatus.style.display = 'none';
            }, 10000);
        }
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

// Initialize reservation system when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ReservationSystem();
    });
} else {
    new ReservationSystem();
}

// Add slide animations for notifications
if (!document.querySelector('#slide-animations')) {
    const style = document.createElement('style');
    style.id = 'slide-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReservationSystem;
}
