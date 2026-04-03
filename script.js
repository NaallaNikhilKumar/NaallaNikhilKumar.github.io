document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Theme Toggle Logic (Light/Dark Mode)
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check localStorage for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.textContent = '🌙'; // Change to moon when in light mode
    } else {
        themeIcon.textContent = '☀️'; // Change to sun when in dark mode
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        let theme = 'dark';
        if (body.classList.contains('light-mode')) {
            theme = 'light';
            themeIcon.textContent = '🌙';
        } else {
            themeIcon.textContent = '☀️';
        }
        
        // Save user preference
        localStorage.setItem('theme', theme);
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 3. Mouse Spotlight Effect on Bento Cards
    const bentoCards = document.querySelectorAll('.bento-card');

    document.getElementById('cards-wrapper').parentNode.addEventListener('mousemove', (e) => {
        bentoCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Opaque Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        // If we scroll down more than 50 pixels from the top
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            // If we are at the very top, make it transparent again
            navbar.classList.remove('scrolled');
        }
    });

    // 6. Dynamic Real-Time Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Premium Custom Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore empty links
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            // Calculates where to scroll to, accounting for the sticky navbar height
            const headerOffset = 100; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 1000; // 1000ms = 1 second glide. Increase for slower, decrease for faster.
            let startTime = null;

            // The animation loop
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                
                // Calculate the next frame's position using the easing function
                const nextPosition = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, nextPosition);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            // The Math: Starts slow, accelerates, then gently decelerates
            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }

            // Start the glide
            requestAnimationFrame(animation);
        });
    });
});
