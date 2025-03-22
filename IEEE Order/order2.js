// Price calculation variables
const baseRates = {
    standard: 10,
    express: 15
};

let selectedSpeed = 'standard';
let additionalElements = new Set();

// DOM Elements
const pagesInput = document.getElementById('pages');
const speedOptions = document.querySelectorAll('.option-card');
const additionalCheckboxes = document.querySelectorAll('.checkbox-group input');
const basePrice = document.getElementById('base-price');
const speedPremium = document.getElementById('speed-premium');
const additionalPrice = document.getElementById('additional-price');
const totalPrice = document.getElementById('total-price');

// Calculate and update prices
function updatePrices() {
    const pages = parseInt(pagesInput.value) || 0;
    const baseRate = baseRates[selectedSpeed];
    
    const basePriceValue = pages * baseRate;
    const speedPremiumValue = selectedSpeed === 'express' ? pages * 5 : 0;
    const additionalPriceValue = additionalElements.size * 10;
    
    const total = basePriceValue + speedPremiumValue + additionalPriceValue;
    
    basePrice.textContent = `$${basePriceValue}`;
    speedPremium.textContent = `$${speedPremiumValue}`;
    additionalPrice.textContent = `$${additionalPriceValue}`;
    totalPrice.textContent = `$${total}`;
}

// Event Listeners
pagesInput.addEventListener('input', updatePrices);

speedOptions.forEach(option => {
    option.addEventListener('click', () => {
        speedOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedSpeed = option.dataset.speed;
        updatePrices();
    });
});

additionalCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            additionalElements.add(checkbox.value);
        } else {
            additionalElements.delete(checkbox.value);
        }
        updatePrices();
    });
});

// Voice Note Recording
const recordButton = document.getElementById('record-button');
const recordingStatus = document.getElementById('recording-status');
let mediaRecorder;
let audioChunks = [];
let isRecording = false;

recordButton.addEventListener('click', async () => {
    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };
            
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                recordingStatus.innerHTML = `
                    <audio controls src="${audioUrl}"></audio>
                    <button onclick="resetRecording()" class="reset-button">Reset</button>
                `;
            };
            
            mediaRecorder.start();
            isRecording = true;
            recordButton.classList.add('recording');
            recordButton.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
            recordingStatus.textContent = 'Recording...';
        } catch (err) {
            console.error('Error accessing microphone:', err);
            recordingStatus.textContent = 'Error: Could not access microphone';
        }
    } else {
        mediaRecorder.stop();
        isRecording = false;
        recordButton.classList.remove('recording');
        recordButton.innerHTML = '<i class="fas fa-microphone"></i> Record Message';
    }
});

function resetRecording() {
    audioChunks = [];
    recordingStatus.innerHTML = '';
}

// Form Submission
document.querySelector('.order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Order submitted successfully!');
});

// Set minimum date for deadline
const deadlineInput = document.getElementById('deadline');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
deadlineInput.min = tomorrow.toISOString().split('T')[0];