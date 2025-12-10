/**
 * La Belle Cuisine - Gallery & Lightbox
 * Handles gallery filtering and lightbox image viewer
 */

class Gallery {
    constructor() {
        this.galleryGrid = document.getElementById('gallery-grid');
        this.filterButtons = document.querySelectorAll('.gallery-filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = document.getElementById('lightbox-img');
        this.lightboxTitle = document.getElementById('lightbox-title');
        this.lightboxCounter = document.getElementById('lightbox-counter');
        this.lightboxClose = this.lightbox?.querySelector('.lightbox-close');
        this.lightboxPrev = this.lightbox?.querySelector('.lightbox-prev');
        this.lightboxNext = this.lightbox?.querySelector('.lightbox-next');
        
        this.currentFilter = 'all';
        this.currentImageIndex = 0;
        this.visibleImages = [];
        
        this.init();
    }
    
    init() {
        if (!this.galleryGrid) return;
        
        this.setupFilterListeners();
        this.setupGalleryListeners();
        this.setupLightboxListeners();
        this.updateVisibleImages();
    }
    
    setupFilterListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
    }
    
    handleFilterClick(button) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.dataset.filter;
        this.currentFilter = filter;
        
        // Filter gallery items
        this.filterGallery(filter);
    }
    
    filterGallery(filter) {
        this.galleryItems.forEach((item, index) => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                // Show item with animation
                item.classList.remove('hidden');
                item.style.animation = `fadeInScale 0.5s ease-out ${index * 0.05}s both`;
            } else {
                // Hide item
                item.classList.add('hidden');
            }
        });
        
        // Update visible images array
        this.updateVisibleImages();
    }
    
    updateVisibleImages() {
        this.visibleImages = Array.from(this.galleryItems).filter(item => 
            !item.classList.contains('hidden')
        );
    }
    
    setupGalleryListeners() {
        this.galleryItems.forEach((item, index) => {
            const zoomBtn = item.querySelector('.gallery-zoom');
            
            if (zoomBtn) {
                zoomBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openLightbox(parseInt(item.dataset.index));
                });
            }
            
            // Also allow clicking on the item itself
            item.addEventListener('click', () => {
                this.openLightbox(parseInt(item.dataset.index));
            });
        });
    }
    
    setupLightboxListeners() {
        if (!this.lightbox) return;
        
        // Close button
        if (this.lightboxClose) {
            this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        }
        
        // Previous button
        if (this.lightboxPrev) {
            this.lightboxPrev.addEventListener('click', () => this.prevImage());
        }
        
        // Next button
        if (this.lightboxNext) {
            this.lightboxNext.addEventListener('click', () => this.nextImage());
        }
        
        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }
    
    openLightbox(index) {
        const allItems = Array.from(this.galleryItems);
        const item = allItems[index];
        
        if (!item) return;
        
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption h4');
        
        // Set current index
        this.currentImageIndex = index;
        
        // Set image and caption
        this.lightboxImg.src = img.src;
        this.lightboxImg.alt = img.alt;
        
        if (caption) {
            this.lightboxTitle.textContent = caption.textContent;
        }
        
        // Update counter
        this.updateCounter();
        
        // Show lightbox
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Preload adjacent images for smooth navigation
        this.preloadAdjacentImages();
    }
    
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    nextImage() {
        const allItems = Array.from(this.galleryItems);
        this.currentImageIndex = (this.currentImageIndex + 1) % allItems.length;
        this.updateLightboxImage();
    }
    
    prevImage() {
        const allItems = Array.from(this.galleryItems);
        this.currentImageIndex = (this.currentImageIndex - 1 + allItems.length) % allItems.length;
        this.updateLightboxImage();
    }
    
    updateLightboxImage() {
        const allItems = Array.from(this.galleryItems);
        const item = allItems[this.currentImageIndex];
        
        if (!item) return;
        
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption h4');
        
        // Add fade effect
        this.lightboxImg.style.opacity = '0';
        
        setTimeout(() => {
            this.lightboxImg.src = img.src;
            this.lightboxImg.alt = img.alt;
            
            if (caption) {
                this.lightboxTitle.textContent = caption.textContent;
            }
            
            this.lightboxImg.style.opacity = '1';
            this.updateCounter();
            this.preloadAdjacentImages();
        }, 200);
    }
    
    updateCounter() {
        const allItems = Array.from(this.galleryItems);
        this.lightboxCounter.textContent = `${this.currentImageIndex + 1} / ${allItems.length}`;
    }
    
    preloadAdjacentImages() {
        const allItems = Array.from(this.galleryItems);
        const prevIndex = (this.currentImageIndex - 1 + allItems.length) % allItems.length;
        const nextIndex = (this.currentImageIndex + 1) % allItems.length;
        
        // Preload previous image
        const prevImg = allItems[prevIndex]?.querySelector('img');
        if (prevImg) {
            const preloadPrev = new Image();
            preloadPrev.src = prevImg.src;
        }
        
        // Preload next image
        const nextImg = allItems[nextIndex]?.querySelector('img');
        if (nextImg) {
            const preloadNext = new Image();
            preloadNext.src = nextImg.src;
        }
    }
}

// Initialize gallery when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Gallery();
    });
} else {
    new Gallery();
}

// Animation for fadeInScale
if (!document.querySelector('#fadeInScale-animation')) {
    const style = document.createElement('style');
    style.id = 'fadeInScale-animation';
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Gallery;
}
