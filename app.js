// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .industry-item, .testimonial-card, .about-text, .industries-grid');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Parallax effect for floating shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Industry items stagger animation
    const industryItems = document.querySelectorAll('.industry-item');
    industryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Stats counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (target === 3 ? 'x' : target === 10 ? '+' : target === 1 ? '+' : '');
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(start) + (target === 3 ? 'x' : target === 10 ? '+' : target === 1 ? '+' : '');
            }
        }, 16);
    }

    // Animate stats when hero section is visible
    const heroSection = document.getElementById('home');
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-item h3');
                statNumbers.forEach(stat => {
                    const value = stat.textContent;
                    if (value.includes('10+')) {
                        animateCounter(stat, 10);
                    } else if (value.includes('1+')) {
                        animateCounter(stat, 1);
                    } else if (value.includes('3x')) {
                        animateCounter(stat, 3);
                    } else if (value.includes('6')) {
                        animateCounter(stat, 6);
                    }
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroSection);

    // Contact form handling (for booking consultation)
    const bookConsultationBtn = document.getElementById('bookConsultation');
    if (bookConsultationBtn) {
        bookConsultationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a more engaging interaction
            const originalText = this.textContent;
            this.textContent = 'Opening WhatsApp...';
            this.style.background = 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)';
            
            setTimeout(() => {
                // WhatsApp link with pre-filled message
                const message = encodeURIComponent("Hi Urvashi! I'd like to book a free strategy call to discuss growing my business with performance marketing. When would be a good time to connect?");
                const whatsappUrl = `https://wa.me/919039423785?text=${message}`;
                window.open(whatsappUrl, '_blank');
                
                // Reset button
                this.textContent = originalText;
                this.style.background = 'white';
            }, 1000);
        });
    }

    // Enhanced typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Add sparkle effect to important elements
    function createSparkle(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #e91e63, transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle 1s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = Math.random() * rect.width + 'px';
        sparkle.style.top = Math.random() * rect.height + 'px';
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }

    // Add sparkle animation keyframes
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Add sparkles to CTA buttons on hover
    const ctaButtons = document.querySelectorAll('.primary-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createSparkle(this);
            const sparkleInterval = setInterval(() => createSparkle(this), 200);
            
            button.addEventListener('mouseleave', function() {
                clearInterval(sparkleInterval);
            }, { once: true });
        });
    });

    // Add a subtle pulse animation to the hero stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.animation = `pulse 2s ease-in-out ${index * 0.2}s infinite`;
    });

    // Add pulse animation keyframes
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Enhanced scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #e91e63, #f06292);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #e91e63 0%, #f06292 50%, #f8bbd9 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        `;
        
        const loaderContent = document.createElement('div');
        loaderContent.innerHTML = `
            <div style="text-align: center; color: white;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem; animation: pulse 1s infinite;">Urvashi Arya</h2>
                <p style="opacity: 0.8;">Digital Marketing Expert</p>
            </div>
        `;
        
        loader.appendChild(loaderContent);
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => loader.remove(), 500);
        }, 1500);
    });
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate any position-dependent animations
    const heroCard = document.querySelector('.hero-card');
    if (heroCard && window.innerWidth <= 768) {
        heroCard.style.transform = 'none';
    } else if (heroCard) {
        heroCard.style.transform = 'perspective(1000px) rotateY(-5deg)';
    }
});