// Admin credentials (in a real app, this would be handled securely on a server)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

let isAdmin = false;
let showLoginForm = false;
let editingFacultyIndex = -1;

let facultyData = [
    {
        name: "Dr. Sarah Johnson",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        department: "Computer Science Department",
        subjects: [
            {
                name: "Data Structures",
                description: "Study of organizing, managing, and storing data efficiently.",
                topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Hash Tables"]
            }
        ]
    },
    {
        name: "Dr. Michael Chen",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        department: "Artificial Intelligence Department",
        subjects: [
            {
                name: "Machine Learning",
                description: "Introduction to machine learning algorithms and applications.",
                topics: ["Neural Networks", "Deep Learning", "Computer Vision"]
            }
        ]
    },
    {
        name: "Dr. Emily Brown",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        department: "Software Engineering Department",
        subjects: [
            {
                name: "Web Development",
                description: "Modern web development techniques and frameworks.",
                topics: ["HTML5", "CSS3", "JavaScript", "React"]
            }
        ]
    }
];

function initializeApp() {
    document.querySelector('#app').innerHTML = `
        <h1>Our Distinguished Faculty</h1>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search faculty or subjects..." class="search-input">
        </div>
        ${isAdmin ? renderAdminForm() : (showLoginForm ? renderLoginForm() : renderLoginButton())}
        <div class="faculty-grid"></div>
    `;

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', renderFacultyCards);
    }

    if (isAdmin) {
        setupAdminFeatures();
    } else if (showLoginForm) {
        setupLoginHandler();
    } else {
        setupLoginButtonHandler();
    }

    renderFacultyCards();
}

function renderFacultyCards() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const filteredFaculty = facultyData.filter(faculty => {
        const nameMatch = faculty.name.toLowerCase().includes(searchTerm);
        const subjectMatch = faculty.subjects.some(subject =>
            subject.name.toLowerCase().includes(searchTerm)
        );
        return nameMatch || subjectMatch;
    });

    const facultyGrid = document.querySelector('.faculty-grid');
    facultyGrid.innerHTML = filteredFaculty.map((faculty, index) => `
        <div class="faculty-card">
            ${faculty.image ?
            `<img src="${faculty.image}" alt="${faculty.name}" class="faculty-image">` :
            `<div class="faculty-icon">${faculty.name.charAt(0)}</div>`
        }
            ${isAdmin ? `
                <div class="admin-controls">
                    <button class="edit-btn" onclick="editFaculty(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteFaculty(${index})">Delete</button>
                </div>
            ` : ''}
            <h2 class="faculty-name">${faculty.name}</h2>
            <div class="department">${faculty.department}</div>
            <div class="subjects">
                ${faculty.subjects.map(subject => `
                    <button class="subject-btn" onclick="showSubjectDetails('${faculty.name}', '${subject.name}')">${subject.name}</button>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function showSubjectDetails(facultyName, subjectName) {
    const faculty = facultyData.find(f => f.name === facultyName);
    const subject = faculty.subjects.find(s => s.name === subjectName);

    document.querySelector('#app').innerHTML = `
        <div class="subject-page">
            <div class="subject-header">
                <button class="back-btn" onclick="initializeApp()">← Back</button>
                <h1>${subject.name}</h1>
                <h2>Taught by ${facultyName}</h2>
            </div>
            <div class="subject-content">
                <p class="subject-description">${subject.description}</p>
                <div class="topics-section">
                    <h3>Topics Covered:</h3>
                    <ul>
                        ${subject.topics.map(topic => `<li>${topic}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function renderLoginButton() {
    return `
        <div class="login-button-container">
            <button id="showLoginBtn" class="login-button">Admin Login</button>
        </div>
    `;
}

function renderLoginForm() {
    return `
        <div class="login-form">
            <h2>Admin Login</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" required>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="submit-btn">Login</button>
                    <button type="button" class="cancel-btn" id="cancelLogin">Cancel</button>
                </div>
            </form>
        </div>
    `;
}

function renderAdminForm() {
    return `
        <div class="admin-header">
            <h2>Welcome, Admin</h2>
            <button id="logoutBtn" class="logout-btn">Logout</button>
        </div>
        <div class="add-faculty-form">
            <h2>Add New Faculty</h2>
            <form id="facultyForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" required>
                </div>
                
                <div class="form-group">
                    <label for="department">Department:</label>
                    <input type="text" id="department" required>
                </div>
                
                <div class="form-group">
                    <label for="image">Profile Image:</label>
                    <input type="file" id="image" accept="image/*">
                    <img id="imagePreview" class="preview-image">
                </div>
                
                <div class="form-group">
                    <label>Subjects:</label>
                    <div class="subjects-input">
                        <input type="text" id="subjectInput">
                        <button type="button" class="add-subject-btn">Add Subject</button>
                    </div>
                    <div id="subjectsList"></div>
                </div>
                
                <button type="submit" class="submit-btn">Add Faculty</button>
            </form>
        </div>
    `;
}

function setupLoginButtonHandler() {
    const loginButton = document.getElementById('showLoginBtn');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            showLoginForm = true;
            initializeApp();
        });
    }
}

function setupLoginHandler() {
    const loginForm = document.getElementById('loginForm');
    const cancelButton = document.getElementById('cancelLogin');

    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            showLoginForm = false;
            initializeApp();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                isAdmin = true;
                showLoginForm = false;
                initializeApp();
            } else {
                alert('Invalid credentials!');
            }
        });
    }
}

function setupAdminFeatures() {
    let currentSubjects = [];

    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.style.display = 'block';
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    const addSubjectBtn = document.querySelector('.add-subject-btn');
    const subjectInput = document.getElementById('subjectInput');
    const subjectsList = document.getElementById('subjectsList');

    function updateSubjectsList() {
        subjectsList.innerHTML = currentSubjects.map(subject => `
            <span class="subject-tag">
                ${subject.name}
                <button type="button" class="remove-subject" data-subject="${subject.name}">×</button>
            </span>
        `).join('');

        document.querySelectorAll('.remove-subject').forEach(button => {
            button.addEventListener('click', function() {
                const subjectName = this.dataset.subject;
                currentSubjects = currentSubjects.filter(s => s.name !== subjectName);
                updateSubjectsList();
            });
        });
    }

    addSubjectBtn.addEventListener('click', function() {
        const subjectName = subjectInput.value.trim();
        if (subjectName && !currentSubjects.find(s => s.name === subjectName)) {
            currentSubjects.push({
                name: subjectName,
                description: `Course in ${subjectName}`,
                topics: []
            });
            subjectInput.value = '';
            updateSubjectsList();
        }
    });

    const facultyForm = document.getElementById('facultyForm');
    facultyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (currentSubjects.length < 1) {
            alert('Please add at least one subject');
            return;
        }

        const newFaculty = {
            name: document.getElementById('name').value,
            department: document.getElementById('department').value,
            image: imagePreview.src || null,
            subjects: currentSubjects
        };

        facultyData.push(newFaculty);
        renderFacultyCards();

        facultyForm.reset();
        imagePreview.style.display = 'none';
        currentSubjects = [];
        updateSubjectsList();
    });

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        isAdmin = false;
        showLoginForm = false;
        initializeApp();
    });
}

function editFaculty(index) {
    editingFacultyIndex = index;
    const faculty = facultyData[index];

    document.querySelector('#app').innerHTML = `
        <div class="edit-faculty-form">
            <h2>Edit Faculty</h2>
            <form id="editFacultyForm">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" value="${faculty.name}" required>
                </div>
                
                <div class="form-group">
                    <label for="department">Department:</label>
                    <input type="text" id="department" value="${faculty.department}" required>
                </div>
                
                <div class="form-group">
                    <label for="image">Profile Image:</label>
                    <input type="file" id="image" accept="image/*">
                    <img id="imagePreview" class="preview-image" src="${faculty.image || ''}" style="display: ${faculty.image ? 'block' : 'none'}">
                </div>
                
                <div class="form-buttons">
                    <button type="submit" class="submit-btn">Save Changes</button>
                    <button type="button" class="cancel-btn" onclick="initializeApp()">Cancel</button>
                </div>
            </form>
        </div>
    `;

    setupEditFacultyHandlers();
}

function deleteFaculty(index) {
    if (confirm('Are you sure you want to delete this faculty member?')) {
        facultyData.splice(index, 1);
        renderFacultyCards();
    }
}

function setupEditFacultyHandlers() {
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const editForm = document.getElementById('editFacultyForm');

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.style.display = 'block';
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();

        facultyData[editingFacultyIndex] = {
            ...facultyData[editingFacultyIndex],
            name: document.getElementById('name').value,
            department: document.getElementById('department').value,
            image: imagePreview.src || null
        };

        editingFacultyIndex = -1;
        initializeApp();
    });
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', initializeApp);