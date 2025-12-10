/* ============================================
   FORM STEPS NAVIGATION
   Handles Next, Previous, and step transitions
   CRITICAL: Step 2 Next button is ALWAYS enabled
   ============================================ */

const FormSteps = {
    currentStep: 1,
    totalSteps: 3,

    // Initialize form steps
    init() {
        this.setupStepNavigation();
        this.setupCardSelections();
        this.updateProgressIndicator();
        
        // CRITICAL: Enable Step 2 Next button by default (no validation needed)
        const step2NextBtn = document.querySelector('.btn-next[data-step="2"]');
        if (step2NextBtn) {
            step2NextBtn.disabled = false;
        }
    },

    // Setup navigation button listeners
    setupStepNavigation() {
        // Next buttons
        const nextButtons = document.querySelectorAll('.btn-next');
        nextButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const step = parseInt(btn.dataset.step);
                this.nextStep(step);
            });
        });

        // Previous buttons
        const prevButtons = document.querySelectorAll('.btn-prev');
        prevButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const step = parseInt(btn.dataset.step);
                this.previousStep(step);
            });
        });

        // Progress step circles (click to navigate)
        const progressSteps = document.querySelectorAll('.progress-step');
        progressSteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                const targetStep = index + 1;
                // Only allow clicking on previous steps or current step
                if (targetStep < this.currentStep || targetStep === this.currentStep) {
                    this.goToStep(targetStep);
                }
            });
        });
    },

    // Handle Next button click
    nextStep(fromStep) {
        // Validate current step before proceeding
        // Step 2 validation is skipped (always returns true)
        if (!FormValidation.validateStep(fromStep)) {
            // Show validation errors
            return;
        }

        // Move to next step
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgressIndicator();
            this.scrollToTop();
            
            // Save form data to localStorage
            this.saveFormProgress();
        }
    },

    // Handle Previous button click
    previousStep(fromStep) {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep, true); // true = going back
            this.updateProgressIndicator();
            this.scrollToTop();
            
            // Save form data to localStorage
            this.saveFormProgress();
        }
    },

    // Go to specific step (used by progress indicator clicks)
    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            const isGoingBack = stepNumber < this.currentStep;
            this.currentStep = stepNumber;
            this.showStep(this.currentStep, isGoingBack);
            this.updateProgressIndicator();
            this.scrollToTop();
        }
    },

    // Show specific step
    showStep(stepNumber, isGoingBack = false) {
        // Hide all steps
        const allSteps = document.querySelectorAll('.form-step');
        allSteps.forEach(step => {
            step.classList.remove('active', 'slide-back');
        });

        // Show current step with appropriate animation
        const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
            if (isGoingBack) {
                currentStepElement.classList.add('slide-back');
            }
        }
    },

    // Update progress indicator
    updateProgressIndicator() {
        // Update progress bar
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressFill.dataset.progress = progressPercentage;

        // Update progress steps
        const progressSteps = document.querySelectorAll('.progress-step');
        progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            
            // Remove all state classes
            step.classList.remove('active', 'completed');
            
            // Add appropriate state class
            if (stepNumber === this.currentStep) {
                step.classList.add('active');
            } else if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            }
        });
    },

    // Setup card selections (company size, inquiry type)
    setupCardSelections() {
        // Company Size cards (Step 2)
        const companySizeCards = document.querySelectorAll('[data-step="2"] .card-selection .selection-card');
        const companySizeInput = document.getElementById('companySize');
        
        companySizeCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selected class from all cards
                companySizeCards.forEach(c => c.classList.remove('selected'));
                // Add selected class to clicked card
                card.classList.add('selected');
                // Set hidden input value
                if (companySizeInput) {
                    companySizeInput.value = card.dataset.value;
                }
                // Save progress
                this.saveFormProgress();
            });
        });
    },

    // Scroll to top of form
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // Save form progress to localStorage
    saveFormProgress() {
        const formData = FormValidation.getFormData();
        formData.currentStep = this.currentStep;
        
        try {
            localStorage.setItem('smartFormProgress', JSON.stringify(formData));
        } catch (e) {
            console.error('Error saving form progress:', e);
        }
    },

    // Load form progress from localStorage
    loadFormProgress() {
        try {
            const savedData = localStorage.getItem('smartFormProgress');
            if (savedData) {
                const data = JSON.parse(savedData);
                
                // Restore form fields
                FormValidation.restoreFormData(data);
                
                // Restore current step
                if (data.currentStep && data.currentStep >= 1 && data.currentStep <= this.totalSteps) {
                    this.currentStep = data.currentStep;
                    this.showStep(this.currentStep);
                    this.updateProgressIndicator();
                }
                
                return true;
            }
        } catch (e) {
            console.error('Error loading form progress:', e);
        }
        return false;
    },

    // Clear saved progress
    clearFormProgress() {
        try {
            localStorage.removeItem('smartFormProgress');
        } catch (e) {
            console.error('Error clearing form progress:', e);
        }
    },

    // Reset form to Step 1
    resetForm() {
        this.currentStep = 1;
        this.showStep(1);
        this.updateProgressIndicator();
        FormValidation.clearForm();
        this.clearFormProgress();
        this.scrollToTop();
        
        // Re-enable Step 2 Next button
        const step2NextBtn = document.querySelector('.btn-next[data-step="2"]');
        if (step2NextBtn) {
            step2NextBtn.disabled = false;
        }
    }
};

// Auto-save functionality
let autoSaveInterval;

function startAutoSave() {
    // Auto-save every 5 seconds
    autoSaveInterval = setInterval(() => {
        // Only auto-save if form has data
        const formData = FormValidation.getFormData();
        const hasData = Object.values(formData).some(value => value && value.length > 0);
        
        if (hasData) {
            FormSteps.saveFormProgress();
            console.log('Form auto-saved');
        }
    }, 5000);
}

function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
}
