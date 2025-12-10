
// State management
const state = {
    uploadedImage: null,
    measurements: null,
    processing: false
};

// DOM Elements
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const uploadArea = document.getElementById('uploadArea');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const removeImage = document.getElementById('removeImage');
const processBtn = document.getElementById('processBtn');
const saveMeasurementsBtn = document.getElementById('saveMeasurementsBtn');

// Result elements
const heightDisplay = document.getElementById('heightDisplay');
const heightUnit = document.getElementById('heightUnit');
const measurementsSection = document.getElementById('measurementsSection');
const fitAdvice = document.getElementById('fitAdvice');
const sizeRecommendations = document.getElementById('sizeRecommendations');

// File input handling
browseBtn.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('click', (e) => {
    if (e.target !== removeImage && !removeImage.contains(e.target)) {
        fileInput.click();
    }
});

fileInput.addEventListener('change', handleFileSelect);

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('upload-drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('upload-drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('upload-drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        state.uploadedImage = e.target.result;
        displayPreview(e.target.result);
        processBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

function displayPreview(imageSrc) {
    previewImage.src = imageSrc;
    previewContainer.innerHTML = '';
    previewContainer.appendChild(imagePreview);
    imagePreview.classList.remove('hidden');
    resetResults();
}

removeImage.addEventListener('click', (e) => {
    e.stopPropagation();
    clearImage();
});

function clearImage() {
    state.uploadedImage = null;
    state.measurements = null;
    imagePreview.classList.add('hidden');
    previewContainer.innerHTML = '<p class="text-gray-400">No image uploaded yet.</p>';
    processBtn.disabled = true;
    saveMeasurementsBtn.disabled = true;
    fileInput.value = '';
    resetResults();
}

function resetResults() {
    heightDisplay.textContent = 'N/A';
    heightUnit.classList.add('hidden');
    measurementsSection.classList.add('hidden');
    sizeRecommendations.classList.add('hidden');
    fitAdvice.textContent = 'Upload and process an image to get recommendations.';
}

// Process image with AI simulation
processBtn.addEventListener('click', async () => {
    if (!state.uploadedImage || state.processing) return;

    state.processing = true;
    processBtn.textContent = 'Processing...';
    processBtn.disabled = true;

    // Show loading state
    heightDisplay.innerHTML = '<div class="shimmer h-12 w-32 rounded"></div>';

    // Simulate AI processing
    await simulateAIProcessing();

    // Generate measurements
    const measurements = generateMeasurements();
    state.measurements = measurements;

    // Display results
    displayResults(measurements);

    state.processing = false;
    processBtn.textContent = 'Process Image';
    processBtn.disabled = false;
    saveMeasurementsBtn.disabled = false;
});

function simulateAIProcessing() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

function generateMeasurements() {
    // Simulate AI-generated measurements
    const baseHeight = 160 + Math.random() * 30; // 160-190 cm
    const height = Math.round(baseHeight * 10) / 10;

    return {
        height: height,
        shoulderWidth: Math.round((height * 0.23) * 10) / 10,
        chest: Math.round((height * 0.52) * 10) / 10,
        waist: Math.round((height * 0.42) * 10) / 10,
        hip: Math.round((height * 0.54) * 10) / 10,
        inseam: Math.round((height * 0.45) * 10) / 10
    };
}

function displayResults(measurements) {
    // Display height
    heightDisplay.textContent = measurements.height;
    heightUnit.classList.remove('hidden');

    // Display body measurements
    document.getElementById('shoulderWidth').textContent = measurements.shoulderWidth + ' cm';
    document.getElementById('chestSize').textContent = measurements.chest + ' cm';
    document.getElementById('waistSize').textContent = measurements.waist + ' cm';
    document.getElementById('hipSize').textContent = measurements.hip + ' cm';
    document.getElementById('inseamSize').textContent = measurements.inseam + ' cm';
    measurementsSection.classList.remove('hidden');

    // Generate size recommendations
    const sizes = calculateSizes(measurements);
    document.getElementById('shirtSize').textContent = sizes.shirt;
    document.getElementById('pantsSize').textContent = sizes.pants;
    document.getElementById('jacketSize').textContent = sizes.jacket;
    sizeRecommendations.classList.remove('hidden');

    // Generate fit advice
    const advice = generateFitAdvice(measurements);
    fitAdvice.textContent = advice;
}

function calculateSizes(measurements) {
    const height = measurements.height;
    const chest = measurements.chest;
    const waist = measurements.waist;

    let shirt, pants, jacket;

    // Shirt size based on chest
    if (chest < 85) shirt = 'XS';
    else if (chest < 95) shirt = 'S';
    else if (chest < 105) shirt = 'M';
    else if (chest < 115) shirt = 'L';
    else shirt = 'XL';

    // Pants size based on waist
    if (waist < 70) pants = '28';
    else if (waist < 75) pants = '30';
    else if (waist < 80) pants = '32';
    else if (waist < 85) pants = '34';
    else if (waist < 90) pants = '36';
    else pants = '38';

    // Jacket size (same as shirt typically)
    jacket = shirt;

    return { shirt, pants, jacket };
}

function generateFitAdvice(measurements) {
    const height = measurements.height;
    const ratio = measurements.waist / measurements.chest;

    let bodyType;
    if (ratio < 0.75) bodyType = 'athletic';
    else if (ratio < 0.85) bodyType = 'average';
    else bodyType = 'relaxed';

    const adviceMap = {
        athletic: `With your athletic build (${height} cm), fitted styles will complement your physique. Consider slim-fit shirts and tapered pants. Structured jackets will enhance your shoulder definition.`,
        average: `At ${height} cm with a balanced build, you have great versatility. Regular fit clothing works well, and you can experiment with both fitted and relaxed styles depending on the occasion.`,
        relaxed: `For your ${height} cm height and comfortable build, opt for classic or relaxed fits. Vertical patterns can create a streamlined look. Consider stretchy fabrics for better comfort and movement.`
    };

    return adviceMap[bodyType];
}

// Save measurements
saveMeasurementsBtn.addEventListener('click', () => {
    if (!state.measurements) return;

    const data = {
        timestamp: new Date().toISOString(),
        measurements: state.measurements,
        image: state.uploadedImage
    };

    // Save to memory (simulate database save)
    const saved = JSON.stringify(data);

    // Show success message
    const originalText = saveMeasurementsBtn.textContent;
    saveMeasurementsBtn.textContent = '✓ Saved!';
    saveMeasurementsBtn.classList.remove('bg-purple-500', 'hover:bg-purple-600');
    saveMeasurementsBtn.classList.add('bg-green-500');

    setTimeout(() => {
        saveMeasurementsBtn.textContent = originalText;
        saveMeasurementsBtn.classList.remove('bg-green-500');
        saveMeasurementsBtn.classList.add('bg-purple-500', 'hover:bg-purple-600');
    }, 2000);

    console.log('Measurements saved:', data.measurements);
});