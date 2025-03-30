// Mobile Menu Toggle
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active-link');
        }
    });
});

// Create Intersection Observer for animations
const observerOptions = {
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    rootMargin: '0px 0px -100px 0px' // Adjust the bottom margin to trigger earlier
};

// Observer for hero section animations
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Reset animations if needed
        }
    });
}, observerOptions);

// Observe hero section
heroObserver.observe(document.getElementById('home'));

// Observer for skills section animations
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Restart the progress bar animations
            const progressBars = entry.target.querySelectorAll('.animate-progress');
            
            progressBars.forEach((bar, index) => {
                // Remove and re-add the animation classes with a staggered delay
                bar.style.animation = 'none';
                bar.offsetHeight; // Force reflow
                
                // Stagger the animations
                setTimeout(() => {
                    bar.style.animation = `progressBar 1.5s ease-out forwards ${index * 0.1}s, shimmer 3s infinite`;
                }, 50);
            });
        }
    });
}, observerOptions);

// Observe skills section
skillsObserver.observe(document.getElementById('skills'));

// Contact Form Email Redirect
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with form data
    const mailtoLink = `mailto:dhirajrana0307@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    const formStatus = document.getElementById('form-status');
    const successMessage = document.getElementById('success-message');
    
    if (formStatus && successMessage) {
        formStatus.classList.remove('hidden');
        successMessage.classList.remove('hidden');
        
        // Hide the message after 5 seconds
        setTimeout(function() {
            formStatus.classList.add('hidden');
            successMessage.classList.add('hidden');
        }, 5000);
        
        // Clear form fields on success
        contactForm.reset();
    }
}); 