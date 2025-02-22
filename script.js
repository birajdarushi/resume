// Skills data structure with progress values
const skills = [
    { name: 'Machine Learning', progress: 85, color: 1 },
    { name: 'AWS', progress: 90, color: 2 },
    { name: 'MongoDB', progress: 75, color: 3 },
    { name: 'ReactJS', progress: 95, color: 4 },
    { name: 'Python', progress: 88, color: 1 },
    { name: 'SQL', progress: 82, color: 2 },
    { name: 'AI/ML', progress: 85, color: 3 },
    { name: 'Cloud Computing', progress: 80, color: 4 }
];

// Function to create progress bar
function createProgressBar(skill) {
    const progressBar = document.createElement('div');
    progressBar.className = `skill-progress skill-color-${skill.color}`;
    
    progressBar.innerHTML = `
        <div class="skill-progress-bar">
            <span class="skill-name">${skill.name}</span>
            <div class="skill-progress-fill" style="width: ${skill.progress}%">
                ${skill.progress}%
            </div>
        </div>
    `;
    
    return progressBar;
}

// Function to render skills
function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList) return;

    skillsList.innerHTML = '<h3 class="text-2xl font-bold mb-4">Skills</h3>';
    skills.forEach(skill => {
        skillsList.appendChild(createProgressBar(skill));
    });
}

// Function to add new skill
function addSkill(skillName, progressValue, colorNumber) {
    skills.push({
        name: skillName,
        progress: Math.min(100, Math.max(0, progressValue)), // Clamp between 0 and 100
        color: colorNumber || Math.floor(Math.random() * 4) + 1 // Random color if not specified
    });
    renderSkills();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize skills
    renderSkills();

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Contact form handling with animation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translate(-2px, -2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'none';
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});


// Add these functions to your existing JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Previous initialization code...

    // Create scroll progress indicators
    createScrollProgress();
    
    // Initialize scroll handling
    initializeScroll();
});

function createScrollProgress() {
    const sections = document.querySelectorAll('section[id]');
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        dot.setAttribute('data-section', section.id);
        
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        scrollProgress.appendChild(dot);
    });
    
    document.body.appendChild(scrollProgress);
}

function initializeScroll() {
    const sections = document.querySelectorAll('section[id]');
    const dots = document.querySelectorAll('.scroll-dot');
    
    // Intersection Observer for sections
    const observerOptions = {
        root: null,
        threshold: 0.3, // 30% visibility threshold
        rootMargin: '0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active dot
                dots.forEach(dot => {
                    dot.classList.toggle('active', 
                        dot.getAttribute('data-section') === entry.target.id);
                });
                
                // Animate section content
                const content = entry.target.querySelector('.section-content');
                if (content) {
                    content.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Add transition element
        const transition = document.createElement('div');
        transition.className = 'section-transition';
        section.appendChild(transition);
        
        // Wrap section content
        const content = document.createElement('div');
        content.className = 'section-content';
        while (section.firstChild !== transition) {
            content.appendChild(section.firstChild);
        }
        section.insertBefore(content, transition);
    });
    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentSection = Array.from(sections).findIndex(section => 
            section.getBoundingClientRect().top >= 0);
            
        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
            sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});