// Store sections and answers
const sections = new Map();
const questionAnswers = new Map();
let currentSection = null;
let currentImageIndex = 0;
let currentImageSet = [];
const ADMIN_PASSWORD = '221486';

// Load saved data from localStorage
function loadSavedData() {
    const savedSections = localStorage.getItem('sections');
    const savedAnswers = localStorage.getItem('questionAnswers');
    
    if (savedSections) {
        const parsedSections = JSON.parse(savedSections);
        parsedSections.forEach(([key, value]) => sections.set(key, value));
        updateSectionSelector();
    }
    
    if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        parsedAnswers.forEach(([key, value]) => questionAnswers.set(key, value));
    }

    // Set default section if available
    if (sections.size > 0) {
        const latestSection = Array.from(sections.entries())
            .sort(([,a], [,b]) => b.year - a.year)[0][0];
        currentSection = latestSection;
        document.getElementById('sectionSelect').value = latestSection;
        updateQuestionButtons();
        filterBySection();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('sections', JSON.stringify(Array.from(sections.entries())));
    localStorage.setItem('questionAnswers', JSON.stringify(Array.from(questionAnswers.entries())));
}

// Admin functions
function openAdminModal() {
    document.getElementById('adminModal').classList.add('active');
}

function closeAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
    document.getElementById('adminPassword').value = '';
}

function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        closeAdminModal();
        openCreateSectionModal();
    } else {
        alert('Incorrect password');
    }
}

function openCreateSectionModal() {
    document.getElementById('createSectionModal').classList.add('active');
    // Set default year to current year
    document.getElementById('sectionYear').value = new Date().getFullYear();
}

function closeCreateSectionModal() {
    document.getElementById('createSectionModal').classList.remove('active');
    document.getElementById('sectionYear').value = '';
    document.getElementById('sectionName').value = '';
}

function createSection() {
    const year = document.getElementById('sectionYear').value;
    const name = document.getElementById('sectionName').value;

    if (!year || !name) {
        alert('Please fill in all fields');
        return;
    }

    const yearNum = parseInt(year);
    if (yearNum < 1900 || yearNum > 2100) {
        alert('Please enter a valid year');
        return;
    }

    const sectionId = `${year}-${name.replace(/\s+/g, '-').toLowerCase()}`;
    
    if (sections.has(sectionId)) {
        alert('This section already exists');
        return;
    }

    const sectionInfo = { 
        year: yearNum,
        name,
        displayName: `${getYearText(yearNum)} Year - ${name}`
    };
    
    sections.set(sectionId, sectionInfo);
    saveData();
    updateSectionSelector();
    closeCreateSectionModal();

    // Automatically select the new section
    currentSection = sectionId;
    document.getElementById('sectionSelect').value = sectionId;
    updateQuestionButtons();
    filterBySection();
}

function getYearText(year) {
    const currentYear = new Date().getFullYear();
    const yearDiff = currentYear - year;
    if (yearDiff === 0) return '1st';
    if (yearDiff === 1) return '2nd';
    if (yearDiff === 2) return '3rd';
    if (yearDiff === 3) return '4th';
    return `${yearDiff + 1}th`;
}

function updateSectionSelector() {
    const select = document.getElementById('sectionSelect');
    select.innerHTML = '<option value="">Select Section</option>';
    
    // Group sections by year
    const groupedSections = new Map();
    sections.forEach((info, id) => {
        if (!groupedSections.has(info.year)) {
            groupedSections.set(info.year, []);
        }
        groupedSections.get(info.year).push({ id, ...info });
    });

    // Create optgroups for each year
    Array.from(groupedSections.entries())
        .sort(([a], [b]) => b - a)
        .forEach(([year, sectionList]) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = `${getYearText(year)} Year (${year})`;
            
            sectionList
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach(section => {
                    const option = document.createElement('option');
                    option.value = section.id;
                    option.textContent = section.name;
                    optgroup.appendChild(option);
                });
            
            select.appendChild(optgroup);
        });
}

function changeSection() {
    const sectionId = document.getElementById('sectionSelect').value;
    if (!sectionId) {
        alert('Please select a section');
        return;
    }
    currentSection = sectionId;
    updateQuestionButtons();
    filterBySection();
}

// Generate number buttons
const numberButtonsContainer = document.querySelector('.number-buttons');
for (let i = 1; i <= 10; i++) {
    const button = document.createElement('button');
    button.className = 'number-btn';
    button.textContent = i;
    button.onclick = () => filterByQuestion(i);
    numberButtonsContainer.appendChild(button);
}

function formatTimestamp(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function openUploadModal() {
    if (!currentSection) {
        alert('Please select a section first');
        return;
    }
    document.getElementById('uploadModal').classList.add('active');
    document.getElementById('imagePreview').innerHTML = '';
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
    document.getElementById('questionNumber').value = '';
    document.getElementById('name').value = '';
    document.getElementById('regNumber').value = '';
    document.getElementById('imageUpload').value = '';
    document.getElementById('imagePreview').innerHTML = '';
}

function handleImagePreview(files) {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';

    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="remove-image" onclick="removePreviewImage(${index})">&times;</button>
            `;
            preview.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
}

function removePreviewImage(index) {
    const input = document.getElementById('imageUpload');
    const dt = new DataTransfer();
    const files = input.files;

    for (let i = 0; i < files.length; i++) {
        if (i !== index) {
            dt.items.add(files[i]);
        }
    }

    input.files = dt.files;
    handleImagePreview(input.files);
}

document.getElementById('imageUpload').addEventListener('change', function(e) {
    handleImagePreview(this.files);
});

function submitAnswer() {
    if (!currentSection) {
        alert('Please select a section first');
        return;
    }

    const questionNumber = document.getElementById('questionNumber').value;
    const name = document.getElementById('name').value;
    const regNumber = document.getElementById('regNumber').value;
    const imageFiles = document.getElementById('imageUpload').files;

    if (!questionNumber || !name || !regNumber || imageFiles.length === 0) {
        alert('Please fill in all fields and select at least one image');
        return;
    }

    if (questionNumber < 1 || questionNumber > 10) {
        alert('Question number must be between 1 and 10');
        return;
    }

    const timestamp = new Date();
    const answer = {
        id: Date.now(),
        sectionId: currentSection,
        questionNumber: parseInt(questionNumber),
        name,
        regNumber,
        images: [],
        timestamp,
        likes: 0,
        dislikes: 0,
        userActions: new Set()
    };

    let loadedImages = 0;
    Array.from(imageFiles).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            answer.images.push(e.target.result);
            loadedImages++;

            if (loadedImages === imageFiles.length) {
                const key = `${currentSection}-${questionNumber}`;
                if (!questionAnswers.has(key)) {
                    questionAnswers.set(key, []);
                }
                questionAnswers.get(key).push(answer);
                saveData();

                addMessageToChat(answer, true);
                updateQuestionButton(key);
                closeUploadModal();
            }
        };
        reader.readAsDataURL(file);
    });
}

function addMessageToChat(answer, isNew = false) {
    const message = document.createElement('div');
    message.className = `message${isNew ? ' new' : ''}`;
    message.dataset.answerId = answer.id;
    message.dataset.questionNumber = answer.questionNumber;
    message.dataset.sectionId = answer.sectionId;
    
    const sectionInfo = sections.get(answer.sectionId);
    const imagesHtml = answer.images.map((img, index) => 
        `<img src="${img}" alt="Solution image ${index + 1}" onclick="openImageViewer('${answer.id}', ${index})">`
    ).join('');

    message.innerHTML = `
        <div class="section-info">${sectionInfo.displayName}</div>
        <div class="meta">
            <strong>Question ${answer.questionNumber}</strong>
            <div>Submitted by: ${answer.name} (${answer.regNumber})</div>
        </div>
        <div class="images-container">${imagesHtml}</div>
        <div class="actions">
            <button class="like-btn${answer.userActions.has('like') ? ' active' : ''}" onclick="handleLike(${answer.id})">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span class="like-count">${answer.likes}</span>
            </button>
            <button class="dislike-btn${answer.userActions.has('dislike') ? ' active' : ''}" onclick="handleDislike(${answer.id})">
                👎 <span class="dislike-count">${answer.dislikes}</span>
            </button>
        </div>
        <div class="timestamp">${formatTimestamp(answer.timestamp)}</div>
    `;

    const chatMessages = document.getElementById('chatMessages');
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleLike(answerId) {
    updateVote(answerId, 'like');
}

function handleDislike(answerId) {
    updateVote(answerId, 'dislike');
}

function updateVote(answerId, action) {
    for (const [key, answers] of questionAnswers) {
        const answer = answers.find(a => a.id === answerId);
        if (answer) {
            if (answer.userActions.has(action)) {
                answer.userActions.delete(action);
                if (action === 'like') answer.likes--;
                else answer.dislikes--;
            } else {
                const oppositeAction = action === 'like' ? 'dislike' : 'like';
                if (answer.userActions.has(oppositeAction)) {
                    answer.userActions.delete(oppositeAction);
                    if (oppositeAction === 'like') answer.likes--;
                    else answer.dislikes--;
                }
                answer.userActions.add(action);
                if (action === 'like') answer.likes++;
                else answer.dislikes++;
            }

            const message = document.querySelector(`[data-answer-id="${answerId}"]`);
            const likeBtn = message.querySelector('.like-btn');
            const dislikeBtn = message.querySelector('.dislike-btn');
            const likeCount = message.querySelector('.like-count');
            const dislikeCount = message.querySelector('.dislike-count');

            likeCount.textContent = answer.likes;
            dislikeCount.textContent = answer.dislikes;

            likeBtn.classList.toggle('active', answer.userActions.has('like'));
            dislikeBtn.classList.toggle('active', answer.userActions.has('dislike'));

            if (answer.dislikes > answer.likes) {
                updateQuestionButton(key);
            }
            
            saveData();
            break;
        }
    }
}

function updateQuestionButton(key) {
    if (!key.startsWith(currentSection)) return;
    
    const questionNumber = parseInt(key.split('-').pop());
    const answers = questionAnswers.get(key) || [];
    const validAnswers = answers.filter(a => a.likes >= a.dislikes);
    const button = document.querySelector(`.number-btn:nth-child(${questionNumber})`);
    
    const existingCount = button.querySelector('.answer-count');
    if (existingCount) {
        existingCount.remove();
    }

    if (validAnswers.length > 0) {
        button.classList.add('has-answers');
        const countBadge = document.createElement('span');
        countBadge.className = 'answer-count';
        countBadge.textContent = validAnswers.length;
        button.appendChild(countBadge);
    } else {
        button.classList.remove('has-answers');
    }
}

function updateQuestionButtons() {
    const buttons = document.querySelectorAll('.number-btn');
    buttons.forEach(button => {
        button.classList.remove('has-answers');
        const existingCount = button.querySelector('.answer-count');
        if (existingCount) {
            existingCount.remove();
        }
    });

    if (currentSection) {
        for (let i = 1; i <= 10; i++) {
            const key = `${currentSection}-${i}`;
            updateQuestionButton(key);
        }
    }
}

function filterBySection() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        if (!currentSection || message.dataset.sectionId === currentSection) {
            message.style.display = 'block';
        } else {
            message.style.display = 'none';
        }
    });
}

function filterByQuestion(questionNumber) {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        if (message.dataset.questionNumber === questionNumber.toString() && 
            (!currentSection || message.dataset.sectionId === currentSection)) {
            message.style.display = 'block';
        } else {
            message.style.display = 'none';
        }
    });
}

function openImageViewer(answerId, imageIndex) {
    const answer = Array.from(questionAnswers.values())
        .flat()
        .find(a => a.id === parseInt(answerId));
    
    if (answer) {
        currentImageSet = answer.images;
        currentImageIndex = imageIndex;
        updateViewerImage();
        document.getElementById('imageViewer').classList.add('active');
    }
}

function closeImageViewer() {
    document.getElementById('imageViewer').classList.remove('active');
}

function updateViewerImage() {
    document.getElementById('viewerImage').src = currentImageSet[currentImageIndex];
    
    // Update navigation buttons visibility
    document.querySelector('.prev-btn').style.display = currentImageIndex > 0 ? 'flex' : 'none';
    document.querySelector('.next-btn').style.display = 
        currentImageIndex < currentImageSet.length - 1 ? 'flex' : 'none';
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateViewerImage();
    }
}

function nextImage() {
    if (currentImageIndex < currentImageSet.length - 1) {
        currentImageIndex++;
        updateViewerImage();
    }
}

function downloadCurrentImage() {
    const image = currentImageSet[currentImageIndex];
    const link = document.createElement('a');
    link.href = image;
    link.download = `solution-image-${currentImageIndex + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize the application
loadSavedData();

// Load existing answers into chat
for (const answers of questionAnswers.values()) {
    answers.forEach(answer => addMessageToChat(answer));
}