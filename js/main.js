// Enhanced main.js with modern features

document.addEventListener('DOMContentLoaded', function() {


    /* Hero Slider */
    const slides = document.querySelectorAll('.slide');
    const sliderContainer = document.querySelector('.slider-container');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const dots = document.querySelectorAll('.dot');

    if (slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        function goToSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentIndex = index;
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        next.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        prev.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            stopSlideShow();
            startSlideShow();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopSlideShow();
                startSlideShow();
            });
        });

        // Initialize
        goToSlide(0);
        startSlideShow();
    }
    
    // Intersection Observer with more effects
    const animateOnScroll = (elements, animationClass, threshold = 0.1) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });
        
        elements.forEach(el => observer.observe(el));
    };
    
    // Animate service cards
    animateOnScroll(document.querySelectorAll('.service-card'), 'animate-fade-up');
    
    // Animate headings
    animateOnScroll(document.querySelectorAll('section h2'), 'animate-fade-in');
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Add animation styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .animate-fade-up {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-fade-in {
            animation: fadeIn 1s ease forwards;
        }
        
    `;
    document.head.appendChild(style);

    /* Mobile Navigation Toggle */
    const navToggle = document.querySelector('.nav-toggle');
    const navCloseBtn = document.querySelector('.nav-close-btn');
    const navLinks = document.querySelectorAll('.main-nav a');
    const body = document.body;

    const openNav = () => body.classList.add('nav-open');
    const closeNav = () => body.classList.remove('nav-open');

    if (navToggle) {
        navToggle.addEventListener('click', openNav);
    }

    if (navCloseBtn) {
        navCloseBtn.addEventListener('click', closeNav);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (body.classList.contains('nav-open')) {
                closeNav();
            }
        });
    });

    // Close nav on window resize if screen is larger than mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && body.classList.contains('nav-open')) {
            closeNav();
        }
    });

    /* Header Scroll Effect */
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Add class after scrolling 50px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});