/* ============================================
   MAIN JAVASCRIPT - SMART FORM PROCESSOR
   Initializes all modules and handles auto-save/recovery
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Smart Form Processor initialized');

    // Check for saved form data
    checkForSavedData();

    // Initialize all modules
    initializeModules();

    // Start auto-save
    startAutoSave();
});

// Check for saved form data and show recovery modal
function checkForSavedData() {
    try {
        const savedData = localStorage.getItem('smartFormProgress');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            
            // Check if there's meaningful data (not just empty fields)
            const hasData = Object.values(data).some(value => {
                return value && typeof value === 'string' && value.trim().length > 0;
            });

            if (hasData) {
                showRecoveryModal();
            }
        }
    } catch (e) {
        console.error('Error checking saved data:', e);
    }
}

// Show recovery modal
function showRecoveryModal() {
    const modal = document.getElementById('recoveryModal');
    const restoreBtn = document.getElementById('restoreBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Show modal
    modal.classList.remove('hidden');

    // Handle restore button
    restoreBtn.addEventListener('click', () => {
        // Restore form data
        const hasRestored = FormSteps.loadFormProgress();
        
        if (hasRestored) {
            console.log('Form data restored');
        }
        
        // Hide modal
        modal.classList.add('hidden');
    }, { once: true });

    // Handle clear button
    clearBtn.addEventListener('click', () => {
        // Clear saved data
        FormSteps.clearFormProgress();
        console.log('Form data cleared');
        
        // Hide modal
        modal.classList.add('hidden');
    }, { once: true });
}

// Initialize all modules
function initializeModules() {
    // Initialize form validation
    FormValidation.init();
    console.log('✓ Form validation initialized');

    // Initialize form steps
    FormSteps.init();
    console.log('✓ Form steps initialized');

    // Initialize file upload
    FileUpload.init();
    console.log('✓ File upload initialized');

    // Initialize form submission
    FormSubmission.init();
    console.log('✓ Form submission initialized');
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - save form data
        FormSteps.saveFormProgress();
        console.log('Form saved (page hidden)');
    } else {
        // Page is visible again
        console.log('Page visible again');
    }
});

// Handle before unload (when user tries to leave page)
window.addEventListener('beforeunload', (e) => {
    // Save form data
    FormSteps.saveFormProgress();
    
    // Check if form has unsaved data
    const formData = FormValidation.getFormData();
    const hasData = Object.values(formData).some(value => 
        value && typeof value === 'string' && value.trim().length > 0
    );

    // Show warning if form has data (optional - can be commented out)
    // if (hasData) {
    //     e.preventDefault();
    //     e.returnValue = 'You have unsaved form data. Are you sure you want to leave?';
    //     return e.returnValue;
    // }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC key to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('recoveryModal');
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    }

    // Ctrl/Cmd + Enter to submit form (when on step 3)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (FormSteps.currentStep === 3) {
            const submitBtn = document.querySelector('.btn-submit');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
    }
});

// Add console messages for debugging
console.log('%c Smart Form Processor ', 'background: #2196F3; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
console.log('%c Production-ready multi-step contact form ', 'color: #666; font-style: italic;');
console.log('%c Features: Real-time validation, Auto-save, File upload, Responsive design ', 'color: #4CAF50;');
