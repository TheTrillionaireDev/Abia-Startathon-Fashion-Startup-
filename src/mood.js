
        // API Configuration
        const API_CONFIG = {
            baseURL: 'https://api.stylesense.ai/v1', // Replace with your API endpoint
            endpoints: {
                generateOutfits: '/outfits/generate',
                saveOutfit: '/outfits/save',
                getUserPreferences: '/user/preferences',
                getOutfitDetails: '/outfits/:id'
            },
            apiKey: 'YOUR_API_KEY_HERE' // In production, handle securely
        };

        // State Management
        const appState = {
            selectedMood: 'calm',
            eventName: '',
            eventDetails: '',
            generatedOutfits: [],
            userPreferences: {}
        };

        // API Service Layer
        class APIService {
            static async request(endpoint, options = {}) {
                const url = `${API_CONFIG.baseURL}${endpoint}`;
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_CONFIG.apiKey}`,
                    ...options.headers
                };

                try {
                    const response = await fetch(url, {
                        ...options,
                        headers
                    });

                    if (!response.ok) {
                        throw new Error(`API Error: ${response.status} ${response.statusText}`);
                    }

                    return await response.json();
                } catch (error) {
                    console.error('API Request Failed:', error);
                    throw error;
                }
            }

            static async generateOutfits(mood, occasion, details) {
                return this.request(API_CONFIG.endpoints.generateOutfits, {
                    method: 'POST',
                    body: JSON.stringify({
                        mood,
                        occasion,
                        details,
                        userPreferences: appState.userPreferences
                    })
                });
            }

            static async saveOutfit(outfitId) {
                return this.request(API_CONFIG.endpoints.saveOutfit, {
                    method: 'POST',
                    body: JSON.stringify({ outfitId })
                });
            }

            static async getUserPreferences() {
                return this.request(API_CONFIG.endpoints.getUserPreferences);
            }
        }

        // Mock Data (for demonstration - remove when connecting to real API)
        const mockOutfits = [
            {
                id: 1,
                name: 'Evening Elegance',
                description: 'Timeless black gown paired with subtle pearl',
                type: 'Formal Event',
                items: 'Black Maxi Dress, Pearl Drop Earrings, Stiletto Heels',
                image: 'https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2'
            },
            {
                id: 2,
                name: 'Modern Professional',
                description: 'Sharp and comfortable, ideal for business',
                type: 'Business Casual',
                items: 'Tailored Trousers, Button-Down Shirt, Blazer',
                image: 'https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2'
            },
            {
                id: 3,
                name: 'Weekend Wanderer',
                description: 'Effortlessly chic for a relaxed day out or casual',
                type: 'Casual Outing',
                items: 'Distressed Jeans, Oversized T-Shirt, White Sneakers',
                image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2'
            },
            {
                id: 4,
                name: 'Romantic Evening',
                description: 'Captivate with this bold yet elegant choice for a',
                type: 'Date Night',
                items: 'Red Cocktail Dress, Heels, Clutch Bag',
                image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2'
            },
            {
                id: 5,
                name: 'Active & Stylish',
                description: 'Combine comfort with a modern edge for your',
                type: 'Sporty/Athleisure',
                items: 'Sports Bra, Leggings, Crop Top, Trainers',
                image: 'https://images.pexels.com/photos/4498610/pexels-photo-4498610.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2'
            },
            {
                id: 6,
                name: 'Summer Breeze',
                description: 'Light and airy, perfect for a sunny brunch or',
                type: 'Summer Brunch',
                items: 'Floral Sundress, Sandals, Sun Hat',
                image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&dpr=2'
            }
        ];

        // UI Rendering Functions
        function renderOutfitCard(outfit) {
            return `
                <div class="outfit-card bg-white rounded-lg overflow-hidden border border-gray-200">
                    <div class="relative h-64 bg-gray-200">
                        <img src="${outfit.image}" alt="${outfit.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-900 mb-1">${outfit.name}</h3>
                        <p class="text-sm text-gray-600 mb-2">${outfit.description}</p>
                        <div class="mb-3">
                            <span class="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">${outfit.type}</span>
                        </div>
                        <p class="text-xs text-gray-500 mb-4">Key Items: ${outfit.items}</p>
                        <div class="flex gap-2">
                            <button onclick="shopNow(${outfit.id})" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                                Shop Now
                            </button>
                            <button onclick="saveOutfit(${outfit.id})" class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition">
                                Save Out
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderOutfits(outfits) {
            const grid = document.getElementById('outfitsGrid');
            const loadingState = document.getElementById('loadingState');
            
            loadingState.classList.add('hidden');
            grid.innerHTML = outfits.map(outfit => renderOutfitCard(outfit)).join('');
        }

        // Event Handlers
        function handleMoodSelection(mood) {
            appState.selectedMood = mood;
            
            // Update UI
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.classList.remove('active-mood', 'border-blue-600');
                btn.classList.add('border-gray-200');
            });
            
            const selectedBtn = document.querySelector(`[data-mood="${mood}"]`);
            selectedBtn.classList.add('active-mood', 'border-blue-600');
            selectedBtn.classList.remove('border-gray-200');
        }

        async function generateOutfits() {
            const eventName = document.getElementById('eventName').value;
            const eventDetails = document.getElementById('eventDetails').value;
            const loadingState = document.getElementById('loadingState');
            const grid = document.getElementById('outfitsGrid');
            
            // Show loading state
            grid.innerHTML = '';
            loadingState.classList.remove('hidden');
            
            try {
                // In production, use real API call
                // const response = await APIService.generateOutfits(
                //     appState.selectedMood,
                //     eventName,
                //     eventDetails
                // );
                // appState.generatedOutfits = response.outfits;
                
                // Mock API delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Use mock data for demonstration
                appState.generatedOutfits = mockOutfits;
                renderOutfits(appState.generatedOutfits);
                
            } catch (error) {
                loadingState.classList.add('hidden');
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-red-600">Failed to generate outfits. Please try again.</p>
                    </div>
                `;
                console.error('Error generating outfits:', error);
            }
        }

        async function saveOutfit(outfitId) {
            try {
                // In production, use real API call
                // await APIService.saveOutfit(outfitId);
                
                alert('Outfit saved to your wardrobe!');
            } catch (error) {
                alert('Failed to save outfit. Please try again.');
                console.error('Error saving outfit:', error);
            }
        }

        function shopNow(outfitId) {
            // Redirect to shopping page or open modal
            console.log('Shopping for outfit:', outfitId);
            alert('Redirecting to shopping page...');
        }

        // Initialize Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Mood button listeners
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    handleMoodSelection(btn.dataset.mood);
                });
            });

            // Generate button listener
            document.getElementById('generateBtn').addEventListener('click', generateOutfits);

            // Load initial outfits
            renderOutfits(mockOutfits);

            // Load user preferences (in production)
            // APIService.getUserPreferences().then(prefs => {
            //     appState.userPreferences = prefs;
            // });
        });

        // Backend Integration Guide:
        // 
        // 1. Replace API_CONFIG.baseURL with your actual API endpoint
        // 2. Implement authentication (replace apiKey with secure token management)
        // 3. Remove mock data and uncomment real API calls
        // 4. Add error handling and retry logic
        // 5. Implement request caching for better performance
        // 6. Add analytics tracking for user interactions
        // 7. Implement file upload for custom images (if needed)
        // 8. Add WebSocket connection for real-time outfit generation updates
  