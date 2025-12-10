
// Mock wardrobe data
const wardrobeItems = [
    { id: 1, name: 'Black Leather Jacket', category: 'outerwear', brand: 'Zara', color: 'Black', favorite: true, wornCount: 15, image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 2, name: 'White Cotton Shirt', category: 'tops', brand: 'H&M', color: 'White', favorite: false, wornCount: 22, image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 3, name: 'Blue Denim Jeans', category: 'bottoms', brand: "Levi's", color: 'Blue', favorite: true, wornCount: 30, image: 'https://images.pexels.com/photos/1346187/pexels-photo-1346187.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 4, name: 'Floral Summer Dress', category: 'dresses', brand: 'Forever 21', color: 'Floral', favorite: true, wornCount: 8, image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 5, name: 'Red Cocktail Dress', category: 'dresses', brand: 'Zara', color: 'Red', favorite: false, wornCount: 5, image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 6, name: 'White Sneakers', category: 'shoes', brand: 'Nike', color: 'White', favorite: true, wornCount: 45, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 7, name: 'Black Heels', category: 'shoes', brand: 'Steve Madden', color: 'Black', favorite: false, wornCount: 12, image: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 8, name: 'Beige Trench Coat', category: 'outerwear', brand: 'Burberry', color: 'Beige', favorite: true, wornCount: 10, image: 'https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 9, name: 'Striped T-Shirt', category: 'tops', brand: 'Gap', color: 'Striped', favorite: false, wornCount: 18, image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 10, name: 'Gold Necklace', category: 'accessories', brand: 'Tiffany', color: 'Gold', favorite: true, wornCount: 25, image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 11, name: 'Black Blazer', category: 'outerwear', brand: 'Mango', color: 'Black', favorite: false, wornCount: 14, image: 'https://images.pexels.com/photos/7679880/pexels-photo-7679880.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 12, name: 'Yoga Pants', category: 'bottoms', brand: 'Lululemon', color: 'Black', favorite: true, wornCount: 40, image: 'https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 13, name: 'Silk Scarf', category: 'accessories', brand: 'Hermès', color: 'Multi', favorite: false, wornCount: 6, image: 'https://images.pexels.com/photos/6463348/pexels-photo-6463348.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 14, name: 'Oversized Sweater', category: 'tops', brand: 'Uniqlo', color: 'Gray', favorite: true, wornCount: 20, image: 'https://images.pexels.com/photos/8148574/pexels-photo-8148574.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' },
    { id: 15, name: 'Ankle Boots', category: 'shoes', brand: 'Aldo', color: 'Brown', favorite: false, wornCount: 16, image: 'https://images.pexels.com/photos/1476209/pexels-photo-1476209.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2' }
];

let currentCategory = 'all';

// Render wardrobe items
function renderWardrobeItems(items) {
    const grid = document.getElementById('wardrobeGrid');
    const filteredItems = currentCategory === 'all' ? items : items.filter(item => item.category === currentCategory);

    grid.innerHTML = filteredItems.map(item => `
                <div class="item-card bg-white rounded-lg overflow-hidden border border-gray-200 relative group cursor-pointer">
                    <div class="relative aspect-[75%] bg-gray-100">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                        <button onclick="toggleFavorite(${item.id})" class="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition">
                            <span class="${item.favorite ? 'text-red-500' : 'text-gray-400'}">❤️</span>
                        </button>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div class="flex gap-2">
                                <button onclick="viewItem(${item.id})" class="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition">
                                    View
                                </button>
                                <button onclick="editItem(${item.id})" class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-3">
                        <h3 class="font-semibold text-gray-900 text-sm mb-1 truncate">${item.name}</h3>
                        <p class="text-xs text-gray-500 mb-2">${item.brand}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-600">Worn ${item.wornCount}x</span>
                            <span class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">${item.color}</span>
                        </div>
                    </div>
                </div>
            `).join('');
}

// Category filter
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.remove('category-active');
            b.classList.add('bg-gray-100', 'text-gray-700');
        });
        btn.classList.add('category-active');
        btn.classList.remove('bg-gray-100', 'text-gray-700');

        currentCategory = btn.dataset.category;
        renderWardrobeItems(wardrobeItems);
    });
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = wardrobeItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    renderWardrobeItems(filtered);
});

// Modal functions
function openAddItemModal() {
    document.getElementById('addItemModal').classList.remove('hidden');
    document.getElementById('addItemModal').classList.add('flex');
}

function closeAddItemModal() {
    document.getElementById('addItemModal').classList.add('hidden');
    document.getElementById('addItemModal').classList.remove('flex');
}

// Item actions
function toggleFavorite(id) {
    const item = wardrobeItems.find(i => i.id === id);
    if (item) {
        item.favorite = !item.favorite;
        renderWardrobeItems(wardrobeItems);
    }
}

function viewItem(id) {
    console.log('Viewing item:', id);
    alert('Opening item details...');
}

function editItem(id) {
    console.log('Editing item:', id);
    alert('Opening edit dialog...');
}

// Form submission
document.getElementById('addItemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Item added to wardrobe!');
    closeAddItemModal();
});

// Initialize
renderWardrobeItems(wardrobeItems);
