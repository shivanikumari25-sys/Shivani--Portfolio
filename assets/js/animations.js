
/* =========================================
   SHIVANI KUMARI - PORTFOLIO JAVASCRIPT
   Advanced UI Interactions
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. SELECT HTML ELEMENTS
    // =====================================

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("backToTop");

    // =====================================
    // 2. MOBILE NAVBAR
    // =====================================

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.innerHTML = isOpen
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';

        });

        // Close menu after clicking a link

        navLinks.forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        // Close menu with Escape key

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close menu when clicking outside

        document.addEventListener("click", event => {

            if (
                navMenu.classList.contains("active") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

    }

    // =====================================
    // 3. STICKY HEADER EFFECT
    // =====================================

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    // =====================================
    // 4. BACK TO TOP BUTTON
    // =====================================

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    // =====================================
    // 5. ACTIVE NAVIGATION LINK
    // =====================================

    const sections = document.querySelectorAll("main section[id]");

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );

                    });

                }

            });

        },
        {
            root: null,
            threshold: 0,
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // =====================================
    // 6. SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-container, .education-card, " +
        ".experience-card, .skill-box, .project-card, " +
        ".certificate-card, .contact-container"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // =====================================
    // 7. TYPING EFFECT
    // =====================================

    const typingElement = document.querySelector(".home-content h2");

    if (typingElement) {

        const originalText = "Full Stack Web Developer";

        const roles = [
            "Full Stack Web Developer",
            "Frontend Developer",
            "JavaScript Developer",
            "MERN Stack Developer"
        ];

        let roleIndex = 0;
        let charIndex = originalText.length;
        let deleting = true;

        typingElement.textContent = originalText;

        function typeEffect() {

            const currentRole = roles[roleIndex];

            if (deleting) {

                charIndex--;

            } else {

                charIndex++;

            }

            typingElement.textContent =
                currentRole.substring(0, charIndex);

            let speed = deleting ? 45 : 85;

            if (!deleting && charIndex === currentRole.length) {

                deleting = true;
                speed = 1500;

            } else if (deleting && charIndex === 0) {

                deleting = false;

                roleIndex = (roleIndex + 1) % roles.length;

                speed = 400;

            }

            setTimeout(typeEffect, speed);

        }

        setTimeout(typeEffect, 2000);

    }

    // =====================================
    // 8. SCROLL EVENT
    // =====================================

    let ticking = false;

    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(() => {

                handleHeader();
                handleBackToTop();

                ticking = false;

            });

            ticking = true;

        }

    }, { passive: true });

    // =====================================
    // 9. BACK TO TOP CLICK
    // =====================================

    if (backToTop) {

        backToTop.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    // =====================================
    // 10. CURRENT YEAR
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // =====================================
    // 11. INITIAL PAGE STATE
    // =====================================

    handleHeader();
    handleBackToTop();

    console.log("Portfolio JavaScript initialized successfully!");

});
