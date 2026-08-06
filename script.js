// Lucide icons
if (window.lucide) window.lucide.createIcons();

// Sticky nav shadow
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => links.classList.toggle("open"));
links?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("open");
});

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

// Animated counters
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
  const duration = 1600;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

// Chat preview typing loop
const replies = [
  "Based on your sleep and hydration trends, try a 15-minute walk after lunch.",
  "Your screen time rose 22% this week — I scheduled two mindful breaks.",
  "Hydration is 40% below goal. I'll remind you every 90 minutes.",
];
const aiBubble = document.querySelector("[data-typing]");
let ri = 0;
const typeReply = () => {
  const text = replies[ri % replies.length];
  ri++;
  let i = 0;
  aiBubble.textContent = "";
  const timer = setInterval(() => {
    aiBubble.textContent = text.slice(0, ++i);
    if (i >= text.length) {
      clearInterval(timer);
      setTimeout(typeReply, 3200);
    }
  }, 22);
};
if (aiBubble) typeReply();
