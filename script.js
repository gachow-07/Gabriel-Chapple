// Put the current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Mobile menu ----------
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

function setMenu(open) {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", open);
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));

// Close the menu after a link is tapped, on Escape, or on a tap outside.
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target)) setMenu(false);
});

// ---------- Scroll progress bar + nav shadow ----------
const navWrap = document.querySelector(".nav-wrap");
const progress = document.createElement("div");
progress.className = "scroll-progress";
document.body.prepend(progress);

let ticking = false;
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const amount = max > 0 ? window.scrollY / max : 0;
  progress.style.transform = `scaleX(${amount})`;
  navWrap.classList.toggle("is-scrolled", window.scrollY > 8);
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
onScroll();

// ---------- Highlight the nav link for the section in view ----------
const navLinks = [...document.querySelectorAll(".nav-links a")];

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

  // Clear the highlight when back at the hero.
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) navLinks.forEach((link) => link.classList.remove("is-active"));
  }, { rootMargin: "-45% 0px -50% 0px" }).observe(document.querySelector(".hero"));
}

// ---------- Stat count-up ----------
// Reads the number already in the HTML (e.g. "$15,000") and counts to it.
function countUp(el, delay) {
  const text = el.textContent;
  const match = text.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return;
  const [, prefix, digits, suffix] = match;
  const target = parseInt(digits.replace(/,/g, ""), 10);
  const duration = 900;
  let start;

  // Lock the width so the layout doesn't jump, then start from 0.
  el.style.minWidth = `${el.getBoundingClientRect().width}px`;
  el.textContent = prefix + "0" + suffix;

  function frame(now) {
    start ??= now;
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + Math.round(target * eased).toLocaleString("en-US") + suffix;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = text;
  }
  setTimeout(() => requestAnimationFrame(frame), delay);
}

// ---------- Scroll reveals ----------
// Items fade up as they enter the screen. Items that appear together
// are staggered slightly. Skipped for reduced motion or old browsers,
// so the content simply stays visible.
if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".section-label, .section-heading, .about-text, .facts, .stats li, " +
    ".entry, .skill-group, .contact-text, .contact-email, .section .hero-buttons"
  );

  document.documentElement.classList.add("has-reveal");
  targets.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry, i) => {
        const el = entry.target;
        el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * 0.08}s`);
        el.classList.add("is-visible");
        revealObserver.unobserve(el);

        const number = el.querySelector(".stat-number");
        if (number) countUp(number, Math.min(i, 5) * 80);
      });
  }, { rootMargin: "0px 0px -10% 0px" });

  targets.forEach((el) => revealObserver.observe(el));
}

// ---------- Photo tilt that follows the mouse ----------
const photo = document.querySelector(".hero-photo");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (photo && finePointer && !reduceMotion) {
  photo.addEventListener("mousemove", (e) => {
    const rect = photo.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    photo.style.setProperty("--tilt-y", `${x * 6}deg`);
    photo.style.setProperty("--tilt-x", `${y * -6}deg`);
  });
  photo.addEventListener("mouseleave", () => {
    photo.style.setProperty("--tilt-x", "0deg");
    photo.style.setProperty("--tilt-y", "0deg");
  });
}
