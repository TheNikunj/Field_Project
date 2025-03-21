// Mock admin credentials (in a real app, this would be server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Mock PDF storage (in a real app, this would be in a database)
let pdfNotes = [
    { 
        id: 1, 
        title: 'Data Structure',
        filename: 'math2021.pdf',
        thumbnail: 'https://picsum.photos/seed/bio101/300/400'
    },
    { 
        id: 2, 
        title: 'Advanced Mathematics',
        filename: 'math201.pdf',
        thumbnail: 'https://picsum.photos/seed/math201/300/400'
    },
    { 
        id: 3, 
        title: 'Physics Fundamentals',
        filename: 'physics101.pdf',
        thumbnail: 'https://picsum.photos/seed/physics101/300/400'
    }
];

// State
let isAdmin = false;

// DOM Elements
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminModal = document.getElementById('adminModal');
const editModal = document.getElementById('editModal');
const closeBtns = document.querySelectorAll('.close');
const adminForm = document.getElementById('adminForm');
const editForm = document.getElementById('editForm');
const adminSection = document.getElementById('adminSection');
const uploadForm = document.getElementById('uploadForm');
const pdfGrid = document.getElementById('pdfGrid');
const thumbnailPreview = document.getElementById('thumbnailPreview');
const editThumbnail = document.getElementById('editThumbnail');

// Event Listeners
adminLoginBtn.addEventListener('click', () => {
    if (isAdmin) {
        logout();
    } else {
        adminModal.style.display = 'block';
    }
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        adminModal.style.display = 'none';
        editModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === adminModal) {
        adminModal.style.display = 'none';
    }
    if (e.target === editModal) {
        editModal.style.display = 'none';
    }
});

adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        login();
    } else {
        alert('Invalid credentials!');
    }
});

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('pdfTitle').value;
    const file = document.getElementById('pdfFile').files[0];

    if (file && title) {
        const newPdf = {
            id: pdfNotes.length + 1,
            title: title,
            filename: file.name,
            thumbnail: `https://picsum.photos/seed/${file.name}/300/400`
        };
        pdfNotes.push(newPdf);
        renderPdfGrid();
        uploadForm.reset();
        thumbnailPreview.src = '';
        alert('PDF uploaded successfully!');
    }
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('editPdfId').value);
    const title = document.getElementById('editTitle').value;
    const file = document.getElementById('editFile').files[0];

    const pdfIndex = pdfNotes.findIndex(pdf => pdf.id === id);
    if (pdfIndex !== -1) {
        pdfNotes[pdfIndex].title = title;
        if (file) {
            pdfNotes[pdfIndex].filename = file.name;
            pdfNotes[pdfIndex].thumbnail = `https://picsum.photos/seed/${file.name}/300/400`;
        }
        renderPdfGrid();
        editModal.style.display = 'none';
        alert('PDF updated successfully!');
    }
});

// File input preview handlers
document.getElementById('pdfFile').addEventListener('change', handleFileSelect);
document.getElementById('editFile').addEventListener('change', handleFileSelect);

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        // In a real app, we would generate a thumbnail from the PDF
        const previewImg = e.target.form.querySelector('.thumbnail-preview');
        previewImg.src = `https://picsum.photos/seed/${file.name}/300/400`;
    }
}

function login() {
    isAdmin = true;
    adminModal.style.display = 'none';
    adminSection.classList.remove('hidden');
    adminLoginBtn.textContent = 'Logout';
    renderPdfGrid();
    alert('Admin login successful!');
}

function logout() {
    isAdmin = false;
    adminSection.classList.add('hidden');
    adminLoginBtn.textContent = 'Admin Login';
    renderPdfGrid();
}

function editPdf(id) {
    const pdf = pdfNotes.find(pdf => pdf.id === id);
    if (pdf) {
        document.getElementById('editPdfId').value = pdf.id;
        document.getElementById('editTitle').value = pdf.title;
        document.getElementById('editThumbnail').src = pdf.thumbnail;
        editModal.style.display = 'block';
    }
}

function deletePdf(id) {
    if (confirm('Are you sure you want to delete this PDF?')) {
        pdfNotes = pdfNotes.filter(pdf => pdf.id !== id);
        renderPdfGrid();
    }
}

function renderPdfGrid() {
    pdfGrid.innerHTML = '';
    pdfNotes.forEach(pdf => {
        const card = document.createElement('div');
        card.className = 'pdf-card';
        card.innerHTML = `
            <img src="${pdf.thumbnail}" alt="${pdf.title}" class="pdf-thumbnail">
            <h3>${pdf.title}</h3>
            <button class="download-btn" onclick="downloadPdf('${pdf.filename}')">
                Download PDF
            </button>
            ${isAdmin ? `
                <div class="admin-controls visible">
                    <button class="edit-btn" onclick="editPdf(${pdf.id})">Edit</button>
                    <button class="delete-btn" onclick="deletePdf(${pdf.id})">Delete</button>
                </div>
            ` : ''}
        `;
        pdfGrid.appendChild(card);
    });
}

function downloadPdf(filename) {
    // In a real app, this would download from a server
    alert(`Downloading ${filename}...\nIn a real application, this would initiate a file download.`);
}

// Initial render
renderPdfGrid();