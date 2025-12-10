
// =====================================
// CLIENT-SIDE STATE MANAGEMENT
// =====================================
const AppState = {
    user: null,
    notifications: [],
    stats: {
        wardrobeItems: 0,
        savedOutfits: 0,
        shopVisits: 0
    }
};

// =====================================
// SIMULATED SERVER-SIDE API
// =====================================
const ServerAPI = {
    // Simulate API delay
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    // User Authentication
    async getCurrentUser() {
        await this.delay(500);
        return {
            id: 'user_123',
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=4F46E5&color=fff',
            preferences: {
                style: 'casual-chic',
                colors: ['blue', 'black', 'white']
            }
        };
    },

    // Get user statistics
    async getUserStats(userId) {
        await this.delay(600);
        return {
            wardrobeItems: 124,
            savedOutfits: 32,
            shopVisits: 8
        };
    },

    // Get notifications
    async getNotifications(userId) {
        await this.delay(400);
        return [
            { id: 1, message: 'New outfit recommendation available', read: false, timestamp: new Date() },
            { id: 2, message: 'Sale alert: 30% off your favorite brands', read: false, timestamp: new Date() },
            { id: 3, message: 'Your wardrobe analysis is ready', read: true, timestamp: new Date() }
        ];
    },

    // Upload photo for analysis
    async uploadPhoto(file) {
        await this.delay(2000);
        return {
            success: true,
            analysis: {
                clothing_items: ['shirt', 'jeans'],
                colors: ['blue', 'denim'],
                style: 'casual'
            },
            message: 'Photo analyzed successfully'
        };
    },

    // Start body measurement
    async startBodyMeasurement(userId) {
        await this.delay(1500);
        return {
            success: true,
            sessionId: 'measurement_' + Date.now(),
            message: 'Measurement session started'
        };
    },

    // Generate outfit
    async generateOutfit(userId, preferences) {
        await this.delay(2500);
        return {
            success: true,
            outfit: {
                id: 'outfit_' + Date.now(),
                items: [
                    { type: 'top', name: 'White Cotton Shirt', image: 'placeholder.jpg' },
                    { type: 'bottom', name: 'Blue Denim Jeans', image: 'placeholder.jpg' },
                    { type: 'shoes', name: 'White Sneakers', image: 'placeholder.jpg' }
                ],
                occasion: 'casual',
                season: 'spring'
            },
            message: 'Outfit generated successfully'
        };
    },

    // Logout user
    async logout(userId) {
        await this.delay(300);
        return { success: true, message: 'Logged out successfully' };
    }
};

// =====================================
// UI HELPER FUNCTIONS
// =====================================
function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');

    // Set icon based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle text-green-500 text-xl mt-1';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle text-red-500 text-xl mt-1';
    } else if (type === 'info') {
        toastIcon.className = 'fas fa-info-circle text-blue-500 text-xl mt-1';
    }

    toastMessage.textContent = message;
    toast.classList.remove('translate-x-full');

    // Auto hide after 3 seconds
    setTimeout(() => {
        hideToast();
    }, 3000);
}

function hideToast() {
    document.getElementById('toast').classList.add('translate-x-full');
}

function animateCount(elementId, targetValue, duration = 1000) {
    const element = document.getElementById(elementId);
    const start = parseInt(element.textContent) || 0;
    const increment = (targetValue - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// =====================================
// APPLICATION INITIALIZATION
// =====================================
async function initializeApp() {
    showLoading();
    try {
        // Fetch user data
        AppState.user = await ServerAPI.getCurrentUser();

        // Update UI with user data
        document.getElementById('welcomeMessage').textContent = `Hello, ${AppState.user.name}!`;
        document.getElementById('profileName').textContent = AppState.user.name;
        document.getElementById('userAvatar').src = AppState.user.avatar;

        // Fetch and display stats
        AppState.stats = await ServerAPI.getUserStats(AppState.user.id);
        animateCount('wardrobeCount', AppState.stats.wardrobeItems);
        animateCount('outfitCount', AppState.stats.savedOutfits);
        animateCount('visitCount', AppState.stats.shopVisits);

        // Fetch notifications
        await fetchNotifications();

        hideLoading();
        showToast('Welcome back, ' + AppState.user.name + '!', 'success');
    } catch (error) {
        hideLoading();
        console.error('Initialization error:', error);
        showToast('Failed to load user data', 'error');
    }
}

// =====================================
// FEATURE FUNCTIONS
// =====================================
async function fetchNotifications() {
    try {
        AppState.notifications = await ServerAPI.getNotifications(AppState.user?.id);
        const unreadCount = AppState.notifications.filter(n => !n.read).length;
        document.getElementById('notificationBadge').textContent = unreadCount;

        if (unreadCount > 0) {
            document.getElementById('notificationBadge').classList.remove('hidden');
        } else {
            document.getElementById('notificationBadge').classList.add('hidden');
        }
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
}

function uploadPhoto() {
    document.getElementById('photoInput').click();
}

async function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    showLoading();
    try {
        const result = await ServerAPI.uploadPhoto(file);
        hideLoading();

        if (result.success) {
            showToast(result.message, 'success');
            console.log('Analysis result:', result.analysis);
        }
    } catch (error) {
        hideLoading();
        showToast('Failed to upload photo', 'error');
        console.error('Upload error:', error);
    }
}

async function startMeasurement() {
    showLoading();
    try {
        const result = await ServerAPI.startBodyMeasurement(AppState.user?.id);
        hideLoading();

        if (result.success) {
            showToast(result.message, 'success');
            console.log('Measurement session:', result.sessionId);
        }
    } catch (error) {
        hideLoading();
        showToast('Failed to start measurement', 'error');
        console.error('Measurement error:', error);
    }
}

async function generateOutfit() {
    showLoading();
    try {
        const result = await ServerAPI.generateOutfit(AppState.user?.id, AppState.user?.preferences);
        hideLoading();

        if (result.success) {
            showToast(result.message, 'success');
            console.log('Generated outfit:', result.outfit);

            // Update outfit count
            AppState.stats.savedOutfits++;
            animateCount('outfitCount', AppState.stats.savedOutfits);
        }
    } catch (error) {
        hideLoading();
        showToast('Failed to generate outfit', 'error');
        console.error('Generation error:', error);
    }
}

function exploreWardrobe() {
    navigateToPage('wardrobe');
    showToast('Loading your wardrobe...', 'info');
}

async function handleLogout(event) {
    event.preventDefault();

    const confirmed = confirm('Are you sure you want to logout?');
    if (!confirmed) return;

    showLoading();
    try {
        await ServerAPI.logout(AppState.user?.id);
        hideLoading();
        showToast('Logged out successfully', 'success');

        // Reset state
        AppState.user = null;
        AppState.stats = { wardrobeItems: 0, savedOutfits: 0, shopVisits: 0 };

        // In a real app, redirect to login page
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    } catch (error) {
        hideLoading();
        showToast('Logout failed', 'error');
        console.error('Logout error:', error);
    }
}

// =====================================
// NAVIGATION
// =====================================
function navigateToPage(pageName) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-gray-100', 'text-gray-900');
        link.classList.add('text-gray-600');
    });

    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('bg-gray-100', 'text-gray-900');
        activeLink.classList.remove('text-gray-600');
    }

    // Update page title
    const pageTitle = activeLink?.textContent.trim() || 'Dashboard';
    document.getElementById('pageTitle').textContent = pageTitle;

    // In a real app, you would load the appropriate page content here
    showToast(`Navigating to ${pageTitle}...`, 'info');
}

// Setup navigation listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = link.getAttribute('data-page');
            navigateToPage(pageName);
        });
    });

    // Initialize app
    initializeApp();
});

// =====================================
// PERIODIC UPDATES
// =====================================
// Check for new notifications every 30 seconds
setInterval(() => {
    if (AppState.user) {
        fetchNotifications();
    }
}, 30000);
