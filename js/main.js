/**
 * Main JavaScript file for the portfolio site
 * Handles site initialization, smooth scrolling, contact form, and 3D effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the site
    initSite();
});

// Setup featured project images with smooth pop-up effect
function setupFeaturedProjectImages() {
    const featuredProjects = document.querySelectorAll('.featured-project');
    
    // Create an Intersection Observer to detect when featured projects are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Get the project image container
            const imageContainer = entry.target.querySelector('.project-image-container');
            
            if (entry.isIntersecting) {
                // When the project is in view, add the pop-up class
                if (imageContainer) {
                    setTimeout(() => {
                        imageContainer.classList.add('image-popup');
                    }, 300); // Small delay for better visual effect
                }
            } else {
                // When the project is out of view, remove the pop-up class
                if (imageContainer) {
                    imageContainer.classList.remove('image-popup');
                }
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Adjust the bottom margin to trigger earlier
    });
    
    // Observe each featured project
    featuredProjects.forEach(project => {
        observer.observe(project);
    });
}

// Initialize all site functionality
function initSite() {
    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Setup contact form submission
    setupContactForm();
    
    // Setup admin login functionality
    setupAdminLogin();
    
    // Check if user is logged in as admin
    checkAdminStatus();
    
    // Add 3D effects and animations
    add3DEffectsAndAnimations();
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup contact form submission with EmailJS
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    // Initialize EmailJS with public key
    (function() {
        // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
        emailjs.init("YOUR_PUBLIC_KEY"); 
    })();
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('sending');
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                to_email: 'singharin.02@gmail.com', // Replace with your recipient email if different
                message: message
            };
            
            // Create a feedback element for status messages
            let feedbackEl = document.getElementById('form-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.id = 'form-feedback';
                contactForm.appendChild(feedbackEl);
            }
            
            // Send email using EmailJS
            // Create a service at https://dashboard.emailjs.com/admin
            // Create a template at https://dashboard.emailjs.com/admin/templates
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS Service ID and Template ID
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Show success message
                    feedbackEl.className = 'success-message';
                    feedbackEl.textContent = `Thank you for your message, ${name}! I will get back to you soon.`;
                    // Reset the form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        feedbackEl.classList.add('fade-out');
                        setTimeout(() => {
                            feedbackEl.textContent = '';
                            feedbackEl.className = '';
                        }, 500);
                    }, 5000);
                })
                .catch(function(error) {
                    console.log('FAILED...', error);
                    // Show error message
                    feedbackEl.className = 'error-message';
                    feedbackEl.textContent = 'Oops! There was a problem sending your message. Please try again later.';
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        feedbackEl.classList.add('fade-out');
                        setTimeout(() => {
                            feedbackEl.textContent = '';
                            feedbackEl.className = '';
                        }, 500);
                    }, 5000);
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                    submitBtn.classList.remove('sending');
                });
        });
    }
}

// Setup admin login functionality
function setupAdminLogin() {
    // Get the admin link in the navigation
    const adminLink = document.getElementById('admin-link');
    
    // If admin link exists, set up click handler
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            // If not logged in, show login modal
            if (!isAdminLoggedIn()) {
                e.preventDefault();
                openAdminLoginModal();
            }
            // If logged in, the link works normally and goes to admin.html
        });
    }
    
    // Get the admin login modal
    const adminModal = document.getElementById('admin-modal');
    
    // If modal exists, set up close button
    if (adminModal) {
        // Get the close button
        const closeBtn = adminModal.querySelector('.close');
        
        // Set up close button click handler
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                adminModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside of it
        window.addEventListener('click', function(e) {
            if (e.target === adminModal) {
                adminModal.style.display = 'none';
            }
        });
        
        // Set up login form submission
        const loginForm = document.getElementById('admin-login-form');
        
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // Check credentials (in a real app, this would be done on the server)
                // For demo purposes, we're using a simple check
                if (username === 'admin' && password === 'password') {
                    // Set admin logged in flag in localStorage
                    localStorage.setItem('adminLoggedIn', 'true');
                    
                    // Close the modal
                    adminModal.style.display = 'none';
                    
                    // Redirect to admin page
                    window.location.href = 'admin.html';
                } else {
                    alert('Invalid username or password. Please try again.');
                }
            });
        }
    }
}

// Check if user is logged in as admin
function checkAdminStatus() {
    // Show admin link if logged in
    if (isAdminLoggedIn()) {
        const adminLink = document.getElementById('admin-link');
        if (adminLink) {
            adminLink.style.display = 'block';
        }
    }
    
    // If on admin page but not logged in, redirect to home page
    if (window.location.pathname.includes('admin.html') && !isAdminLoggedIn()) {
        window.location.href = 'index.html';
    }
}

// Check if admin is logged in
function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Add 3D effects and animations to elements
function add3DEffectsAndAnimations() {
    // Add 3D effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('card-3d');
        
        // Add tilt effect on mouse movement
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    // Setup featured project image pop-up effect
    setupFeaturedProjectImages();
    
    // Add 3D effect to certificate cards with staggered rocket animations
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.classList.add('card-3d');
        
        // Add tilt effect on mouse movement
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
        
        // Initially hide the cards
        card.style.opacity = '0';
        
        // Add rocket animations to certificate cards with staggered delays
        setTimeout(() => {
            card.style.opacity = '1';
            
            // Alternate between left, center, and right rocket animations
            if (index % 3 === 0) {
                card.classList.add('rocket-left');
            } else if (index % 3 === 1) {
                card.classList.add('rocket-center');
            } else {
                card.classList.add('rocket-right');
            }
        }, 500 + (index * 150)); // Staggered delay for each card
    });
    
    // Add floating animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('float');
    });
    
    // Add pulse animation to buttons
    const buttons = document.querySelectorAll('.primary-btn');
    buttons.forEach(button => {
        button.classList.add('pulse');
    });
    
    // Add 3D effect to profile image
    const profileImg = document.querySelector('.about-image img');
    if (profileImg) {
        profileImg.classList.add('rotate-on-scroll');
    }
    
    // Add highlight effect to hero section text
    const heroHeadings = document.querySelectorAll('.hero-content h1, .hero-content h2');
    heroHeadings.forEach(heading => {
        heading.classList.add('highlight-text');
    });
    
    // Add staggered entry to hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        // Add increasing delays to each element
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
            // Add a small delay to each element for a staggered effect
            element.style.animationDelay = `${index * 0.15}s`;
        }, 300 + (index * 100));
    });
    
    // Smooth fade-in effect for hero section
    setTimeout(() => {
        heroHeadings.forEach(heading => {
            heading.style.opacity = '0';
            heading.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                heading.style.opacity = '1';
            }, 300);
        });
    }, 500); // Start after 0.5 seconds
}

// Handle tilt effect on mouse movement
function handleTilt(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Calculate mouse position relative to card center
    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;
    
    // Calculate rotation angles (limited to +/- 10 degrees)
    const rotateY = mouseX * 0.05;
    const rotateX = -mouseY * 0.05;
    
    // Apply transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
}

// Reset tilt effect when mouse leaves
function resetTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

// Open admin login modal
function openAdminLoginModal() {
    const adminModal = document.getElementById('admin-modal');
    if (adminModal) {
        adminModal.style.display = 'block';
    }
}

// Add a keyboard shortcut for admin login (Ctrl+Shift+A)
document.addEventListener('keydown', function(e) {
    // Check for Ctrl+Shift+A
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdminLoginModal();
    }
});