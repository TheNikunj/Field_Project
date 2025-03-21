// Previous smooth scrolling code
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Previous animation code
const stats = document.querySelectorAll('.stat-card dd');
const animateStats = () => {
    stats.forEach(stat => {
        const value = stat.innerText;
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.5s ease-out';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 100);
    });
};

document.addEventListener('DOMContentLoaded', animateStats);

// Previous intersection observer code
const mentorCards = document.querySelectorAll('.mentor-card');
const mentorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

mentorCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    mentorObserver.observe(card);
});

// Previous step cards hover effect
const stepCards = document.querySelectorAll('.step-card');
stepCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Modal Functionality
const bookingModal = document.getElementById('bookingModal');
const chatModal = document.getElementById('chatModal');
const openBookingBtn = document.getElementById('openBookingBtn');
const openChatBtn = document.getElementById('openChatBtn');
const closeBtns = document.querySelectorAll('.close-btn');
const bookSessionBtns = document.querySelectorAll('.book-session-btn');

// Open modals
function openModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modals
function closeModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Event listeners for opening modals
openBookingBtn.addEventListener('click', () => openModal(bookingModal));
openChatBtn.addEventListener('click', () => openModal(chatModal));
bookSessionBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(bookingModal));
});

// Event listeners for closing modals
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        whatsapp: document.getElementById('studentWhatsapp').value,
        date: document.getElementById('sessionDate').value,
        time: document.getElementById('sessionTime').value,
        topics: document.getElementById('topicsToDiscuss').value
    };
    
    // Here you would typically send this data to a server
    console.log('Booking submitted:', formData);
    
    // Show success message
    alert('Booking submitted successfully! We will contact you shortly.');
    bookingForm.reset();
    closeModal(bookingModal);
});

// Chat functionality
const chatForm = document.getElementById('chatForm');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');

// Sample responses for demo
const sampleResponses = [
    "Hi! I'd be happy to help you with that.",
    "That's a great question! Let me explain...",
    "I had similar challenges when I was in your year. Here's what helped me...",
    "Have you tried looking into these resources? They might be helpful...",
    "Feel free to ask more questions!"
];

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'sent');
    messageInput.value = '';

    // Simulate mentor response
    setTimeout(() => {
        const response = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        addMessage(response, 'received');
    }, 1000);
});

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}