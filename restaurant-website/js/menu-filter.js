/**
 * La Belle Cuisine - Menu Filtering System (FIXED - Works with file:// protocol)
 * Handles menu item filtering, searching, sorting, and display
 */

class MenuFilter {
    constructor() {
        this.menuGrid = document.getElementById('menu-grid');
        this.itemsCount = document.getElementById('items-count');
        this.searchInput = document.getElementById('menu-search');
        this.sortSelect = document.getElementById('menu-sort');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        this.menuItems = [];
        this.filteredItems = [];
        this.activeCategory = 'all';
        this.activeDietaryFilters = new Set();
        this.searchQuery = '';
        this.sortBy = 'recommended';
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadMenuItems();
            this.setupEventListeners();
            this.displayMenuItems();
        } catch (error) {
            console.error('Error initializing menu:', error);
            this.showError();
        }
    }
    
    async loadMenuItems() {
        try {
            // Try to fetch from JSON file first
            try {
                const response = await fetch('data/menu-items.json');
                if (response.ok) {
                    const data = await response.json();
                    this.processMenuData(data);
                    return;
                }
            } catch (fetchError) {
                console.log('Fetch failed (possibly file:// protocol), using embedded data');
            }
            
            // Fallback: Use embedded data if fetch fails (for file:// protocol)
            const embeddedData = this.getEmbeddedMenuData();
            this.processMenuData(embeddedData);
            
        } catch (error) {
            throw error;
        }
    }
    
    processMenuData(data) {
        // Combine all items with proper category property
        this.menuItems = [];
        
        if (data.appetizers) {
            data.appetizers.forEach(item => {
                item.category = 'appetizers';
                this.menuItems.push(item);
            });
        }
        
        if (data.mains) {
            data.mains.forEach(item => {
                item.category = 'mains';
                this.menuItems.push(item);
            });
        }
        
        if (data.desserts) {
            data.desserts.forEach(item => {
                item.category = 'desserts';
                this.menuItems.push(item);
            });
        }
        
        if (data.beverages) {
            data.beverages.forEach(item => {
                item.category = 'beverages';
                this.menuItems.push(item);
            });
        }
        
        if (data.specials) {
            data.specials.forEach(item => {
                item.category = 'specials';
                item.chefSpecial = true;
                this.menuItems.push(item);
            });
        }
        
        this.filteredItems = [...this.menuItems];
    }
    
    getEmbeddedMenuData() {
        // Embedded menu data as fallback for file:// protocol
        return {
            "appetizers": [
                {
                    "id": "app1",
                    "name": "French Onion Soup",
                    "description": "Classic caramelized onions in rich beef broth, topped with crusty bread and melted gruyère cheese",
                    "price": 12,
                    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
                    "category": "appetizers",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "app2",
                    "name": "Escargots de Bourgogne",
                    "description": "Burgundy snails baked in garlic-herb butter with a hint of white wine and parsley",
                    "price": 16,
                    "image": "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&h=400&fit=crop",
                    "category": "appetizers",
                    "dietary": [],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "app3",
                    "name": "Foie Gras Terrine",
                    "description": "Smooth duck liver pâté served with toasted brioche, fig compote, and fleur de sel",
                    "price": 22,
                    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
                    "category": "appetizers",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "app4",
                    "name": "Beef Carpaccio",
                    "description": "Thinly sliced raw beef tenderloin with arugula, shaved parmesan, capers, and truffle oil",
                    "price": 18,
                    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop",
                    "category": "appetizers",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "app5",
                    "name": "Caesar Salad",
                    "description": "Crisp romaine lettuce, house-made Caesar dressing, parmesan crisps, and garlic croutons",
                    "price": 14,
                    "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop",
                    "category": "appetizers",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "app6",
                    "name": "Charcuterie & Cheese Board",
                    "description": "Curated selection of French cured meats, artisan cheeses, cornichons, and crusty bread",
                    "price": 24,
                    "image": "https://images.unsplash.com/photo-1618874082171-b37f56629b69?w=600&h=400&fit=crop",
                    "category": "appetizers",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "app7",
                    "name": "Mushroom Vol-au-Vent",
                    "description": "Buttery puff pastry shells filled with creamy wild mushroom ragout and fresh herbs",
                    "price": 15,
                    "image": "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&h=400&fit=crop",
                    "category": "appetizers",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "app8",
                    "name": "Tuna Tartare",
                    "description": "Fresh yellowfin tuna diced with avocado, sesame oil, soy, and crispy wonton chips",
                    "price": 19,
                    "image": "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop",
                    "category": "appetizers",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                }
            ],
            "mains": [
                {
                    "id": "main1",
                    "name": "Coq au Vin",
                    "description": "Braised chicken in burgundy wine sauce with pearl onions, mushrooms, and bacon lardons",
                    "price": 28,
                    "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "main2",
                    "name": "Beef Bourguignon",
                    "description": "Slow-braised beef in red wine with carrots, pearl onions, and herbs, served with mashed potatoes",
                    "price": 32,
                    "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "main3",
                    "name": "Duck Confit",
                    "description": "Crispy duck leg confit with potato gratin, sautéed green beans, and cherry reduction",
                    "price": 34,
                    "image": "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "main4",
                    "name": "Bouillabaisse",
                    "description": "Traditional Provençal fish stew with mussels, shrimp, fish, saffron broth, and rouille",
                    "price": 36,
                    "image": "https://images.unsplash.com/photo-1559054663-e0c5c2ebc0c6?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "main5",
                    "name": "Steak Frites",
                    "description": "Grilled 10oz ribeye steak with hand-cut fries, béarnaise sauce, and seasonal vegetables",
                    "price": 38,
                    "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "main6",
                    "name": "Salmon en Papillote",
                    "description": "Baked Atlantic salmon in parchment with julienned vegetables, lemon, and white wine butter",
                    "price": 30,
                    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "main7",
                    "name": "Ratatouille Provençale",
                    "description": "Traditional vegetable stew with eggplant, zucchini, peppers, tomatoes, and fresh basil",
                    "price": 24,
                    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": ["vegetarian", "vegan"],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "main8",
                    "name": "Herb-Crusted Lamb Rack",
                    "description": "Roasted rack of lamb with Dijon-herb crust, rosemary jus, and pommes Anna",
                    "price": 42,
                    "image": "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "main9",
                    "name": "Sole Meunière",
                    "description": "Pan-fried Dover sole with brown butter, capers, lemon, and steamed asparagus",
                    "price": 35,
                    "image": "https://images.unsplash.com/photo-1580959375944-0c49de57e0a6?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "main10",
                    "name": "Cassoulet",
                    "description": "Slow-cooked white bean stew with duck confit, pork sausage, and crispy breadcrumb topping",
                    "price": 29,
                    "image": "https://images.unsplash.com/photo-1547928576-94a0b9be8233?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "main11",
                    "name": "Lobster Thermidor",
                    "description": "Half lobster tail with cognac-infused cream sauce, gruyère cheese, and herb rice",
                    "price": 48,
                    "image": "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "main12",
                    "name": "Mushroom Risotto",
                    "description": "Creamy arborio rice with wild mushrooms, parmesan, white wine, and truffle oil",
                    "price": 26,
                    "image": "https://images.unsplash.com/photo-1476124369491-c6000462c5c8?w=600&h=400&fit=crop",
                    "category": "mains",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": true
                }
            ],
            "desserts": [
                {
                    "id": "dess1",
                    "name": "Crème Brûlée",
                    "description": "Classic vanilla bean custard with caramelized sugar crust and fresh berries",
                    "price": 10,
                    "image": "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&h=400&fit=crop",
                    "category": "desserts",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "dess2",
                    "name": "Chocolate Fondant",
                    "description": "Warm molten chocolate cake with liquid center, served with vanilla bean ice cream",
                    "price": 12,
                    "image": "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop",
                    "category": "desserts",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "dess3",
                    "name": "Tarte Tatin",
                    "description": "Upside-down caramelized apple tart with buttery pastry and crème fraîche",
                    "price": 11,
                    "image": "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=600&h=400&fit=crop",
                    "category": "desserts",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "dess4",
                    "name": "Profiteroles",
                    "description": "Light choux pastry puffs filled with vanilla ice cream and drizzled with warm chocolate sauce",
                    "price": 10,
                    "image": "https://images.unsplash.com/photo-1612201142855-4e6c0c41e65b?w=600&h=400&fit=crop",
                    "category": "desserts",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "dess5",
                    "name": "French Cheese Plate",
                    "description": "Selection of artisan French cheeses with honey, walnuts, grapes, and crackers",
                    "price": 15,
                    "image": "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&h=400&fit=crop",
                    "category": "desserts",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "dess6",
                    "name": "Lemon Tart",
                    "description": "Tangy lemon curd in crisp pastry shell topped with toasted meringue and mint",
                    "price": 11,
                    "image": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
                    "category": "desserts",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": true
                }
            ],
            "beverages": [
                {
                    "id": "bev1",
                    "name": "House Wine",
                    "description": "Red, White, or Rosé from our curated selection of French vineyards",
                    "price": 8,
                    "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop",
                    "category": "beverages",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "bev2",
                    "name": "Champagne",
                    "description": "Laurent-Perrier Brut or Veuve Clicquot by the glass",
                    "price": 15,
                    "image": "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=600&h=400&fit=crop",
                    "category": "beverages",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "bev3",
                    "name": "Craft Cocktails",
                    "description": "Seasonal handcrafted cocktails featuring premium spirits and fresh ingredients",
                    "price": 12,
                    "image": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop",
                    "category": "beverages",
                    "dietary": [],
                    "spicy": false,
                    "popular": true
                },
                {
                    "id": "bev4",
                    "name": "French Press Coffee",
                    "description": "Single origin organic coffee beans, freshly ground and brewed",
                    "price": 5,
                    "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
                    "category": "beverages",
                    "dietary": ["vegetarian", "vegan"],
                    "spicy": false,
                    "popular": false
                },
                {
                    "id": "bev5",
                    "name": "Fresh Juice",
                    "description": "Freshly squeezed orange, grapefruit, or apple juice",
                    "price": 6,
                    "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop",
                    "category": "beverages",
                    "dietary": ["vegetarian", "vegan"],
                    "spicy": false,
                    "popular": false
                }
            ],
            "specials": [
                {
                    "id": "spec1",
                    "name": "Chef's Daily Catch",
                    "description": "Fresh fish of the day, preparation changes daily based on market availability",
                    "price": 34,
                    "image": "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&h=400&fit=crop",
                    "category": "specials",
                    "dietary": [],
                    "spicy": false,
                    "popular": true,
                    "chefSpecial": true
                },
                {
                    "id": "spec2",
                    "name": "Truffle Risotto",
                    "description": "Creamy arborio rice with fresh black truffle shavings and aged parmesan (Seasonal)",
                    "price": 38,
                    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&h=400&fit=crop",
                    "category": "specials",
                    "dietary": ["vegetarian"],
                    "spicy": false,
                    "popular": true,
                    "chefSpecial": true
                },
                {
                    "id": "spec3",
                    "name": "Wagyu Beef Tenderloin",
                    "description": "Pan-seared Japanese wagyu with foie gras, black truffle jus, and pommes soufflées",
                    "price": 65,
                    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop",
                    "category": "specials",
                    "dietary": [],
                    "spicy": false,
                    "popular": true,
                    "chefSpecial": true
                },
                {
                    "id": "spec4",
                    "name": "Autumn Pumpkin Velouté",
                    "description": "Velvety pumpkin soup with roasted chestnuts, sage oil, and crispy pancetta",
                    "price": 14,
                    "image": "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&h=400&fit=crop",
                    "category": "specials",
                    "dietary": [],
                    "spicy": false,
                    "popular": false,
                    "chefSpecial": true
                }
            ]
        };
    }
    
    setupEventListeners() {
        // Category filters
        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCategoryClick(e.target.closest('.category-btn'));
            });
        });
        
        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterAndDisplay();
            });
        }
        
        // Sort select
        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.filterAndDisplay();
            });
        }
        
        // Dietary filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleDietaryFilterClick(e.target.closest('.filter-btn'));
            });
        });
    }
    
    handleCategoryClick(button) {
        // Remove active class from all category buttons
        this.categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update active category
        this.activeCategory = button.dataset.category;
        
        // Filter and display
        this.filterAndDisplay();
    }
    
    handleDietaryFilterClick(button) {
        const filter = button.dataset.filter;
        
        if (this.activeDietaryFilters.has(filter)) {
            this.activeDietaryFilters.delete(filter);
            button.classList.remove('active');
        } else {
            this.activeDietaryFilters.add(filter);
            button.classList.add('active');
        }
        
        this.filterAndDisplay();
    }
    
    filterAndDisplay() {
        // Start with all items
        let filtered = [...this.menuItems];
        
        // Filter by category
        if (this.activeCategory !== 'all') {
            if (this.activeCategory === 'specials') {
                filtered = filtered.filter(item => item.chefSpecial || item.category === 'specials');
            } else {
                filtered = filtered.filter(item => item.category === this.activeCategory);
            }
        }
        
        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(item => {
                return (
                    item.name.toLowerCase().includes(this.searchQuery) ||
                    item.description.toLowerCase().includes(this.searchQuery)
                );
            });
        }
        
        // Filter by dietary preferences
        if (this.activeDietaryFilters.size > 0) {
            filtered = filtered.filter(item => {
                return Array.from(this.activeDietaryFilters).some(filter => 
                    item.dietary && item.dietary.includes(filter)
                );
            });
        }
        
        // Sort items
        this.sortItems(filtered);
        
        // Update filtered items
        this.filteredItems = filtered;
        
        // Display items
        this.displayMenuItems();
    }
    
    sortItems(items) {
        switch (this.sortBy) {
            case 'price-low':
                items.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                items.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                items.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'recommended':
            default:
                // Sort by popular first, then chef's special, then by id
                items.sort((a, b) => {
                    if (a.popular && !b.popular) return -1;
                    if (!a.popular && b.popular) return 1;
                    if (a.chefSpecial && !b.chefSpecial) return -1;
                    if (!a.chefSpecial && b.chefSpecial) return 1;
                    return 0;
                });
                break;
        }
    }
    
    displayMenuItems() {
        // Update count
        if (this.itemsCount) {
            this.itemsCount.textContent = this.filteredItems.length;
        }
        
        // Clear grid
        this.menuGrid.innerHTML = '';
        
        // Show no results message if empty
        if (this.filteredItems.length === 0) {
            this.showNoResults();
            return;
        }
        
        // Create and append menu item cards
        this.filteredItems.forEach((item, index) => {
            const card = this.createMenuCard(item);
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s both`;
            this.menuGrid.appendChild(card);
        });
    }
    
    createMenuCard(item) {
        const card = document.createElement('div');
        card.classList.add('menu-item');
        card.dataset.id = item.id;
        
        // Create badges HTML
        let badgesHTML = '';
        if (item.popular) {
            badgesHTML += '<div class="menu-badge popular">⭐ Popular</div>';
        }
        if (item.chefSpecial) {
            badgesHTML += '<div class="menu-badge chef-special">👨‍🍳 Chef\'s Special</div>';
        }
        if (item.dietary && item.dietary.length > 0) {
            item.dietary.forEach(diet => {
                const icon = this.getDietaryIcon(diet);
                badgesHTML += `<div class="menu-badge dietary">${icon} ${this.capitalize(diet)}</div>`;
            });
        }
        
        // Create dietary icons for content
        let dietaryIconsHTML = '';
        if (item.dietary && item.dietary.length > 0) {
            item.dietary.forEach(diet => {
                const icon = this.getDietaryIcon(diet);
                dietaryIconsHTML += `<span class="dietary-icon" title="${this.capitalize(diet)}">${icon}</span>`;
            });
        }
        
        card.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop'">
                ${badgesHTML ? `<div class="menu-item-badges">${badgesHTML}</div>` : ''}
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    ${dietaryIconsHTML ? `<div class="menu-item-dietary">${dietaryIconsHTML}</div>` : ''}
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <div class="menu-item-price">€${item.price}</div>
                    <button class="add-to-cart-btn" data-id="${item.id}">
                        <i class="fas fa-shopping-bag"></i>
                        Add
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    getDietaryIcon(dietary) {
        const icons = {
            'vegetarian': '🌱',
            'vegan': '🌿',
            'gluten-free': '🌾',
            'dairy-free': '🥛',
            'spicy': '🌶️'
        };
        return icons[dietary] || '✓';
    }
    
    capitalize(str) {
        return str.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
    
    showNoResults() {
        this.menuGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">😕</div>
                <h3>No menu items found</h3>
                <p>Try adjusting your filters or search query</p>
                <button class="clear-filters-btn">Clear All Filters</button>
            </div>
        `;
        
        // Add event listener to clear filters button
        const clearBtn = this.menuGrid.querySelector('.clear-filters-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllFilters());
        }
    }
    
    clearAllFilters() {
        // Reset category to all
        this.activeCategory = 'all';
        this.categoryButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === 'all');
        });
        
        // Clear dietary filters
        this.activeDietaryFilters.clear();
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Clear search
        this.searchQuery = '';
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        
        // Reset sort
        this.sortBy = 'recommended';
        if (this.sortSelect) {
            this.sortSelect.value = 'recommended';
        }
        
        // Display all items
        this.filterAndDisplay();
    }
    
    showError() {
        this.menuGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">❌</div>
                <h3>Error Loading Menu</h3>
                <p>We're having trouble loading our menu. Please refresh the page or try again later.</p>
                <button class="clear-filters-btn" onclick="location.reload()">Refresh Page</button>
            </div>
        `;
    }
}

// Initialize menu filter when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MenuFilter();
    });
} else {
    new MenuFilter();
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MenuFilter;
}
