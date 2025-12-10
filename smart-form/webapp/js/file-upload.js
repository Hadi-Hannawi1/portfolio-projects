/* ============================================
   FILE UPLOAD HANDLER
   Drag-and-drop + file selection with validation
   Max 3 files, 5MB each, PDF/DOC/DOCX/JPG/PNG only
   ============================================ */

const FileUpload = {
    maxFiles: 3,
    maxFileSize: 5 * 1024 * 1024, // 5MB in bytes
    allowedTypes: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
    uploadedFiles: [],

    // Initialize file upload
    init() {
        this.setupFileInput();
        this.setupDragAndDrop();
    },

    // Setup file input listener
    setupFileInput() {
        const fileInput = document.getElementById('fileInput');
        const fileUploadArea = document.getElementById('fileUploadArea');

        // Click on upload area to trigger file input
        fileUploadArea.addEventListener('click', (e) => {
            if (e.target.tagName !== 'LABEL') {
                fileInput.click();
            }
        });

        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFiles(files);
            // Reset input to allow selecting same file again
            e.target.value = '';
        });
    },

    // Setup drag and drop
    setupDragAndDrop() {
        const fileUploadArea = document.getElementById('fileUploadArea');

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // Highlight drop area when dragging over it
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, () => {
                fileUploadArea.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, () => {
                fileUploadArea.classList.remove('drag-over');
            }, false);
        });

        // Handle dropped files
        fileUploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = Array.from(dt.files);
            this.handleFiles(files);
        }, false);
    },

    // Prevent default drag behaviors
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    },

    // Handle uploaded files
    handleFiles(files) {
        const fileError = document.getElementById('fileError');
        fileError.textContent = '';

        // Check if adding files would exceed max count
        if (this.uploadedFiles.length + files.length > this.maxFiles) {
            fileError.textContent = `Maximum ${this.maxFiles} files allowed. You currently have ${this.uploadedFiles.length} file(s).`;
            return;
        }

        // Validate and add each file
        files.forEach(file => {
            if (!this.validateFile(file)) {
                return;
            }
            this.addFile(file);
        });

        // Update display
        this.displayFiles();
    },

    // Validate file
    validateFile(file) {
        const fileError = document.getElementById('fileError');

        // Check file size
        if (file.size > this.maxFileSize) {
            fileError.textContent = `File "${file.name}" is too large (max 5MB)`;
            return false;
        }

        // Check file type
        const fileName = file.name.toLowerCase();
        const hasValidExtension = this.allowedTypes.some(type => 
            fileName.endsWith(type.toLowerCase())
        );

        if (!hasValidExtension) {
            fileError.textContent = `File "${file.name}" has invalid type. Allowed: PDF, DOC, DOCX, JPG, PNG`;
            return false;
        }

        return true;
    },

    // Add file to uploaded files array
    addFile(file) {
        // Check if file already exists (by name and size)
        const exists = this.uploadedFiles.some(f => 
            f.name === file.name && f.size === file.size
        );

        if (!exists) {
            this.uploadedFiles.push(file);
        }
    },

    // Display uploaded files
    displayFiles() {
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';

        this.uploadedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <div class="file-icon">
                        <i class="${this.getFileIcon(file.name)}"></i>
                    </div>
                    <div class="file-details">
                        <span class="file-name">${this.escapeHtml(file.name)}</span>
                        <span class="file-size">${this.formatFileSize(file.size)}</span>
                    </div>
                </div>
                <button type="button" class="file-remove" data-index="${index}" aria-label="Remove file">
                    <i class="fas fa-times"></i>
                </button>
            `;
            fileList.appendChild(fileItem);
        });

        // Attach remove listeners
        const removeButtons = fileList.querySelectorAll('.file-remove');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                this.removeFile(index);
            });
        });
    },

    // Remove file
    removeFile(index) {
        this.uploadedFiles.splice(index, 1);
        this.displayFiles();
        
        // Clear error message when removing files
        const fileError = document.getElementById('fileError');
        fileError.textContent = '';
    },

    // Get file icon based on extension
    getFileIcon(fileName) {
        const extension = fileName.toLowerCase().split('.').pop();
        
        const iconMap = {
            'pdf': 'fas fa-file-pdf',
            'doc': 'fas fa-file-word',
            'docx': 'fas fa-file-word',
            'jpg': 'fas fa-file-image',
            'jpeg': 'fas fa-file-image',
            'png': 'fas fa-file-image'
        };

        return iconMap[extension] || 'fas fa-file';
    },

    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    },

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    },

    // Get uploaded files data
    getFilesData() {
        return this.uploadedFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type
        }));
    },

    // Clear all files
    clearFiles() {
        this.uploadedFiles = [];
        this.displayFiles();
        document.getElementById('fileError').textContent = '';
    }
};
