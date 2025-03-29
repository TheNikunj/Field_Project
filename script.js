// Modal Functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Form Submissions
function handlePPTSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('pptTitle').value;
    const description = document.getElementById('pptDescription').value;
    const deadline = document.getElementById('pptDeadline').value;

    // Here you would typically send this data to your backend
    console.log('PPT Request:', { title, description, deadline });
    
    alert('Your PPT request has been submitted successfully!');
    closeModal('pptModal');
    event.target.reset();
}

function handleIEEESubmit(event) {
    event.preventDefault();
    const title = document.getElementById('ieeeTitle').value;
    const description = document.getElementById('ieeeDescription').value;
    const deadline = document.getElementById('ieeeDeadline').value;

    // Here you would typically send this data to your backend
    console.log('IEEE Paper Request:', { title, description, deadline });
    
    alert('Your IEEE paper request has been submitted successfully!');
    closeModal('ieeeModal');
    event.target.reset();
}

// Sample Data (In a real application, this would come from your backend)
const sampleNotes = [
    { title: 'Data Structures Notes', subject: 'Computer Science', author: 'John Doe' },
    { title: 'Circuit Theory', subject: 'Electrical Engineering', author: 'Jane Smith' },
    // Add more sample notes
];

const sampleMentors = [
    { name: 'Dr. Sarah Johnson', expertise: 'Computer Science', rating: 4.8 },
    { name: 'Prof. Michael Chen', expertise: 'Electrical Engineering', rating: 4.9 },
    // Add more sample mentors
];

const sampleMaterials = [
    { title: 'Introduction to AI', type: 'PDF', author: 'Dr. Smith' },
    { title: 'Database Systems', type: 'PPT', author: 'Prof. Wilson' },
    // Add more sample materials
];

// Subject data
const subjects = [
    {
        name: 'Computer Science',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
        materials: ['Data Structures', 'Algorithms', 'Database Systems']
    },
    {
        name: 'Electrical Engineering',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3v4c0 2-2 4-4 4h-4c-2 0-4-2-4-4V3"></path><path d="M12 13v8"></path><path d="M8 21h8"></path></svg>',
        materials: ['Circuit Theory', 'Power Systems', 'Electronics']
    },
    {
        name: 'Mechanical Engineering',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
        materials: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design']
    },
    {
        name: 'Civil Engineering',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
        materials: ['Structural Analysis', 'Surveying', 'Construction Management']
    }
];

// Populate Modal Content
document.addEventListener('DOMContentLoaded', () => {
    // Populate Notes
    const notesGrid = document.querySelector('#notesModal .notes-grid');
    sampleNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-card';
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.subject}</p>
            <p>By: ${note.author}</p>
        `;
        notesGrid.appendChild(noteElement);
    });

    // Populate Mentors
    const mentorsGrid = document.querySelector('#mentorModal .mentors-grid');
    sampleMentors.forEach(mentor => {
        const mentorElement = document.createElement('div');
        mentorElement.className = 'mentor-card';
        mentorElement.innerHTML = `
            <h3>${mentor.name}</h3>
            <p>${mentor.expertise}</p>
            <p>Rating: ${mentor.rating}/5</p>
        `;
        mentorsGrid.appendChild(mentorElement);
    });

    // Update Materials Modal with Subject Grid
    const materialsGrid = document.querySelector('#materialsModal .materials-grid');
    materialsGrid.className = 'subject-grid'; // Update class for new styling
    
    subjects.forEach(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.className = 'subject-card';
        subjectElement.innerHTML = `
            <div class="subject-icon">
                ${subject.icon}
            </div>
            <h3>${subject.name}</h3>
            <p>${subject.materials.length} materials available</p>
        `;
        
        // Add click event to show materials for this subject
        subjectElement.addEventListener('click', () => showSubjectMaterials(subject));
        
        materialsGrid.appendChild(subjectElement);
    });
});

function showSubjectMaterials(subject) {
    const materialsGrid = document.querySelector('#materialsModal .materials-grid');
    materialsGrid.innerHTML = `
        <div class="w-full mb-4">
            <button onclick="showAllSubjects()" class="btn" style="width: auto; padding: 0.5rem 1rem; margin-bottom: 2rem;">
                ← Back to Subjects
            </button>
            <h2 class="text-2xl font-bold mb-4">${subject.name} Materials</h2>
        </div>
    `;
    
    subject.materials.forEach(material => {
        const materialElement = document.createElement('div');
        materialElement.className = 'subject-card';
        materialElement.innerHTML = `
            <div class="subject-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <h3>${material}</h3>
            <p>Click to download</p>
        `;
        materialsGrid.appendChild(materialElement);
    });
}

function showAllSubjects() {
    const materialsGrid = document.querySelector('#materialsModal .materials-grid');
    materialsGrid.innerHTML = '';
    subjects.forEach(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.className = 'subject-card';
        subjectElement.innerHTML = `
            <div class="subject-icon">
                ${subject.icon}
            </div>
            <h3>${subject.name}</h3>
            <p>${subject.materials.length} materials available</p>
        `;
        subjectElement.addEventListener('click', () => showSubjectMaterials(subject));
        materialsGrid.appendChild(subjectElement);
    });
}

 
    /* //Student Market Place //

        function showModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.style.display = "block";
            
            // Populate items
            const container = document.getElementById('itemsContainer');
            container.innerHTML = items.map(item => `
                <div class="item-card">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
            `).join('');
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.style.display = "none";
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = "none";
            }
        }
*/


// Cursor code in css
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        navLinks.classList.toggle("open");
    });

    // Close menu when a link is clicked (for better UX on mobile)
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("open");
        });
    });
});



