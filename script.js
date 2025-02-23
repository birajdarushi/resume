// Skills data with ratings (1-5 hearts)
const skills = [
    { name: 'Machine Learning', rating: 4 },
    { name: 'AWS', rating: 5 },
    { name: 'MongoDB', rating: 4 },
    { name: 'ReactJS', rating: 5 },
    { name: 'Python', rating: 4 },
    { name: 'SQL', rating: 4 },
    { name: 'AI/ML', rating: 4 },
    { name: 'Cloud Computing', rating: 4 }
];

// Certifications data
const certifications = [
    { name: 'AWS Certified Developer', date: '2023' },
    { name: 'MongoDB Developer', date: '2023' },
    { name: 'Python Professional', date: '2022' }
];

// Create heart rating
function createHeartRating(rating) {
    let hearts = '';
    for (let i = 1; i <= 5; i++) {
        hearts += `<div class="heart ${i <= rating ? 'filled' : ''}"></div>`;
    }
    return hearts;
}

// Create skill item
function createSkillItem(skill) {
    return `
        <div class="skill-item">
            <span class="skill-name">${skill.name}</span>
            <div class="skill-rating">
                ${createHeartRating(skill.rating)}
            </div>
        </div>
    `;
}

// Create certification card
function createCertificationCard(cert) {
    return `
        <div class="certification-card" style="border: 2px solid var(--primary-color); padding: 1rem; margin-bottom: 1rem; background: var(--background-color); box-shadow: var(--box-shadow)">
            <h3>${cert.name}</h3>
            <p>${cert.date}</p>
        </div>
    `;
}

// Initialize theme switcher
function initializeThemeSwitcher() {
    const colors = ['blue', 'orange', 'yellow', 'coral', 'green', 'purple'];
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    
    colors.forEach(color => {
        const option = document.createElement('div');
        option.className = 'color-option';
        option.style.backgroundColor = `var(--theme-${color})`;
        option.onclick = () => setTheme(color);
        switcher.appendChild(option);
    });
    
    document.body.appendChild(switcher);
}

// Set theme
function setTheme(color) {
    document.body.className = '';
    document.body.classList.add(`theme-${color}`);
}

// Toggle dark/light mode
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.classList.toggle('active');
    });
}

// Initialize smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize content
function initializeContent() {
    // Initialize skills
    const skillsList = document.getElementById('skillsList');
    if (skillsList) {
        skillsList.innerHTML = skills.map(skill => createSkillItem(skill)).join('');
    }

    // Initialize certifications
    const certificationsList = document.getElementById('certificationsList');
    if (certificationsList) {
        certificationsList.innerHTML = certifications.map(cert => createCertificationCard(cert)).join('');
    }
}

// Handle contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Add new skill
function addSkill(name, rating) {
    skills.push({ name, rating: Math.min(5, Math.max(1, rating)) });
    initializeContent();
}

// Add new certification
function addCertification(name, date) {
    certifications.push({ name, date });
    initializeContent();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContent();
    initializeThemeSwitcher();
    initializeThemeToggle();
    initializeSmoothScroll();
    initializeContactForm();
});
