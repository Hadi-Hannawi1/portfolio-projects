/* ============================================
   FORM VALIDATION LOGIC
   Handles real-time validation for Step 1 and Step 3
   Step 2 has NO validation (all fields optional)
   ============================================ */

const FormValidation = {
    // Validation rules
    rules: {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters only, min 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            minLength: 10,
            pattern: /^[\d\s\-\(\)\+]+$/,
            message: 'Please enter a valid phone number (min 10 digits)'
        },
        subject: {
            required: true,
            minLength: 5,
            message: 'Please enter a subject (minimum 5 characters)'
        },
        message: {
            required: true,
            minLength: 20,
            maxLength: 1000,
            message: 'Please enter your message (minimum 20 characters)'
        },
        inquiryType: {
            required: true,
            message: 'Please select an inquiry type'
        }
    },

    // Initialize validation
    init() {
        this.attachValidationListeners();
        this.setupCharacterCounter();
    },

    // Attach validation listeners to form fields
    attachValidationListeners() {
        // Step 1 fields (required validation)
        const step1Fields = ['fullName', 'email', 'phone'];
        step1Fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                // Validate on blur
                field.addEventListener('blur', () => {
                    this.validateField(fieldId);
                    this.updateStepButton(1);
                });

                // Validate on input (for real-time feedback)
                field.addEventListener('input', () => {
                    this.validateField(fieldId);
                    this.updateStepButton(1);
                });
            }
        });

        // Step 3 fields (required validation)
        const subjectField = document.getElementById('subject');
        if (subjectField) {
            subjectField.addEventListener('blur', () => {
                this.validateField('subject');
                this.updateStepButton(3);
            });
            subjectField.addEventListener('input', () => {
                this.validateField('subject');
                this.updateStepButton(3);
            });
        }

        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.addEventListener('blur', () => {
                this.validateField('message');
                this.updateStepButton(3);
            });
            messageField.addEventListener('input', () => {
                this.validateField('message');
                this.updateStepButton(3);
            });
        }

        // Inquiry Type cards (Step 3)
        const inquiryCards = document.querySelectorAll('[data-step="3"] .inquiry-cards .selection-card');
        inquiryCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selected class from all cards
                inquiryCards.forEach(c => c.classList.remove('selected'));
                // Add selected class to clicked card
                card.classList.add('selected');
                // Set hidden input value
                const inquiryTypeInput = document.getElementById('inquiryType');
                inquiryTypeInput.value = card.dataset.value;
                // Clear error message
                const errorMsg = inquiryTypeInput.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.textContent = '';
                }
                // Update submit button
                this.updateStepButton(3);
            });
        });
    },

    // Validate a specific field
    validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const rule = this.rules[fieldId];
        
        if (!field || !rule) return true;

        const value = field.value.trim();
        const wrapper = field.closest('.input-wrapper') || field.closest('.form-group');
        const errorElement = wrapper.querySelector('.error-message');
        const validationIcon = wrapper.querySelector('.validation-icon');

        // Check if field is required
        if (rule.required && !value) {
            this.showError(errorElement, validationIcon, rule.message);
            return false;
        }

        // Check minimum length
        if (rule.minLength && value.length > 0 && value.length < rule.minLength) {
            this.showError(errorElement, validationIcon, rule.message);
            return false;
        }

        // Check maximum length
        if (rule.maxLength && value.length > rule.maxLength) {
            this.showError(errorElement, validationIcon, `Maximum ${rule.maxLength} characters allowed`);
            return false;
        }

        // Check pattern
        if (rule.pattern && value.length > 0 && !rule.pattern.test(value)) {
            this.showError(errorElement, validationIcon, rule.message);
            return false;
        }

        // Field is valid
        this.showValid(errorElement, validationIcon);
        return true;
    },

    // Show error state
    showError(errorElement, validationIcon, message) {
        if (errorElement) {
            errorElement.textContent = message;
        }
        if (validationIcon) {
            validationIcon.classList.remove('valid');
            validationIcon.classList.add('invalid');
        }
    },

    // Show valid state
    showValid(errorElement, validationIcon) {
        if (errorElement) {
            errorElement.textContent = '';
        }
        if (validationIcon) {
            validationIcon.classList.remove('invalid');
            validationIcon.classList.add('valid');
        }
    },

    // Validate entire step
    validateStep(stepNumber) {
        let isValid = true;

        if (stepNumber === 1) {
            // Validate Step 1 fields
            const step1Fields = ['fullName', 'email', 'phone'];
            step1Fields.forEach(fieldId => {
                if (!this.validateField(fieldId)) {
                    isValid = false;
                }
            });
        } else if (stepNumber === 2) {
            // Step 2 has NO required fields - always valid
            isValid = true;
        } else if (stepNumber === 3) {
            // Validate Step 3 fields
            if (!this.validateField('subject')) {
                isValid = false;
            }
            if (!this.validateField('message')) {
                isValid = false;
            }

            // Check inquiry type
            const inquiryTypeInput = document.getElementById('inquiryType');
            if (!inquiryTypeInput.value) {
                const errorElement = inquiryTypeInput.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = 'Please select an inquiry type';
                }
                isValid = false;
            }
        }

        return isValid;
    },

    // Update Next/Submit button state based on validation
    updateStepButton(stepNumber) {
        let button;
        
        if (stepNumber === 1) {
            button = document.querySelector('.btn-next[data-step="1"]');
        } else if (stepNumber === 2) {
            button = document.querySelector('.btn-next[data-step="2"]');
            // Step 2 button is ALWAYS enabled (no validation)
            if (button) {
                button.disabled = false;
            }
            return;
        } else if (stepNumber === 3) {
            button = document.querySelector('.btn-submit');
        }

        if (!button) return;

        const isValid = this.validateStep(stepNumber);
        button.disabled = !isValid;
    },

    // Setup character counter for message field
    setupCharacterCounter() {
        const messageField = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        const charCounter = document.querySelector('.char-counter');

        if (messageField && charCount) {
            messageField.addEventListener('input', () => {
                const length = messageField.value.length;
                charCount.textContent = length;

                // Add warning class if approaching limit
                if (length > 900) {
                    charCounter.classList.add('warning');
                } else {
                    charCounter.classList.remove('warning');
                }
            });
        }
    },

    // Get all form data
    getFormData() {
        const formData = {};
        
        // Step 1 fields
        formData.fullName = document.getElementById('fullName').value.trim();
        formData.email = document.getElementById('email').value.trim();
        formData.phone = document.getElementById('phone').value.trim();
        formData.company = document.getElementById('company').value.trim();

        // Step 2 fields
        formData.industry = document.getElementById('industry').value;
        formData.companySize = document.getElementById('companySize').value;
        formData.website = document.getElementById('website').value.trim();
        formData.referralSource = document.getElementById('referralSource').value;

        // Step 3 fields
        formData.subject = document.getElementById('subject').value.trim();
        formData.inquiryType = document.getElementById('inquiryType').value;
        formData.message = document.getElementById('message').value.trim();
        formData.budget = document.getElementById('budget').value;
        formData.timeline = document.getElementById('timeline').value;
        
        // Get urgency (radio button)
        const urgencyRadio = document.querySelector('input[name="urgency"]:checked');
        formData.urgency = urgencyRadio ? urgencyRadio.value : '';

        return formData;
    },

    // Restore form data
    restoreFormData(data) {
        if (!data) return;

        // Step 1 fields
        if (data.fullName) document.getElementById('fullName').value = data.fullName;
        if (data.email) document.getElementById('email').value = data.email;
        if (data.phone) document.getElementById('phone').value = data.phone;
        if (data.company) document.getElementById('company').value = data.company;

        // Step 2 fields
        if (data.industry) document.getElementById('industry').value = data.industry;
        if (data.website) document.getElementById('website').value = data.website;
        if (data.referralSource) document.getElementById('referralSource').value = data.referralSource;
        
        // Company size card selection
        if (data.companySize) {
            const companySizeCards = document.querySelectorAll('[data-step="2"] .card-selection .selection-card');
            companySizeCards.forEach(card => {
                if (card.dataset.value === data.companySize) {
                    card.classList.add('selected');
                    document.getElementById('companySize').value = data.companySize;
                }
            });
        }

        // Step 3 fields
        if (data.subject) document.getElementById('subject').value = data.subject;
        if (data.message) {
            document.getElementById('message').value = data.message;
            document.getElementById('charCount').textContent = data.message.length;
        }
        if (data.budget) document.getElementById('budget').value = data.budget;
        if (data.timeline) document.getElementById('timeline').value = data.timeline;
        
        // Inquiry type card selection
        if (data.inquiryType) {
            const inquiryCards = document.querySelectorAll('[data-step="3"] .inquiry-cards .selection-card');
            inquiryCards.forEach(card => {
                if (card.dataset.value === data.inquiryType) {
                    card.classList.add('selected');
                    document.getElementById('inquiryType').value = data.inquiryType;
                }
            });
        }

        // Urgency radio button
        if (data.urgency) {
            const urgencyRadio = document.querySelector(`input[name="urgency"][value="${data.urgency}"]`);
            if (urgencyRadio) urgencyRadio.checked = true;
        }

        // Trigger validation for all restored fields
        setTimeout(() => {
            ['fullName', 'email', 'phone', 'subject', 'message'].forEach(fieldId => {
                this.validateField(fieldId);
            });
            this.updateStepButton(1);
            this.updateStepButton(3);
        }, 100);
    },

    // Clear all form data
    clearForm() {
        document.getElementById('multiStepForm').reset();
        
        // Clear card selections
        document.querySelectorAll('.selection-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Clear hidden inputs
        document.getElementById('companySize').value = '';
        document.getElementById('inquiryType').value = '';
        
        // Clear validation icons
        document.querySelectorAll('.validation-icon').forEach(icon => {
            icon.classList.remove('valid', 'invalid');
        });
        
        // Clear error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        // Reset character counter
        document.getElementById('charCount').textContent = '0';
        
        // Disable buttons
        document.querySelector('.btn-next[data-step="1"]').disabled = true;
        document.querySelector('.btn-submit').disabled = true;
    }
};
