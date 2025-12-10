/**
 * La Belle Cuisine - Shopping Cart System
 * Handles cart functionality for online ordering (optional feature)
 */

class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.cartBtn = document.getElementById('cart-btn');
        this.cartSidebar = document.getElementById('cart-sidebar');
        this.cartClose = document.getElementById('cart-close');
        this.cartItems = document.getElementById('cart-items');
        this.totalPrice = document.getElementById('total-price');
        this.cartCount = document.getElementById('cart-count');
        this.checkoutBtn = document.getElementById('checkout-btn');
        this.cartOverlay = document.getElementById('mobile-menu-overlay');
        
        this.menuItems = [];
        
        this.init();
    }
    
    async init() {
        await this.loadMenuItems();
        this.setupEventListeners();
        this.updateCartUI();
        this.setupAddToCartButtons();
    }
    
    async loadMenuItems() {
        try {
            const response = await fetch('data/menu-items.json');
            const data = await response.json();
            
            this.menuItems = [
                ...data.appetizers,
                ...data.mains,
                ...data.desserts,
                ...data.beverages
            ];
        } catch (error) {
            console.error('Error loading menu items:', error);
        }
    }
    
    setupEventListeners() {
        // Open/Close cart
        if (this.cartBtn) {
            this.cartBtn.addEventListener('click', () => this.toggleCart());
        }
        
        if (this.cartClose) {
            this.cartClose.addEventListener('click', () => this.closeCart());
        }
        
        // Click outside to close
        if (this.cartOverlay) {
            this.cartOverlay.addEventListener('click', () => {
                if (this.cartSidebar.classList.contains('active')) {
                    this.closeCart();
                }
            });
        }
        
        // Checkout button
        if (this.checkoutBtn) {
            this.checkoutBtn.addEventListener('click', () => this.checkout());
        }
        
        // Close cart on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cartSidebar.classList.contains('active')) {
                this.closeCart();
            }
        });
    }
    
    setupAddToCartButtons() {
        // Use event delegation for dynamically added buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const btn = e.target.closest('.add-to-cart-btn');
                const itemId = parseInt(btn.dataset.id);
                this.addToCart(itemId);
            }
        });
    }
    
    toggleCart() {
        this.cartSidebar.classList.toggle('active');
        this.cartOverlay.classList.toggle('active');
        document.body.style.overflow = this.cartSidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    closeCart() {
        this.cartSidebar.classList.remove('active');
        this.cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('labellecuisine_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    
    saveCart() {
        localStorage.setItem('labellecuisine_cart', JSON.stringify(this.cart));
    }
    
    addToCart(itemId) {
        const item = this.menuItems.find(i => i.id === itemId);
        if (!item) return;
        
        // Check if item already in cart
        const existingItem = this.cart.find(i => i.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showAddedNotification(item.name);
    }
    
    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateQuantity(itemId, change) {
        const item = this.cart.find(i => i.id === itemId);
        if (!item) return;
        
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(itemId);
        } else {
            this.saveCart();
            this.updateCartUI();
        }
    }
    
    updateCartUI() {
        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (this.cartCount) {
            this.cartCount.textContent = totalItems;
            this.cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
        
        // Update cart items display
        if (this.cartItems) {
            if (this.cart.length === 0) {
                this.cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-bag"></i>
                        <p>Your cart is empty</p>
                    </div>
                `;
            } else {
                this.cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                            <div class="cart-item-controls">
                                <button class="qty-btn qty-minus" data-id="${item.id}">-</button>
                                <span class="cart-item-quantity">${item.quantity}</span>
                                <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('');
                
                // Setup cart item controls
                this.setupCartItemControls();
            }
        }
        
        // Update total price
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (this.totalPrice) {
            this.totalPrice.textContent = `€${total.toFixed(2)}`;
        }
        
        // Enable/disable checkout button
        if (this.checkoutBtn) {
            this.checkoutBtn.disabled = this.cart.length === 0;
        }
    }
    
    setupCartItemControls() {
        // Quantity buttons
        document.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = parseInt(btn.dataset.id);
                this.updateQuantity(itemId, -1);
            });
        });
        
        document.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = parseInt(btn.dataset.id);
                this.updateQuantity(itemId, 1);
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const itemId = parseInt(btn.dataset.id);
                this.removeFromCart(itemId);
            });
        });
    }
    
    showAddedNotification(itemName) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${itemName} added to cart!</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: linear-gradient(135deg, #2C5530, #1a3a1f);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    checkout() {
        if (this.cart.length === 0) return;
        
        // Calculate total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Create order summary
        const orderSummary = this.cart.map(item => 
            `${item.quantity}x ${item.name} - €${(item.price * item.quantity).toFixed(2)}`
        ).join('%0A');
        
        // Option 1: Email the order
        const emailSubject = 'Order from La Belle Cuisine Website';
        const emailBody = `New Order:%0A%0A${orderSummary}%0A%0ATotal: €${total.toFixed(2)}%0A%0APlease contact me to confirm this order.`;
        
        window.location.href = `mailto:orders@labellecuisine.com?subject=${emailSubject}&body=${emailBody}`;
        
        // Option 2: Redirect to reservation page with note
        // window.location.href = '#reservations';
        
        // Show confirmation message
        alert(`Thank you for your order! Total: €${total.toFixed(2)}\n\nWe'll contact you shortly to confirm your order and arrange delivery or pickup.`);
        
        // Clear cart after checkout
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.closeCart();
    }
    
    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = [];
            this.saveCart();
            this.updateCartUI();
        }
    }
}

// Initialize shopping cart when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ShoppingCart();
    });
} else {
    new ShoppingCart();
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}
