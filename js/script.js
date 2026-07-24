// =======================
// Typing Effect
// =======================
const words = [
    "Smart Energy Systems",
    "Robotics",
    "Embedded Systems",
    "Artificial Intelligence",
    "Future Technologies",
    "Engineering Solutions"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typing = document.getElementById("typing");

// Only run typing effect if element exists (homepage only)
if (typing) {
    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typing.textContent = currentWord.substring(0, charIndex--);
        } else {
            typing.textContent = currentWord.substring(0, charIndex++);
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length + 1) {
            speed = 1500;
            isDeleting = true;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

// =======================
// Mobile Menu
// =======================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");
const overlay = document.getElementById("overlay");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        overlay.classList.toggle("active");

        const menuIcon = document.getElementById("menu-icon");

        if (navLinks.classList.contains("active")) {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>';
        } else {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
        }
    });
}

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        overlay.classList.remove("active");
        const menuIcon = document.getElementById("menu-icon");
        if (menuIcon) {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
        }
    });
});

// Close menu when overlay is clicked
if (overlay) {
    overlay.addEventListener("click", () => {
        navLinks.classList.remove("active");
        overlay.classList.remove("active");
        const menuIcon = document.getElementById("menu-icon");
        if (menuIcon) {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
        }
    });
}

// =======================
// Counter Animation
// =======================
const counters = document.querySelectorAll(".counter");
let started = false;

if (counters.length > 0) {
    window.addEventListener("scroll", () => {
        const statsSection = document.querySelector(".stats");

        if (!statsSection) return;

        const triggerPoint = window.innerHeight * 0.8;
        const sectionTop = statsSection.getBoundingClientRect().top;

        if (sectionTop < triggerPoint && !started) {
            started = true;

            counters.forEach(counter => {
                const target = Number(counter.dataset.target);
                const duration = 2000;
                const stepTime = 20;
                const increment = target / (duration / stepTime);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;

                    if (current >= target) {
                        counter.textContent = target + "+";
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, stepTime);
            });
        }
    });
}

// =======================
// Loader
// =======================
const loader = document.getElementById("loader");

if (loader) {
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 800);
        }, 1200);
    });
}

// =======================
// Progress Bar
// =======================
const progressBar = document.getElementById("progress-bar");

if (progressBar) {
    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = progress + "%";
    });
}

// =======================
// Reveal Animations
// =======================
const reveals = document.querySelectorAll(".reveal");

function reveal() {
    reveals.forEach(item => {
        const windowHeight = window.innerHeight;
        const top = item.getBoundingClientRect().top;

        if (top < windowHeight - 100) {
            item.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal();

// =======================
// Active Navigation
// =======================
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

if (sections.length > 0 && navItems.length > 0) {
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
}

// =======================
// Portfolio Filters
// =======================
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".portfolio-card");

if (filterButtons.length > 0 && cards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );
            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {
                if (filter === "all" || card.classList.contains(filter)) {
                    card.classList.remove("hide");
                    card.style.display = "flex";
                } else {
                    card.classList.add("hide");

                    setTimeout(() => {
                        if (card.classList.contains("hide")) {
                            card.style.display = "none";
                        }
                    }, 300);
                }
            });
        });
    });
}

// =======================
// Keyboard Navigation
// =======================
if (menuBtn) {
    menuBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            menuBtn.click();
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        if (overlay) overlay.classList.remove("active");
        const menuIcon = document.getElementById("menu-icon");
        if (menuIcon) {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>';
        }
    }
});