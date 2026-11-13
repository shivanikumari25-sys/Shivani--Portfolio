
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector("#menuToggle");
    const navMenu = document.querySelector("#navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const header = document.querySelector(".header");

    // Mobile Navigation Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen);
            document.body.classList.toggle("menu-open", isOpen);
        });

        // Close menu after clicking a navigation link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });

        // Close menu on outside click
        document.addEventListener("click", (event) => {
            const clickedInside =
                navMenu.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInside) {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            }
        });

        // Close menu with Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            }
        });
    }

    // Sticky Navbar on Scroll
    window.addEventListener("scroll", () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll("main section[id]");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;

                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            threshold: 0.25,
            rootMargin: "-80px 0px -40% 0px"
        }
    );

    sections.forEach((section) => observer.observe(section));
});
