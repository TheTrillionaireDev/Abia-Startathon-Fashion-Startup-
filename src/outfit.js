
// Initial outfit data
var outfitData = {
    monday: {
        title: 'Formal Business Attire',
        description: 'A classic blue suit for a professional start to the week, ideal for office or important meetings.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop',
        hasOutfit: true
    },
    tuesday: {
        title: 'Smart Casual Ensemble',
        description: 'Comfortable yet stylish for a productive day, perfect for meetings.',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=300&fit=crop',
        hasOutfit: true
    },
    wednesday: {
        title: 'Active Workout Gear',
        description: 'Stay motivated with functional and sleek activewear, energize for your fitness.',
        image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop',
        hasOutfit: true
    },
    thursday: {
        title: 'Elegant Evening Look',
        description: 'Chic and sophisticated for a special evening out or a romantic dinner.',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop',
        hasOutfit: true
    },
    friday: {
        title: 'Relaxed Weekend Vibes',
        description: 'Comfort is key for unwinding after a long week, perfect for casual outings.',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop',
        hasOutfit: true
    },
    saturday: {
        title: '',
        description: '',
        image: '',
        hasOutfit: false
    },
    sunday: {
        title: 'Sunday Brunch Attire',
        description: 'Effortlessly stylish for a leisurely weekend brunch with friends or family.',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop',
        hasOutfit: true
    }
};

var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
var dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// API Integration Functions
function generateWeeklyPlan() {
    console.log('Generating weekly plan with AI...');
    alert('AI Weekly Plan Generation - Ready for API integration');

    // API Integration Template:
    // fetch('/api/generate-weekly-plan', {
    //     method: 'POST',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer YOUR_TOKEN'
    //     }
    // })
    // .then(function(response) { 
    //     if (!response.ok) throw new Error('Network response was not ok');
    //     return response.json(); 
    // })
    // .then(function(data) {
    //     Object.assign(outfitData, data.outfits);
    //     renderOutfits();
    //     alert('Weekly plan generated successfully!');
    // })
    // .catch(function(error) {
    //     console.error('Error generating plan:', error);
    //     alert('Failed to generate plan. Please try again.');
    // });
}

function viewOutfit(day) {
    console.log('Viewing outfit for ' + day);
    alert('View Outfit Details\nDay: ' + dayLabels[days.indexOf(day)] + '\n\nReady for API integration');

    // API Integration Template:
    // fetch('/api/outfits/' + day, {
    //     method: 'GET',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer YOUR_TOKEN'
    //     }
    // })
    // .then(function(response) { 
    //     if (!response.ok) throw new Error('Network response was not ok');
    //     return response.json(); 
    // })
    // .then(function(data) {
    //     // Open modal or navigate to detail page
    //     console.log('Outfit details:', data);
    // })
    // .catch(function(error) {
    //     console.error('Error viewing outfit:', error);
    //     alert('Failed to load outfit details.');
    // });
}

function addOutfit(day) {
    console.log('Adding outfit for ' + day);
    alert('Add Outfit\nDay: ' + dayLabels[days.indexOf(day)] + '\n\nReady for API integration');

    // API Integration Template:
    // var newOutfit = {
    //     day: day,
    //     title: 'New Outfit',
    //     description: 'Description here',
    //     image: 'image_url_here'
    // };
    // 
    // fetch('/api/outfits', {
    //     method: 'POST',
    //     headers: { 
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer YOUR_TOKEN'
    //     },
    //     body: JSON.stringify(newOutfit)
    // })
    // .then(function(response) { 
    //     if (!response.ok) throw new Error('Network response was not ok');
    //     return response.json(); 
    // })
    // .then(function(data) {
    //     outfitData[day] = {
    //         title: data.title,
    //         description: data.description,
    //         image: data.image,
    //         hasOutfit: true
    //     };
    //     renderOutfits();
    //     alert('Outfit added successfully!');
    // })
    // .catch(function(error) {
    //     console.error('Error adding outfit:', error);
    //     alert('Failed to add outfit. Please try again.');
    // });
}

// Render outfit cards
function renderOutfits() {
    var grid = document.getElementById('outfitGrid');
    grid.innerHTML = '';

    days.forEach(function (day, index) {
        var dayLabel = dayLabels[index];
        var outfit = outfitData[day];

        var daySection = document.createElement('div');

        if (!outfit.hasOutfit) {
            daySection.innerHTML =
                '<div class="space-y-3">' +
                '<h2 class="text-sm font-semibold text-gray-900">' + dayLabel + '</h2>' +
                '<div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">' +
                '<div class="h-44 bg-gray-50 flex items-center justify-center">' +
                '<div class="text-center">' +
                '<div class="w-14 h-14 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">' +
                '<svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>' +
                '</svg>' +
                '</div>' +
                '<p class="text-xs text-gray-400">No outfit planned</p>' +
                '</div>' +
                '</div>' +
                '<div class="p-4">' +
                '<button onclick="addOutfit(\'' + day + '\')" class="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-lg font-medium transition-colors">' +
                'Add Outfit' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>';
        } else {
            daySection.innerHTML =
                '<div class="space-y-3">' +
                '<h2 class="text-sm font-semibold text-gray-900">' + dayLabel + '</h2>' +
                '<div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">' +
                '<div class="relative h-44 overflow-hidden bg-gray-100">' +
                '<img src="' + outfit.image + '" alt="' + outfit.title + '" class="w-full h-full object-cover">' +
                '</div>' +
                '<div class="p-4 space-y-3">' +
                '<div>' +
                '<h3 class="font-semibold text-gray-900 text-sm mb-1">' + outfit.title + '</h3>' +
                '<p class="text-xs text-gray-600 line-clamp-2">' + outfit.description + '</p>' +
                '</div>' +
                '<button onclick="viewOutfit(\'' + day + '\')" class="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-lg font-medium transition-colors">' +
                'View Outfit' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        grid.appendChild(daySection);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle
    var menuToggle = document.getElementById('menuToggle');
    var sidebar = document.getElementById('sidebar');
    var sidebarOverlay = document.getElementById('sidebarOverlay');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('-translate-x-full');
        sidebarOverlay.classList.toggle('hidden');
    });

    sidebarOverlay.addEventListener('click', function () {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
    });

    // Generate plan button
    document.getElementById('generatePlanBtn').addEventListener('click', generateWeeklyPlan);

    // Initial render
    renderOutfits();
});
