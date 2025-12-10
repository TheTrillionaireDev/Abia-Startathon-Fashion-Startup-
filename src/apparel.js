
// Product Data
const products = [
    {
        id: 1,
        name: "Classic Striped T-Shirt",
        category: "Casual Top",
        price: 29.99,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3ET-Shirt%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Blue"],
        occasion: ["Casual", "Everyday"]
    },
    {
        id: 2,
        name: "Elegant Tailored Blazer",
        category: "Formal Outerwear",
        price: 120.00,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e0e0e0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3EBlazer%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L"],
        colors: ["Black", "White"],
        occasion: ["Formal", "Business"]
    },
    {
        id: 3,
        name: "Comfort High-Waist Jeans",
        category: "Casual Bottoms",
        price: 65.50,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23d0e0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3EJeans%3C/text%3E%3C/svg%3E",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Blue"],
        occasion: ["Casual", "Everyday"]
    },
    {
        id: 4,
        name: "Cozy Oversized Knit Sweater",
        category: "Warm Sweater",
        price: 75.00,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f5f5dc' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3ESweater%3C/text%3E%3C/svg%3E",
        sizes: ["M", "L", "XL"],
        colors: ["Cream", "White"],
        occasion: ["Casual", "Everyday"]
    },
    {
        id: 5,
        name: "Floral Print Summer Dress",
        category: "Blossom Fashion",
        price: 89.99,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ffe0e0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3EDress%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L"],
        colors: ["Red", "White"],
        occasion: ["Casual", "Party"]
    },
    {
        id: 6,
        name: "Sporty Lifestyle Sneakers",
        category: "Sport Shoes",
        price: 95.00,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3ESneakers%3C/text%3E%3C/svg%3E",
        sizes: ["M", "L", "XL"],
        colors: ["White", "Black"],
        occasion: ["Sporty", "Casual"]
    },
    {
        id: 7,
        name: "Sophisticated Pencil Skirt",
        category: "Professional Skirt",
        price: 55.00,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23333' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='16'%3ESkirt%3C/text%3E%3C/svg%3E",
        sizes: ["XS", "S", "M", "L"],
        colors: ["Black"],
        occasion: ["Business", "Formal"]
    },
    {
        id: 8,
        name: "Vintage Leather Jacket",
        category: "Timeless Outerwear",
        price: 180.00,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%238B4513' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23fff' font-size='16'%3EJacket%3C/text%3E%3C/svg%3E",
        sizes: ["M", "L", "XL"],
        colors: ["Brown", "Black"],
        occasion: ["Casual", "Everyday"]
    },
    {
        id: 9,
        name: "Comfortable Chino Pants",
        category: "Smart Casual",
        price: 49.99,
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23D2B48C' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23666' font-size='16'%3EChinos%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Brown", "Black"],
        occasion: ["Casual", "Business"]
    }
];

let filteredProducts = [...products];
let userPreferences = {
    favoriteColors: [],
    preferredSizes: [],
    styleProfile: "casual"
};

// Initialize
renderProducts(products);

// Filter Logic
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

document.getElementById('priceRange').addEventListener('input', (e) => {
    document.getElementById('priceValue').textContent = `$${e.target.value}`;
    applyFilters();
});

document.getElementById('sortBy').addEventListener('change', applySorting);

document.getElementById('clearFilters').addEventListener('click', () => {
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    document.getElementById('priceRange').value = 250;
    document.getElementById('priceValue').textContent = '$250';
    applyFilters();
});

function applyFilters() {
    const sizes = Array.from(document.querySelectorAll('[data-filter="size"]:checked')).map(cb => cb.value);
    const colors = Array.from(document.querySelectorAll('[data-filter="color"]:checked')).map(cb => cb.value);
    const occasions = Array.from(document.querySelectorAll('[data-filter="occasion"]:checked')).map(cb => cb.value);
    const maxPrice = parseFloat(document.getElementById('priceRange').value);

    filteredProducts = products.filter(product => {
        const sizeMatch = sizes.length === 0 || product.sizes.some(s => sizes.includes(s));
        const colorMatch = colors.length === 0 || product.colors.some(c => colors.includes(c));
        const occasionMatch = occasions.length === 0 || product.occasion.some(o => occasions.includes(o));
        const priceMatch = product.price <= maxPrice;

        return sizeMatch && colorMatch && occasionMatch && priceMatch;
    });

    renderProducts(filteredProducts);
}

function applySorting() {
    const sortBy = document.getElementById('sortBy').value;

    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'recommended':
        default:
            // AI-based sorting would go here
            filteredProducts.sort(() => Math.random() - 0.5);
    }

    renderProducts(filteredProducts);
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('productGrid');
    document.getElementById('resultCount').textContent = productsToRender.length;

    if (productsToRender.length === 0) {
        grid.innerHTML = '<div class="col-span-3 text-center py-12 text-gray-600">No products found. Try adjusting your filters.</div>';
        return;
    }

    grid.innerHTML = productsToRender.map(product => `
                <div class="slide-in bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-t-lg bg-gray-100">
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-900 mb-1">${product.name}</h3>
                        <p class="text-xs text-gray-500 mb-2">${product.category}</p>
                        <div class="flex gap-1 mb-2">
                            ${product.sizes.slice(0, 4).map(size =>
        `<span class="text-xs px-2 py-1 bg-gray-100 rounded">${size}</span>`
    ).join('')}
                        </div>
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-lg font-bold text-blue-600">$${product.price.toFixed(2)}</span>
                        </div>
                        <button onclick="addToCart(${product.id})" class="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Buy Now
                        </button>
                    </div>
                </div>
            `).join('');
}

// AI Search Functionality
document.getElementById('aiSearchBtn').addEventListener('click', handleAISearch);
document.getElementById('aiSearch').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAISearch();
});

async function handleAISearch() {
    const query = document.getElementById('aiSearch').value.trim();
    if (!query) return;

    const loadingIndicator = document.getElementById('loadingIndicator');
    const productGrid = document.getElementById('productGrid');

    loadingIndicator.classList.remove('hidden');
    productGrid.classList.add('hidden');

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                messages: [{
                    role: "user",
                    content: `You are a fashion AI assistant. Based on this query: "${query}"
                            
Available products: ${JSON.stringify(products.map(p => ({ name: p.name, price: p.price, occasion: p.occasion, colors: p.colors })))}

Analyze the query and return ONLY a JSON object (no other text) with:
{
  "recommendations": [array of product IDs that best match],
  "explanation": "brief explanation of why these items match",
  "suggestedFilters": {
    "colors": [],
    "occasions": [],
    "maxPrice": number
  }
}`
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.content[0].text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(aiResponse);

        // Apply AI recommendations
        if (parsed.suggestedFilters) {
            applyAIFilters(parsed.suggestedFilters);
        }

        // Show AI explanation
        document.getElementById('aiSuggestion').textContent = `💡 ${parsed.explanation}`;
        document.getElementById('aiSuggestion').classList.remove('hidden');

        setTimeout(() => {
            loadingIndicator.classList.add('hidden');
            productGrid.classList.remove('hidden');
        }, 500);

    } catch (error) {
        console.error('AI Search error:', error);
        loadingIndicator.classList.add('hidden');
        productGrid.classList.remove('hidden');
        alert('AI search encountered an issue. Showing all products.');
    }
}

function applyAIFilters(filters) {
    // Clear existing filters
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);

    // Apply color filters
    if (filters.colors) {
        filters.colors.forEach(color => {
            const checkbox = document.querySelector(`[data-filter="color"][value="${color}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    // Apply occasion filters
    if (filters.occasions) {
        filters.occasions.forEach(occasion => {
            const checkbox = document.querySelector(`[data-filter="occasion"][value="${occasion}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    // Apply price filter
    if (filters.maxPrice) {
        document.getElementById('priceRange').value = filters.maxPrice;
        document.getElementById('priceValue').textContent = `$${filters.maxPrice}`;
    }

    applyFilters();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    alert(`Added "${product.name}" to cart! 🛒`);

    // Update user preferences for AI learning
    userPreferences.favoriteColors.push(...product.colors);
    userPreferences.preferredSizes.push(...product.sizes);
}

// Modal Controls
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('aiModal').classList.add('hidden');
});
