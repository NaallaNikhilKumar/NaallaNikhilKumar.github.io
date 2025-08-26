document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add active class to nav items when scrolling
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach(section => {
            if (scrollPosition >= section.offsetTop - 100 && scrollPosition < (section.offsetTop + section.offsetHeight - 100)) {
                let currentId = section.attributes.id.value;
                removeAllActiveClasses();
                addActiveClass(currentId);
            }
        });
    });

    function removeAllActiveClasses() {
        document.querySelectorAll(".navbar-nav a").forEach((el) => {
            el.classList.remove("active");
        });
    }

    function addActiveClass(id) {
        let selector = `.navbar-nav a[href="#${id}"]`;
        document.querySelector(selector).classList.add("active");
    }

    // Form submission handling
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        console.log('Form submitted!');
        console.log('Name:', this.name.value);
        console.log('Email:', this.email.value);
        console.log('Message:', this.message.value);
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
});