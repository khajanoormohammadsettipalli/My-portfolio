// =========================
// Smooth Active Navigation
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// =========================
// Header + Mobile Menu
// =========================

const header = document.querySelector("header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(5,15,30,0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0,255,255,0.3)";
    } else {
        header.style.background = "rgba(255,255,255,0.08)";
        header.style.boxShadow = "none";
    }
});

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const isOpen = header.classList.toggle("menu-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

if (nav) {
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            header.classList.remove("menu-open");
            if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// =========================
// Fade-in Animation
// =========================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});


// =========================
// Back to Top Button
// =========================

const topBtn = document.createElement("button");

topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
// ===============================
// Auto Hide / Show Header
// ===============================

let lastScroll = window.scrollY;
let ticking = false;

function updateHeader(){
    const currentScroll = window.scrollY;

    if(currentScroll <= 20){
        header.classList.remove("hide");
        header.classList.add("show-header");
    } else if(currentScroll > lastScroll + 4){
        header.classList.add("hide");
        header.classList.remove("show-header");
    } else if(currentScroll < lastScroll - 4){
        header.classList.remove("hide");
        header.classList.add("show-header");
    }

    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener("scroll", () => {
    if(!ticking){
        window.requestAnimationFrame(updateHeader);
        ticking = true;
    }
}, {passive:true});

updateHeader();
