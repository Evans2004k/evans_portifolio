const qs = (s, o = document) => o.querySelector(s);
const qsa = (s, o = document) => [...o.querySelectorAll(s)];

// header
const navbar = qs("#navbar");
const navToggle = qs(".nav-toggle");
const navLinks = qsa(".nav__link");

navToggle.addEventListener("click", () => navbar.classList.toggle("open"));

navLinks.forEach((link) =>
  link.addEventListener("click", () => navbar.classList.remove("open"))
);

navLinks.forEach((anchor) =>
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (id.startsWith("#")) {
      e.preventDefault();
      qs(id).scrollIntoView({ behavior: "smooth", block: "start" });
    }
  })
);

// sticky shadow on scroll
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// theme toggle
const themeBtn = qs("#theme-toggle");
const body = document.body;
const stored = localStorage.getItem("theme") || "light";
body.dataset.theme = stored;

themeBtn.addEventListener("click", () => {
  const current = body.dataset.theme;
  const next = current === "light" ? "dark" : "light";
  body.dataset.theme = next;
  localStorage.setItem("theme", next);
});

// reveal on show
const revealEls = qsa(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // animate skill bar if applicable
        if (entry.target.classList.contains("skill")) {
          const bar = qs(".skill__bar span", entry.target);
          if (bar) bar.style.setProperty("--width", bar.dataset.width);
        }
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// animate skill bars when they scroll into view
  const skillSpans = document.querySelectorAll(".skill__bar span");

  function showSkills() {
    skillSpans.forEach((span) => {
      const width = span.getAttribute("data-width");
      const spanPos = span.getBoundingClientRect().top;
      const screenPos = window.innerHeight;

      if (spanPos < screenPos - 50) {
        span.style.width = width;
      }
    });
  }

  window.addEventListener("scroll", showSkills);
  window.addEventListener("load", showSkills);


// contact form
const form = qs("#contact-form");
const msg = qs(".msg-sent", form);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // simple validation
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    alert("Please fill in all fields.");
    return;
  }
  // simulate fake send for submision
  form.reset();
  msg.classList.remove("hidden");
  setTimeout(() => msg.classList.add("hidden"), 4000);
});

// set current year in footer 
qs("#year").textContent = new Date().getFullYear();
