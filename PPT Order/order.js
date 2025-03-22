// Price calculation
const prices = {
    '10': { standard: 1200, express: 2000 },
    '15': { standard: 1800, express: 3000 },
    '20': { standard: 2500, express: 4000 }
};

function updatePrice() {
    const slideCount = document.getElementById('slideCount').value;
    const deliverySpeed = document.getElementById('deliverySpeed').value;
    const basePrice = document.getElementById('basePrice');
    const expressPrice = document.getElementById('expressPrice');
    const totalPrice = document.getElementById('totalPrice');

    if (slideCount && slideCount !== 'custom') {
        const price = prices[slideCount];
        if (deliverySpeed === 'standard') {
            basePrice.textContent = `₹${price.standard}`;
            expressPrice.textContent = '₹0';
            totalPrice.textContent = `₹${price.standard}`;
        } else if (deliverySpeed === 'express') {
            basePrice.textContent = `₹${price.standard}`;
            expressPrice.textContent = `₹${price.express - price.standard}`;
            totalPrice.textContent = `₹${price.express}`;
        }
    } else {
        basePrice.textContent = 'Contact for quote';
        expressPrice.textContent = '-';
        totalPrice.textContent = 'Custom pricing';
    }
}

// Event listeners for price updates
document.getElementById('slideCount').addEventListener('change', updatePrice);
document.getElementById('deliverySpeed').addEventListener('change', updatePrice);

// Form submission
document.getElementById('detailedOrderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        topic: document.getElementById('topic').value,
        description: document.getElementById('topicDescription').value,
        slides: document.getElementById('slideCount').value,
        delivery: document.getElementById('deliverySpeed').value,
        designStyle: document.querySelector('input[name="designStyle"]:checked')?.value,
        elements: Array.from(document.querySelectorAll('input[name="elements"]:checked')).map(el => el.value),
        deadline: document.getElementById('deadline').value
    };

    // Validate deadline
    const selectedDate = new Date(formData.deadline);
    const today = new Date();
    if (selectedDate <= today) {
        alert('Please select a future date for the deadline');
        return;
    }

    // Here you would typically send the data to a server
    console.log('Order details:', formData);
    alert('Thank you for your order! We will contact you shortly to confirm the details.');
    
    // Reset form
    e.target.reset();
    updatePrice();
});

// Voice note recording
let mediaRecorder;
let audioChunks = [];
const recordButton = document.getElementById('recordButton');
const recordingStatus = document.getElementById('recordingStatus');

recordButton.addEventListener('click', async () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                recordingStatus.innerHTML = `
                    <audio controls src="${audioUrl}"></audio>
                    <button onclick="this.parentElement.innerHTML = ''">Delete</button>
                `;
            });

            mediaRecorder.start();
            recordButton.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
            recordingStatus.textContent = 'Recording...';
        } catch (err) {
            alert('Could not access microphone. Please ensure you have granted permission.');
            console.error(err);
        }
    } else {
        mediaRecorder.stop();
        recordButton.innerHTML = '<i class="fas fa-microphone"></i> Record Voice Note';
    }
});

// Set minimum date for deadline
const deadlineInput = document.getElementById('deadline');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
deadlineInput.min = tomorrow.toISOString().split('T')[0];