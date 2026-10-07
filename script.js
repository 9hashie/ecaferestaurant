const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});


/* MENU FILTER */

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".menu-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {

    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    cards.forEach(card => {

      if (category === "all" || card.dataset.category === category) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }

    });
  });
});


/* RESERVATION */

const reservationForm = document.getElementById("reservationForm");
const toast = document.getElementById("toast");

reservationForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) return;

  toast.classList.add("show");

  reservationForm.reset();

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
});


/* REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
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


/* CURSOR GLOW */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", event => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});


/* SET MINIMUM DATE */

const dateInput = document.getElementById("date");

if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  dateInput.min = `${yyyy}-${mm}-${dd}`;
}


/* PARALLAX HERO */

const plate = document.querySelector(".plate");

document.addEventListener("mousemove", event => {

  if (window.innerWidth < 900 || !plate) return;

  const x = (window.innerWidth / 2 - event.clientX) / 70;
  const y = (window.innerHeight / 2 - event.clientY) / 70;

  plate.style.transform =
    `translate(${x}px, ${y}px) rotate(${x / 3}deg)`;
});


/* ACTIVE SECTION */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {

    if (!link.classList.contains("nav-btn")) {
      link.style.color = "";
      
      if (link.getAttribute("href") === `#${current}`) {
        link.style.color = "#f0c982";
      }
    }

  });

});