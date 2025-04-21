// Sample notes data for CS students
const notesData = [
    {
      id: 1,
      title: "Data Structures Fundamentals",
      description: "Comprehensive notes on arrays, linked lists, stacks, queues, and trees with implementation examples.",
      subject: "dsa",
      thumbnailUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fileUrl: "#"
    },
    {
      id: 2,
      title: "Process Management in OS",
      description: "Detailed notes on process scheduling, synchronization, and deadlock handling in operating systems.",
      subject: "os",
      thumbnailUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fileUrl: "#"
    },
    {
      id: 3,
      title: "SQL and Database Design",
      description: "Complete guide to SQL queries, database normalization, and transaction management.",
      subject: "dbms",
      thumbnailUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fileUrl: "#"
    },
    {
      id: 4,
      title: "TCP/IP Protocol Suite",
      description: "Comprehensive notes on networking protocols, OSI model, and network security basics.",
      subject: "cn",
      thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fileUrl: "#"
    },
    {
      id: 5,
      title: "Java Programming Concepts",
      description: "Detailed notes on classes, inheritance, polymorphism, and exception handling in Java.",
      subject: "oops",
      thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fileUrl: "#"
    },
    {
      id: 6,
      title: "Graph Algorithms",
      description: "Essential graph traversal algorithms, shortest path, and minimum spanning tree implementations.",
      subject: "dsa",
      thumbnailUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fileUrl: "#"
    },
    {
      id: 7,
      title: "Memory Management",
      description: "Detailed coverage of paging, segmentation, and virtual memory concepts in operating systems.",
      subject: "os",
      thumbnailUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fileUrl: "#"
    },
    {
      id: 8,
      title: "Design Patterns",
      description: "Common design patterns with practical examples and implementation guidelines.",
      subject: "oops",
      thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      fileUrl: "#"
    }
  ];
  
  // Function to render notes cards
  function renderNotes(notes) {
    const notesContainer = document.getElementById('notes-container');
    
    // Clear current content
    notesContainer.innerHTML = '';
    
    // If no notes, show empty state
    if (notes.length === 0) {
      notesContainer.innerHTML = `
        <div class="no-results">
          <div class="no-results-message">No notes found</div>
          <div class="no-results-suggestion">Try adjusting your search or filters</div>
        </div>
      `;
      return;
    }
    
    // Create note cards for each note
    notes.forEach(note => {
      const noteElement = createNoteCard(note);
      notesContainer.appendChild(noteElement);
    });
  }
  
  // Function to create a note card element
  function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.setAttribute('data-id', note.id);
    card.setAttribute('data-subject', note.subject);
    
    card.innerHTML = `
      <div class="note-image">
        <img src="${note.thumbnailUrl}" alt="${note.title}">
      </div>
      <div class="note-content">
        <h3 class="note-title">${note.title}</h3>
        <p class="note-description">${note.description}</p>
        <div class="note-meta">
          <span class="note-subject ${note.subject}">${formatSubject(note.subject)}</span>
        </div>
      </div>
    `;
    
    // Add click event to open preview modal
    card.addEventListener('click', () => {
      const modal = document.getElementById('preview-modal');
      const previewTitle = document.getElementById('preview-title');
      const previewImg = document.getElementById('preview-img');
      const downloadButton = document.getElementById('download-button');
      
      previewTitle.textContent = note.title;
      previewImg.src = note.previewUrl || note.thumbnailUrl;
      
      // Set download button attributes
      downloadButton.setAttribute('data-file', note.fileUrl);
      downloadButton.setAttribute('data-filename', `${note.title.replace(/\s+/g, '_')}.pdf`);
      
      // Show modal
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    return card;
  }
  
  // Filter notes based on search term and subject
  function filterNotes(notes, searchTerm, subject) {
    return notes.filter(note => {
      // Check if note matches search term
      const matchesSearch = searchTerm === '' || 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Check if note matches subject filter
      const matchesSubject = subject === '' || note.subject === subject;
      
      // Return true if all conditions are met
      return matchesSearch && matchesSubject;
    });
  }
  
  // Format subject for display
  function formatSubject(subject) {
    const subjects = {
      dsa: 'Data Structures & Algorithms',
      os: 'Operating Systems',
      dbms: 'Database Management',
      cn: 'Computer Networks',
      oops: 'Object-Oriented Programming'
    };
    return subjects[subject] || subject;
  }
  
  // Setup search and filter functionality
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const subjectFilter = document.getElementById('subject-filter');
    
    // Handle search input
    searchInput.addEventListener('input', updateResults);
    
    // Handle filter changes
    subjectFilter.addEventListener('change', updateResults);
    
    // Update results based on current search and filters
    function updateResults() {
      const searchTerm = searchInput.value.trim();
      const subject = subjectFilter.value;
      
      // Add loading state
      const notesContainer = document.getElementById('notes-container');
      notesContainer.innerHTML = `
        <div class="loading">
          <div class="loading-spinner"></div>
        </div>
      `;
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        const filteredNotes = filterNotes(notesData, searchTerm, subject);
        renderNotes(filteredNotes);
      }, 300);
    }
  }
  
  // Setup download functionality
  function setupDownload() {
    const downloadButton = document.getElementById('download-button');
    
    downloadButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get file URL and filename from button attributes
      const fileUrl = this.getAttribute('data-file');
      const filename = this.getAttribute('data-filename');
      
      if (!fileUrl) {
        console.error('No file URL provided');
        return;
      }
      
      // Add downloading animation
      this.classList.add('downloading');
      this.textContent = 'Downloading...';
      
      // Simulate download delay
      setTimeout(() => {
        // Trigger download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button
        this.classList.remove('downloading');
        this.textContent = 'Download PDF';
        
        // Close modal after download
        setTimeout(() => {
          document.getElementById('preview-modal').style.display = 'none';
          document.body.style.overflow = 'auto'; // Re-enable scrolling
        }, 500);
      }, 1500);
    });
  }
  
  // Setup preview modal functionality
  function setupPreviewModal() {
    const modal = document.getElementById('preview-modal');
    const closeButton = document.querySelector('.close-button');
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside of modal content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }
    });
  }
  
  // Initialize the app
  document.addEventListener('DOMContentLoaded', () => {
    // Initial render of all notes
    renderNotes(notesData);
    
    // Setup search and filtering functionality
    setupSearch();
    
    // Setup download functionality
    setupDownload();
    
    // Setup preview modal
    setupPreviewModal();
  });