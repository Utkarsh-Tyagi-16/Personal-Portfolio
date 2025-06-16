// Typing Animation with Multiple Text Arrays
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArrays = {
    roles: ["Web Developer", "UI/UX Designer", "Freelancer"],
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
    traits: ["Creative", "Passionate", "Detail-oriented"]
};

let currentArray = 'roles';
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArrays[currentArray][textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArrays[currentArray][textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArrays[currentArray][textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArrays[currentArray].length) {
            textArrayIndex = 0;
            // Switch to next array
            const arrays = Object.keys(textArrays);
            const currentIndex = arrays.indexOf(currentArray);
            currentArray = arrays[(currentIndex + 1) % arrays.length];
        }
        setTimeout(type, typingDelay + 1100);
    }
}

// Improved Typing Effect
function initTypingEffect() {
    const dynamicText = document.querySelector('.dynamic-text');
    const titles = [
        "Machine Learning Engineer",
        "AI Engineer",
        "Full Stack Developer",
        "MERN Stack Developer",
        "Deep Learning Researcher"
    ];
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseTime = 2000;

    function type() {
        const currentTitle = titles[currentIndex];
        
        if (isDeleting) {
            currentText = currentTitle.substring(0, currentText.length - 1);
            typingSpeed = deletingSpeed;
        } else {
            currentText = currentTitle.substring(0, currentText.length + 1);
            typingSpeed = 100;
        }

        // Update the text with "I'm a" prefix
        dynamicText.textContent = "I'm a " + currentText;

        if (!isDeleting && currentText === currentTitle) {
            isDeleting = true;
            typingSpeed = pauseTime;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeOptions = document.querySelectorAll('.theme-option');
    const dropdown = document.querySelector('.theme-dropdown');
    
    // Set initial theme from localStorage or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Toggle dropdown on click
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !themeToggle.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const theme = option.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeIcon(theme);
            dropdown.classList.remove('show');
        });
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Add scroll reveal animation
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    document.querySelectorAll('.fade-in').forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        if (elementPosition < windowHeight * 0.8) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Smooth Scrolling with offset and animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu after clicking
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Form Submission with Advanced Animation
const contactForm = document.getElementById('contact-form');

// Email functionality
function sendEmail(e) {
    e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const formStatus = form.querySelector('.form-status');
    const originalBtnContent = submitBtn.innerHTML;
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!validateForm(name, email, subject, message)) {
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    
    // Create mailto link
    const mailtoLink = `mailto:utkarshty2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Simulate sending delay
    setTimeout(() => {
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#4CAF50';
        formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
        formStatus.style.color = '#4CAF50';
        
        // Reset form with animation
        resetForm(form);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            formStatus.textContent = '';
        }, 3000);
    }, 1000);
}

function validateForm(name, email, subject, message) {
    const formStatus = document.querySelector('.form-status');
    let isValid = true;
    
    // Reset previous error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Validate name
    if (!name.trim()) {
        showError('name', 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    if (!email.trim()) {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate subject
    if (!subject.trim()) {
        showError('subject', 'Please enter a subject');
        isValid = false;
    }
    
    // Validate message
    if (!message.trim()) {
        showError('message', 'Please enter your message');
        isValid = false;
    }
    
    if (!isValid) {
        formStatus.textContent = 'Please fill in all required fields correctly';
        formStatus.style.color = '#f44336';
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const group = field.closest('.form-group');
    group.classList.add('error');
    
    // Add error message if it doesn't exist
    if (!group.querySelector('.error-message')) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        group.appendChild(errorMessage);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resetForm(form) {
    const formElements = form.elements;
    for (let element of formElements) {
        if (element.type !== 'submit') {
            element.style.transition = 'all 0.3s ease';
            element.style.transform = 'translateY(-10px)';
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.value = '';
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 300);
        }
    }
}

// Add form validation and animation
document.addEventListener('DOMContentLoaded', () => {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        // Add active class if input has value
        if (input.value) {
            label.classList.add('active');
        }
        
        // Handle focus events
        input.addEventListener('focus', () => {
            label.classList.add('active');
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
            }
        });
        
        // Handle input events for real-time validation
        input.addEventListener('input', () => {
            if (input.value) {
                label.classList.add('active');
                group.classList.remove('error');
                const errorMessage = group.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
});

// Navbar Scroll Effect with Parallax and Blur
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove background based on scroll position
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Advanced Button Hover Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
        
        // Add gradient follow effect
        const gradientX = (x / rect.width) * 100;
        const gradientY = (y / rect.height) * 100;
        button.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, var(--primary-color), var(--secondary-color))`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'var(--gradient-primary)';
    });
});

// Parallax Effect for Home Section
const homeSection = document.querySelector('.home');
window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    
    homeSection.style.backgroundPosition = `${xPos}px ${yPos}px`;
    
    // Add subtle movement to elements
    const elements = homeSection.querySelectorAll('.home-content > *');
    elements.forEach((element, index) => {
        const speed = 1 + index * 0.2;
        element.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
    });
});

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    if (textArrays.roles.length) setTimeout(type, newTextDelay + 250);
    
    // Add initial animation classes
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add animation to skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Interactive Background Effects
function initInteractiveBackground() {
    const aboutSection = document.querySelector('.about');
    const gradientSphere = document.querySelector('.gradient-sphere');
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!aboutSection || !gradientSphere || !particlesContainer) return;

    // Create particles
    const particleCount = 20;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * 100,
            y: Math.random() * 100,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }

    // Mouse move handler
    aboutSection.addEventListener('mousemove', (e) => {
        const rect = aboutSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Update gradient sphere position
        const sphereX = (mouseX / rect.width) * 100;
        const sphereY = (mouseY / rect.height) * 100;
        gradientSphere.style.transform = `translate(${sphereX}%, ${sphereY}%)`;

        // Update particles
        particles.forEach(particle => {
            const dx = mouseX - (particle.x * rect.width / 100);
            const dy = mouseY - (particle.y * rect.height / 100);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const angle = Math.atan2(dy, dx);
                const force = (200 - distance) / 200;
                particle.speedX -= Math.cos(angle) * force * 0.2;
                particle.speedY -= Math.sin(angle) * force * 0.2;
            }

            // Update particle position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > 100) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > 100) particle.speedY *= -1;

            // Apply friction
            particle.speedX *= 0.98;
            particle.speedY *= 0.98;

            // Update particle element
            particle.element.style.transform = `translate(${particle.x}%, ${particle.y}%)`;
        });
    });

    // Animation loop for particles
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > 100) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > 100) particle.speedY *= -1;

            // Apply friction
            particle.speedX *= 0.98;
            particle.speedY *= 0.98;

            // Update particle element
            particle.element.style.transform = `translate(${particle.x}%, ${particle.y}%)`;
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// Interactive Background Effects for Hero Section
function initHeroInteractiveBackground() {
    const heroSection = document.querySelector('.hero');
    const gradientSphere = heroSection.querySelector('.gradient-sphere');
    const particlesContainer = heroSection.querySelector('.particles-container');
    
    if (!heroSection || !gradientSphere || !particlesContainer) return;

    // Create particles
    const particleCount = 30;
    const particles = [];
    const themes = ['theme-1', 'theme-2', 'theme-3', 'theme-4'];
    let currentThemeIndex = 0;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * 100,
            y: Math.random() * 100,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }

    // Mouse move handler
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Update gradient sphere position
        const sphereX = (mouseX / rect.width) * 100;
        const sphereY = (mouseY / rect.height) * 100;
        gradientSphere.style.transform = `translate(${sphereX}%, ${sphereY}%)`;

        // Change theme based on mouse position
        const newThemeIndex = Math.floor((mouseX / rect.width) * themes.length);
        if (newThemeIndex !== currentThemeIndex) {
            gradientSphere.classList.remove(themes[currentThemeIndex]);
            currentThemeIndex = newThemeIndex;
            gradientSphere.classList.add(themes[currentThemeIndex]);
        }

        // Update particles
        particles.forEach(particle => {
            const dx = mouseX - (particle.x * rect.width / 100);
            const dy = mouseY - (particle.y * rect.height / 100);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const angle = Math.atan2(dy, dx);
                const force = (200 - distance) / 200;
                particle.speedX -= Math.cos(angle) * force * 0.2;
                particle.speedY -= Math.sin(angle) * force * 0.2;

                // Change particle color based on theme
                const hue = (currentThemeIndex * 90) % 360;
                particle.element.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
            }

            // Update particle position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > 100) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > 100) particle.speedY *= -1;

            // Apply friction
            particle.speedX *= 0.98;
            particle.speedY *= 0.98;

            // Update particle element
            particle.element.style.transform = `translate(${particle.x}%, ${particle.y}%)`;
        });
    });

    // Animation loop for particles
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > 100) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > 100) particle.speedY *= -1;

            // Apply friction
            particle.speedX *= 0.98;
            particle.speedY *= 0.98;

            // Update particle element
            particle.element.style.transform = `translate(${particle.x}%, ${particle.y}%)`;
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// Initialize both interactive backgrounds when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initInteractiveBackground();
    initHeroInteractiveBackground();
});

// Web Pattern Animation
function initWebPattern() {
    const sections = document.querySelectorAll('.hero, .about');
    
    sections.forEach(section => {
        const webPattern = section.querySelector('.web-pattern');
        if (!webPattern) return;

        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate rotation and scale based on mouse position
            const rotateX = (mouseY / rect.height - 0.5) * 10;
            const rotateY = (mouseX / rect.width - 0.5) * -10;
            const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
            
            // Apply transform to web pattern
            webPattern.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(${scale})
            `;
            
            // Update pattern color based on mouse position
            const hue = (mouseX / rect.width) * 360;
            webPattern.style.color = `hsla(${hue}, 70%, 50%, 0.3)`;
        });

        // Reset pattern when mouse leaves
        section.addEventListener('mouseleave', () => {
            webPattern.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            webPattern.style.color = 'var(--pattern-color)';
        });
    });
}

// Cursor Glow Effect
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Initialize all features when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initThemeToggle();
    initWebPattern();
    initCursorGlow();
    initMobileMenu();
});

// Mouse tracking for background effect
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    hero.style.setProperty('--mouse-x', `${x}px`);
    hero.style.setProperty('--mouse-y', `${y}px`);
});

// Remove the node network code and keep only the original functionality
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initMobileMenu();
});

// Dynamic background effect
function initDynamicBackground() {
    const hero = document.querySelector('.hero');
    const gradientSphere = document.querySelector('.gradient-sphere');
    let mouseX = 0;
    let mouseY = 0;
    let sphereX = 0;
    let sphereY = 0;

    function updateSpherePosition(e) {
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    }

    function animate() {
        // Smooth follow effect
        const dx = mouseX - sphereX;
        const dy = mouseY - sphereY;
        
        sphereX += dx * 0.1;
        sphereY += dy * 0.1;
        
        gradientSphere.style.transform = `translate(${sphereX}px, ${sphereY}px)`;
        requestAnimationFrame(animate);
    }

    hero.addEventListener('mousemove', updateSpherePosition);
    animate();
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initMobileMenu();
    initDynamicBackground();
});

// Grid Interaction
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.web-pattern');
    const overlay = document.querySelector('.grid-overlay');
    const particlesContainer = document.querySelector('.grid-particles');
    const gridLinesContainer = document.querySelector('.grid-lines');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Create grid lines
    function createGridLines() {
        const spacing = 60;
        const numLines = Math.ceil(window.innerWidth / spacing);
        const numVerticalLines = Math.ceil(window.innerHeight / spacing);

        // Create horizontal lines
        for (let i = 0; i < numLines; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line';
            line.style.top = `${i * spacing}px`;
            line.style.animationDelay = `${i * 0.2}s`;
            gridLinesContainer.appendChild(line);
        }

        // Create vertical lines
        for (let i = 0; i < numVerticalLines; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line vertical';
            line.style.left = `${i * spacing}px`;
            line.style.animationDelay = `${i * 0.2}s`;
            gridLinesContainer.appendChild(line);
        }
    }

    // Create particles
    function createParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particlesContainer.appendChild(particle);
            particles.push(particle);
        }
    }

    // Smooth cursor movement
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // Update particle positions
    function updateParticles() {
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = currentX - centerX;
            const deltaY = currentY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 200) {
                const angle = Math.atan2(deltaY, deltaX);
                const force = (200 - distance) / 200;
                const moveX = Math.cos(angle) * force * 15;
                const moveY = Math.sin(angle) * force * 15;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
                particle.style.background = `rgba(255, 255, 255, ${0.4 + force * 0.2})`;
                particle.style.boxShadow = `0 0 ${4 + force * 2}px rgba(255, 255, 255, ${0.2 + force * 0.2})`;
            } else {
                particle.style.transform = 'translate(0, 0)';
                particle.style.background = 'rgba(255, 255, 255, 0.4)';
                particle.style.boxShadow = '0 0 4px rgba(255, 255, 255, 0.2)';
            }
        });
    }

    // Update grid position
    function updateGrid() {
        const moveX = (currentX - window.innerWidth / 2) * 0.02;
        const moveY = (currentY - window.innerHeight / 2) * 0.02;
        grid.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    // Animation loop
    function animate() {
        currentX = lerp(currentX, targetX, 0.1);
        currentY = lerp(currentY, targetY, 0.1);
        
        overlay.style.setProperty('--mouse-x', `${currentX}px`);
        overlay.style.setProperty('--mouse-y', `${currentY}px`);
        
        updateGrid();
        updateParticles();
        requestAnimationFrame(animate);
    }

    // Handle mouse movement
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        overlay.classList.add('active');
    });

    // Handle mouse leave
    document.addEventListener('mouseleave', () => {
        overlay.classList.remove('active');
        particles.forEach(particle => {
            particle.style.transform = 'translate(0, 0)';
            particle.style.background = 'rgba(255, 255, 255, 0.4)';
            particle.style.boxShadow = '0 0 4px rgba(255, 255, 255, 0.2)';
        });
        grid.style.transform = 'translate(0, 0)';
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        gridLinesContainer.innerHTML = '';
        createGridLines();
    });

    // Initialize
    createGridLines();
    createParticles();
    animate();
});

// Easter Eggs for home section only
document.addEventListener('DOMContentLoaded', () => {
    // Create data structure container
    const dataStructureContainer = document.createElement('div');
    dataStructureContainer.className = 'data-structure';
    document.body.appendChild(dataStructureContainer);

    // Create containers for each visualization
    const binaryTree = document.createElement('div');
    binaryTree.className = 'binary-tree';
    dataStructureContainer.appendChild(binaryTree);

    const linkedList = document.createElement('div');
    linkedList.className = 'linked-list';
    dataStructureContainer.appendChild(linkedList);

    const sortingViz = document.createElement('div');
    sortingViz.className = 'sorting-visualization';
    dataStructureContainer.appendChild(sortingViz);

    // Create binary tree
    function createBinaryTree() {
        const values = [1, 2, 3, 4, 5, 6, 7];
        const nodePositions = {
            1: { x: '50%', y: '20%' },
            2: { x: '30%', y: '40%' },
            3: { x: '70%', y: '40%' },
            4: { x: '20%', y: '60%' },
            5: { x: '40%', y: '60%' },
            6: { x: '60%', y: '60%' },
            7: { x: '80%', y: '60%' }
        };

        values.forEach(value => {
            const node = document.createElement('div');
            node.className = 'tree-node';
            node.style.left = nodePositions[value].x;
            node.style.top = nodePositions[value].y;
            node.textContent = value;
            binaryTree.appendChild(node);

            if (value !== 1) {
                const parentValue = Math.floor(value / 2);
                const line = document.createElement('div');
                line.className = 'tree-line';
                
                const startX = parseFloat(nodePositions[parentValue].x);
                const startY = parseFloat(nodePositions[parentValue].y);
                const endX = parseFloat(nodePositions[value].x);
                const endY = parseFloat(nodePositions[value].y);
                
                const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                
                line.style.width = `${length}%`;
                line.style.left = `${startX}%`;
                line.style.top = `${startY}%`;
                line.style.transform = `rotate(${angle}deg)`;
                
                binaryTree.appendChild(line);
            }
        });
    }

    // Create linked list
    function createLinkedList() {
        const values = ['A', 'B', 'C', 'D', 'E'];
        const startX = 20;
        const spacing = 15;

        values.forEach((value, index) => {
            const node = document.createElement('div');
            node.className = 'list-node';
            node.style.left = `${startX + index * spacing}%`;
            node.style.top = '80%';
            node.textContent = value;
            linkedList.appendChild(node);

            if (index < values.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'list-arrow';
                arrow.style.left = `${startX + index * spacing + 5}%`;
                arrow.style.top = '80%';
                linkedList.appendChild(arrow);
            }
        });
    }

    // Create sorting visualization
    function createSortingVisualization() {
        const values = [30, 60, 90, 40, 70, 50, 80];
        const maxHeight = 100;

        values.forEach(value => {
            const bar = document.createElement('div');
            bar.className = 'sort-bar';
            bar.style.height = `${(value / maxHeight) * 100}%`;
            sortingViz.appendChild(bar);
        });

        // Animate sorting
        let currentIndex = 0;
        setInterval(() => {
            const bars = sortingViz.querySelectorAll('.sort-bar');
            bars.forEach(bar => bar.classList.remove('active'));
            bars[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % bars.length;
        }, 500);
    }

    // Initialize visualizations
    createBinaryTree();
    createLinkedList();
    createSortingVisualization();

    // Create interactive dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'interactive-dots';
    document.body.appendChild(dotsContainer);

    // Create dots
    const numberOfDots = 150;
    const dots = [];
    const isDarkTheme = document.documentElement.classList.contains('dark-theme');

    // Create dots with better distribution
    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'interactive-dot';
        
        // Use a more random distribution
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Add some variation to dot sizes
        const size = 2 + Math.random() * 3; // Random size between 2px and 5px
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        dotsContainer.appendChild(dot);
        dots.push({
            element: dot,
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: size
        });
    }

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position with throttling
    let lastMouseUpdate = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMouseUpdate > 16) { // Limit to ~60fps
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastMouseUpdate = now;
        }
    });

    // Animation loop for dots
    function animateDots() {
        const repulsionRadius = 150; // Radius of influence
        const repulsionStrength = 0.15; // Slightly reduced strength for smoother movement
        const returnSpeed = 0.05; // Speed at which dots return to original position

        dots.forEach(dot => {
            // Calculate distance from mouse
            const dx = mouseX - (dot.x * window.innerWidth / 100);
            const dy = mouseY - (dot.y * window.innerHeight / 100);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < repulsionRadius) {
                // Calculate repulsion force
                const force = (1 - distance / repulsionRadius) * repulsionStrength;
                const angle = Math.atan2(dy, dx);

                // Move dot away from mouse
                dot.x -= Math.cos(angle) * force * 100;
                dot.y -= Math.sin(angle) * force * 100;

                // Add some randomness to the movement
                dot.x += (Math.random() - 0.5) * 0.5;
                dot.y += (Math.random() - 0.5) * 0.5;
            } else {
                // Return to original position with slight oscillation
                dot.x += (dot.baseX - dot.x) * returnSpeed;
                dot.y += (dot.baseY - dot.y) * returnSpeed;
            }

            // Keep dots within bounds
            dot.x = Math.max(0, Math.min(100, dot.x));
            dot.y = Math.max(0, Math.min(100, dot.y));

            // Update dot position
            dot.element.style.left = `${dot.x}%`;
            dot.element.style.top = `${dot.y}%`;
        });

        requestAnimationFrame(animateDots);
    }

    // Start animation
    animateDots();

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to toggle data structure easter egg
    function toggleDataStructure(show) {
        if (show) {
            dataStructureContainer.classList.add('active');
            dotsContainer.classList.remove('active'); // Hide dots when data structure is shown
        } else {
            dataStructureContainer.classList.remove('active');
            dotsContainer.classList.add('active'); // Show dots when data structure is hidden
        }
    }

    // Function to handle the data structure easter egg cycle
    function startDataStructureCycle() {
        const homeSection = document.querySelector('#home');
        if (homeSection && isInViewport(homeSection)) {
            toggleDataStructure(true);
            setTimeout(() => {
                toggleDataStructure(false);
            }, 5000);
        }
    }

    // Start the cycle immediately if on home section
    const homeSection = document.querySelector('#home');
    if (homeSection && isInViewport(homeSection)) {
        dotsContainer.classList.add('active'); // Show dots initially
        startDataStructureCycle();
    }

    // Set up recurring cycle every 20 seconds
    setInterval(startDataStructureCycle, 20000);

    // Handle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const homeSection = document.querySelector('#home');
            if (!homeSection || !isInViewport(homeSection)) {
                dataStructureContainer.classList.remove('active');
                dotsContainer.classList.remove('active');
            } else {
                dotsContainer.classList.add('active');
            }
        }, 100);
    });

    // Clean up when navigating away
    window.addEventListener('beforeunload', () => {
        dataStructureContainer.remove();
        dotsContainer.remove();
    });
}); 