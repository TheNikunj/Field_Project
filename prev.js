const yearsView = document.getElementById('yearsView');
const subjectsView = document.getElementById('subjectsView');
const selectedYear = document.getElementById('selectedYear');

// Improved view transitions with proper state management
function showSubjects(year) {
    // Reset any existing transitions
    yearsView.style.transition = 'all 0.3s ease';
    subjectsView.style.transition = 'all 0.3s ease';
    
    // Fade out years view
    yearsView.style.opacity = '0';
    yearsView.style.transform = 'translateX(-20px)';
    
    // Ensure proper timing for view switch
    setTimeout(() => {
        yearsView.style.display = 'none';
        subjectsView.style.display = 'block';
        subjectsView.style.opacity = '0';
        subjectsView.style.transform = 'translateX(20px)';
        
        // Force reflow
        subjectsView.offsetHeight;
        
        // Update year title
        selectedYear.textContent = `Question Papers - ${year}`;
        
        // Fade in subjects view
        requestAnimationFrame(() => {
            subjectsView.style.opacity = '1';
            subjectsView.style.transform = 'translateX(0)';
        });
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
}

function showYears() {
    // Reset any existing transitions
    yearsView.style.transition = 'all 0.3s ease';
    subjectsView.style.transition = 'all 0.3s ease';
    
    // Fade out subjects view
    subjectsView.style.opacity = '0';
    subjectsView.style.transform = 'translateX(20px)';
    
    // Ensure proper timing for view switch
    setTimeout(() => {
        subjectsView.style.display = 'none';
        yearsView.style.display = 'grid';
        yearsView.style.opacity = '0';
        yearsView.style.transform = 'translateX(-20px)';
        
        // Force reflow
        yearsView.offsetHeight;
        
        // Fade in years view
        requestAnimationFrame(() => {
            yearsView.style.opacity = '1';
            yearsView.style.transform = 'translateX(0)';
        });
    }, 300);
}

// Example PDF links for each subject
const pdfLinks = {
    'Mathematics': 'https://example.com/path/to/mathematics.pdf',
    'Physics': 'https://example.com/path/to/physics.pdf',
    'Chemistry': 'https://example.com/path/to/chemistry.pdf',
    'Computer Science': 'https://example.com/path/to/computer-science.pdf',
    'English': 'https://example.com/path/to/english.pdf',
    'Engineering Drawing': 'https://example.com/path/to/engineering-drawing.pdf',
    'Electronics': 'https://example.com/path/to/electronics.pdf',
    'Workshop Practice': 'https://example.com/path/to/workshop.pdf'
};

// Enhanced download functionality with loading state
document.querySelectorAll('.subject-card').forEach(card => {
    const button = card.querySelector('.download-btn');
    const subjectName = card.querySelector('h3').textContent;
    
    button.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        // Add loading state
        button.classList.add('loading');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        
        try {
            const link = document.createElement('a');
            link.href = pdfLinks[subjectName];
            link.download = `${subjectName.toLowerCase().replace(' ', '-')}.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success feedback
            button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            button.style.backgroundColor = '#059669'; // Success green
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.classList.remove('loading');
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
            }, 2000);
            
        } catch (error) {
            // Show error feedback
            button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
            button.style.backgroundColor = '#dc2626'; // Error red
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.classList.remove('loading');
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
    });
});

// Add hover effect to cards
document.querySelectorAll('.year-card, .subject-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize view states
document.addEventListener('DOMContentLoaded', () => {
    yearsView.style.opacity = '1';
    yearsView.style.transform = 'translateX(0)';
    subjectsView.style.opacity = '0';
    subjectsView.style.display = 'none';
});