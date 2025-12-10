/* ============================================
   FORM SUBMISSION HANDLER (DEMO MODE)
   Simulates form submission with success message
   ============================================ */

const FormSubmission = {
    // Initialize submission
    init() {
        this.setupFormSubmit();
        this.setupSubmitAnotherButton();
    },

    // Setup form submit listener
    setupFormSubmit() {
        const form = document.getElementById('multiStepForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Final validation check
            if (!FormValidation.validateStep(3)) {
                return;
            }

            // Submit the form
            this.submitForm();
        });
    },

    // Submit form (demo mode)
    async submitForm() {
        // Get all form data
        const formData = FormValidation.getFormData();
        const filesData = FileUpload.getFilesData();
        
        // Add files to form data
        formData.files = filesData;
        formData.fileCount = filesData.length;

        // Show loading overlay
        this.showLoading();

        // Simulate API call with 1.5 second delay
        await this.simulateApiCall(1500);

        // Hide loading overlay
        this.hideLoading();

        // Generate reference number
        const referenceNumber = this.generateReferenceNumber();

        // Show success message
        this.showSuccess(formData, referenceNumber);

        // Clear saved progress
        FormSteps.clearFormProgress();

        // Stop auto-save
        stopAutoSave();

        // Log submission data (for demo purposes)
        console.log('Form submitted:', formData);
        console.log('Reference:', referenceNumber);
    },

    // Show loading overlay
    showLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.remove('hidden');
    },

    // Hide loading overlay
    hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.add('hidden');
    },

    // Simulate API call
    simulateApiCall(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    },

    // Generate reference number
    generateReferenceNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `REF-${timestamp}${random}`;
    },

    // Show success message
    showSuccess(formData, referenceNumber) {
        // Hide form container
        const formContainer = document.querySelector('.form-container');
        const progressContainer = document.querySelector('.progress-container');
        formContainer.classList.add('hidden');
        progressContainer.classList.add('hidden');

        // Show success container
        const successContainer = document.getElementById('successContainer');
        successContainer.classList.remove('hidden');

        // Set reference number
        document.getElementById('referenceNumber').textContent = referenceNumber;

        // Build submission summary
        const summaryHTML = this.buildSubmissionSummary(formData);
        document.getElementById('submissionSummary').innerHTML = summaryHTML;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Build submission summary HTML
    buildSubmissionSummary(data) {
        const inquiryTypeLabels = {
            'sales': 'Sales Inquiry',
            'support': 'Support Request',
            'partnership': 'Partnership',
            'general': 'General Question',
            'other': 'Other'
        };

        let html = '<h3 style="margin-bottom: 12px; font-size: 16px;">Submission Summary</h3>';
        
        html += `<p><strong>Name:</strong> ${this.escapeHtml(data.fullName)}</p>`;
        html += `<p><strong>Email:</strong> ${this.escapeHtml(data.email)}</p>`;
        html += `<p><strong>Phone:</strong> ${this.escapeHtml(data.phone)}</p>`;
        
        if (data.company) {
            html += `<p><strong>Company:</strong> ${this.escapeHtml(data.company)}</p>`;
        }
        
        if (data.industry) {
            html += `<p><strong>Industry:</strong> ${this.escapeHtml(data.industry)}</p>`;
        }

        html += `<p><strong>Inquiry Type:</strong> ${inquiryTypeLabels[data.inquiryType] || data.inquiryType}</p>`;
        html += `<p><strong>Subject:</strong> ${this.escapeHtml(data.subject)}</p>`;
        
        if (data.budget) {
            html += `<p><strong>Budget:</strong> ${this.escapeHtml(data.budget)}</p>`;
        }
        
        if (data.timeline) {
            html += `<p><strong>Timeline:</strong> ${this.escapeHtml(data.timeline)}</p>`;
        }
        
        if (data.urgency) {
            html += `<p><strong>Urgency:</strong> ${this.capitalizeFirst(data.urgency)}</p>`;
        }

        if (data.fileCount > 0) {
            html += `<p><strong>Attachments:</strong> ${data.fileCount} file(s)</p>`;
        }

        return html;
    },

    // Setup "Submit Another" button
    setupSubmitAnotherButton() {
        const submitAnotherBtn = document.getElementById('submitAnotherBtn');
        
        submitAnotherBtn.addEventListener('click', () => {
            this.resetForNewSubmission();
        });
    },

    // Reset form for new submission
    resetForNewSubmission() {
        // Hide success container
        const successContainer = document.getElementById('successContainer');
        successContainer.classList.add('hidden');

        // Show form container
        const formContainer = document.querySelector('.form-container');
        const progressContainer = document.querySelector('.progress-container');
        formContainer.classList.remove('hidden');
        progressContainer.classList.remove('hidden');

        // Reset form
        FormSteps.resetForm();
        
        // Clear files
        FileUpload.clearFiles();

        // Restart auto-save
        startAutoSave();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Escape HTML
    escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    },

    // Capitalize first letter
    capitalizeFirst(text) {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
};
