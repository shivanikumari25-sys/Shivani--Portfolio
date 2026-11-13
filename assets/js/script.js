
document.addEventListener("DOMContentLoaded", () => {

    // 1. Typing Effect
    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {
        const roles = [
            "Full Stack Web Developer",
            "Frontend Developer",
            "React.js Developer",
            "JavaScript Developer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            typingElement.textContent = currentRole.substring(0, charIndex);

            if (!deleting) {
                charIndex++;

                if (charIndex > currentRole.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1200);
                    return;
                }
            } else {
                charIndex--;

                if (charIndex < 0) {
                    deleting = false;
                    charIndex = 0;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            setTimeout(typeEffect, deleting ? 50 : 100);
        }

        typeEffect();
    }

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll(
        ".reveal, .section-title, .project-card, .skill-card, .education-card"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });

    // 3. Back To Top Button
    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("show", window.scrollY > 400);
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 4. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 5. Current Year in Footer
    const yearElement = document.querySelector("#currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 6. Current Date in Console (for debugging)
    console.log("Shivani Portfolio JavaScript Loaded Successfully!");
});
