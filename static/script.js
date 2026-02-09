// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const browseBtn = document.getElementById('browseBtn');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const removeBtn = document.getElementById('removeBtn');
const predictBtn = document.getElementById('predictBtn');
const trainBtn = document.getElementById('trainBtn');
const resultsSection = document.getElementById('resultsSection');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');

let selectedImage = null;
let base64Image = null;

// ===== Event Listeners =====

// Browse button click
browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    imageInput.click();
});

// Upload area click
uploadArea.addEventListener('click', () => {
    imageInput.click();
});

// File input change
imageInput.addEventListener('change', handleFileSelect);

// Drag and drop events
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// Remove button
removeBtn.addEventListener('click', resetUpload);

// Predict button
predictBtn.addEventListener('click', predictImage);

// Train button
trainBtn.addEventListener('click', trainModel);

// ===== Functions =====

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, JPEG, or PNG)');
        return;
    }

    selectedImage = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        base64Image = e.target.result.split(',')[1]; // Remove data:image/...;base64, prefix
        imagePreview.src = e.target.result;
        uploadArea.style.display = 'none';
        previewContainer.style.display = 'block';
        predictBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

function resetUpload() {
    selectedImage = null;
    base64Image = null;
    imageInput.value = '';
    uploadArea.style.display = 'block';
    previewContainer.style.display = 'none';
    predictBtn.disabled = true;
    resultsSection.style.display = 'none';
}

async function predictImage() {
    if (!base64Image) {
        alert('Please upload an image first');
        return;
    }

    // Show loading
    loadingOverlay.style.display = 'flex';
    loadingText.textContent = 'Analyzing CT Scan...';

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
        });

        const result = await response.json();
        displayResult(result);
    } catch (error) {
        console.error('Prediction error:', error);
        alert('An error occurred during prediction. Please try again.');
    } finally {
        loadingOverlay.style.display = 'none';
    }
}

function displayResult(result) {
    const resultCard = document.querySelector('.result-card');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');

    // Get prediction from response
    const prediction = result[0]?.image || 'Unknown';
    const isTumor = prediction.toLowerCase() === 'tumor';

    // Update result card
    resultCard.className = 'result-card ' + (isTumor ? 'tumor' : 'normal');
    
    if (isTumor) {
        resultIcon.innerHTML = '⚠️';
        resultTitle.textContent = 'Tumor Detected';
        resultDescription.textContent = 'The AI analysis indicates the presence of a potential tumor in the kidney CT scan. Please consult a medical professional for further evaluation.';
    } else {
        resultIcon.innerHTML = '✅';
        resultTitle.textContent = 'Normal';
        resultDescription.textContent = 'The AI analysis indicates no tumor detected in the kidney CT scan. The kidney appears to be healthy based on this scan.';
    }

    // Show results
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

async function trainModel() {
    if (!confirm('This will retrain the model which may take several minutes. Continue?')) {
        return;
    }

    // Show loading
    loadingOverlay.style.display = 'flex';
    loadingText.textContent = 'Training model... This may take a while.';

    try {
        const response = await fetch('/train', {
            method: 'POST',
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Training error:', error);
        alert('An error occurred during training. Please check the console.');
    } finally {
        loadingOverlay.style.display = 'none';
    }
}
