
// API Configuration
const API_CONFIG = {
    baseURL: 'https://api.yourdomain.com/v1', // Replace with your actual API endpoint
    endpoints: {
        products: '/products',
        cart: '/cart',
        filters: '/filters'
    }
};

// Product Data (In production, this would come from your backend)
let allProducts = [
    {
        id: 1,
        name: 'Classic Striped T-Shirt',
        category: 'Casual/Top',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Blue', 'Gray'],
        occasion: ['Casual', 'Everyday']
    },
    {
        id: 2,
        name: 'Elegant Tailored Blazer',
        category: 'Formal/Outerwear',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black', 'Gray'],
        occasion: ['Formal', 'Business']
    },
    {
        id: 3,
        name: 'Comfort High-Waist Jeans',
        category: 'Casual/Bottom',
        price: 65.50,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
        sizes: ['26', '28', '30', '32', '34'],
        colors: ['Blue'],
        occasion: ['Casual', 'Everyday']
    },
    {
        id: 4,
        name: 'Cozy Oversized Knit Sweater',
        category: 'Casual/Knitwear',
        price: 75.00,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L'],
        colors: ['White', 'Beige'],
        occasion: ['Casual', 'Everyday']
    },
    {
        id: 5,
        name: 'Floral Print Summer Dress',
        category: 'Casual/Dress',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Red', 'Yellow'],
        occasion: ['Casual', 'Party']
    },
    {
        id: 6,
        name: 'Sporty Lifestyle Sneakers',
        category: 'Sportswear/Shoes',
        price: 95.00,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['White'],
        occasion: ['Sporty', 'Casual']
    },
    {
        id: 7,
        name: 'Sophisticated Pencil Skirt',
        category: 'Formal/Bottom',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Black'],
        occasion: ['Formal', 'Business']
    },
    {
        id: 8,
        name: 'Vintage Leather Jacket',
        category: 'Casual/Outerwear',
        price: 180.00,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Brown'],
        occasion: ['Casual']
    },
    {
        id: 9,
        name: 'Comfortable Chino Pants',
        category: 'Casual/Bottom',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Beige', 'Gray'],
        occasion: ['Casual', 'Business']
    }
];

let filteredProducts = [...allProducts];
let currentFilters = {
    size: [],
    color: [],
    occasion: [],
    maxPrice: 250
};

// API Functions
async function fetchProducts(filters = {}) {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.products}?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add authentication header if needed
                // 'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.products || data;
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return local data as fallback
        return allProducts;
    }
}

async function addToCart(productId, size, color) {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.cart}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({
                productId,
                size,
                color,
                quantity: 1
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        showNotification('Product added to cart!');
        return data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('Added to cart (local)', 'success');
    }
}

// UI Functions
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow';
        card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-900 mb-1">${product.name}</h3>
                        <p class="text-sm text-gray-600 mb-3">${product.category}</p>
                        <div class="flex items-center gap-2 mb-3">
                            ${product.sizes.slice(0, 4).map(size => `
                                <span class="px-2 py-1 text-xs border border-gray-300 rounded">${size}</span>
                            `).join('')}
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xl font-bold text-gray-900">$${product.price.toFixed(2)}</span>
                            <button onclick="handleBuyNow(${product.id})" class="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </div>
                `;
        grid.appendChild(card);
    });

    document.getElementById('productCount').textContent = filteredProducts.length;
}

function applyFilters() {
    filteredProducts = allProducts.filter(product => {
        // Size filter
        if (currentFilters.size.length > 0) {
            if (!product.sizes.some(size => currentFilters.size.includes(size))) {
                return false;
            }
        }

        // Color filter
        if (currentFilters.color.length > 0) {
            if (!product.colors.some(color => currentFilters.color.includes(color))) {
                return false;
            }
        }

        // Occasion filter
        if (currentFilters.occasion.length > 0) {
            if (!product.occasion.some(occ => currentFilters.occasion.includes(occ))) {
                return false;
            }
        }

        // Price filter
        if (product.price > currentFilters.maxPrice) {
            return false;
        }

        return true;
    });

    renderProducts();
}

function toggleFilter(filterId) {
    const filterDiv = document.getElementById(`${filterId}-filter`);
    const arrow = document.getElementById(`${filterId}-arrow`);

    if (filterDiv.style.display === 'none') {
        filterDiv.style.display = 'block';
        arrow.textContent = '▼';
    } else {
        filterDiv.style.display = 'none';
        arrow.textContent = '▶';
    }
}

function updatePriceLabel() {
    const priceRange = document.getElementById('priceRange');
    const priceLabel = document.getElementById('priceLabel');
    currentFilters.maxPrice = parseInt(priceRange.value);
    priceLabel.textContent = `$${priceRange.value}`;
    applyFilters();
}

function clearFilters() {
    currentFilters = {
        size: [],
        color: [],
        occasion: [],
        maxPrice: 250
    };

    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('priceRange').value = 250;
    document.getElementById('priceLabel').textContent = '$250';

    applyFilters();
}

async function handleBuyNow(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    // In a real app, show a modal to select size and color
    const size = product.sizes[0];
    const color = product.colors[0];

    await addToCart(productId, size, color);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize products
    renderProducts();

    // Setup filter listeners
    document.querySelectorAll('input[data-filter]').forEach(input => {
        input.addEventListener('change', (e) => {
            const filterType = e.target.dataset.filter;
            const value = e.target.value;

            if (e.target.checked) {
                currentFilters[filterType].push(value);
            } else {
                currentFilters[filterType] = currentFilters[filterType].filter(v => v !== value);
            }

            applyFilters();
        });
    });

    // Optionally fetch products from API on load
    // fetchProducts().then(products => {
    //     allProducts = products;
    //     filteredProducts = [...allProducts];
    //     renderProducts();
    // });
});

// Export functions for external use
window.catalogAPI = {
    fetchProducts,
    addToCart,
    applyFilters,
    clearFilters
};
